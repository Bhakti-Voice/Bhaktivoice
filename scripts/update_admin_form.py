with open("backend/templates/form.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Update line 32 to include all Te fields in toolbar
rich_names_old = 'or field.name in ["body", "bodyHi", "sections", "sectionsHi", "introduction", "introductionHi", "story", "storyHi", "history", "historyHi", "architecture", "architectureHi", "significance", "significanceHi", "puja", "pujaHi", "whyVisit", "whyVisitHi", "description", "descriptionHi"]'
rich_names_new = 'or field.name in ["body", "bodyHi", "bodyTe", "sections", "sectionsHi", "sectionsTe", "introduction", "introductionHi", "introductionTe", "story", "storyHi", "storyTe", "history", "historyHi", "historyTe", "architecture", "architectureHi", "architectureTe", "significance", "significanceHi", "significanceTe", "puja", "pujaHi", "pujaTe", "whyVisit", "whyVisitHi", "whyVisitTe", "description", "descriptionHi", "descriptionTe"]'
if rich_names_old in html:
    html = html.replace(rich_names_old, rich_names_new)

# 2. Add language switcher tabs and field wrapper
tabs_html = '''    <!-- Language Filter Tabs for Admin -->
    <div class="lang-tab-bar" style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; margin: 0.5rem 0 1.25rem 0; padding: 0.5rem 0.75rem; background: var(--cream); border-radius: 14px; border: 1px solid var(--line);">
      <span style="font-size: 0.82rem; font-weight: bold; color: var(--muted); margin-right: 0.25rem;">🌐 View Language:</span>
      <button type="button" class="btn lang-filter-btn active" data-lang="all" style="padding: 0.35rem 0.85rem; font-size: 0.82rem;">All Fields</button>
      <button type="button" class="btn ghost lang-filter-btn" data-lang="en" style="padding: 0.35rem 0.85rem; font-size: 0.82rem; background: #fff;">🇬🇧 English</button>
      <button type="button" class="btn ghost lang-filter-btn" data-lang="hi" style="padding: 0.35rem 0.85rem; font-size: 0.82rem; background: #fff; color: #b45309;">🇮🇳 Hindi (हिंदी)</button>
      <button type="button" class="btn ghost lang-filter-btn" data-lang="te" style="padding: 0.35rem 0.85rem; font-size: 0.82rem; background: #fff; color: #0284c7; font-weight: bold;">🚩 Telugu (తెలుగు)</button>
    </div>
'''

old_for_loop = '{% for field in kind.fields %}\n      <label>{{ field.label }}'
new_for_loop = tabs_html + '''    {% for field in kind.fields %}
      {% set is_te = field.name.endswith("Te") %}
      {% set is_hi = field.name.endswith("Hi") %}
      {% set is_en = not is_te and not is_hi %}
      <div class="field-item-row" data-field-lang="{{ 'te' if is_te else 'hi' if is_hi else 'en' }}" style="margin-top: 0.85rem;">
        <label style="display: flex; align-items: center; justify-content: space-between; font-weight: 600; color: var(--ink);">
          <span>{{ field.label }}</span>
          {% if is_te %}
            <span style="background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; font-size: 11px; padding: 2px 8px; border-radius: 6px; font-weight: bold;">🚩 తెలుగు (Telugu)</span>
          {% elif is_hi %}
            <span style="background: #fef3c7; color: #b45309; border: 1px solid #fde68a; font-size: 11px; padding: 2px 8px; border-radius: 6px; font-weight: bold;">🇮🇳 हिंदी (Hindi)</span>
          {% else %}
            <span style="background: #f3f4f6; color: #4b5563; border: 1px solid #e5e7eb; font-size: 11px; padding: 2px 8px; border-radius: 6px; font-weight: bold;">🇬🇧 English</span>
          {% endif %}
        </label>'''

if old_for_loop in html:
    html = html.replace(old_for_loop, new_for_loop)

# Close the div before endfor
old_endfor = '{% if field.hint %}<p class="hint">{{ field.hint }}</p>{% endif %}\n    {% endfor %}'
new_endfor = '{% if field.hint %}<p class="hint">{{ field.hint }}</p>{% endif %}\n      </div>\n    {% endfor %}'
if old_endfor in html:
    html = html.replace(old_endfor, new_endfor)

# 3. Update preview buttons JS to wire up preview_te and tabs filter
js_old = '''      ["preview-btn-top-hi", "preview-btn-bottom-hi"].forEach(function(id) {
        const el = document.getElementById(id);
        if (el) el.href = hiUrl;
      });'''

js_new = '''      const teUrl = "/admin/preview?kind=" + encodeURIComponent(kindKey) + "&slug=" + encodeURIComponent(s) + "&locale=te";
      ["preview-btn-top-hi", "preview-btn-bottom-hi"].forEach(function(id) {
        const el = document.getElementById(id);
        if (el) el.href = hiUrl;
      });
      ["preview-btn-top-te", "preview-btn-bottom-te"].forEach(function(id) {
        const el = document.getElementById(id);
        if (el) el.href = teUrl;
      });'''

if js_old in html:
    html = html.replace(js_old, js_new)

# 4. Add JS for Language Filter Tabs at the bottom
tab_filter_script = '''
    // Language Tab Filter in Form
    document.querySelectorAll(".lang-filter-btn").forEach(function(btn) {
      btn.addEventListener("click", function() {
        document.querySelectorAll(".lang-filter-btn").forEach(function(b) {
          b.classList.remove("active");
          b.classList.add("ghost");
        });
        btn.classList.add("active");
        btn.classList.remove("ghost");
        const lang = btn.getAttribute("data-lang");
        document.querySelectorAll(".field-item-row").forEach(function(row) {
          const rowLang = row.getAttribute("data-field-lang");
          if (lang === "all" || rowLang === lang) {
            row.style.display = "";
          } else {
            row.style.display = "none";
          }
        });
      });
    });
'''

target_script_end = '</script>'
if target_script_end in html:
    html = html.replace(target_script_end, tab_filter_script + '\n  ' + target_script_end)

with open("backend/templates/form.html", "w", encoding="utf-8") as f:
    f.write(html)
print("SUCCESS: Updated backend/templates/form.html with Telugu language tabs, badges, rich editor, and preview")
