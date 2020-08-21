import React, { Component } from "react";
import MyButton from "../util/myButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
// REdux
import { connect } from "react-redux";
import { likeBlog, unlikeBlog } from "../redux/actions/dataActions";

export class LikeButton extends Component {
  likedBlog = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find((like) => like.blogId === this.props.blogId)
    )
      return true;
    else return false;
  };
  likeBlog = () => {
    this.props.likeBlog(this.props.blogId);
  };
  unlikeBlog = () => {
    this.props.unlikeBlog(this.props.blogId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedBlog() ? (
      <MyButton tip="Undo like" onClick={this.unlikeBlog}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeBlog}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  blogId: PropTypes.string.isRequired,
  likeBlog: PropTypes.func.isRequired,
  unlikeBlog: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeBlog,
  unlikeBlog,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
