import React from "react";
import AddToDo from "./components/AddToDo";
import {BrowserRouter as Router,Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
        <div>
            <Routes>
                <Route path="/addTodo" exact element={<AddToDo/>}></Route>
            </Routes>
        </div>
    </Router>
  );
}

export default App;
