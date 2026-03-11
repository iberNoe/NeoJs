export default {
  data() {
    return {
      title: 'Welcome to NeoJS',
      count: 0
    };
  },
  template: `
    <div>
      <h1>{{title}}</h1>
      <p>Count: {{count}}</p>
      <button @click="count++">Increment</button>
    </div>
  `
};