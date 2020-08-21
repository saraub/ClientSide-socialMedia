import React, { Component } from "react";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import MyButton from "../util/myButton";
import ChatIcon from "@material-ui/icons/Chat";
import BlogExpension from "./BlogExpansion";
import DeleteBlog from "./DeleteBlog";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import relativeTime from "dayjs/plugin/relativeTime";
import { Card, Typography, CardContent, CardMedia } from "@material-ui/core";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    background: "#ffffff",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
    objectFit: "cover",
  },
  content: {
    padding: 25,
  },
};

class blog extends Component {
  likedBlog = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.blogId === this.props.blog.blogId
      )
    )
      return true;
    else return false;
  };
  likeBlog = () => {
    this.props.likeBlog(this.props.blog.blogId);
  };
  unlikeBlog = () => {
    this.props.unlikeBlog(this.props.blog.blogId);
  };
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      blog: {
        title,
        createdAt,
        userImage,
        userName,
        blogId,
        likeCount,
        commentCount,
      },
      user: {
        authenticated,
        userCredentials: { userNameC },
      },
    } = this.props;

    const deleteButton =
      authenticated && userName === userNameC ? (
        <DeleteBlog blogId={blogId} />
      ) : null;

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          image={userImage}
          title="Profile image"
          style={styles.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            color="primary"
            component={Link}
            to={`/users/${userName}`}
          >
            {userName}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{title}</Typography>

          <LikeButton blogId={blogId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary"></ChatIcon>
          </MyButton>
          <span>{commentCount} comments</span>
          <BlogExpension
            openDialog={this.props.openDialog}
            blogId={blogId}
            userName={userName}
          ></BlogExpension>
        </CardContent>
      </Card>
    );
  }
}
blog.propTypes = {
  likeBlog: PropTypes.func.isRequired,
  unlikeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(blog));
