import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LIKE_BLOG,
  UNLIKE_BLOG,
  SET_USER,
  MARK_NOTIFICATIONS_READ,
  LOADING_USER,
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  userCredentials: {},
  likes: [],
  notifications: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LIKE_BLOG:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userName: state.userCredentials.userName,
            blogId: action.payload.blogId,
          },
        ],
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((not) => (not.read = true));
      return {
        ...state,
      };
    case UNLIKE_BLOG:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.blogId !== action.payload.blogId
        ),
      };
    default:
      return state;
  }
}
