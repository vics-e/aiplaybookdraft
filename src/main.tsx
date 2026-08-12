
  import { Analytics, type BeforeSendEvent } from "@vercel/analytics/react";
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  function redactAnalyticsUrl(event: BeforeSendEvent): BeforeSendEvent {
    try {
      const url = new URL(event.url, window.location.origin);
      url.search = "";
      url.hash = "";
      return { ...event, url: url.toString() };
    } catch {
      return event;
    }
  }

  createRoot(document.getElementById("root")!).render(
    <>
      <App />
      <Analytics beforeSend={redactAnalyticsUrl} />
    </>
  );
  
