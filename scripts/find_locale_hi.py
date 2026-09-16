import os

matched_files = []
for root, dirs, files in os.walk('src'):
    for f in files:
        if f.endswith(('.tsx', '.ts')):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8', errors='ignore') as fp:
                content = fp.read()
                if 'locale === "hi"' in content or 'isHi' in content or 'locale === \'hi\'' in content:
                    matched_files.append(path)

print(f'Total matched files: {len(matched_files)}')
for p in sorted(matched_files):
    print(p)
