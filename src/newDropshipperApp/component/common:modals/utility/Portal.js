import { createPortal } from "react-dom";
import { useEffect, useMemo, useState } from "react";

// Adapted code from https://dev.to/link2twenty/react-using-portals-to-make-a-modal-2kdf

export const Portal = ({ children, parent, className }) => {
  const [mounted, setMounted] = useState(false);

  // Create div to contain everything
  const el = useMemo(() => document.createElement("div"), []);

  // On mount function
  useEffect(
    () => {
      // work out target in the DOM based on parent prop
      const target = parent && parent.appendChild ? parent : document.body;
      // Default classes
      const classList = ["portal-container"];
      // If className prop is present add each class the classList
      if (className) className.split(" ").forEach(item => classList.push(item));
      classList.forEach(item => el.classList.add(item));

      // Append element to dom
      target.appendChild(el);

      // To ensure the portal is rendered only on the client side. Tweak for Next.js.
      setMounted(true);

      // On unmount function
      return () => {
        // Remove element from dom
        target.removeChild(el);
      };
    },
    [el, parent, className]
  );

  // return the createPortal function
  return mounted ? createPortal(children, el) : null;
};



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/common/modals/utility/Portal.js