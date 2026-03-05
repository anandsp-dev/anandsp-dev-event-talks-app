# TechFest 2026 Event Talks Application

This repository contains the static website for the TechFest 2026 event talks.

## Project Structure
- `generate-site.js`: A Node.js script that generates the `index.html` file.
- `index.html`: The single-page, serverless HTML file displaying the event schedule with talk details and category search functionality.
- `.gitignore`: Specifies intentionally untracked files to ignore.

## How to Generate the Website
To regenerate the `index.html` file, run the `generate-site.js` script using Node.js:
\`\`\`bash
node generate-site.js
\`\`\`

## How to Run Locally
1. Ensure you have Python installed.
2. Navigate to the project directory in your terminal.
3. Start a simple HTTP server:
   - Python 3: `python3 -m http.server 8000`
   - Python 2: `python -m SimpleHTTPServer 8000`
4. Open your web browser and go to `http://localhost:8000`.