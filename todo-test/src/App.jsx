// src/App.jsx

import { useState, useEffect } from "react";
import {
  addTodo,
  getTodos,
  updateTodo,
  deleteTodo
} from "./lib/firebase";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [due, setDue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editId, setEditId] = useState(null); // 수정 중인 항목 ID

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodoList(data);
  };

  const handleSubmit = async () => {
    if (!title || !detail || !due) {
      alert("모든 항목을 입력하세요.");
      return;
    }

    if (editId) {
      await updateTodo(editId, { title, detail, due });
      alert("할 일이 수정되었습니다.");
      setEditId(null);
    } else {
      await addTodo({ title, detail, due });
      alert("할 일이 추가되었습니다.");
    }

    setTitle("");
    setDetail("");
    setDue("");
    fetchTodos();
  };

  const handleEdit = (todo) => {
    setTitle(todo.title);
    setDetail(todo.detail);
    setDue(todo.due);
    setEditId(todo.id); // 수정 모드로 전환
  };

  const handleDelete = async (id) => {
    if (window.confirm("정말 삭제할까요?")) {
      await deleteTodo(id);
      fetchTodos();
    }
  };

  return (
    <div className="todo-container">
      <div className="todo-top">
        <h1>🌸Todo🌸</h1>
        {/* 입력폼 */}
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="제목"
          className="todo-input"
        /><br />
        <textarea
          value={detail}
          onChange={e => setDetail(e.target.value)}
          placeholder="세부사항"
          rows={3}
          className="todo-input"
        /><br />
        <input
          type="date"
          value={due}
          onChange={e => setDue(e.target.value)}
          className="todo-input"
        /><br />
        <button onClick={handleSubmit} className="todo-button">
          {editId ? "수정 완료" : "할 일 추가"}
        </button>
      </div>
      <div className="todo-bottom">
        <h2>할 일 목록</h2>
        {todoList.length === 0 ? (
          <p>등록된 할 일이 없습니다.</p>
        ) : (
          <ul>
            {todoList.map(todo => (
              <li key={todo.id} className="todo-item">
                <strong>{todo.title}</strong> ({todo.due})<br />
                <small>{todo.detail}</small><br />
                <button onClick={() => handleEdit(todo)} className="todo-button" style={{ marginRight: "0.5rem" }}>수정</button>
                <button onClick={() => handleDelete(todo.id)} className="todo-button">삭제</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
