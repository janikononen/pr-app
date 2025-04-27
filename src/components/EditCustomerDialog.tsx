import { useState } from "react";
import { CustomerDTO, EditCustomerProps } from "../types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { GridActionsCellItem } from "@mui/x-data-grid";

export default function AddCustomer(props: EditCustomerProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [customer, setCustomer] = useState<CustomerDTO>({
    firstname: props.customer.firstname,
    lastname: props.customer.lastname,
    streetaddress: props.customer.streetaddress,
    postcode: props.customer.postcode,
    city: props.customer.city,
    email: props.customer.email,
    phone: props.customer.phone,
  });

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
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
    fetch(`${props.customer._links.self.href}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((Response) => {
        if (!Response.ok) throw new Error("response was not ok");
        return Response.json();
      })
      .then(() => props.fetchCustomers())
      .then(() => handleCloseDialog())
      .then(() => setOpenSnack(true))
      .catch((e) => console.log(e));
  };

  // kentät dialogille jotta vältytään boilerplatelta
  const fields = [
    { id: "firstname", label: "First Name", type: "text" },
    { id: "lastname", label: "Last Name", type: "text" },
    { id: "streetaddress", label: "Street Address", type: "text" },
    { id: "postcode", label: "Postcode", type: "text" },
    { id: "city", label: "City", type: "text" },
    { id: "email", label: "Email Address", type: "email" },
    { id: "phone", label: "Phone Number", type: "text" },
  ];

  return (
    <>
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        onClick={handleOpenDialog}
      />
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          {fields.map((field) => (
            <TextField
              key={field.id}
              autoFocus={field.id === "firstname"}
              required={true}
              margin="dense"
              id={field.id}
              name={field.id}
              label={field.label}
              type={field.type}
              fullWidth
              variant="standard"
              value={customer[field.id as keyof CustomerDTO]}
              onChange={(e) =>
                setCustomer({ ...customer, [field.id]: e.target.value })
              }
            />
          ))}
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
        message="Customer edited!"
      />
    </>
  );
}
