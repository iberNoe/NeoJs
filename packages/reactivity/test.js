/**
 * NeoJS Reactivity Test (Node.js)
 */

import { reactive, effect } from './index.js';

let dummy;
const obj = reactive({ count: 0 });

effect(() => {
    dummy = obj.count;
});

console.log('--- NeoJS Reactivity Test ---');
console.log('Initial value:', dummy); // 0

obj.count = 1;
console.log('Updated value (1):', dummy); // 1

if (dummy === 1) {
    console.log('✅ PASS: Effect triggered on update');
} else {
    console.log('❌ FAIL: Effect not triggered');
    process.exit(1);
}

obj.count++;
console.log('Updated value (2):', dummy); // 2

if (dummy === 2) {
    console.log('✅ PASS: Effect triggered on increment');
} else {
    console.log('❌ FAIL: Effect not triggered');
    process.exit(1);
}

console.log('All reactivity tests passed!');
