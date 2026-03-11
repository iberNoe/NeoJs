/**
 * NeoJS CLI — createProject
 * 
 * Scaffolds a new NeoJS application.
 */

import fs from 'fs';
import path from 'path';

export function createProject(projectName) {
    const root = path.resolve(projectName);

    console.log(`Creating a new NeoJS app in ${root}...`);

    if (!fs.existsSync(root)) {
        fs.mkdirSync(root, { recursive: true });
    }

    // 1. Create directory structure
    const dirs = ['src', 'src/components', 'public'];
    dirs.forEach(dir => {
        const dirPath = path.join(root, dir);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
    });

    // 2. Create index.html
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="./src/main.js"></script>
</body>
</html>`;
    fs.writeFileSync(path.join(root, 'index.html'), htmlContent);

    // 3. Create src/main.js
    const mainJsContent = `import { createApp } from '../../packages/core/index.js';
import App from './App.js';

createApp(App).mount('#app');`;
    fs.writeFileSync(path.join(root, 'src', 'main.js'), mainJsContent);

    // 4. Create src/App.js
    const appJsContent = `export default {
  data() {
    return {
      title: 'Welcome to NeoJS',
      count: 0
    };
  },
  template: \`
    <div>
      <h1>{{title}}</h1>
      <p>Count: {{count}}</p>
      <button @click="count++">Increment</button>
    </div>
  \`
};`;
    fs.writeFileSync(path.join(root, 'src', 'App.js'), appJsContent);

    // 5. Create package.json
    const pkgJson = {
        name: projectName,
        version: '1.0.0',
        private: true,
        type: 'module'
    };
    fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(pkgJson, null, 2));

    console.log('Project created successfully!');
    console.log(`To start: \n  cd ${projectName}\n  node ../cli/index.js serve`);
}
