import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import Blog from "../components/blog";
import Profile from "../components/Profile";
//import ScreamSkeleton from "../util/ScreamSkeleton";

import { connect } from "react-redux";
import { getBlog } from "../redux/actions/dataActions";

class home extends Component {
  componentDidMount() {
    this.props.getBlog();
  }
  render() {
    const { blogs, loading } = this.props.data;
    let recentBlogsMarkup = !loading ? (
      blogs.map((blog) => <Blog key={blog.blogId} blog={blog} />)
    ) : (
      <div></div>
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentBlogsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getBlog: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getBlog })(home);
