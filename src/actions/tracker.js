import ApiCall from "../utils/apiCall";

export const TRACK_PAYWALL_VIEW_SUCCESS = "TRACK_PAYWALL_VIEW_SUCCESS";
export const TRACK_PAYWALL_VIEW_FETCHING = "TRACK_PAYWALL_VIEW_FETCHING";
export const REMOVE_PAYWALL_TRACKING = "REMOVE_PAYWALL_TRACKING";

export function trackPaywallView(
  page,
  context,
  contextId,
  referrer_position = null,
  referrer_number_of_columns = null,
  upgrade_step = null
) {
  return function(dispatch) {
    dispatch(trackPaywallViewFetching());
    return ApiCall.post("/events/plan_charges", {
      referrer_page: page,
      referrer_context: context,
      referrer_context_entity_id: contextId,
      referrer_position,
      referrer_number_of_columns,
      upgrade_step
    }).then(({ json }) => {
      dispatch(trackPaywallViewSuccess(json.event_id));
    });
  };
}

export function updatePaywallView({ upgradeStep, planId, eventId }) {
  return function(dispatch) {
    return ApiCall.put(`/events/plan_charges/${eventId}`, {
      upgrade_step: upgradeStep,
      plan_id: planId
    });
  };
}

function trackPaywallViewSuccess(eventId) {
  return {
    type: TRACK_PAYWALL_VIEW_SUCCESS,
    eventId
  };
}

function trackPaywallViewFetching() {
  return { type: TRACK_PAYWALL_VIEW_FETCHING };
}
export function removePaywallTracking() {
  return { type: REMOVE_PAYWALL_TRACKING };
}



// WEBPACK FOOTER //
// ./src/actions/tracker.js