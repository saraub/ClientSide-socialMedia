import {
  SET_BLOGS,
  LIKE_BLOG,
  UNLIKE_BLOG,
  DELETE_BLOG,
  SET_BLOG,
  SUBMIT_COMMENT,
  LOADING_DATA,
  POST_BLOG,
} from "../types";

const initialState = {
  blogs: [],
  blog: {},
  loading: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_BLOGS:
      return { ...state, blogs: action.payload, loading: false };
    case SET_BLOG:
      return {
        ...state,
        blog: action.payload,
      };

    case LIKE_BLOG:
    case UNLIKE_BLOG:
      let index = state.blogs.findIndex(
        (blog) => blog.blogId === action.payload.blogId
      );
      state.blogs[index] = action.payload;
      if (state.blog.blogId === action.payload.blogId) {
        state.blog = action.payload;
      }
      return {
        ...state,
      };
    case DELETE_BLOG:
      index = state.blogs.findIndex((blog) => blog.blogId === action.payload);
      state.blogs.splice(index, 1);
      return {
        ...state,
        blogs: [action.payload, ...state.blogs],
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        blog: {
          ...state.blog,
          comments: [action.payload, ...state.blog.comments],
        },
      };

    case POST_BLOG:
      return {
        ...state,
        blogs: [action.payload, ...state.blogs],
      };

    default:
      return state;
  }
}
