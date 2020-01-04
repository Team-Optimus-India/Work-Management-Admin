import { MASTER_DB_BASE_URL } from "../../config/clients";
import PageLayout from "../../layout/PageLayout";

import React, { Component } from "react";

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
    console.log(this.state);
    return (
      <PageLayout title={"Home"}>
        {this.state.users.map((user, idx) => (
          <div key={idx}>{user.name}</div>
        ))}
      </PageLayout>
    );
  }
}
