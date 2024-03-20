import "./App.css";
import Container from "@mui/material/Container";
import Todos from "./Componets/Todos/Todos";
import { MyContext } from "./Context/Context";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
function App() {
  const [todos, setTodos] = useState([
    {
      id: uuidv4(),
      title: "",
      details: "",
      isCompleted: false,
    },
  ]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Container maxWidth="sm">
        <MyContext.Provider value={{ todos: todos, setTodos: setTodos }}>
          <Todos />
        </MyContext.Provider>
      </Container>
    </div>
  );
}

export default App;
