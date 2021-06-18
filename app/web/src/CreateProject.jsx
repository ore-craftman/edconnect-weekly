import React, { useState } from "react";
import Layout from "./shared/Layout";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";

const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const [projectAbstract, setProjectAbstract] = useState("");
  const [projectAuthors, setProjectAuthors] = useState("");
  const [projectTags, setProjectTags] = useState("");
  const [clientErrors, setClientErrors] = useState(null);
  let history = useHistory();

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

  const createProjectHandler = (e) => {
    e.preventDefault();

    let authorsArr = [];
    projectAuthors.split(",").forEach((author) => {
      authorsArr.push(author.trim());
    });

    let tagsArr = [];
    projectTags.split(",").forEach((tag) => {
      tagsArr.push(tag.trim());
    });

    let projectDataObj = {
      name: projectName,
      abstract: projectAbstract,
      authors: authorsArr,
      tags: tagsArr,
    };

    fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectDataObj),
    })
      .then((response) => {
        if (response.status === 200) {
          history.push("/");
        } else {
          return response.json();
        }
      })
      .then((response) => {
        setClientErrors(response.errors);
      })
      .catch((err) => {
        console.error(`SUBMIT PROJECT FETCH REQ ERROR: ${err.message}`);
      });
  };

  let uid = "";
  let allCookiesSeperated = document.cookie.split(";");

  allCookiesSeperated.forEach((singleCookieString) => {
    if (singleCookieString.startsWith("uid"))
      uid = singleCookieString.split("=")[1];
  });
  return (
    <Layout>
      <>
        {uid !== "" ? (
          <section className="w-75 mx-auto py-5">
            <h3>Submit Project</h3>

            {clientErrors && (
              <div className="alert alert-danger">
                {clientErrors.map((error) => (
                  <p> {error} </p>
                ))}
              </div>
            )}

            <Form onSubmit={createProjectHandler} id="createProjectForm">
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
        ) : (
          history.push("/login")
        )}
      </>
    </Layout>
  );
};

export default CreateProject;
