export function getGaMeasurementId() {
  const raw = (
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
    process.env.NEXT_PUBLIC_GA_ID ||
    process.env.GA_MEASUREMENT_ID ||
    ""
  ).trim();
  return /^G-[A-Z0-9]+$/i.test(raw) ? raw : "";
}
