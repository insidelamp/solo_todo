import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchDelete, fetchPatch } from "../api/api";
function ToDo({ datas, todoContent, todoTitle }) {
  const [updataModal, setUpdataModal] = useState(false);
  const [updataTitle, setUpdataTitle] = useState("");
  const [updataContent, setUpdataContent] = useState("");

  const updateToDo = (e, id) => {
    // 수정 모달의 제출버튼에 먹일 함수
    e.preventDefault();
    console.log(e, id);
    let pachData = {
      id: id,
      title: updataTitle,
      body: updataContent,
      data: new Date().toLocaleTimeString(),
    };
    fetchPatch("http://localhost:3001/memo/", pachData);
  };
  const deleteToDo = (e) => {
    // 제거 버튼에 먹일 함수
    e.preventDefault();
    // fetchDelete;
  };

  const updateModal = () => {
    // 수정버튼에 먹일 함수
    setUpdataModal(!updataModal);
  };
  return (
    <>
      {updataModal ? (
        <ToDoSpace onClick={updateModal}>
          {datas?.map((data) => (
            <ToDoSpaceContents key={data.id}>
              <ToDoSpaceContent>
                <ToDoContentTitle>{data.title}</ToDoContentTitle>
                <ToDoContentBody>{data.body}</ToDoContentBody>
              </ToDoSpaceContent>
              <ToDoBtnSpace>
                <ToDoDateSpace>{data.data}</ToDoDateSpace>
                <ToDoBtnInteraction>
                  <ToDoBtn
                    onClick={(e, id) => {
                      updateModal(e, id);
                    }}
                  >
                    수정
                  </ToDoBtn>
                  <ToDoBtn onClick={deleteToDo}>삭제</ToDoBtn>
                </ToDoBtnInteraction>
              </ToDoBtnSpace>
            </ToDoSpaceContents>
          ))}
          <CreateModal onClick={(e) => e.stopPropagation()}>
            <h2>수정될 ToDo 타이틀</h2>
            <input
              placeholder="수정할 타이틀을 작성해주세요!"
              onChange={(e) => setUpdataTitle(e.target.value)}
            />
            <h2>수정될 ToDo 콘텐츠</h2>
            <input
              placeholder="수정할 콘텐츠를 작성해주세요!"
              onChange={(e) => setUpdataContent(e.target.value)}
            />
            <button onClick={updateToDo}>제출</button>
          </CreateModal>
        </ToDoSpace>
      ) : (
        <ToDoSpace>
          {datas?.map((data) => (
            <ToDoSpaceContents key={data.id}>
              <ToDoSpaceContent>
                <ToDoContentTitle>{data.title}</ToDoContentTitle>
                <ToDoContentBody>{data.body}</ToDoContentBody>
              </ToDoSpaceContent>
              <ToDoBtnSpace>
                <ToDoDateSpace>{data.data}</ToDoDateSpace>
                <ToDoBtnInteraction>
                  <ToDoBtn
                    onClick={(e, id) => {
                      updateModal(e, id);
                    }}
                  >
                    수정
                  </ToDoBtn>
                  <ToDoBtn onClick={deleteToDo}>삭제</ToDoBtn>
                </ToDoBtnInteraction>
              </ToDoBtnSpace>
            </ToDoSpaceContents>
          ))}
        </ToDoSpace>
      )}
    </>
  );
}

const ToDoSpace = styled.div`
  border: 5px solid red;
  width: 80%;
  height: 100%;
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  align-items: center;
`;
const ToDoSpaceContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ToDoSpaceContents = styled.div`
  border: 1px solid blue;
  width: 80%;
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ToDoContentTitle = styled.div`
  border: 1px solid blue;
  width: 100%;
  color: blue;
`;
const ToDoContentBody = styled.div`
  border: 1px solid blue;
  width: 100%;
  font-weight: bolder;
`;
const ToDoBtnSpace = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  height: 100%;
`;
const ToDoDateSpace = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ToDoBtnInteraction = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 50%;
  margin-top: 5px;
`;

const ToDoBtn = styled.button`
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%;
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

export default ToDo;

// 추가 모달
// 클릭 삭제
// 수정 모달
