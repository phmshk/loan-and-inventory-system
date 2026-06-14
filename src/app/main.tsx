import { createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryProvider } from "./providers/queryProvider.tsx";
import { routeTree } from "./routeTree.gen";

// Create a new router instance
export const router = createRouter({
  routeTree: routeTree,
  context: {
    isAuthenticated: false,
    isBranchSelected: false,
    user: null,
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

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
        <QueryProvider>
          <App />
        </QueryProvider>
      </StrictMode>,
    );
  });
}
