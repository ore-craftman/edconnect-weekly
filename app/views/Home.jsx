import React, { useState, useEffect } from "react";
import Layout from "./shared/Layout";

const Home = ({ projects, userInstance }) => {
  return (
    <Layout userInstance={userInstance}>
      <>
        <section>
          <div className="jumbotron my-4">
            <h2>Welcome To Project Explorer</h2>
            <p className="lead">
              Project Explorer is a repository for final year projects accross
              all departments at your institution. You can submit your project
              and search projects submitted by others to learn from.
            </p>
            <a href="register.html" role="button" className="btn btn-primary">
              Get started
            </a>
            <a
              href="login.html"
              role="button"
              className="btn btn-secondary mx-2"
            >
              Login
            </a>
          </div>
        </section>

        <section>
          <div className="row showcase" id="project-cards-container">
            {projects &&
              projects.map((project, index) => {
                return (
                  <div key={index} className="col-sm-3">
                    <section className="card my-4">
                      <div className="card-body">
                        <a href={"/project/" + project.id}>
                          <h4 className="text-primary card-title">
                            {project.name}
                          </h4>
                        </a>
                        <h6 className="card-subtitle">
                          {project.authors.join(", ")}
                        </h6>
                        <p className="card-text">{project.abstract}</p>
                        <p className="text-primary">{project.tags.join(" ")}</p>
                      </div>
                    </section>
                  </div>
                );
              })}
          </div>
        </section>
      </>
    </Layout>
  );
};

export default Home;
