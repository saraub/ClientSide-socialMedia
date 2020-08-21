import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import MyButton from "../util/myButton";

import AppBar from "@material-ui/core/AppBar";

import PostBlog from "./PostBlog";
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "./Notifications";

import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

class NavBar extends Component {
  render() {
    const { authenticated } = this.props;

    return (
      <AppBar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
              <PostBlog></PostBlog>
              <Link to="/">
                <MyButton tip="Home">
                  <HomeIcon></HomeIcon>
                </MyButton>
              </Link>
              <MyButton tip="Notifications">
                <Notifications></Notifications>
              </MyButton>
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}
NavBar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});
export default connect(mapStateToProps)(NavBar);
