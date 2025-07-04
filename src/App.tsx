import { Outlet } from "react-router-dom";
import { AppNavbar } from "./components/Navbar";
import { Container, Box } from "@mui/material";
import { AuthContext } from "./context/AuthContext";
import { useContext, useEffect } from "react";
import { getUser } from "./utils/helper";

export const App = () => {
  const { setUserId } = useContext(AuthContext);

  useEffect(() => {
    const userId = getUser();
    if (userId) setUserId(userId);
  }, [setUserId]);
  return (
    <>
      {/* Persistent top navigation bar */}
      <AppNavbar />

      {/* Main content area */}
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Outlet />
        </Box>
      </Container>
    </>
  );
};
