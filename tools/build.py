#!/usr/bin/env python3
"""
Build the /dist production bundle from the root source files.

Reads:   index.html, styles.css, script.js
Writes:  dist/index.html, dist/styles.min.css, dist/script.min.js

Run from the repo root:
    python3 tools/build.py
"""

import os
import re
import shutil
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = os.path.join(ROOT, 'dist')

# Static assets (favicon, social preview) that ship alongside the HTML/CSS/JS.
STATIC_ASSETS = [
    'favicon.svg',
    'favicon.ico',
    'favicon-16.png',
    'favicon-32.png',
    'favicon-180.png',
    'favicon-512.png',
    'og-image.png',
]


def minify_css(css: str) -> str:
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.DOTALL)
    css = re.sub(r'\s+', ' ', css)
    css = re.sub(r'\s*([{};:,>+~])\s*', r'\1', css)
    css = re.sub(r';}', '}', css)
    return css.strip()


def minify_js(js: str) -> str:
    js = re.sub(r'/\*.*?\*/', '', js, flags=re.DOTALL)
    out_lines = []
    for line in js.splitlines():
        in_str = None
        buf = []
        i = 0
        while i < len(line):
            ch = line[i]
            if in_str:
                buf.append(ch)
                if ch == '\\' and i + 1 < len(line):
                    buf.append(line[i + 1])
                    i += 2
                    continue
                if ch == in_str:
                    in_str = None
            else:
                if ch in ('"', "'"):
                    in_str = ch
                    buf.append(ch)
                elif ch == '/' and i + 1 < len(line) and line[i + 1] == '/':
                    break
                else:
                    buf.append(ch)
            i += 1
        out_lines.append(''.join(buf).rstrip())
    js = '\n'.join(out_lines)
    js = re.sub(r'\n\s*\n+', '\n', js)
    js = re.sub(r'^\s+', '', js, flags=re.MULTILINE)
    js = re.sub(r'[ \t]+', ' ', js)
    js = re.sub(r'\s*([=+\-*/<>!&|,;:{}()\[\]?])\s*', r'\1', js)
    for kw in ['var', 'function', 'return', 'if', 'else', 'for',
               'while', 'new', 'typeof', 'in', 'of']:
        js = re.sub(r'(^|\W)' + kw + r'([A-Za-z_])', r'\1' + kw + r' \2', js)
    return js.replace('\n', '')


def minify_html(html: str) -> str:
    html = re.sub(r'<!--(?!\[if).*?-->', '', html, flags=re.DOTALL)
    preserved = []

    def stash(match):
        preserved.append(match.group(0))
        return f'\x00{len(preserved) - 1}\x00'

    html = re.sub(r'<svg[\s\S]*?</svg>', stash, html)
    html = re.sub(r'<pre[\s\S]*?</pre>', stash, html)
    html = re.sub(r'[ \t]+', ' ', html)
    html = re.sub(r'>\s+<', '><', html)
    html = re.sub(r'\n\s*', '\n', html)
    html = re.sub(r'\n+', '\n', html).strip()

    def unstash(m):
        chunk = preserved[int(m.group(1))]
        chunk = re.sub(r'\s+', ' ', chunk)
        chunk = re.sub(r'>\s+<', '><', chunk)
        return chunk

    html = re.sub(r'\x00(\d+)\x00', unstash, html)
    # Point the document at the minified filenames.
    html = html.replace('href="styles.css"', 'href="styles.min.css"')
    html = html.replace('src="script.js"', 'src="script.min.js"')
    return html


def main():
    os.makedirs(DIST, exist_ok=True)

    css_src = open(os.path.join(ROOT, 'styles.css')).read()
    js_src = open(os.path.join(ROOT, 'script.js')).read()
    html_src = open(os.path.join(ROOT, 'index.html')).read()

    css_out = minify_css(css_src)
    js_out = minify_js(js_src)
    html_out = minify_html(html_src)

    open(os.path.join(DIST, 'styles.min.css'), 'w').write(css_out)
    open(os.path.join(DIST, 'script.min.js'), 'w').write(js_out)
    open(os.path.join(DIST, 'index.html'), 'w').write(html_out)

    # Copy static assets (favicon, social preview image) so /dist is
    # a self-contained deployable bundle.
    for asset in STATIC_ASSETS:
        src = os.path.join(ROOT, asset)
        if os.path.exists(src):
            shutil.copy2(src, os.path.join(DIST, asset))

    print(f'  styles.min.css  {len(css_src):>7} -> {len(css_out):>7} bytes')
    print(f'  script.min.js   {len(js_src):>7} -> {len(js_out):>7} bytes')
    print(f'  index.html      {len(html_src):>7} -> {len(html_out):>7} bytes')
    total_src = len(css_src) + len(js_src) + len(html_src)
    total_out = len(css_out) + len(js_out) + len(html_out)
    saved = total_src - total_out
    print(f'  total           {total_src:>7} -> {total_out:>7} bytes  '
          f'({saved:,} bytes / {saved / total_src * 100:.1f}% saved)')
    print(f'  copied static:  {", ".join(a for a in STATIC_ASSETS if os.path.exists(os.path.join(ROOT, a)))}')


if __name__ == '__main__':
    sys.exit(main())
