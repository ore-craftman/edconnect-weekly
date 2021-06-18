import React, { useState, useEffect } from "react";
import Layout from "./shared/Layout";
import { Form, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [programs, setPrograms] = useState(null);

  useEffect(() => {
    fetch("/api/programs")
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(
            `GET PROGRAM LIST STATUS !200 but: ${response.status}`
          );
        }
      })
      .then((data) => {
        setPrograms(data);
      })
      .catch((err) => {
        console.error(`GET PROGRAM ERROR: ${err.message}`);
      });
  }, []);

  const [graduationYears, setGraduationYears] = useState(null);

  useEffect(() => {
    fetch("/api/graduationYears")
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(
            `GET GRADUATION YEARS STATUS !200 but: ${response.status}`
          );
        }
      })
      .then((data) => {
        setGraduationYears(data);
      })
      .catch((err) => {
        console.error(`GET GRADUATION YEARS ERROR: ${err.message}`);
      });
  }, []);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matricNumber, setMatricNumber] = useState("");
  const [selectedProgram, setSelctedProgram] = useState("Choose...");
  const [selectedGraduationYear, setselectedGraduationYear] =
    useState("Choose...");

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    if (name === "firstName") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "matricNumber") {
      setMatricNumber(value);
    } else if (name === "programList") {
      setSelctedProgram(value);
    } else if (name === "graduationList") {
      setselectedGraduationYear(value);
    }
  };

  let history = useHistory();
  const [signupErrors, setSignupErrors] = useState(null);
  const signupHandler = (e) => {
    e.preventDefault();
    let formDataObj = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
      matricNumber: matricNumber,
      program: selectedProgram,
      graduationYear: selectedGraduationYear,
    };

    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObj),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "ok") {
          let key = "uid";
          let cookieAge = 60 * 60 * 24 * 7;
          let value = encodeURIComponent(response.data.id);
          document.cookie = `${key}=${value}; max-age=${cookieAge}; path=/;`;
          history.push("/");
        } else {
          setSignupErrors(response.errors);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Layout>
      <>
        <section className="w-75 mx-auto py-5">
          {signupErrors && (
            <div className="alert alert-danger fade show" role="alert">
              {signupErrors.map((error) => {
                return <p key={error}> {error} </p>;
              })}
            </div>
          )}
          <Form onSubmit={signupHandler}>
            <Form.Row>
              <Col>
                <Form.Group controlId="firstName">
                  <Form.Label>First Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={handleFormChange}
                    placeholder="First Name"
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={handleFormChange}
                    placeholder="Last Name"
                  />
                </Form.Group>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col>
                <Form.Group controlId="email">
                  <Form.Label>Email Address:</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleFormChange}
                    placeholder="Your Email Address"
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="password">
                  <Form.Label>password:</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleFormChange}
                    placeholder="Your Password"
                  />
                </Form.Group>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col>
                <Form.Group controlId="matricNumber">
                  <Form.Label>Matric Number:</Form.Label>
                  <Form.Control
                    type="text"
                    name="matricNumber"
                    value={matricNumber}
                    onChange={handleFormChange}
                    placeholder="e.g 230/16/2021"
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Row>
                  <Col>
                    <Form.Group controlId="program">
                      <Form.Label>Program:</Form.Label>
                      <Form.Control
                        as="select"
                        name="programList"
                        onChange={handleFormChange}
                      >
                        <option> {selectedProgram} </option>
                        {programs &&
                          programs.map((program) => {
                            return (
                              <option key={program} value={program}>
                                {program}
                              </option>
                            );
                          })}
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group controlId="graduationYear">
                      <Form.Label>Graduation Year:</Form.Label>
                      <Form.Control
                        as="select"
                        name="graduationList"
                        onChange={handleFormChange}
                      >
                        <option> {selectedGraduationYear} </option>
                        {graduationYears &&
                          graduationYears.map((year) => {
                            return (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            );
                          })}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Form.Row>
              </Col>
            </Form.Row>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </section>
      </>
    </Layout>
  );
};

export default Signup;
