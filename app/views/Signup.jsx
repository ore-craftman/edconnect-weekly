import React, { useState } from "react";
import Layout from "./shared/Layout";
import { Form, Col, Button } from "react-bootstrap";

const Signup = ({ programs, gradYears, error, userInstance }) => {
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
    if (name === "firstname") {
      setFirstName(value);
    } else if (name === "lastname") {
      setLastName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "matricNumber") {
      setMatricNumber(value);
    } else if (name === "program") {
      setSelctedProgram(value);
    } else if (name === "graduationYear") {
      setselectedGraduationYear(value);
    }
  };

  return (
    <Layout userInstance={userInstance}>
      <>
        <section className="w-75 mx-auto py-5">
          {error.length > 0 ? (
            <div className="alert alert-danger fade show" role="alert">
              {error.map((singleError) => {
                return <p key={singleError}> {singleError} </p>;
              })}
            </div>
          ) : null}
          <Form action="signup" method="POST" id="signupForm">
            <Form.Row>
              <Col>
                <Form.Group controlId="firstName">
                  <Form.Label>First Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstname"
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
                    name="lastname"
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
                        name="program"
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
                        name="graduationYear"
                        onChange={handleFormChange}
                      >
                        <option> {selectedGraduationYear} </option>
                        {gradYears &&
                          gradYears.map((year) => {
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
