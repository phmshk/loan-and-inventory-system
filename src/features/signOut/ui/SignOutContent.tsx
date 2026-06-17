import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

interface SignOutProps {
  username: string;
  onClick: () => void;
}

export const SignOutButtonContent = (props: SignOutProps) => {
  const { username, onClick } = props;
  return (
    <Button
      onClick={onClick}
      variant="contained"
      color="error"
      size="small"
      startIcon={<LogoutIcon fontSize="small" />}
      sx={{
        textTransform: "none",
        fontWeight: "bold",
        borderRadius: 2,
      }}
    >
      Sign Out ({username})
    </Button>
  );
};
