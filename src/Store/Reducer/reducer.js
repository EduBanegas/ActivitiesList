import { AUTHENTICATE_USER, GET_ALL_ACTIVITIES, GET_DATA_USER, LOAD_RECENT_MONTHS } from "../Action/action";

const initialState = {
  userInfo: {
    accessToken: {},
    data: {},
  },
  activitiesUser: [],
  recentMonths: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE_USER: {
      return {
        ...state,
        userInfo: { ...state.userInfo, accessToken: action.payload },
      };
    }

    case GET_ALL_ACTIVITIES: {
      return {
        ...state,
        activitiesUser: action.payload,
      };
    }

    case GET_DATA_USER: {
      return {
        ...state,
        userInfo: { ...state.userInfo, data: action.payload },
      };
    }

    case LOAD_RECENT_MONTHS: {
      return {
        ...state,
        recentMonths: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
