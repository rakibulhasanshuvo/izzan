import re

with open('src/app/globals.css', 'r') as f:
    content = f.read()

content = content.replace('--color-text-dark: #f8f6f0;', '--color-text-dark: #ffffff;')

with open('src/app/globals.css', 'w') as f:
    f.write(content)
