import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const ToDoList = lazy(() => import("./pages/ToDoList"));
const TodoLogin = lazy(() => import("./pages/TodoLogin"));
const TodoSignup = lazy(() => import("./pages/TodoSignup"));
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading....!</div>}>
        <Routes>
          <Route path="/" element={<ToDoList />} />
          <Route path="/singup" element={<TodoSignup />} />
          <Route path="/login" element={<TodoLogin />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
