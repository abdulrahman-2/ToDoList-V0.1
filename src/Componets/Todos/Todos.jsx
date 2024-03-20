// import Todo from "../Todo/Todo";
// import { useContext, useState, useEffect } from "react";
// import "./Todos.css";
// import { MyContext } from "../../Context/Context";
// import { v4 as uuidv4 } from "uuid";

// const Todos = () => {
//   const { todos, setTodos } = useContext(MyContext);
//   const [todoValues, setTodoValues] = useState({
//     title: "",
//     details: "",
//   });
//   const [allTodo, setAllTodo] = useState(false);
//   const [completedTodo, setCompletedTodo] = useState(false);
//   const [unCompletedTodo, setUnCompletedTodo] = useState(false);

//   let todosJsx = todos.map((todo) => {
//     return <Todo key={todo.id} todo={todo} />;
//   });

//   function showTodos() {
//     setAllTodo(true);
//   }

//   let completedTodosJsx = todos.map((todo) => {
//     if (todo.isCompleted) {
//       return <Todo key={todo.id} todo={todo} />;
//     } else {
//       return todo;
//     }
//   });

//   function showCompletedTodos() {
//     setCompletedTodo(true);
//   }

//   let unCompletedTodosJsx = todos.map((todo) => {
//     if (!todo.isCompleted) {
//       return <Todo key={todo.id} todo={todo} />;
//     } else {
//       return todo;
//     }
//   });

//   function showUnCompletedTodos() {
//     setUnCompletedTodo(true);
//   }

//   useEffect(() => {
//     const storageTodos = JSON.parse(localStorage.getItem("todos"));
//     setTodos(storageTodos);
//   }, []);

//   function addTodo() {
//     if (todoValues.title.trim() !== "") {
//       const updatedTodos = [
//         ...todos,
//         {
//           id: uuidv4(),
//           title: todoValues.title,
//           details: todoValues.details,
//           isCompleted: false,
//         },
//       ];
//       setTodos(updatedTodos);
//       localStorage.setItem("todos", JSON.stringify(updatedTodos));
//       setTodoValues({ title: "", details: "" }); // Clear input after adding task
//     }
//   }

//   return (
//     <div className="todo-list">
//       <h1>مهامي</h1>
//       <hr />
//       <ul>
//         <li onClick={showCompletedTodos}>الغير منجز</li>
//         <li onClick={showUnCompletedTodos}>المنجز</li>
//         <li onClick={showTodos}>الكل</li>
//       </ul>
//       <div className="todos-contaner">
//         {[{ todosJsx }, { completedTodosJsx }, { unCompletedTodosJsx }]}
//       </div>
//       <div className="add-todo">
//         <button onClick={addTodo}>اضافة</button>
//         <input
//           type="text"
//           value={todoValues.title}
//           onChange={(e) =>
//             setTodoValues({ ...todoValues, title: e.target.value })
//           }
//           placeholder="عنوان المهمة"
//         />
//         {/* <input
//           type="text"
//           value={todoValues.details}
//           onChange={(e) =>
//             setTodoValues({ ...todoValues, details: e.target.value })
//           }
//           placeholder="تفاصيل المهمة"
//         /> */}
//       </div>
//     </div>
//   );
// };

// export default Todos;

import Todo from "../Todo/Todo";
import { useContext, useState, useEffect } from "react";
import "./Todos.css";
import { MyContext } from "../../Context/Context";
import { v4 as uuidv4 } from "uuid";

const Todos = () => {
  const { todos, setTodos } = useContext(MyContext);
  const [todoValues, setTodoValues] = useState({
    title: "",
    details: "",
  });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    if (storageTodos) {
      setTodos(storageTodos);
    }
  }, [setTodos]);

  const addTodo = () => {
    if (todoValues.title.trim() !== "") {
      const updatedTodos = [
        ...todos,
        {
          id: uuidv4(),
          title: todoValues.title,
          details: todoValues.details,
          isCompleted: false,
        },
      ];
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setTodoValues({ title: "", details: "" }); // Clear input after adding task
    }
  };

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") {
      return todo.isCompleted;
    } else if (filter === "uncompleted") {
      return !todo.isCompleted;
    } else {
      return true; // Show all todos
    }
  });

  return (
    <div className="todo-list">
      <h1>مهامي</h1>
      <hr />
      <ul>
        <li
          className={filter === "uncompleted" ? "active" : ""}
          onClick={() => handleFilterChange("uncompleted")}
        >
          الغير منجز
        </li>
        <li
          className={filter === "completed" ? "active" : ""}
          onClick={() => handleFilterChange("completed")}
        >
          المنجز
        </li>
        <li
          className={filter === "all" ? "active" : ""}
          onClick={() => handleFilterChange("all")}
        >
          الكل
        </li>
      </ul>
      <div className="todos-container">
        {filteredTodos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </div>
      <div className="add-todo">
        <button onClick={addTodo}>اضافة</button>
        <input
          type="text"
          value={todoValues.title}
          onChange={(e) =>
            setTodoValues({ ...todoValues, title: e.target.value })
          }
          placeholder="عنوان المهمة"
        />
        {/* Uncomment below if you want to add details for each todo */}
        {/* <input
          type="text"
          value={todoValues.details}
          onChange={(e) =>
            setTodoValues({ ...todoValues, details: e.target.value })
          }
          placeholder="تفاصيل المهمة"
        /> */}
      </div>
    </div>
  );
};

export default Todos;
