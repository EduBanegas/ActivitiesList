import axios from "axios";

// authenticate user
export const AUTHENTICATE_USER = "AUTHENTICATE_USER";
export function authenticateUser() {
  return async function (dispatch) {
    try {
      const clientSecret = "85afe6f1ba8accd2823781ac3c4b99f93bd2585f";
      const clientId = "77134";
      const refreshToken = "f1c80b19e0cbddfbdbd39cedd11e913e23f95e0d";

      const codeAuthUserReseponse = await axios.post(
        `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`
      );

      dispatch({
        type: AUTHENTICATE_USER,
        payload: codeAuthUserReseponse.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const GET_ALL_ACTIVITIES = "GET_ALL_ACTIVITIES";
export function getAllActivities(accessToken) {
  return async function (dispatch) {
    try {
      const getAllActivitiesResponse = await axios.get(`https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken}`);

      dispatch({
        type: GET_ALL_ACTIVITIES,
        payload: getAllActivitiesResponse.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const GET_DATA_USER = "GET_DATA_USER";
export function getDataUser(accessToken) {
  return async function (dispatch) {
    try {
      const userInfoResponse = await axios.get(`https://www.strava.com/api/v3/athlete?access_token=${accessToken}`);

      dispatch({
        type: GET_DATA_USER,
        payload: userInfoResponse.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const LOAD_RECENT_MONTHS = "LOAD_RECENT_MONTHS";
export function loadRecentMonths(recentMonths) {
  return function (dispatch) {
    dispatch({
      type: LOAD_RECENT_MONTHS,
      payload: recentMonths,
    });
  };
}
