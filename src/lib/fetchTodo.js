import axios from "axios";

export async function getTodos() {
  const response = await fetch("http://localhost:3000/api/todo", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const todos = await response.json();
  return todos;
}

export async function addTodo(todo) {
  const response = await fetch("http://localhost:3000/api/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const data = await response.json();
  return data;
}

export async function deleteTodo(id) {
  const response = await fetch(`http://localhost:3000/api/todo/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function updateTodo({ id, todo, completed }) {
  const response = await axios.put(
    `http://localhost:3000/api/todo/update/${id}`,
    {
      completed,
    }
  );

  return response;
}
