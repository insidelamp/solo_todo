import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Moon from "../img/moon-g4a048f6f2_640.jpg";
import ToDo from "../components/ToDo";
import useFetch from "../CutomComponent/useFetch";
import { fetchCreate } from "../api/api";

function ToDoList() {
  const [datas, isPending, error, refetch] = useFetch(
    "http://localhost:3001/memo/"
  );

  const [isOpen, setIsOpen] = useState(false);
  const [todoContent, setTodoContent] = useState("");
  const [todoTitle, setTodoTitle] = useState("");
  const [scroll, setScroll] = useState(false);

  const addTodo = () => {
    setIsOpen(!isOpen);
  };

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
          <ModalSpace
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ModalWriteTitles>ToDo 타이틀</ModalWriteTitles>
            <ModalWriteInput
              placeholder="타이틀을 작성해주세요!"
              onChange={(e) => setTodoTitle(e.target.value)}
            />
            <ModalWriteTitles>ToDo 콘텐츠</ModalWriteTitles>
            <ModalWriteInput
              placeholder="콘텐츠를 작성해주세요!"
              onChange={(e) => setTodoContent(e.target.value)}
            />
            <ModalSubmitBtn onClick={createSubmit}>제출</ModalSubmitBtn>
          </ModalSpace>
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
  opacity: 0.7;
  background-color: white;
  position: relative;
`;

const TodoTitle = styled.h2`
  width: 100%;
  height: 10%;
  border-bottom: 3px solid violet;
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

const ModalSpace = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 26%;
  height: 30%;
  top: 470px;
  background-color: white;
`;

const ModalWriteTitles = styled.h1``;

const ModalWriteInput = styled.input`
  width: 70%;
  height: 15%;
  font-size: 15px;
`;

const ModalSubmitBtn = styled.button`
  width: 20%;
  height: 10%;
  background-color: violet;
`;

export default ToDoList;
