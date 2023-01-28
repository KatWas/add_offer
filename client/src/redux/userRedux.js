import axios from 'axios';
import { API_URL } from '../config';

//selectors
export const getUser = ({ user }) => user.user[0];

//action name creator
const createActionName = actionName => `app/user/${actionName}`;

//action types
const FETCH_START = createActionName('FETCH_START');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_USER = createActionName('ADD_USER');

// action creators
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addUser = payload => ({ payload, type: ADD_USER });

// thunk creators
export const loadUserRequest = () => {
  return async dispatch => {
    dispatch(fetchStarted({ name: ADD_USER }));
    try {
      let res = await axios.get(`${API_URL}/user/data`);
      dispatch(addUser(res.data));
    } catch (e) {
      dispatch(fetchError({ name: ADD_USER, error: e.message }));
    }
  };
};

// Initial state

const initialState = {
  user: [],
};

//reducer
const userReducer = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case ADD_USER: {
      return {
        user: [action.payload],
      };
    }
    default:
      return statePart;
  }
};

export default userReducer;