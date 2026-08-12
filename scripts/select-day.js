const fs = require("node:fs");

const requested = process.argv[2];
const timeZone = "Africa/Lagos";
const firstWindowStart = "2026-08-10";
const resetDate = "2026-08-16";
const finalWindowStart = "2026-08-17";
const finalDate = "2026-08-21";

function localDateParts(date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function utcDayNumber(isoDate) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return Math.floor(Date.UTC(year, month - 1, day) / 86400000);
}

let day;
const today = process.env.CURRENT_DATE || localDateParts(new Date());
if (requested && requested !== "auto") {
  day = Number(requested.replace(/^day-/, ""));
} else if (today >= firstWindowStart && today <= "2026-08-14") {
  day = utcDayNumber(today) - utcDayNumber(firstWindowStart) + 1;
} else if (today === resetDate) {
  day = 1;
} else if (today >= finalWindowStart && today <= finalDate) {
  day = utcDayNumber(today) - utcDayNumber(finalWindowStart) + 1;
} else {
  console.log("Outside the configured Quality Week windows; no selector change required.");
  process.exit(0);
}

if (!Number.isInteger(day) || day < 1 || day > 5) throw new Error("Invalid day selection.");

const extension = day === 5 ? "png" : "jpg";
const labels = {
  1: "Quality Week plan, goals and objectives",
  2: "Top ten quality and food safety rules",
  3: "Distributor warehouse golden rules",
  4: "Retail assessment golden rules",
  5: "Quality Week slogan: One Team, One Standard, Zero Compromise",
};
const selector = {
  day,
  image: `../assets/day-${day}.${extension}`,
  alt: `Day ${day} — ${labels[day]}`,
};

fs.writeFileSync("today/current.json", `${JSON.stringify(selector, null, 2)}\n`);
console.log(`Selected Day ${day}: ${selector.image}`);

if (process.env.GITHUB_OUTPUT) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `selected_day=${day}\n`);
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `disable_schedule=${requested === "auto" && today === finalDate}\n`);
}
