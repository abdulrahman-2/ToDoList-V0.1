import { useState, useContext } from "react";
import PropTypes from "prop-types";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import UpdateModal from "../Models/UpdateModel/UpdateModel";
import DeleteModal from "../Models/DeleteModele/DeleteModel";
import "./Todo.css";
import { MyContext } from "../../Context/Context";

export default function Todo({ todo }) {
  const { todos, setTodos } = useContext(MyContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateTodoValue, setUpdateTodoValue] = useState({
    title: todo.title,
    details: todo.details,
  });

  // Function to handle checking the todo
  function handleCheckClick() {
    const completedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });

    setTodos(completedTodos);
    localStorage.setItem("todos", JSON.stringify(completedTodos));
  }

  // Function to update the todo
  function updateTodo() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return {
          ...t,
          title: updateTodoValue.title,
          details: updateTodoValue.details,
        };
      }
      return t;
    });

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowUpdateModal(false);
  }

  // Function to delete the todo
  function deleteTodo() {
    const prevTodo = todos.filter((t) => t.id !== todo.id);
    setTodos(prevTodo);
    localStorage.setItem("todos", JSON.stringify(prevTodo));
  }

  const style = {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    padding: "5px",
    marginRight: "5px",
    cursor: "pointer",
  };

  return (
    <>
      {showDeleteModal && (
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          deleteTodo={deleteTodo}
        />
      )}
      {showUpdateModal && (
        <UpdateModal
          updateTodoValue={updateTodoValue}
          setUpdateTodoValue={setUpdateTodoValue}
          setShowUpdateModal={setShowUpdateModal}
          updateTodo={updateTodo}
        />
      )}
      <div className="todo">
        <div className="tools">
          <DeleteIcon
            style={{ ...style, color: "#b23c17", border: "solid #b23c17 2px" }}
            onClick={() => setShowDeleteModal(true)}
          />
          <CreateIcon
            style={{ ...style, color: "#1769aa", border: "solid #1769aa 2px" }}
            onClick={() => setShowUpdateModal(true)}
          />
          <DoneIcon
            style={{
              ...style,
              color: todo.isCompleted ? "white" : "#8bc34a",
              background: todo.isCompleted ? "#8bc34a" : "white",
              border: "solid #8bc34a 2px",
            }}
            onClick={handleCheckClick}
          />
        </div>
        <div className="todo-info">
          <h3
            style={{
              textDecoration: todo.isCompleted ? "line-through" : "none",
            }}
          >
            {todo.title}
          </h3>
          <p>{todo.details}</p>
        </div>
      </div>
    </>
  );
}

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
};
