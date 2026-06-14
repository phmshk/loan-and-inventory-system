import { RouterProvider } from "@tanstack/react-router";
import { router } from "./main";
import { useCurrentUser, useIsAuthenticated } from "@/entities/session";
import { useIsBranchSelected } from "@/entities/branch";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const isAuthenticated = useIsAuthenticated();
  const isBranchSelected = useIsBranchSelected();
  const user = useCurrentUser();
  const darkTheme = createTheme({
    palette: {
      mode: "light",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider
        router={router}
        context={{ isAuthenticated, isBranchSelected, user }}
      />
    </ThemeProvider>
  );
}

export default App;
