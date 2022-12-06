import { useState } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import { loginService } from "../services";

const AuthorizedForm = ({
  setConfirmModalStatus,
  setAuthorizedModalStatus,
  setUser,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmit, setSubmit] = useState(false);

  const { isLoading, mutate } = useMutation("login", loginService, {
    onSuccess: (data) => {
      if (data?.accessToken) {
        window.localStorage.setItem("token", data?.accessToken);
      }
      if (data?.refreshToken) {
        window.localStorage.setItem("refreshToken", data?.refreshToken);
      }
      if (data?.user) {
        window.localStorage.setItem("user", JSON.stringify(data?.user));
      }
      setUser(data?.user);
      setAuthorizedModalStatus(false);
      setConfirmModalStatus(true);
      setSubmit(false);
    },
    onError: (data) => {
      setSubmit(false);
      console.log(data);
    },
  });

  const isValidMobileNumber = () => {
    return !!(username && username.match(/^(\+98?)?{?(0?9[0-9]{9,9}}?)$/));
  };

  const isPasswordValid = () => {
    return !!password;
  };

  const handleUsername = (e) => setUsername(e.currentTarget.value);
  const handlePassword = (e) => setPassword(e.currentTarget.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    console.log(isValidMobileNumber(), isPasswordValid());
    if (isValidMobileNumber() && isPasswordValid()) {
      await mutate({ username, password });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="input-group">
        <label className="input-label">شماره موبایل</label>
        <input
          className="input"
          type="text"
          placeholder="شماره تلفن خود را وارد کنید"
          value={username}
          onChange={handleUsername}
        />
        <span className="input-error">
          {isSubmit && !isValidMobileNumber()
            ? "شماره موبایل خود را درست وارد کنید"
            : ""}
        </span>
      </div>
      <div className="input-group">
        <label className="input-label">گذرواژه</label>
        <input
          className="input"
          type="password"
          placeholder="گذرواژه خود را وارد کنید"
          value={password}
          onChange={handlePassword}
        />
        <span className="input-error">
          {isSubmit && !isPasswordValid() ? "گذرواژه خود را وارد کنید" : ""}
        </span>
      </div>
      <button disabled={isSubmit} className="btn" type="submit">
        {isLoading ? "درحال پردازش" : "ورود"}
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
