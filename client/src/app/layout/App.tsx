import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  const title = "Reactivities";

  useEffect(() => {
    axios
      .get<Activity[]>("https://localhost:5001/api/activities")
      .then((response) => setActivities(response.data))
      .catch((error) => console.error("Error fetching activities:", error));
  }, []);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find((a) => a.id === id));
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

  const handleSubmitForm = (activity: Activity) => {
    if (activity.id) {
      // Update existing activity
      setActivities(
        activities.map((a) => (a.id === activity.id ? activity : a)),
      );
    } else {
      // Create new activity
      const newActivity = { ...activity, id: crypto.randomUUID() };
      setActivities([...activities, newActivity]);
    }

    setEditMode(false);
    setSelectedActivity(activity);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities(activities.filter((a) => a.id !== id));
  };

  return (
    <>
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Typography variant="h2" className="app" style={{ color: "red" }}>
          {title}
        </Typography>

        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          selectActivity={handleSelectActivity}
          editMode={editMode}
          closeForm={handleCloseForm}
          openForm={handleOpenForm}
          submitForm={handleSubmitForm}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
