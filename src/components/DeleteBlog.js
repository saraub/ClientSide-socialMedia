import React, { Component, Fragment } from "react";
import Proptypes from "prop-types";
import { deleteBlog } from "../redux/actions/dataActions";
import MyButton from "../util/myButton";
import {
  withStyles,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import { connect } from "react-redux";

const styles = {
  deleteButton: {
    left: "90%",
    top: "10%",
    position: "absolute",
  },
};

class DeleteBlog extends Component {
  state = {
    open: false,
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deleteBlog = () => {
    this.props.deleteBlog(this.props.blogId);
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <MyButton
          tip="Delete Blog"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color="secondary"></DeleteOutline>
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>are you sure you want to delete the blog?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteBlog} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
DeleteBlog.propTypes = {
  deleteScream: Proptypes.func.isRequired,
  classes: Proptypes.object.isRequired,
  blogId: Proptypes.string.isRequired,
};

export default connect(null, { deleteBlog })(withStyles(styles)(DeleteBlog));
