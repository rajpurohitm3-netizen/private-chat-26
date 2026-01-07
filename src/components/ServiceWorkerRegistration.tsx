"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const registerSW = async () => {
        try {
          // Unregister existing service workers first to clear potential scope issues
          const registrations = await navigator.serviceWorker.getRegistrations();
          for (let registration of registrations) {
            // Only unregister if it's not our main one or if we want a fresh start
            // For now, let's just register ours normally
          }

          const registration = await navigator.serviceWorker.register("/sw.js", {
            scope: "/",
          });
          
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === "installed") {
                  if (navigator.serviceWorker.controller) {
                    console.log("New service worker available; please refresh.");
                  } else {
                    console.log("Service worker installed for the first time.");
                  }
                }
              };
            }
          };
        } catch (error) {
          console.error("Service worker registration failed:", error);
        }
      };

      // Register after page load to avoid blocking initial render
      if (document.readyState === "complete") {
        registerSW();
      } else {
        window.addEventListener("load", registerSW);
        return () => window.removeEventListener("load", registerSW);
      }
    }
  }, []);

  return null;
}
