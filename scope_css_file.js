const fs = require('fs');

const cssPath = 'c:\\Users\\nikhi\\OneDrive\\Desktop\\Internship-MERN\\frontend\\src\\vendor-registration.css';
let content = fs.readFileSync(cssPath, 'utf8');

// Scoping global HTML and Body resets
content = content.replace(/html\s*\{/g, '.vendor-planning-scope-root {');
content = content.replace(/body\s*\{/g, '.vendor-planning-scope {');
content = content.replace(/h1,\s*h2,\s*h3,\s*h4,\s*h5,\s*h6\s*\{/g, '.vendor-planning-scope h1, .vendor-planning-scope h2, .vendor-planning-scope h3, .vendor-planning-scope h4, .vendor-planning-scope h5, .vendor-planning-scope h6 {');
content = content.replace(/a\s*\{/g, '.vendor-planning-scope a {');
content = content.replace(/ul,\s*ol\s*\{/g, '.vendor-planning-scope ul, .vendor-planning-scope ol {');
content = content.replace(/img\s*\{/g, '.vendor-planning-scope img {');

fs.writeFileSync(cssPath, content, 'utf8');
console.log('Scoped vendor-registration.css global resets.');
