import { useRouteError } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function ErrorPage() {
  const error = useRouteError();

  const errorPageStyle = {
    textAlign: "center",
    padding: "16px",
  };

  const errorMessageStyle = {
    marginTop: "8px",
    fontStyle: "italic",
  };

  return (
    <Box style={errorPageStyle}>
      <Typography variant="h4" component="h1">
        Oops!
      </Typography>
      <Typography variant="body1" paragraph>
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography variant="body2" style={errorMessageStyle}>
        <i>{error.statusText || error.message}</i>
      </Typography>
    </Box>
  );
}
