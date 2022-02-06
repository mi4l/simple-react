import express from 'express';

const PORT = process.env.PORT || 3000;
const app = express();

class TodoList {
  #state = {
    items: []
  };

  #setState(updater) {
    updater(this.#state);
  }

  constructor(items) {
    this.#state.items = items;
  }

  addItem(item) {
    this.#setState(state => {
      item && state.items.push(item);

      return state;
    });
  }

  getItems() {
    return this.#state.items;
  }
}

const todoList = new TodoList([]);

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1234');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');

  next();
});

app.use(express.json());

app.get('/api/items', (_, res) => {
  res.json({
    items: todoList.getItems()
  });
});

app.post('/api/items', (req, res) => {
  todoList.addItem(req.body.item);

  res.json({
    items: todoList.getItems()
  });
});

app.listen(PORT, () => console.log(`Listening at ${PORT}`));
