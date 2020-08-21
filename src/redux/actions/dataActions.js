import {
  SET_BLOGS,
  LOADING_DATA,
  LIKE_BLOG,
  SET_BLOG,
  LOADING_UI,
  UNLIKE_BLOG,
  POST_BLOG,
  STOP_LOADING_UI,
  DELETE_BLOG,
  SET_ERRORS,
  SUBMIT_COMMENT,
  CLEAR_ERRORS,
} from "../types";
import axios from "axios";

export const getBlog = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/blogs")
    .then((res) => {
      dispatch({
        type: SET_BLOGS,
        payload: res.data,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_BLOGS,
        payload: [],
      });
    });
};
export const getSingleBlog = (blogId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/blog/${blogId}`)
    .then((res) => {
      dispatch({
        type: SET_BLOG,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};
export const getUserData = (userNameC) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userNameC}`)
    .then((res) => {
      dispatch({
        type: SET_BLOGS,
        payload: res.data.blogs,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_BLOGS,
        payload: null,
      });
    });
};

export const postBlog = (newBlog) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/blog", newBlog)
    .then((res) => {
      dispatch({ type: POST_BLOG, payload: res.data });
    })
    .catch((err) => console.log(err));
};

export const likeBlog = (blogId) => (dispatch) => {
  axios
    .get(`/blog/${blogId}/like`)

    .then((res) => {
      dispatch({
        type: LIKE_BLOG,
        payload: res.data,
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.res.data });
    });
};
export const unlikeBlog = (blogId) => (dispatch) => {
  axios
    .get(`/blog/${blogId}/unlike`)

    .then((res) => {
      dispatch({
        type: UNLIKE_BLOG,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
export const submitComment = (blogId, commentData) => (dispatch) => {
  axios
    .post(`/blog/${blogId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
export const deleteBlog = (blogId) => (dispatch) => {
  axios
    .delete(`/blog/${blogId}`)
    .then(() => {
      dispatch({ type: DELETE_BLOG, payload: blogId });
    })
    .catch((err) => console.log(err));
};
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
