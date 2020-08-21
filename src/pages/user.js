import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Blog from "../components/blog";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import HomeProfile from "../components/HomeProfile";
//import BlogSkeleton from "../util/ScreamSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

const styles = {
  profileImage: {
    width: 200,
    height: 200,
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "50%",
  },
};
class user extends Component {
  state = {
    profile: null,
    blogIdParam: null,
  };
  componentDidMount() {
    const userName = this.props.match.params.userNameC;
    const blogId = this.props.match.params.blogId;

    if (blogId) this.setState({ blogIdParam: blogId });

    this.props.getUserData(userName);
    axios
      .get(`/user/${userName}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { blogs, loading } = this.props.data;
    const { blogIdParam } = this.state;

    const blogsMarkup = loading ? (
      //<ScreamSkeleton />
      <div></div>
    ) : blogs === null ? (
      <p>No blogs from this user</p>
    ) : !blogIdParam ? (
      blogs.map((blog) => <Blog key={blog.blogId} blog={blog} />)
    ) : (
      blogs.map((blog) => {
        if (blog.blogId !== blogIdParam)
          return <Blog key={blog.blogId} blog={blog} />;
        else return <Blog key={blog.blogId} blog={blog} openDialog />;
      })
    );

    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {blogsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <HomeProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(
  withStyles(styles)(user)
);
