import { useEffect, useState } from "react";
import { CustomerDTO, EditCustomerProps } from "../../types";
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
import { fields } from "./fieldDefinitions";
import { validateCustomerData } from "../fetch-functiot&custom-hookit/functions";

export default function EditCustomer(props: EditCustomerProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  const defaultCustomer: CustomerDTO = {
    firstname: props.customer.firstname,
    lastname: props.customer.lastname,
    streetaddress: props.customer.streetaddress,
    postcode: props.customer.postcode,
    city: props.customer.city,
    email: props.customer.email,
    phone: props.customer.phone,
  };

  const [customer, setCustomer] = useState<CustomerDTO>(defaultCustomer);

  useEffect(() => {
    setCustomer(defaultCustomer);
    console.log("defaultCustomer", defaultCustomer);
  }, [props.customer]);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setCustomer({ ...props.customer });
    setDialogOpen(false);
  };

  const handleSubmit = () => {
    if (!validateCustomerData(customer)) {
      alert("Please fill in all fields before submitting.");
      return;
    }
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
  //fieldit määritellään fieldDefinitions.ts tiedostossa
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
              required
              margin="dense"
              id={field.id}
              label={field.label}
              fullWidth
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
