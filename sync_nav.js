const fs = require('fs');
const path = require('path');

const dir = 'd:\\stackly oct\\Tea House & Specialty Chai Stall';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const indexContent = fs.readFileSync(path.join(dir, 'index.html'), 'utf-8');

const headerMatch = indexContent.match(/<header class="fixed top-0[\s\S]*?<\/header>/);
const drawerMatch = indexContent.match(/<div id="mobile-drawer"[\s\S]*?<\/nav>\s*<\/div>\s*<\/div>/);

if (headerMatch && drawerMatch) {
    const newHeader = headerMatch[0];
    const newDrawer = drawerMatch[0];

    files.forEach(file => {
        if (file === 'index.html') return;
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf-8');

        content = content.replace(/<header class="fixed top-0[\s\S]*?<\/header>/, newHeader);
        content = content.replace(/<div id="mobile-drawer"[\s\S]*?<\/nav>\s*<\/div>\s*<\/div>/, newDrawer);

        fs.writeFileSync(filePath, content, 'utf-8');
        console.log('Updated ' + file);
    });
} else {
    console.log('Could not find header or drawer in index.html');
}
