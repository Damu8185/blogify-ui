import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth";
import PeopleIcon from "@mui/icons-material/People";
import { ProfileActions } from "./ProfileActions";

export const AppNavbar = () => {
  const navigate = useNavigate();
  const token = getToken();

  return (
    <AppBar
      position="sticky"
      sx={{ background: "linear-gradient(-45deg, #36096D 0%, #37D5D6 100% )" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/home")}
        >
          MiniBlog
        </Typography>
        {token ? (
          <>
            <IconButton color="inherit" onClick={() => navigate("/user-list")}>
              <PeopleIcon fontSize="medium" />
            </IconButton>
            <ProfileActions />
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate("/sign-in")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate("/sign-up")}>
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
