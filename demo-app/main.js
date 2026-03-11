import { createApp } from '../packages/core/index.js';

const App = {
    data() {
        return {
            count: 0,
            color: '#6366f1',
            status: 'Framework Activo 🚀'
        };
    },
    render(h, state) {
        // Update document styles reactively
        const root = document.documentElement;
        root.style.setProperty('--primary', state.color);
        root.style.setProperty('--primary-glow', `${state.color}80`); // 50% opacity

        return h('div', { class: 'card' }, [
            h('h1', null, 'NeoJS Demo'),
            h('p', { class: 'subtitle' }, state.status),
            
            h('div', { class: 'control-group' }, [
                h('label', null, 'CONTADOR INTERACTIVO'),
                h('div', { class: 'counter-display' }, `${state.count}`),
                h('div', { class: 'btn-group' }, [
                    h('button', { onclick: () => state.count-- }, '-'),
                    h('button', { onclick: () => state.count++ }, '+'),
                    h('button', { 
                        style: 'background: rgba(255,255,255,0.1); box-shadow: none;',
                        onclick: () => state.count = 0 
                    }, 'Reset')
                ])
            ]),

            h('div', { class: 'control-group' }, [
                h('label', null, 'PERSONALIZACIÓN DE COLOR (REACTIVO)'),
                h('input', { 
                    type: 'color', 
                    value: state.color,
                    oninput: (e) => state.color = e.target.value
                })
            ]),

            h('div', { style: 'text-align: center; font-size: 0.8rem; color: #94a3b8; margin-top: 20px;' }, [
                'Construido con amor usando NeoJS v0.1.0'
            ])
        ]);
    }
};

createApp(App).mount('#app');
