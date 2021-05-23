export function trackPinterestEvent(eventName) {
  window.pintrk("track", eventName);
}

export function trackRedditEvent(eventName) {
  window.rdt("track", eventName);
}

export function trackQuoraEvent(eventName) {
  window.qp("track", eventName);
}



// WEBPACK FOOTER //
// ./src/utils/eventTracker.js