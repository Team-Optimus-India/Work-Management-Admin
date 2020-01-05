import { MASTER_DB_BASE_URL } from "../../config/clients";
import PageLayout from "../../layout/PageLayout";

import React, { Component } from "react";
import { Link, Route, useRouteMatch, useParams } from "react-router-dom";

export default class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: [],
    };
  }
  componentDidMount() {
    fetch(`http://localhost:5600/api/0/query/`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: [
          '\n \n events = flood(query_bucket("aw-watcher-window_Falcomx"));',
          '\n not_afk = flood(query_bucket("aw-watcher-afk_Falcomx"));',
          '\n not_afk = filter_keyvals(not_afk, "status", ["not-afk"]);',
          "\n events = filter_period_intersect(events, not_afk);",
          '\n \n events = categorize(events, [[["Work"],{"type":"regex","regex":"Google Docs"}],[["Work","Programming"],{"type":"regex","regex":"GitHub|Stack Overflow"}],[["Work","Programming","ActivityWatch"],{"type":"regex","regex":"ActivityWatch|aw-","ignore_case":true}],[["Media","Games"],{"type":"regex","regex":"Minecraft|RimWorld"}],[["Media","Video"],{"type":"regex","regex":"YouTube|Plex"}],[["Media","Social Media"],{"type":"regex","regex":"reddit|Facebook|Twitter|Instagram","ignore_case":true}],[["Comms","IM"],{"type":"regex","regex":"Messenger|Telegram|Signal|WhatsApp"}],[["Comms","Email"],{"type":"regex","regex":"Gmail"}]]);',
          '\n \n title_events = sort_by_duration(merge_events_by_keys(events, ["app", "title"]));',
          '\n app_events = sort_by_duration(merge_events_by_keys(title_events, ["app"]));',
          '\n cat_events = sort_by_duration(merge_events_by_keys(events, ["$category"]));',
          "\n\n events = sort_by_timestamp(events);",
          "\n app_events = limit_events(app_events, 100);",
          "\n title_events = limit_events(title_events, 100);",
          "\n duration = sum_durations(events);",
          '\n RETURN = {"app_events": app_events, "title_events": title_events, "cat_events": cat_events, "duration": duration, "active_events": not_afk};',
        ],
        timeperiods: ["2020-01-05T04:00:00+05:30/2020-01-06T04:00:00+05:30"],
      }),
    })
      .then(response => response.json())
      .then(response => {
        console.log("response activity", response);
      });
  }
  render() {
    // let match = useRouteMatch();
    // console.log("props", this.props, this.props.location.pathname === "/users");
    console.log(this.state, "rendering");
    return (
      <PageLayout title={"Activity"}>
        {/* {this.props.location.pathname === "/users" &&
          this.state.users.map((user, idx) => {
            return (
              <div key={idx}>
                <Link to={`/users/${user.githubUsername}`}>{user.name}</Link>
              </div>
            );
          })}

        <Route
          exact
          path={`/users/:userId`}
          render={routeprops => <User {...routeprops} users={this.state.users} />}
        /> */}
        {/* <Route path={`${this.props.match.url}/company`} component={Company} /> */}
      </PageLayout>
    );
  }
}
