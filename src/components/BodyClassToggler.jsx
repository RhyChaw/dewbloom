// components/BodyClassToggler.jsx
"use client";

import { useEffect } from "react";

export default function BodyClassToggler({ className = "not-loaded", removeAfterMs = 1000 }) {
  useEffect(() => {
    // add class immediately
    document.body.classList.add(className);

    // remove after requested timeout (matches your onload script)
    const t = setTimeout(() => {
      document.body.classList.remove(className);
    }, removeAfterMs);

    return () => {
      clearTimeout(t);
      document.body.classList.remove(className);
    };
  }, [className, removeAfterMs]);

  return null;
}
