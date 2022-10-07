import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Moon from "../img/moon-g4a048f6f2_640.jpg";
import ToDo from "../components/ToDo";
import useFetch from "../CutomComponent/useFetch";
import { fetchCreate, fetchGet } from "../api/api";

function ToDoList() {
  const [datas, isPending, error, refetch] = useFetch(
    "http://localhost:3001/memo/"
  );
  // const [date, setDate] = useState("");
  // console.log(date);
  const [isOpen, setIsOpen] = useState(false);
  const [todoContent, setTodoContent] = useState("");
  const [todoTitle, setTodoTitle] = useState("");
  console.log(datas);
  const addTodo = () => {
    setIsOpen(!isOpen);
  };
  // useEffect(() => {
  //   fetch("http://localhost:3001/memo/")
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw Error("could not fetch the data for that resource");
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setDate(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error", error);
  //     });
  // }, [date]);

  const createSubmit = () => {
    const data = {
      title: todoTitle,
      body: todoContent,
      nowYear:
        new Date().getFullYear() +
        "." +
        new Date().getDate() +
        "." +
        new Date().getDay(),
      nowDate: new Date().toLocaleTimeString(),
    };
    fetchCreate("http://localhost:3001/memo/", data);
    addTodo();
    refetch();
  };

  return (
    <MainTodo>
      <NoneSpace />
      {isOpen ? (
        <TodoContentsMain onClick={addTodo}>
          <TodoTitle>MyToDo</TodoTitle>
          <ToDo datas={datas} />
          <CreateModal
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h2>ToDo 타이틀</h2>
            <input
              placeholder="타이틀을 작성해주세요!"
              onChange={(e) => setTodoTitle(e.target.value)}
            />
            <h2>ToDo 콘텐츠</h2>
            <input
              placeholder="콘텐츠를 작성해주세요!"
              onChange={(e) => setTodoContent(e.target.value)}
            />
            <button onClick={createSubmit}>제출</button>
          </CreateModal>
          <Footer />
        </TodoContentsMain>
      ) : (
        <TodoContentsMain>
          <TodoTitle>MyToDo</TodoTitle>
          <ToDo datas={datas} refetch={refetch} />
          <CreateToDo onClick={addTodo}>추가</CreateToDo>
          <Footer />
        </TodoContentsMain>
      )}

      <NoneSpace />
    </MainTodo>
  );
}

const MainTodo = styled.div`
  width: 100%;
  height: 100vh;
  border: 1px solid red;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-image: url(${Moon});
  background-size: cover;
`;
const NoneSpace = styled.div`
  width: 33%;
  height: 100vh;
`;
const TodoContentsMain = styled.div`
  width: 33%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid blue;
  opacity: 0.7;
  background-color: white;
  position: relative;
`;

const TodoTitle = styled.h2`
  width: 100%;
  height: 10%;
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CreateToDo = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  bottom: 50px;
  right: 20px;
`;
const CreateModal = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  border: 1px solid blue;
  width: 33%;
  height: 30%;
  top: 425px;

  background-color: white;
`;

export default ToDoList;
