import { Outlet } from "react-router-dom";
import logo from "../assets/navbar-logo.png";
import { Box, Container } from "@mui/material";

export const AuthLayout = () => {
  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // column on mobile, row on ≥md
          justifyContent: "space-between",
          alignItems: "center",
          gap: { xs: 2, md: 10 },
          width: "100%",
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            width: { xs: "60%", md: "40%" }, // roughly matches 5/12 of grid on md
            textAlign: "center",
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Tales logo"
            sx={{ width: "100%", maxWidth: 400 }}
          />
        </Box>

        {/* Form / Outlet */}
        <Box
          sx={{
            flexGrow: 1,
            maxWidth: { xs: "100%", md: 480 }, // roughly 9/12 of grid on md
            width: "100%",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Container>
  );
};
