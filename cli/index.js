#!/usr/bin/env node

/**
 * NeoJS CLI Entry
 */

import { createProject } from './createProject.js';
import { startDevServer } from './devServer.js';

const args = process.argv.slice(2);
const command = args[0];

if (!command) {
    console.log('Usage: neojs <command> [args]');
    console.log('Commands:');
    console.log('  create <project-name>  - Create a new NeoJS project');
    console.log('  serve                  - Start the development server');
    process.exit(1);
}

switch (command) {
    case 'create':
        const name = args[1];
        if (!name) {
            console.error('Please specify a project name');
            process.exit(1);
        }
        createProject(name);
        break;

    case 'serve':
        startDevServer();
        break;

    default:
        console.error(`Unknown command: ${command}`);
        process.exit(1);
}
