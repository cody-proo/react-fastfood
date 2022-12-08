import { useEffect, useRef } from "react";
import styled from "styled-components";
import { BiExit } from "react-icons/bi";

const Container = styled("div")(() => ({
  position: "absolute",
  bottom: -100,
  left: "50%",
  transform: "translateX(-50%)",
  width: "100%",
  background: "#fff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999999,
  flexWrap: "wrap",
  "@media(max-width: 470px)": {
    bottom: -160,
  },
  "&.close": {
    display: "none",
    pointerEvent: "none",
  },
  ".item": {
    height: "60px",
    width: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #eee",
    cursor: "pointer",
    fontSize: "20px",
    userSelect: "none",
  },
}));

const Keyboard = ({ isOpen, setOpen, setValue }) => {
  const keyboardClass = isOpen ? "" : "close";
  const containerRef = useRef(null);
  useEffect(() => {
    const handleClick = (e) => {
      if (!containerRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <Container ref={containerRef} className={keyboardClass}>
      {new Array(10).fill(0).map((e, index) => (
        <div
          onClick={() => setValue((prevValue) => prevValue + index)}
          className="item"
        >
          {index}
        </div>
      ))}
      <div
        className="item"
        onClick={() => {
          setValue((prev) => {
            const state = [...prev];
            state.splice(state.length - 1);
            return state.join("");
          });
        }}
      >
        <BiExit fontSize={30} />
      </div>
    </Container>
  );
};

export default Keyboard;
