import { Outlet } from "react-router-dom";
import logo from "../assets/navbar-logo.png";
import { Box, Container, Grid } from "@mui/material";

export const AuthLayout = () => {
  return (
    // <Container sx={{ padding: 5 }}>
    //   <Box display={"flex"} flexDirection={"row"}>
    //     <img src={logo} />;
    //     <Outlet />
    //   </Box>
    // </Container>
    <Container sx={{ height: "100vh", display: "flex" }}>
      <Grid
        container
        // spacing={4}
        // sx={{ spacing: { xs: 2, md: 4 } }}
        alignItems="center"
        justifyContent="center"
        width={"100%"}
      >
        {/* Logo Column */}
        <Grid sx={{ xs: 12, md: 6 }} textAlign="center">
          <Box
            component="img"
            src={logo}
            sx={{ width: { xs: "60%", md: "80%" } }}
          />
        </Grid>

        {/* Form Outlet Column */}
        <Grid sx={{ xs: 12, md: 6 }}>
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  );
};

// import { Outlet } from "react-router-dom";
// import logo from "../assets/layout-removebg-preview.png";
// import { Box, Container, Grid } from "@mui/material";

// export const AuthLayout = () => {
//   return (
//     <Box
//       minHeight="100vh"
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       sx={{ backgroundColor: "#f0f2f5", px: 2 }}
//     >
//       <Container maxWidth="lg">
//         <Grid
//           container
//           spacing={0}
//           alignItems="center"
//           justifyContent="space-between"
//         >
//           {/* Logo Section (left-aligned) */}
//           <Grid
//             sx={{
//               xs: 12,
//               md: 6,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: { xs: "center", md: "flex-start" },
//               justifyContent: "center",
//               px: { xs: 2, md: 6 },
//               textAlign: { xs: "center", md: "left" },
//             }}
//           >
//             <Box
//               component="img"
//               src={logo}
//               alt="Chronicles Logo"
//               //   sx={{
//               //     width: { xs: "60%", md: "90%" },
//               //   }}
//             />
//           </Grid>

//           {/* Form Section (right-aligned) */}
//           <Grid
//             sx={{
//               xs: 12,
//               md: 6,
//               display: "flex",
//               justifyContent: { xs: "center", md: "flex-end" },
//               px: { xs: 2, md: 6 },
//               mt: { xs: 4, md: 0 },
//             }}
//           >
//             <Outlet />
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// };
