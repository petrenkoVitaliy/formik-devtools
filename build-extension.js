const fs = require('fs');
const path = require('path');

function extractInlineScripts(htmlContent) {
    const inlineScriptRegex = /<script>([\s\S]*?)<\/script>/g;
    let match;
    let index = 0;
    let parts = [];
    let lastIndex = 0;

    while ((match = inlineScriptRegex.exec(htmlContent)) !== null) {
        const scriptStart = match.index;
        const scriptEnd = inlineScriptRegex.lastIndex;
        const inlineScript = match[1];
        const filename = `runtime-inline-${index}.js`;

        const outDir = path.join(__dirname, 'build', 'static', 'js');
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

        fs.writeFileSync(path.join(outDir, filename), inlineScript.trim());

        parts.push(htmlContent.slice(lastIndex, scriptStart));
        parts.push(`<script src="/static/js/${filename}"></script>`);
        lastIndex = scriptEnd;

        index++;
    }

    if (parts.length === 0) return htmlContent;

    parts.push(htmlContent.slice(lastIndex));

    return parts.join('');
}

const indexPath = path.join(__dirname, 'build', 'index.html');
const htmlContent = fs.readFileSync(indexPath, 'utf8');

const modifiedHtml = extractInlineScripts(htmlContent);

fs.writeFileSync(indexPath, modifiedHtml);
