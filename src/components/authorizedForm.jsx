import styled from "styled-components";

const AuthorizedForm = ({
  setConfirmModalStatus,
  setAuthorizedModalStatus,
}) => {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        setAuthorizedModalStatus(false)
        setConfirmModalStatus(true);
      }}
    >
      <div className="input-group">
        <label className="input-label">شماره موبایل</label>
        <input
          className="input"
          type="text"
          placeholder="شماره تلفن خود را وارد کنید"
        />
        <span className="input-error">شماره موبایل خود را درست وارد کنید</span>
      </div>
      <div className="input-group">
        <label className="input-label">گذرواژه</label>
        <input
          className="input"
          type="password"
          placeholder="گذرواژه خود را وارد کنید"
        />
        <span className="input-error">گذرواژه خود را وارد کنید</span>
      </div>
      <button className="btn" type="submit">
        ورود
      </button>
    </Form>
  );
};

export default AuthorizedForm;

const Form = styled("form")(() => ({
  ".input": {
    height: "40px",
    marginTop: "10px",
    paddingInline: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
    "&::placeholder": {
      color: "#ccc",
    },
    "&-group": {
      display: "flex",
      flexDirection: "column",
      marginBottom: "10px",
    },
    "&-error": {
      fontSize: "12px",
      marginTop: "4px",
      color: "red",
    },
  },
  ".btn": {
    width: "100%",
    height: "40px",
    marginTop: "10px",
    fontSize: "15px",
    backgroundColor: "#0268ff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  },
}));
