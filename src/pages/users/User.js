import { MASTER_DB_BASE_URL } from "../../config/clients";
import PageLayout from "../../layout/PageLayout";

import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import _ from "lodash";

function OwnRepos() {
  return <div>Own repo</div>;
}

export default class User extends Component {
  constructor(props) {
    console.log("hello");
    super(props);
    this.state = {
      user: {},
      userFromServer: {},
    };
  }
  componentDidMount() {
    let user = {};
    fetch(`https://api.github.com/users/${this.props.match.params.userId}`)
      .then(response => response.json())
      .then(response => {
        user.details = response;
        return response;
      })
      .then(response => {
        fetch(response.repos_url)
          .then(response => response.json())
          .then(res => {
            console.log("res", res);
            user.ownRepos = res;
            this.setState({
              user,
              userFromServer:
                this.props.users &&
                this.props.users.filter(
                  user => this.props.match.params.userId === user.githubUsername,
                )[0],
            });
          });
      });
  }
  render() {
    console.log("User coming", this.state, this.props);
    let { user, userFromServer } = this.state;
    if (_.isEmpty(user) || _.isEmpty(userFromServer)) {
      return <div></div>;
    }
    let { details, ownRepos } = user;
    return (
      <div>
        <img src={details.avatar_url} width={50}></img>
        <span>{`  ${userFromServer.githubUsername}`}</span>
        <br />
        <div>{`  ORGANIZATION --- ${userFromServer.organization}`}</div>
      </div>
    );
  }
}
