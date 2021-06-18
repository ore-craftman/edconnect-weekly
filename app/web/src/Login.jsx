import React, { useState } from "react";
import Layout from "./shared/Layout";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clientError, setClientError] = useState(false);

  const formChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  let history = useHistory();
  const loginHandler = (e) => {
    e.preventDefault();

    let loginCredentials = {
      email: email,
      password: password,
    };
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginCredentials),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          setClientError(true);
        }
      })
      .then((response) => {
        let cookieValue = encodeURIComponent(response.data.id);
        let maxAge = 60 * 60 * 24 * 7;
        document.cookie = `uid=${cookieValue}; path=/; max-age=${maxAge}`;
        history.push("/");
      })
      .catch((err) => {
        console.error(`USER CREDENTIALS POST ERROR ${err.message}`);
      });
  };

  return (
    <Layout>
      <>
        <section className="w-75 mx-auto py-5">
          {clientError && (
            <div className="alert alert-danger">
              <p>Invalid email/password</p>
            </div>
          )}

          <h1 className="my-4">Login</h1>

          <Form onSubmit={loginHandler}>
            <Form.Group controlId="email">
              <Form.Label>Email Address:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={formChangeHandler}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={formChangeHandler}
              />
            </Form.Group>

            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </Form>
        </section>
      </>
    </Layout>
  );
};

export default Login;
