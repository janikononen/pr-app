import { useState } from "react";
import { EditCustomerProps, TrainingDTO } from "../types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function AddTrainingToCustomerDialog(props: EditCustomerProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [training, setTraining] = useState<TrainingDTO>({
    date: "",
    duration: "",
    activity: "",
    customer: props.customer._links.self.href,
  });

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setTraining({
      date: "",
      duration: "",
      activity: "",
      customer: props.customer._links.self.href,
    });
    setDialogOpen(false);
  };

  const handleSubmit = () => {
    //validointi
    const isFormValid = Object.values(training).every(
      (value) => value.trim() !== ""
    );
    if (!isFormValid) {
      alert("Please fill in all fields before submitting.");
      return;
    }
    //http-pyyntö
    fetch(
      "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(training),
      }
    )
      .then((Response) => {
        if (!Response.ok) throw new Error("response was not ok");
        return Response.json();
      })
      .then(() => handleCloseDialog())
      .then(() => setOpenSnack(true))
      .catch((e) => console.log(e));
  };

  return (
    <>
      <GridActionsCellItem
        icon={<AddIcon />}
        label="Add"
        onClick={handleOpenDialog}
      />
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Add Training</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              onChange={(e) =>
                setTraining({ ...training, date: e?.toISOString() || "" })
              }
            />
          </LocalizationProvider>
          <TextField
            required
            margin="dense"
            id="activity"
            label="Activity"
            fullWidth
            value={training.activity}
            onChange={(e) =>
              setTraining({ ...training, activity: e.target.value })
            }
          />
          <TextField
            required
            margin="dense"
            id="duration"
            label="Duration (minutes)"
            type="number"
            fullWidth
            value={training.duration}
            onChange={(e) =>
              setTraining({ ...training, duration: e.target.value })
            }
            //pitäisi päivittää uudempaan /muuhun tyyliin
            inputProps={{
              min: 0,
              max: 120,
              step: 5,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button variant="outlined" color="success" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnack}
        autoHideDuration={4000}
        onClose={() => setOpenSnack(false)}
        message="Training added for customer!"
      />
    </>
  );
}
