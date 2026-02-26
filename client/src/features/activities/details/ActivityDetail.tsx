import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router";
import { useActivities } from "../../../lib/types/hooks/useActivities";

export default function ActivityDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { activity, isLoadingActivity } = useActivities(id);

  if (isLoadingActivity) return <Typography>Loading...</Typography>;

  if (!activity)
    return (
      <Typography variant="h5" color="error">
        Activity not found
      </Typography>
    );

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardMedia
        component={"img"}
        image={`/assets/images/categoryImages/${activity.category}.jpg`}
        alt={activity.title}
      />
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {activity.date}
        </Typography>
        <Typography variant="body1">{activity.description}</Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} color="primary" to={`/manage/${activity.id}`}>
          Edit
        </Button>
        <Button onClick={() => navigate("/activities")} color="inherit">
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
