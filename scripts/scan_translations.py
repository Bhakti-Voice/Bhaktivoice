import os

files_with_ishi = []
files_with_faqs = []

for root, dirs, files in os.walk('src'):
    for f in files:
        if f.endswith(('.ts', '.tsx')):
            p = os.path.join(root, f)
            with open(p, 'r', encoding='utf-8', errors='ignore') as file:
                content = file.read()
                if 'isHi' in content or 'locale === "hi"' in content or "locale === 'hi'" in content:
                    files_with_ishi.append(p)
                if 'FAQ' in content or 'faq' in content or 'Faq' in content:
                    files_with_faqs.append(p)

print("=== FILES WITH isHi / locale === 'hi' ===")
for f in sorted(set(files_with_ishi)):
    print(f)

print(f"\nTotal files with isHi: {len(set(files_with_ishi))}")

print("\n=== FILES WITH FAQ / faqs ===")
for f in sorted(set(files_with_faqs)):
    print(f)

print(f"\nTotal files with FAQ: {len(set(files_with_faqs))}")
