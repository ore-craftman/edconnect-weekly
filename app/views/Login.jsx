import React, { useState } from "react";
import Layout from "./shared/Layout";
import { Form } from "react-bootstrap";
// import { useHistory } from "react-router-dom";

const Login = ({ error, userInstance }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <Layout userInstance={userInstance}>
      <>
        <section className="w-75 mx-auto py-5">
          {error.length > 0 ? (
            <div className="alert alert-danger">
              {error.map((err) => (
                <p key={err}>{err}</p>
              ))}
            </div>
          ) : null}

          <h1 className="my-4">Login</h1>

          <Form method="POST" action="login" id="loginForm">
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
