const BASE_URL = "http://localhost:3000/";

//추가
export const fetchCreate = (url, data) => {
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error", error);
    });
};
//삭제
export const fetchDelete = (url, id) => {
  fetch(`${url}/${id}`, {
    method: "DELETE",
  })
    .then((data) => {
      console.log(data);
      // data.filter((el) => el.id == id);
    })
    .catch((error) => {
      console.error("Error", error);
    });
};
// 수정
export const fetchPatch = (url, id, data) => {
  fetch(`${url}${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "Application/json" },
    body: JSON.stringify(data),
  })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error", error);
    });
};
