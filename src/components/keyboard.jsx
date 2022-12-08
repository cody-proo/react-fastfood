import { useEffect, useRef } from "react";
import styled from "styled-components";
import { BiCheck, BiExit } from "react-icons/bi";

const Container = styled("div")(() => ({
  position: "absolute",
  bottom: -220,
  left: "50%",
  transform: "translateX(-50%)",
  width: "200px",
  background: "#fff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999999,
  border: "1px solid #eee",
  direction: "ltr",
  flexWrap: "wrap",
  "@media(max-width: 470px)": {
    bottom: -220,
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
    borderLeft: "unset",
    "&:nth-child(3n)": {
      borderRight: "unset",
    },
    "&:nth-child(1), &:nth-child(2), &:nth-child(3)": {
      borderTop: "unset",
    },
    "&:nth-child(7), &:nth-child(8), &:nth-child(9)": {
      borderTop: "unset",
    },
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
        <BiExit color="red" fontSize={30} />
      </div>
      <div
        className="item"
        onClick={() => {
          setOpen(false);
        }}
      >
        <BiCheck color="green" fontSize={30} />
      </div>
    </Container>
  );
};

export default Keyboard;
