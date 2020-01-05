import { MASTER_DB_BASE_URL } from "../../config/clients";
import PageLayout from "../../layout/PageLayout";

import React, { Component } from "react";
import { Link, Route, useRouteMatch, useParams } from "react-router-dom";
import User from "./User";
import _ from "lodash";

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }
  componentDidMount() {
    fetch(`${MASTER_DB_BASE_URL}user/all`)
      .then(response => response.json())
      .then(response => {
        this.setState({
          users: response,
        });
      });
  }
  render() {
    // let match = useRouteMatch();
    console.log("props", this.props, this.props.location.pathname === "/users");

    if (_.isEmpty(this.state.users)) {
      return (
        <PageLayout title={"Users"}>
          <div>Loading ...</div>
        </PageLayout>
      );
    }
    return (
      <PageLayout title={"Users"}>
        {this.props.location.pathname === "/users" &&
          this.state.users.map((user, idx) => {
            return (
              <div className="padd" key={idx}>
                <Link to={`/users/${user.githubUsername}`}>{user.name}</Link>
              </div>
            );
          })}

        <Route
          path={`/users/:userId`}
          render={routeprops => <User {...routeprops} users={this.state.users} />}
        />
        {/* <Route path={`${this.props.match.url}/company`} component={Company} /> */}
      </PageLayout>
    );
  }
}
