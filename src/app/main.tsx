import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
// import { Providers } from "./providers/Providers.tsx";

async function enableMocking() {
  if (import.meta.env.VITE_ENABLE_MOCKING === "false") {
    return;
  }

  const { worker } = await import("@/shared/api/mocks/worker");
  return worker.start();
}

const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  enableMocking().then(() => {
    root.render(
      <StrictMode>
        {/* <Providers> */}
        <App />
        {/* </Providers> */}
      </StrictMode>,
    );
  });
}
