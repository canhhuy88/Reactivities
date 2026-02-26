import { Typography } from "@mui/material";
import React from "react";
import { Container } from "semantic-ui-react";

export default function HomePage() {
  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to the Reactivities app!
      </Typography>
      <Typography variant="h5">
        Please login or register to see the activities!
      </Typography>
    </Container>
  );
}
