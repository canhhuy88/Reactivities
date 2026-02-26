import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { type ChangeEvent } from "react";
import { useActivities } from "../../../lib/types/hooks/useActivities";
import { useNavigate, useParams } from "react-router";

export default function ActivityForm() {
  const { id } = useParams();
  const { createActivity, updateActivity, activity, isLoadingActivity } =
    useActivities(id);

  const navigate = useNavigate();

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    // Handle form submission logic here
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // const activityData = {
    //   title: formData.get("title"),
    //   description: formData.get("description"),
    //   category: formData.get("category"),
    //   date: formData.get("date"),
    //   city: formData.get("city"),
    //   venue: formData.get("venue"),
    // };
    console.log(data);
    if (activity) {
      data.id = activity.id;
      await updateActivity.mutateAsync(data as unknown as Activity);
      navigate(`/activities/${activity.id}`);
    } else {
      await createActivity.mutateAsync(data as unknown as Activity, {
        onSuccess: (id) => {
          navigate(`/activities/${id}`);
        },
      });
    }
  };

  if (isLoadingActivity)
    return (
      <Typography variant="h5" gutterBottom color="primary">
        Loading activity...
      </Typography>
    );

  return (
    <Paper sx={{ padding: 2, borderRadius: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        {activity ? "Edit" : "Create"} activity
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display={"flex"}
        flexDirection={"column"}
        gap={2}
      >
        <TextField
          name="title"
          label="Title"
          variant="outlined"
          defaultValue={activity?.title}
        />
        <TextField
          name="description"
          label="Description"
          multiline
          rows={4}
          defaultValue={activity?.description}
        />
        <TextField
          name="category"
          label="Category"
          defaultValue={activity?.category}
        />
        <TextField
          name="date"
          label="Date"
          type="date"
          defaultValue={
            activity?.date
              ? new Date(activity.date).toISOString().split("T")[0]
              : new Date().toISOString().split("T")[0]
          }
        />
        <TextField name="city" label="City" defaultValue={activity?.city} />
        <TextField name="venue" label="Venue" defaultValue={activity?.venue} />
        <Box display={"flex"} justifyContent={"space-between"}>
          <Button
            onClick={() => {
              navigate(`/activities/${activity?.id}`);
            }}
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={updateActivity.isPending || createActivity.isPending}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
