import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";

type Props = {
  activity?: Activity;
  closeForm: () => void;
  submitForm: (activity: Activity) => void;
};

export default function ActivityForm({
  activity,
  closeForm,
  submitForm,
}: Props) {
  const handleSubmit = (event: any) => {
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
    if (activity) data.id = activity.id;

    submitForm(data as unknown as Activity);
  };

  return (
    <Paper sx={{ padding: 2, borderRadius: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Create or edit an activity
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
          defaultValue={activity?.date}
        />
        <TextField name="city" label="City" defaultValue={activity?.city} />
        <TextField name="venue" label="Venue" defaultValue={activity?.venue} />
        <Box display={"flex"} justifyContent={"space-between"}>
          <Button onClick={closeForm} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="success">
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
