import { useCallback, useEffect, useState } from "react";

import { TodoList } from "./TodoList";

export const TodoApplication = props => {
  const [todoItems, setTodoItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    setIsLoading(true);

    fetch('http://localhost:3000/api/items')
      .then(res => res.json())
      .then(json => json.items)
      .then(items => {
        setIsLoading(false);
        setTodoItems(items);
      });
  }, []);

  const handleAddTodo = useCallback(() => {
    setIsLoading(true);

    fetch('http://localhost:3000/api/items', {
      method: 'POST',
      body: JSON.stringify({ item: newTodo})
    })
      .then(res => res.json())
      .then(json => json.items)
      .then(items => {
        setIsLoading(false);
        setTodoItems(items);
      });
  }, [newTodo]);

  return isLoading
    ? <h1>Loading</h1>
    : <>
        <h1>{props.title}</h1>
        <TodoList>
          {todoItems.map((item, i) => {
            return (
              <li key={item + i}>{item}</li>
            );
          })}
        </TodoList>
        <label htmlFor="NewTodo">Add a new todo</label>
        <input id="NewTodo" type="text" placeholder="Play Apex" onChange={e => setNewTodo(e.target.value)} />
        <button onClick={handleAddTodo}>ADD</button>
      </>
};
