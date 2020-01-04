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
              for (let i = 1; i <= repo.open_issues; i++) {
                fetch(`${repo.url}/issues/${i}`)
                  .then(response => response.json())
                  .then(issue => {
                    issues.push(issue);
                  });
              }
              _repos.push({ detail: repo, issues: issues });
            });
          });
        this.setState({ repos: _repos });
      });
  }
  render() {
    console.log(this.state);
    let { repos } = this.state;
    if (_.isEmpty(repos)) return <div></div>;
    return (
      <PageLayout title={"Issues"}>
        {repos.map((repo, idx) => {
          return (
            <div key={idx}>
              <div>{repos.full_name}</div>
              <div>{repo.description}</div>
              <div>{repo.language}</div>
            </div>
          );
        })}
      </PageLayout>
    );
  }
}
