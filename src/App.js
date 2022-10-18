import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const ToDoList = lazy(() => import("./pages/ToDoList"));
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading....!</div>}>
        <Routes>
          <Route path="/" element={<ToDoList />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
