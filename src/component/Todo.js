import React, { useState } from "react";
import "../style.css";

const Todo = () => {
  const [data, setData] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // New state to track the index of the item being edited
  const [editData, setEditData] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  //To add new todo item to list
  const addTodoItems = () => {
    const newTodo = { text: data, completed: false };
    setTodoList((prev) => [...prev, newTodo]);
    setData("");
  };

  //To delete the item from the list
  const handleDelete = (index) => {
    let copyoftodoList = [...todoList];
    copyoftodoList.splice(index, 1);
    setTodoList(copyoftodoList);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditData(todoList[index].text);
    setIsEditing(true);
  };

  //To show that the task is completed
  const handleComplete = (index) => {
    let updatedTodoList = [...todoList];
    updatedTodoList[index].completed = !updatedTodoList[index].completed;
    setTodoList(updatedTodoList);
  };

  // To edit, save and close the pop-up
  const handleSave = () => {
    let updatedTodoList = [...todoList];
    updatedTodoList[editIndex].text = editData;
    setTodoList(updatedTodoList);
    setIsEditing(false);
    setEditIndex(null);
  };

  // To cancel the edit and close the pop-up
  const handleCancel = () => {
    setIsEditing(false); // Close the pop-up
    setEditIndex(null); // Reset the edit index
  };

  return (
    <>
      <div className={`todo-container ${isEditing ? "blur" : ""}`}>
        <h1>Todo List</h1>
        <input
          type={"text"}
          placeholder="New Todo"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <button className="buttons" onClick={addTodoItems}>
          {" "}
          Add
        </button>

        <br />
        <br />
        <div>
          <ul className="todo-list">
            {todoList?.map((item, index) => (
              <div>
                <li
                  className={`todo-item ${item.completed ? "completed" : ""}`}
                >
                  <span>
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => handleComplete(index)}
                    />
                    {item.text}
                  </span>
                  <div className="buttons">
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(index)}
                    >
                      {" "}
                      Delete
                    </button>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(index)}
                    >
                      {" "}
                      Edit
                    </button>
                  </div>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>

      {isEditing && (
        <>
          <div className="overlay"></div> {/* Semi-transparent overlay */}
          <div className="edit-popup">
            <div className="edit-content">
              <h3>Edit Todo</h3>
              <input
                type="text"
                value={editData}
                onChange={(e) => setEditData(e.target.value)}
              />
              <div className="edit-buttons">
                <button className="save-btn" onClick={handleSave}>
                  Save
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Todo;
