import { NextResponse } from "next/server";

export async function GET() {
  const sampleData = {
    title: "Bhagavad Gita — Sacred Chapters Sample",
    language: "sa-hi-en",
    version: "1.0.0",
    chapters: [
      {
        chapter: 2,
        name: "Sankhya Yoga",
        nameHindi: "सांख्य योग",
        nameSanskrit: "सांख्ययोगः",
        nameTranslation: "The Yoga of Knowledge",
        versesCount: 2,
        summary:
          "Lord Krishna instructs Arjuna on the eternal nature of the soul (Atman), the illusion of death, and the path of selfless action.",
        summaryHindi:
          "भगवान श्रीकृष्ण अर्जुन को आत्मा की अमरता, कर्मयोग का रहस्य और समत्व बुद्धि का उपदेश देते हैं।",
        verses: [
          {
            verse: 11,
            speaker: "श्रीभगवानुवाच",
            sanskrit:
              "अशोच्यानन्वशोचस्त्वं प्रज्ञावादांश्च भाषसे ।\nगतासूनगतासूंश्च नानुशोचन्ति पण्डिताः ॥ २.११ ॥",
            transliteration:
              "aśocyān anvaśocas tvaṁ prajñā-vādāṁś ca bhāṣase |\ngatāsūn agatāsūṁś ca nānuśocanti paṇḍitāḥ || 2.11 ||",
            hindi:
              "तुम उन बातों के लिए शोक कर रहे हो जिनके लिए शोक करना उचित नहीं है, और ज्ञान की बातें कर रहे हो! जो ज्ञानी पुरुष हैं, वे न तो मृतकों के लिए और न ही जीवितों के लिए शोक करते हैं।",
            english:
              "You grieve for those who should not be grieved for, yet you speak words of wisdom. The wise do not mourn for the dead or for the living.",
            wordMeanings:
              "aśocyān = not worthy of lamentation; anvaśocaḥ = you are lamenting; tvam = you; prajñā-vādān = learned words; ca = also; bhāṣase = you speak; gatāsūn = the dead; agatāsūn = the living; ca = and; na = never; anuśocanti = lament; paṇḍitāḥ = the wise.",
          },
          {
            verse: 12,
            speaker: "श्रीभगवानुवाच",
            sanskrit:
              "न त्वेवाहं जातु नासं न त्वं नेमे जनाधिपाः ।\nन चैव न भविष्यामः सर्वे वयमतः परम् ॥ २.१२ ॥",
            transliteration:
              "na tvevāhaṁ jātu nāsaṁ na tvaṁ neme janādhipāḥ |\nna caiva na bhaviṣyāmaḥ sarve vayamataḥ param || 2.12 ||",
            hindi:
              "ऐसा कभी नहीं था कि मैं नहीं था, तुम नहीं थे, या ये समस्त राजागण नहीं थे; और ऐसा कभी नहीं होगा कि हम सब आगे नहीं रहेंगे।",
            english:
              "Never was there a time when I did not exist, nor you, nor these rulers of men; nor will there ever be a time when all of us will cease to exist.",
            wordMeanings:
              "na = never; tu = but; eva = certainly; aham = I; jātu = at any time; na = not; āsam = existed; na = not; tvam = you; na = not; ime = these; janādhipāḥ = kings; na = not; ca = also; eva = certainly; na = not; bhaviṣyāmaḥ = shall exist; sarve = all; vayam = we; ataḥ param = hereafter.",
          },
        ],
      },
    ],
  };

  return new NextResponse(JSON.stringify(sampleData, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": 'attachment; filename="bhagavad_gita_sample_template.json"',
    },
  });
}
