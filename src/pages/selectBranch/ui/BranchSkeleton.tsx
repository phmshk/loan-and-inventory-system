import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

export const BranchSkeleton = () => {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: 3 }).map((_, idx) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
          <Skeleton
            variant="rectangular"
            height={140}
            sx={{ borderRadius: 3 }}
          />
        </Grid>
      ))}
    </Grid>
  );
};
