import { useState } from "react";
import { CustomerDataProps, CustomerDTO } from "../../types";
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

export default function AddCustomer(props: CustomerDataProps) {
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [customer, setCustomer] = useState<CustomerDTO>({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAfterSubmit = () => {
    setCustomer({
      firstname: "",
      lastname: "",
      streetaddress: "",
      postcode: "",
      city: "",
      email: "",
      phone: "",
    });
  };

  const handleSubmit = () => {
    //validointi
    const isFormValid = Object.values(customer).every(
      (value) => value.trim() !== ""
    );
    if (!isFormValid) {
      alert("Please fill in all fields before submitting.");
      return;
    }
    //http-pyyntö
    fetch(
      "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      }
    )
      .then((Response) => {
        if (!Response.ok) throw new Error("response was not ok");
        return Response.json();
      })
      .then(() => handleAfterSubmit())
      .then(() => props.fetschCustomers())
      .then(() => handleClose())
      .then(() => setOpenSnack(true))
      .catch((e) => console.log(e));
  };

  // kentät dialogille jotta vältytään boilerplatelta
  const fields = [
    { id: "firstname", label: "First Name" },
    { id: "lastname", label: "Last Name" },
    { id: "streetaddress", label: "Street Address" },
    { id: "postcode", label: "Postcode" },
    { id: "city", label: "City" },
    { id: "email", label: "Email Address" },
    { id: "phone", label: "Phone Number" },
  ];

  return (
    <>
      <Button
        color="success"
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={handleOpen}
        style={{ margin: "20px" }}
      >
        Add Customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Customer</DialogTitle>
        <DialogContent>
          {fields.map((field) => (
            <TextField
              required
              margin="dense"
              id={field.id}
              label={field.label}
              fullWidth
              value={customer[field.id as keyof CustomerDTO] || ""}
              onChange={(e) =>
                setCustomer({ ...customer, [field.id]: e.target.value })
              }
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleClose}>
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
        message="Customer added!"
      />
    </>
  );
}
