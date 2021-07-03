import React, { useState } from "react";
import Layout from "./shared/Layout";
import { Form, Button } from "react-bootstrap";

const CreateProject = ({ clientErrors, userInstance }) => {
  const [projectName, setProjectName] = useState("");
  const [projectAbstract, setProjectAbstract] = useState("");
  const [projectAuthors, setProjectAuthors] = useState("");
  const [projectTags, setProjectTags] = useState("");

  const formChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setProjectName(value);
    } else if (name === "abstract") {
      setProjectAbstract(value);
    } else if (name === "authors") {
      setProjectAuthors(value);
    } else if (name === "tags") {
      setProjectTags(value);
    }
  };

  return (
    <Layout userInstance={userInstance}>
      <>
        <section className="w-75 mx-auto py-5">
          <h3>Submit Project</h3>

          {clientErrors.length > 0 ? (
            <div className="alert alert-danger">
              {clientErrors.map((error) => (
                <p key={error}> {error} </p>
              ))}
            </div>
          ) : null}

          <Form method="POST" action="/projects/submit" id="createProjectForm">
            <Form.Group controlId="name">
              <Form.Label>Project Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Project Name"
                name="name"
                value={projectName}
                onChange={formChangeHandler}
              />
            </Form.Group>

            <Form.Group controlId="abstract">
              <Form.Label>Project Abstract:</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                name="abstract"
                value={projectAbstract}
                onChange={formChangeHandler}
              />
            </Form.Group>

            <Form.Group controlId="authors">
              <Form.Label>Authors:</Form.Label>
              <Form.Control
                type="text"
                name="authors"
                value={projectAuthors}
                onChange={formChangeHandler}
              />
            </Form.Group>

            <Form.Group controlId="tags">
              <Form.Label>Tag(s):</Form.Label>
              <Form.Control
                type="text"
                name="tags"
                value={projectTags}
                onChange={formChangeHandler}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Continue
            </Button>
          </Form>
        </section>
      </>
    </Layout>
  );
};

export default CreateProject;
