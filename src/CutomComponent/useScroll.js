import { useEffect, useState } from "react";

const useScroll = () => {
  const [click, setClick] = useState(0);
  const [down, setDown] = useState(false);

  const clickUp = () => {
    setClick(Date.now());
    setDown(true);
  };
  const clickDown = () => {
    setClick(Date.now());
    setDown(false);
  };

  useEffect(
    (e) => {
      if (down === true) {
        console.log(e);
        window.scrollTo(0, 0);
      } else if (down === false) {
        window.scrollTo(100, 0);
      }
    },
    [click]
  );
  return [clickUp, clickDown];
};

export default useScroll;

//https://velog.io/@devstefancho/react-scroll-event-5e1vuub9
