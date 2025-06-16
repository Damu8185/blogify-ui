import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Typography, Container } from "@mui/material";

export const ErrorPage = () => {
  const error = useRouteError();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {isRouteErrorResponse(error) && error.status === 401
          ? "Unauthorized"
          : isRouteErrorResponse(error) && error.status === 404
          ? "Not Found"
          : "Something went wrong"}
      </Typography>
      <Typography>
        {isRouteErrorResponse(error)
          ? error.data || error.statusText
          : (error as Error)?.message || "Unknown error"}
      </Typography>
    </Container>
  );
};
