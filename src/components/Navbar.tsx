import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, IconButton, Box } from "@mui/material";
import { getToken } from "../utils/helper";
import PeopleIcon from "@mui/icons-material/People";
import { ProfileActions } from "./ProfileActions";
import logo from "../assets/navbar-logo.png";

export const AppNavbar = () => {
  const navigate = useNavigate();
  const token = getToken();

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(-45deg, #36096D 0%, #37D5D6 100% )",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", pl: "0px !important" }}>
        <img
          src={logo}
          alt="logo"
          height={70}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/home")}
        />
        {token ? (
          <Box display={"flex"}>
            <IconButton
              color="inherit"
              onClick={() => navigate("/home/user-list")}
              sx={{ mr: 2 }}
            >
              <PeopleIcon fontSize="medium" />
            </IconButton>
            <ProfileActions />
          </Box>
        ) : (
          <>
            <Box display={"flex"}>
              <Button color="inherit" onClick={() => navigate("/sign-in")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate("/sign-up")}>
                Register
              </Button>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
