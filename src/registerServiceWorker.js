export default function register() {
  window.addEventListener("load", () => {
    unregister();
  });
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (let registration of registrations) {
        registration.unregister();
      }
    });
  }
}

// WEBPACK FOOTER //
// ./src/registerServiceWorker.js
