import { MASTER_DB_BASE_URL } from "../../config/clients";
import PageLayout from "../../layout/PageLayout";

import React, { Component } from "react";

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
    if (_.isEmpty(repos)) {
      console.log("reposs", repos);
      return <div>Hello</div>;
    }
    console.log("reposss", repos);
    return (
      <PageLayout title={"Issues"}>
        {repos.map((repo, idx) => {
          console.log("data", repo, repo);
          return (
            <div key={idx}>
              <div>
                Repository Detail
                <div>Title - {repo.detail.full_name}</div>
                <div>Description - {repo.detail.description}</div>
                <div>Programming language - {repo.detail.language}</div>
                Issues
                {repo.issues.map((issue, idx) => {
                  console.log("issue", issue);
                  return (
                    <div key={idx}>
                      <div>
                        {issue.number}) Issue Title - {issue.title}
                      </div>
                      {issue.assignees.map(user => {
                        console.log("user", user);
                        return (
                          <div>
                            <img src={user.avatar_url} width={50}></img>
                            <span>{user.login}</span>
                          </div>
                        );
                      })}

                      <div></div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </PageLayout>
    );
  }
}
