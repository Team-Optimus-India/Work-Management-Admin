import { MASTER_DB_BASE_URL } from "../../config/clients";
import PageLayout from "../../layout/PageLayout";

import React, { Component } from "react";
import { Card } from "antd";
import { Row, Col } from "antd";
import _ from "lodash";

export default class Issues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgName: "",
      repos: [],
    };
  }
  componentDidMount() {
    let org = "";
    let _repos = [];
    fetch(`${MASTER_DB_BASE_URL}user/all`)
      .then(response => response.json())
      .then(response => {
        org = response[0].organization;
        fetch(`https://api.github.com/orgs/${org}/repos`)
          .then(response => response.json())
          .then(repos => {
            repos.forEach(repo => {
              let issues = [];
              let arr = [];
              //   for (let i = 1; i <= repo.open_issues; i++) {
              //     fetch(`${repo.url}/issues/${i}`)
              //       .then(response => response.json())
              //       .then(issue => {
              //         issues.push(issue);
              //       });
              //   }
              for (let i = 1; i <= repo.open_issues; i++) {
                arr.push(i);
              }
              arr.forEach((a, i) => {
                fetch(`${repo.url}/issues/${i + 1}`)
                  .then(response => response.json())
                  .then(issue => {
                    issues.push(issue);
                  });
              });
              _repos.push({ detail: repo, issues: issues });
            });
            return _repos;
          })
          .then(reposs => {
            this.setState({ repos: reposs });
          });
      });
  }
  render() {
    console.log(this.state);
    let { repos } = this.state;
    console.log("repos", repos);

    console.log("reposss", repos);
    return (
      <PageLayout title={"Issues"}>
        <Row>
          {_.isEmpty(repos) ? (
            <div>Loading ...</div>
          ) : (
            repos.map((repo, idx) => {
              return (
                <div key={idx}>
                  <Col span={8}>
                    <Card title={repo.detail.full_name} style={{ width: 300 }}>
                      Repository Detail
                      <div>Description - {repo.detail.description}</div>
                      <div>Programming language - {repo.detail.language}</div>
                      Issues
                      {repo.issues.map((issue, idx) => {
                        if (!_.isEmpty(issue.pull_request)) {
                          return;
                        }
                        console.log("issue", issue);
                        return (
                          <div key={idx} className="padd">
                            <div>- Issue Title - {issue.title}</div>
                            {issue.assignees.map(user => {
                              console.log("user", user);
                              return (
                                <div>
                                  <img src={user.avatar_url} width={50}></img>
                                  <span>Assignees - {user.login}</span>
                                </div>
                              );
                            })}

                            <div></div>
                          </div>
                        );
                      })}
                    </Card>
                  </Col>
                </div>
              );
            })
          )}
        </Row>
      </PageLayout>
    );
  }
}
