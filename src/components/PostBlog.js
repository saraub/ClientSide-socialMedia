import React, { Component, Fragment } from "react";
import Proptypes from "prop-types";
import MyButton from "../util/myButton";
import {
  withStyles,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { postBlog } from "../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.post,
  submitButton: {
    position: "relative",
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "90%",
    top: "10%",
  },
});

class PostBlog extends Component {
  state = {
    open: false,
    body: "",
    errors: {},
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        title: "",
        body: "",
      });
      this.hadnleClose();
    }
  }
  hadnleOpen = () => {
    this.setState({ open: true });
  };
  hadnleClose = () => {
    this.setState({ open: false, errors: {} });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postBlog({ body: this.state.body, title: this.state.title });
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    return (
      <Fragment>
        <MyButton onClick={this.hadnleOpen} tip="post a blog">
          <AddIcon></AddIcon>
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.hadnleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="CLose"
            onClick={this.hadnleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon></CloseIcon>
          </MyButton>
          <DialogTitle>Post a new Blog</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                className={classes.textField}
                name="title"
                type="text"
                label="title"
                helperText={errors.title}
                error={errors.title ? true : false}
                onChange={this.handleChange}
                fullWidth
                placeholder="title of your blog!"
              ></TextField>
              <TextField
                className={classes.textField}
                name="body"
                type="text"
                label="BLOG"
                multiline
                rows="3"
                helperText={errors.body}
                error={errors.body ? true : false}
                onChange={this.handleChange}
                fullWidth
                placeholder="post your blog!"
              ></TextField>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                className={classes.submitButton}
                color="primary"
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  ></CircularProgress>
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostBlog.propTypes = {
  postBlog: Proptypes.func.isRequired,
  UI: Proptypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI.loading,
});
export default connect(mapStateToProps, { postBlog })(
  withStyles(styles)(PostBlog)
);
