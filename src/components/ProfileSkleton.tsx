import { Skeleton, Typography, Tabs, Tab, Grid } from "@mui/material";

export const ProfileSkeleton = () => {
  return (
    <>
      <Skeleton
        variant="circular"
        width={100}
        height={100}
        sx={{ mx: "auto", mt: 5, mb: 2 }}
      />
      <Skeleton variant="text" width={180} height={32} sx={{ mx: "auto" }} />
      <Skeleton variant="text" width={200} height={24} sx={{ mx: "auto" }} />
      <Skeleton
        variant="text"
        width={160}
        height={20}
        sx={{ mx: "auto", mb: 2 }}
      />

      {/* Tabs */}
      <Tabs value={"null"} centered>
        <Tab label={<Skeleton width={60} />} />
        <Tab label={<Skeleton width={60} />} />
      </Tabs>

      {/* Details Grid */}
      <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
        <Grid size={{ xs: 5 }}>
          <Typography>
            <Skeleton width={100} />
          </Typography>
        </Grid>
        <Grid size={{ xs: 5 }}>
          <Typography>
            <Skeleton width={150} />
          </Typography>
        </Grid>

        <Grid size={{ xs: 5 }}>
          <Typography>
            <Skeleton width={100} />
          </Typography>
        </Grid>
        <Grid size={{ xs: 5 }}>
          <Typography>
            <Skeleton width={180} />
          </Typography>
        </Grid>

        <Grid size={{ xs: 5 }}>
          <Typography>
            <Skeleton width={100} />
          </Typography>
        </Grid>
        <Grid size={{ xs: 5 }}>
          <Typography>
            <Skeleton width={120} />
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
