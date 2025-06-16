import { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Stack,
} from "@mui/material";
import { BASE_URL, getToken, removeToken } from "../utils/auth";
import { AuthContext } from "../context/AuthContext";
import { profileName } from "../utils/helper";

type users = {
  first_name: string;
  last_name: string;
  email_id: string;
};

export const UserList = () => {
  const { setErrorToast } = useContext(AuthContext);
  const [users, setUsers] = useState<users[]>([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        const users = await response.json();
        if (!response.ok && response.status === 401) {
          removeToken();
          setErrorToast("Session expired");
        }
        setUsers(users);
      } catch (error) {
        setErrorToast("Something went wrong. Please try again.");
      }
    };
    fetchUsersData();
  }, [setErrorToast]);

  return (
    <Box
      sx={{
        maxWidth: 700,
        mx: "auto",
        mt: 4,
        borderRadius: 3,
        boxShadow: 3,
        bgcolor: "white",
        overflow: "hidden",
      }}
    >
      <Box sx={{ px: 3, py: 2, borderBottom: "1px solid #eee" }}>
        <Typography variant="h6" fontWeight="bold">
          USER LIST
        </Typography>
      </Box>

      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: users, idx: number) => (
              <TableRow key={idx}>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar>
                      {profileName(user.first_name + " " + user.last_name)}
                    </Avatar>
                    <Typography fontWeight="medium">
                      {user.first_name + " " + user.last_name}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>{user.email_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
