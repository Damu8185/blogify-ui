import { Outlet } from "react-router-dom";
import logo from "../assets/navbar-logo.png";
import { Box, Container, Grid } from "@mui/material";

export const AuthLayout = () => {
  return (
    <Container sx={{ height: "100vh", alignItems: "center" }}>
      <Grid
        alignItems="center"
        justifyContent="center"
        container
        spacing={10}
        height={"100vh"}
      >
        {/* Logo Column */}
        <Grid size={{ xs: 12, md: 5 }} textAlign="center">
          <Box
            component="img"
            src={logo}
            sx={{ width: { xs: "60%", md: "80%" } }}
          />
        </Grid>

        {/* Form Outlet Column */}
        <Grid sx={{ xs: 12, md: 9 }}>
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  );
};
