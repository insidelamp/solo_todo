import React, { useState } from "react";
import styled from "styled-components";
import { fetchDelete, fetchPatch } from "../api/api";
function ToDo({ datas, refetch }) {
  const [updataModal, setUpdataModal] = useState(false);
  const [updataTitle, setUpdataTitle] = useState("");
  const [updataContent, setUpdataContent] = useState("");
  const [upId, setUpId] = useState("");

  const updateToDo = () => {
    let now = new Date();
    let nowYear = now.getFullYear(); // 년
    let nowMonth = now.getMonth() + 1; // 월
    let nowDate = now.getDate(); // 월
    let filterData = datas.filter((el) => el.id === upId);
    let fetchData = {
      id: filterData.id,
      title: updataTitle,
      body: updataContent,
      nowYear: nowYear + "." + nowMonth + "." + nowDate,
      nowDate: new Date().toLocaleTimeString(),
    };
    fetchPatch(`http://localhost:3001/memo/`, upId, fetchData);
  };
  const deleteToDo = (id) => {
    fetchDelete("http://localhost:3001/memo/", id);
    refetch();
  };

  const updateModal = (id) => {
    setUpdataModal(!updataModal);
    setUpId(id);
    refetch();
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
                <ToDoDateSpace>{data.nowYear}</ToDoDateSpace>
                <ToDoDateSpace>{data.nowDate}</ToDoDateSpace>
                <ToDoBtnInteraction>
                  <ToDoBtn onClick={updateModal}>수정</ToDoBtn>
                  <ToDoBtn onClick={deleteToDo}>삭제</ToDoBtn>
                </ToDoBtnInteraction>
              </ToDoBtnSpace>
            </ToDoSpaceContents>
          ))}
          <ModalSpace onClick={(e) => e.stopPropagation()}>
            <ModalWriteTitles>수정될 ToDo 타이틀</ModalWriteTitles>
            <ModalWriteInput
              placeholder="수정할 타이틀을 작성해주세요!"
              onChange={(e) => setUpdataTitle(e.target.value)}
            />
            <ModalWriteTitles>수정될 ToDo 콘텐츠</ModalWriteTitles>
            <ModalWriteInput
              placeholder="수정할 콘텐츠를 작성해주세요!"
              onChange={(e) => setUpdataContent(e.target.value)}
            />
            <ModalSubmitBtn
              onClick={() => {
                updateToDo();
                updateModal();
              }}
            >
              제출
            </ModalSubmitBtn>
          </ModalSpace>
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
                <ToDoDateSpace>{data.nowYear}</ToDoDateSpace>
                <ToDoDateSpace>{data.nowDate}</ToDoDateSpace>
                <ToDoBtnInteraction>
                  <ToDoBtn onClick={() => updateModal(data.id)}>수정</ToDoBtn>
                  <ToDoBtn onClick={() => deleteToDo(data.id)}>삭제</ToDoBtn>
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
  width: 90%;
  height: 100%;
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
`;
const ToDoSpaceContent = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ToDoSpaceContents = styled.div`
  border: 3px solid blue;
  border-radius: 5px;
  width: 90%;
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ToDoContentTitle = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  margin-left: 5px;
  height: 40%;
  width: 95%;
  color: blue;
  padding: 5px 0px 0px 5px;
`;
const ToDoContentBody = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  margin-left: 5px;
  height: 40%;
  width: 95%;
  color: blue;
  padding: 5px 0px 0px 5px;
`;
const ToDoBtnSpace = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35%;
  height: 100%;
`;
const ToDoDateSpace = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:nth-child(1) {
    margin: 5px 0px;
  }
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

const ModalSpace = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border: 1px solid blue;
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

export default ToDo;

// 추가 모달
// 클릭 삭제
// 수정 모달
