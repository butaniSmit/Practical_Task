import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { LoginDetails } from "../../src/pages/api/AxiosRequest";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import LoadingPage from "@/components/loadingPage";
import Link from "next/link";
import LoginLayout from "@/components/common/layout/login";
import Cookies from "js-cookie";
const Login = () => {
  const router = useRouter();
  const [EmailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const [username, setUsername] = useState("smit@yopmail.com");
  const [password, setPassword] = useState("abcd@1234");
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  function onChangeUsername(e) {
    setUsername(e.target.value);
  }
  function onChangePassword(e) {
    setPassword(e.target.value);
  }

  let handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: username,
      password: password,
    };
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      setIsLoading(true);
      return LoginDetails(data)
        .then((resp) => {
          console.log(resp);
          router.push("/");
          toast.success(resp.data.message);
          setIsLoading(false);
          const day = resp.data.tokenexpires * 1;
          Cookies.set("loginid", resp.data.user._id, { expires: day });
          Cookies.set("nodejstoken", resp.data.token, { expires: day });
          setEmailError("");
          setPasswordError("");
          setError("");
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          toast.error(error?.response?.data.message);
        });
    }
  };
  return (
    <>
      <LoginLayout>
        <section className="ftco-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6 text-center mb-5 mt-5">
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-7 col-lg-5">
                <div className="login-wrap p-4 p-md-5">
                  <div className="icon d-flex align-items-center justify-content-center">
                    <span className="fa fa-user-o" />
                  </div>
                  <div className=" text-center mb-3">
                    <h2 className="heading-section">Login </h2>
                  </div>
                  <Form
                    onSubmit={handleSubmit}
                    noValidate
                    validated={validated}
                    className="login-form"
                  >
                    {isLoading ? <LoadingPage /> : null}
                    <Form.Group
                      as={Col}
                      md="4"
                      controlId="exampleForm.ControlInput1"
                      className="col-12 col-lg-12 my-2 mb-3 d-flex"
                    >
                      <InputGroup>
                        <Form.Control
                          required
                          className="rounded-left login-form-control"
                          type="text"
                          name="email"
                          placeholder="Email"
                          value={username}
                          onChange={onChangeUsername}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          <label className="validation-invalid-label">
                            Email is required
                          </label>
                        </Form.Control.Feedback>
                      </InputGroup>
                      {EmailError ? (
                        <label className="error-msg">{EmailError}</label>
                      ) : null}
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="3"
                      controlId="validationCustom01"
                      className="col-12 col-lg-12 my-2 mb-3 d-flex"
                    >
                      {/* <Form.Label>password</Form.Label> */}
                      <InputGroup>
                        <Form.Control
                          required
                          className="rounded-left login-form-control"
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={password}
                          onChange={onChangePassword}
                        />
                        <Form.Control.Feedback type="invalid">
                          <label className="validation-invalid-label">
                            password is required
                          </label>
                        </Form.Control.Feedback>
                      </InputGroup>
                      {PasswordError ? (
                        <label className="error-msg">{PasswordError}</label>
                      ) : null}
                    </Form.Group>
                    {error ? (
                      <label className="error-msg mt-0">{error}</label>
                    ) : null}
                    <div className="form-group">
                      <button
                        className="form-control login-form-control btn btn-login btn-primary rounded submit px-3"
                        type="submit"
                      >
                        Login
                      </button>
                    </div>
                    <div className="text-center justify-content-center">
                      <p className="small fw-bold mt-1 pt-1 mb-0">
                        Don't have an account?{" "}
                        <Link
                          className="btn-primary"
                          style={{ textDecoration: "none", cursor: "pointer" }}
                          href="/signup"
                        >
                          Register here
                        </Link>
                      </p>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </LoginLayout>
      {/* /main content */}
    </>
  );
};
export default Login;
