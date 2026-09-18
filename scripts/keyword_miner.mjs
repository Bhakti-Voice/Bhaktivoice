import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target seed keywords organized by vertical
const SEED_CLUSTERS = {
  panchang_daily: [
    'aaj ka panchang',
    'today panchang',
    'aaj ki tithi',
    'today tithi',
    'aaj ka choghadiya',
    'today choghadiya',
    'shubh muhurat today',
    'rahu kaal today',
    'today hora',
    'panchangam today',
    'hindu calendar 2026'
  ],
  kundli_astrology: [
    'free kundli',
    'janam kundli',
    'kundli milan',
    'kundali matching for marriage',
    'mangal dosha check',
    'kaal sarp dosh remedies',
    'sade sati calculator',
    'gun milan online',
    'kundli reading online'
  ],
  vrats_festivals: [
    'ekadashi 2026',
    'aaj konsi ekadashi hai',
    'pradosh vrat 2026',
    'purnima 2026',
    'amavasya 2026',
    'shivratri 2026',
    'navratri 2026'
  ],
  chalisa_stotras_mantras: [
    'hanuman chalisa lyrics',
    'shiv tandav stotram',
    'maha mrityunjaya mantra',
    'gayatri mantra',
    'ganesh aarti lyrics',
    'laxmi aarti lyrics'
  ],
  gita_suvichar_tools: [
    'bhagavad gita in hindi',
    'bhagavad gita quotes',
    '108 japa mala counter',
    'aaj ka suvichar',
    'good morning bhakti suvichar'
  ],
  hindi_telugu_vernacular: [
    'आज का पंचांग',
    'आज की तिथि',
    'आज का चौघड़िया',
    'फ्री जन्म कुंडली',
    'ఈరోజు పంచాంగం',
    'ఈరోజు తిథి',
    'జాతక చక్రం'
  ]
};

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');
const TOP_CITIES = ['delhi', 'mumbai', 'jaipur', 'patna', 'lucknow', 'hyderabad', 'varanasi', 'kolkata'];

async function fetchSuggest(query, lang = 'en') {
  const url = `http://suggestqueries.google.com/complete/search?client=chrome&hl=${lang}&gl=in&q=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) return [];
    const data = await res.json();
    const suggestions = data[1] || [];
    const relevance = data[4]?.['google:suggestrelevance'] || [];
    return suggestions.map((s, idx) => ({
      query: s.toLowerCase().trim(),
      relevance: relevance[idx] || 500
    }));
  } catch (err) {
    return [];
  }
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function mineKeywords() {
  console.log('🚀 Starting Bhakti Voice Google Keyword Miner...');
  const results = new Map();

  for (const [cluster, seeds] of Object.entries(SEED_CLUSTERS)) {
    console.log(`\n📂 Mining Cluster: ${cluster} (${seeds.length} seeds)`);

    for (const seed of seeds) {
      process.stdout.write(`  Mining: "${seed}" `);
      const queriesToTry = [seed];

      // If english/hinglish, do alphabet extensions
      if (/^[a-zA-Z0-9\s]+$/.test(seed)) {
        for (const letter of ALPHABET.slice(0, 10)) { // top 10 letters a-j
          queriesToTry.push(`${seed} ${letter}`);
        }
        // City variations for panchang/choghadiya/kundli
        if (cluster === 'panchang_daily' || cluster === 'kundli_astrology') {
          for (const city of TOP_CITIES.slice(0, 5)) {
            queriesToTry.push(`${seed} in ${city}`);
          }
        }
      }

      for (const q of queriesToTry) {
        const lang = /[\u0900-\u097F]/.test(q) ? 'hi' : /[\u0C00-\u0C7F]/.test(q) ? 'te' : 'en';
        const suggestions = await fetchSuggest(q, lang);

        for (const item of suggestions) {
          if (!results.has(item.query)) {
            results.set(item.query, {
              keyword: item.query,
              cluster,
              seed,
              relevance: item.relevance,
              lang: /[\u0900-\u097F]/.test(item.query) ? 'hi' : /[\u0C00-\u0C7F]/.test(item.query) ? 'te' : 'en'
            });
          }
        }
        await sleep(35); // polite rate limit
      }
      console.log(`✓ (Total unique so far: ${results.size})`);
    }
  }

  const sortedResults = Array.from(results.values()).sort((a, b) => b.relevance - a.relevance);

  const outputPath = path.join(__dirname, 'bhakti_mined_keywords.json');
  await fs.writeFile(outputPath, JSON.stringify(sortedResults, null, 2), 'utf-8');

  console.log(`\n✅ Finished mining! Extracted ${sortedResults.length} high-intent Google keywords.`);
  console.log(`Saved to: ${outputPath}`);

  return sortedResults;
}

mineKeywords().catch(err => {
  console.error('Fatal mining error:', err);
});
