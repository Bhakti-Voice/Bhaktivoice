import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function analyze() {
  const raw = await fs.readFile(path.join(__dirname, 'bhakti_mined_keywords.json'), 'utf-8');
  const data = JSON.parse(raw);

  console.log(`Total keywords analyzed: ${data.length}`);

  const clusters = {};
  for (const item of data) {
    if (!clusters[item.cluster]) {
      clusters[item.cluster] = [];
    }
    clusters[item.cluster].push(item);
  }

  const report = {};

  for (const [cluster, items] of Object.entries(clusters)) {
    // Top relevance
    const topRelevance = items.slice(0, 15).map(i => i.keyword);

    // Questions / High Intent (kya, kaise, kab, when, how, meaning, vidhi, time)
    const questions = items
      .filter(i => /(kya|kaise|kab|when|how|meaning|vidhi|time|samay|today|aaj)/i.test(i.keyword))
      .slice(0, 15)
      .map(i => i.keyword);

    // Downloads / Tools / Calculators / Lyrics
    const toolIntent = items
      .filter(i => /(calculator|matching|pdf|lyrics|counter|online|free|chart|maker)/i.test(i.keyword))
      .slice(0, 15)
      .map(i => i.keyword);

    // Regional/City specific
    const citySpecific = items
      .filter(i => /(delhi|mumbai|jaipur|patna|lucknow|hyderabad|varanasi|kolkata|bangalore|pune|indore|ahmedabad)/i.test(i.keyword))
      .slice(0, 15)
      .map(i => i.keyword);

    report[cluster] = {
      totalCount: items.length,
      topRelevance,
      questions,
      toolIntent,
      citySpecific
    };
  }

  console.log(JSON.stringify(report, null, 2));

  await fs.writeFile(
    path.join(__dirname, 'keyword_insights_summary.json'),
    JSON.stringify(report, null, 2),
    'utf-8'
  );
}

analyze().catch(console.error);
