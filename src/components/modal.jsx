import styled from "styled-components";
import { BsX } from "react-icons/bs";

const Modal = ({ children, title, onClose, isOpen }) => {
  const onPreventClose = (e) => e.stopPropagation();
  const modalStatusClass = isOpen ? "" : "close";

  return (
    <Container className={modalStatusClass}>
      <div onClick={onPreventClose} className="content">
        <div className="content-header">
          <h1 className="content-title">{title}</h1>
          <div onClick={onClose} className="content-close">
            <BsX />
          </div>
        </div>
        {children}
      </div>
    </Container>
  );
};

export default Modal;

const Container = styled("div")(() => ({
  transition: "0.5s all",
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,.6)",
  zIndex: 99999,

  "&.close": {
    width: 0,
    zIndex: -9999,
    pointerEvent: "none",
    opacity: 0,
    overflow: "hidden",
  },

  "& .content": {
    maxHeight: "600px",
    width: "90%",
    maxWidth: "400px",
    background: "#fff",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 0 5px 1px rgba(0,0,0,.3)",
    "&-header": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "2px solid #eee",
      paddingBottom: "10px",
      marginBottom: "15px",
    },
    "&-title": {
      fontSize: "16px",
    },
    "&-close": {
      cursor: "pointer",
      height: "40px",
      width: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "25px",
    },
  },
}));
