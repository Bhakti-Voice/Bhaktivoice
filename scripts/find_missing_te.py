import os, glob

files = glob.glob('src/app/**/*.tsx', recursive=True) + glob.glob('src/components/**/*.tsx', recursive=True)
without_te = []
with_both = []
for f in files:
    if '\\te\\' in f or '/te/' in f:
        continue
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        c = fp.read()
        if 'isHi' in c and 'isTe' not in c:
            without_te.append(f)
        elif 'isHi' in c and 'isTe' in c:
            with_both.append(f)

print(f"Total files with isHi but WITHOUT isTe: {len(without_te)}")
for f in sorted(without_te):
    print("MISSING:", f)

print(f"\nAlready has isTe: {len(with_both)}")
for f in sorted(with_both):
    print("DONE:", f)
