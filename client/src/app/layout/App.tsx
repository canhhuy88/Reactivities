import { Box } from "@mui/material";
import { useState } from "react";
import NavBar from "./NavBar";
import { Container } from "semantic-ui-react";
import { useActivities } from "../../lib/types/hooks/useActivities";
import { Outlet } from "react-router";

function App() {
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const { activities, isPending } = useActivities();

  const title = "Reactivities";

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find((a) => a.id === id));
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectActivity(id);
    else handleCancelSelectActivity();

    setEditMode(true);
  };

  const handleCloseForm = () => {
    setEditMode(false);
  };

  return (
    <Box sx={{ bgcolor: "#eeeeee" }}>
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Outlet />
      </Container>
    </Box>
  );
}

export default App;
