import {
  TRACK_PAYWALL_VIEW_SUCCESS,
  REMOVE_PAYWALL_TRACKING,
  TRACK_PAYWALL_VIEW_FETCHING
} from "../actions/tracker.js";

const initialState = { eventId: null, isFetching: false };

export default function action(state = initialState, action) {
  switch (action.type) {
    case TRACK_PAYWALL_VIEW_SUCCESS:
      return { ...state, eventId: action.eventId, isFetching: false };
    case TRACK_PAYWALL_VIEW_FETCHING:
      return { ...state, isFetching: true };
    case REMOVE_PAYWALL_TRACKING:
      return { ...state, eventId: null };
    default:
      return state;
  }
}



// WEBPACK FOOTER //
// ./src/reducers/tracker.js