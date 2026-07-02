const fs = require("fs");
const path = require("path");

const SUBJECTS = ["JIGL", "CL", "SBIL", "CAFM"];

const output = {
  generatedAt: new Date().toISOString(),
  subjects: {}
};

SUBJECTS.forEach(subject => {
  const folder = path.join(__dirname, "..", subject);

  if (!fs.existsSync(folder)) {
    console.log(`${subject} folder not found.`);
    return;
  }

  const files = fs.readdirSync(folder)
    .filter(file => file.endsWith(".json"))
    .sort();

  output.subjects[subject] = [];

  files.forEach(file => {
    const filePath = path.join(folder, file);

    try {
      const chapter = JSON.parse(fs.readFileSync(filePath, "utf8"));

      output.subjects[subject].push(chapter);

      console.log(`✓ Added ${subject}/${file}`);
    } catch (err) {
      console.error(`❌ Error reading ${file}: ${err.message}`);
    }
  });

  output.subjects[subject].sort((a, b) => a.chapterNo - b.chapterNo);
});

fs.writeFileSync(
  path.join(__dirname, "..", "Videos.json"),
  JSON.stringify(output, null, 2)
);

console.log("✅ Videos.json generated successfully.");
