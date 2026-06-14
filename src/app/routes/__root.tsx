import type { User } from "@/shared/api";
import Container from "@mui/material/Container";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

interface RouterContext {
  isAuthenticated: boolean;
  isBranchSelected: boolean;
  user: User | null;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Container component={"main"} fixed sx={{ p: 2 }}>
        <Outlet />
      </Container>
    </>
  );
}
