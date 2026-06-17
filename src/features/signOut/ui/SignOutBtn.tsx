import { Link } from "@tanstack/react-router";
import { useBranchActions } from "@/entities/branch";
import { useSessionActions } from "@/entities/session";
import { SignOutButtonContent } from "./SignOutContent";

interface SignOutButtonProps {
  username: string;
}

export const SignOutButton = (props: SignOutButtonProps) => {
  const { clearBranch } = useBranchActions();
  const { username } = props;
  const { clearSession } = useSessionActions();

  const handleLogout = () => {
    clearSession();
    clearBranch();
  };

  return (
    <Link to="/login" style={{ textDecoration: "none" }}>
      <SignOutButtonContent username={username} onClick={handleLogout} />
    </Link>
  );
};
