import { useForm } from "@tanstack/react-form";
import { useLogin } from "../model/useLogin";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const LoginForm = () => {
  const {
    mutate: login,
    isPending,
    error: loginError,
    reset: resetLoginError,
  } = useLogin();

  const form = useForm({
    defaultValues: {
      username: "",
    },
    onSubmit: async ({ value }) => {
      login({ username: value.username });
    },
  });

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        mt: 2,
      }}
    >
      {loginError && <Alert severity="error">{loginError.message}</Alert>}

      <div className="space-y-2">
        <form.Field
          name="username"
          validators={{
            onChange: ({ value }) =>
              !value ? "Username is required to access ERP" : undefined,
          }}
        >
          {(field) => {
            const hasError = !!field.state.meta.errors.length;

            return (
              <TextField
                fullWidth
                id={field.name}
                name={field.name}
                label="Employee Username"
                placeholder="e.g., appraiser_1"
                value={field.state.value}
                disabled={isPending}
                onBlur={() => {
                  field.handleBlur();
                  if (loginError) resetLoginError();
                }}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                  if (loginError) resetLoginError();
                }}
                error={hasError}
                helperText={hasError ? field.state.meta.errors.join(", ") : " "}
                variant="outlined"
              />
            );
          }}
        </form.Field>
      </div>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={isPending}
        size="large"
        sx={{ mt: 2 }}
      >
        {isPending ? "Verifying..." : "Sign In"}
      </Button>
    </Box>
  );
};
