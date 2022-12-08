import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import styled from "styled-components";
import { loginService } from "../services";
import ReactLoading from "react-loading";
import Keyboard from "./keyboard";

const AuthorizedForm = ({
  setConfirmModalStatus,
  setAuthorizedModalStatus,
  setUser,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmit, setSubmit] = useState(false);
  const [usernameKeyboard, setUsernameKeyboard] = useState(false);
  const [passwordKeyboard, setPasswordKeyboard] = useState(false);

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
    onError: (error) => {
      setSubmit(false);
      const errorMsg = error.response.data.message;
      if (errorMsg === "Invalid username or password") {
        toast("شماره تلفن یا گذرواژه نادرست میباشد", { type: "error" });
      } else if (errorMsg === "User does not exist") {
        toast("کاربری با این شماره تلفن وجود ندارد", { type: "error" });
      } else {
        toast(Array.isArray(errorMsg) ? errorMsg.join(" - ") : errorMsg, {
          type: "error",
        });
      }
    },
  });

  const isValidMobileNumber = () => {
    return !!(username && username.match(/^(\+98?)?{?(0?9[0-9]{9,9}}?)$/));
  };

  const handleUsername = (e) => setUsername(e.currentTarget.value);
  const handlePassword = (e) => setPassword(e.currentTarget.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    if (isValidMobileNumber()) {
      await mutate({ username, password });
    } else {
      setSubmit(false);
    }
  };

  const usernamerRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    const handleEvent = (e) => {
      if (!usernamerRef.current?.contains(e.target)) {
        setUsernameKeyboard(false);
      }
      if (!passwordRef.current?.contains(e.target)) {
        setPasswordKeyboard(false);
      }
    };

    window.addEventListener("click", handleEvent, { capture: true });
    return () => {
      window.removeEventListener("click", handleEvent);
    };
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <div className="input-group">
        <label className="input-label">شماره موبایل</label>
        <div className="input-keyboard" ref={usernamerRef}>
          <input
            className="input"
            type="phone"
            placeholder="شماره تلفن خود را وارد کنید"
            value={username}
            onChange={handleUsername}
            onFocus={() => setUsernameKeyboard(true)}
            readOnly
          />
          <span
            className={`input-error ${
              isValidMobileNumber() ? "input-error-none" : ""
            }`}
          >
            {!isValidMobileNumber()
              ? "شماره موبایل خود را درست وارد کنید"
              : "NO Error"}
          </span>
          {usernameKeyboard && (
            <Keyboard
              setValue={setUsername}
              isOpen={usernameKeyboard}
              setOpen={setUsernameKeyboard}
            />
          )}
        </div>
      </div>
      <div className="input-group">
        <label className="input-label">گذرواژه</label>
        <div className="input-keyboard" ref={passwordRef}>
          <input
            className="input"
            type="password"
            placeholder="گذرواژه خود را وارد کنید"
            value={password}
            onChange={handlePassword}
            onFocus={() => setPasswordKeyboard(true)}
            readOnly
          />
          {passwordKeyboard && (
            <Keyboard
              setValue={setPassword}
              isOpen={passwordKeyboard}
              setOpen={setPasswordKeyboard}
            />
          )}
          <span className="input-error input-error-none">{" No Error  "}</span>
        </div>
      </div>
      <button
        {...(isSubmit ? { disabled: true } : {})}
        disabled={isSubmit}
        className="btn"
        type="submit"
      >
        {isLoading ? (
          <div className="loading">
            <ReactLoading height="20px" width="20px" type="spin" />
          </div>
        ) : (
          "ورود"
        )}
      </button>
    </Form>
  );
};

export default AuthorizedForm;

const Form = styled("form")(() => ({
  "& .loading": {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ".input": {
    height: "40px",
    marginTop: "10px",
    paddingInline: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
    "&-keyboard": {
      display: "flex",
      flexDirection: "column",
      position: "relative",
    },
    "&::placeholder": {
      color: "#ccc",
    },
    "&-group": {
      display: "flex",
      flexDirection: "column",
      marginBottom: "10px",
      position: "relative",
    },
    "&-error": {
      fontSize: "12px",
      marginTop: "4px",
      color: "red",
      "&-none": {
        opacity: 0,
        pointerEvent: "default",
        userSelect: "none",
      },
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
