const fs = require('fs');
const path = require('path');

// Function to extract inline script and save it as a file
function extractInlineScripts(htmlContent) {
    const inlineScriptRegex = /(<script>)(.*?)(<\/script>)/g;
    let match;
    let index = 0;
    let modifiedContent = htmlContent;

    while ((match = inlineScriptRegex.exec(htmlContent)) !== null) {
        const inlineScript = match[2];
        const filename = `runtime-${index}.js`;

        // Save the script to a file
        fs.writeFileSync(path.join(__dirname, 'build', 'static', 'js', filename), inlineScript);

        // Replace inline script with reference to the file
        modifiedContent = modifiedContent.replace(
            `<script>${inlineScript}</script>`,
            `<script src="/static/js/${filename}"></script>`,
        );

        index++;
    }

    return modifiedContent;
}

// Read the built index.html
const indexPath = path.join(__dirname, 'build', 'index.html');
const htmlContent = fs.readFileSync(indexPath, 'utf8');

// Extract inline scripts and update the HTML
const modifiedHtml = extractInlineScripts(htmlContent);

// Write the modified HTML back
fs.writeFileSync(indexPath, modifiedHtml);
