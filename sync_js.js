const fs = require('fs');
const path = require('path');

const dir = 'd:\\stackly oct\\Tea House & Specialty Chai Stall';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const indexContent = fs.readFileSync(path.join(dir, 'index.html'), 'utf-8');

const scriptMatch = indexContent.match(/<script>[\s\S]*?\(function \(\)[\s\S]*?<\/script>/);

if (scriptMatch) {
    const newScript = scriptMatch[0];

    files.forEach(file => {
        if (file === 'index.html') return;
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf-8');

        if (content.match(/<script>[\s\S]*?\(function \(\)[\s\S]*?<\/script>/)) {
            content = content.replace(/<script>[\s\S]*?\(function \(\)[\s\S]*?<\/script>/, newScript);
            fs.writeFileSync(filePath, content, 'utf-8');
            console.log('Updated JS in ' + file);
        }
    });
} else {
    console.log('Could not find JS block in index.html');
}
