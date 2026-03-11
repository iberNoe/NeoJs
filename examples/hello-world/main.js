import { createApp } from '../../packages/core/index.js';

const App = {
    data() {
        return { count: 0 };
    },
    render(h, state) {
        return h('div', { style: 'text-align: center; margin-top: 50px;' }, [
            h('h1', null, 'NeoJS Simple Counter'),
            h('p', { style: 'font-size: 2rem;' }, `Count: ${state.count}`),
            h('button', {
                style: 'padding: 10px 20px; font-size: 1rem; cursor: pointer;',
                onclick: () => state.count++
            }, 'Click me!')
        ]);
    }
};

createApp(App).mount('#app');
