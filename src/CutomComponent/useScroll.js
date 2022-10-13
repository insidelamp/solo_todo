import { useState, useEffect } from "react";

// 적용된 컴포넌트 진입시 페이지 맨 위로 스크롤해주는 커스텀 훅 예제입니다.

const useScrollTop = () => {
  const [click, setClick] = useState(false);
  console.log(click);
  useEffect(() => {
    if (click === true) {
      window.scrollTo(0, 0);
    }
  }, [click]);
  return [setClick];
};

export default useScrollTop;
