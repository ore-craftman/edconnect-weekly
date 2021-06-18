import React, { useState, useEffect } from "react";
import Layout from "./shared/Layout";
import { useParams } from "react-router-dom";

const Project = () => {
  let { id } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [creator, setCreator] = useState("");

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(
            `FETCH Single Project Error, Status !200 but ${response.status}`
          );
        }
      })
      .then((data) => {
        setProjectData(data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [id]);

  if (projectData) {
    let creatorsId = projectData.createdBy;
    fetch(`/api/users/${creatorsId}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(`Response.status != 200 but: ${response.status}`);
        }
      })
      .then((creatorsData) => {
        setCreator(`${creatorsData.firstname} ${creatorsData.lastname}`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  return (
    <Layout>
      <>
        {projectData && (
          <section className="py-5">
            <h4> {projectData.name} </h4>

            <div className="row bg-light p-3 ">
              <section className="col">
                <ul>
                  <li className="list-unstyled">Created By</li>
                  <li className="list-unstyled" id="project_author">
                    {creator}
                  </li>
                </ul>
              </section>
              <section className="col">
                <li className="list-unstyled">Date Created</li>
                <li className="list-unstyled">2019-04-23</li>
              </section>
              <section className="col">
                <li className="list-unstyled">Last Updated</li>
                <li className="list-unstyled">2019-04-23</li>
              </section>
              <section className="col-auto">
                <a
                  href="editproject.html"
                  role="button"
                  className="btn btn-primary"
                >
                  Edit Project
                </a>
              </section>
            </div>

            <section className="row my-4">
              <div className="col">
                <h5 className="py-3 border-bottom">Project Abstract</h5>
                <p id="project_abstract"> {projectData.abstract} </p>

                <h5 className="py-3">Comments</h5>
                <form>
                  <textarea
                    rows="3"
                    placeholder="Leave a comment"
                    className="form-control"
                  ></textarea>
                  <button type="submit" className="btn btn-primary my-2">
                    Submit
                  </button>
                </form>
                <p className="py-3 mt-3 border-top text-center">
                  No comments added yet
                </p>
              </div>

              <div className="col">
                <section>
                  <h5 className="py-3 border-bottom">Project Details</h5>
                  <div className="card">
                    <div className="card-header">
                      <strong>Author(s)</strong>
                    </div>
                    <div className="card-body p-0">
                      <ul
                        className="list-group list-group-flush"
                        id="project_authors"
                      >
                        {projectData.authors.map((author) => {
                          return (
                            <li key={author} className="list-group-item">
                              {author}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="card-footer" id="project_tags">
                      {projectData.tags.map((tag) => {
                        return (
                          <p key={tag} className="text-primary">
                            {tag}
                          </p>
                        );
                      })}
                    </div>
                  </div>

                  <div className="card my-2">
                    <div className="card-header">
                      <h5>Project Files</h5>
                    </div>
                    <div className="card-body">
                      <p className="text-center">No file uploaded yet</p>
                    </div>
                  </div>
                </section>
              </div>
            </section>
          </section>
        )}
      </>
    </Layout>
  );
};

export default Project;
