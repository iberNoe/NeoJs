export default {
  data() {
    return {
      title: 'NeoJS Tasks',
      newTask: '',
      todos: [
        { id: 1, text: 'Aprender Reactivity', done: true },
        { id: 2, text: 'Construir un Virtual DOM', done: false }
      ]
    };
  },

  // Usamos una función render para mayor control en este caso de uso complejo
  // aunque el compilador de plantillas ya funciona para casos simples.
  render(h, state) {
    return h('div', { class: 'container' }, [
      h('h1', null, state.title),

      h('div', { class: 'input-group' }, [
        h('input', {
          placeholder: '¿Qué hay que hacer?',
          value: state.newTask,
          oninput: (e) => state.newTask = e.target.value
        }),
        h('button', {
          onclick: () => {
            if (state.newTask.trim()) {
              state.todos.push({
                id: Date.now(),
                text: state.newTask,
                done: false
              });
              state.newTask = '';
            }
          }
        }, 'Añadir')
      ]),

      h('ul', { class: 'todo-list' },
        state.todos.map(todo =>
          h('li', {
            class: todo.done ? 'completed' : '',
            onclick: () => todo.done = !todo.done
          }, todo.text)
        )
      ),

      h('p', { class: 'stats' },
        `Pendientes: ${state.todos.filter(t => !t.done).length}`
      )
    ]);
  }
};