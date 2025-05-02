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
import { defaultCustomer, fields } from "./fieldDefinitions";
import { validateCustomerData } from "../fetch-functiot&custom-hookit/functions";

export default function AddCustomer(props: CustomerDataProps) {
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [customer, setCustomer] = useState<CustomerDTO>(defaultCustomer);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setCustomer(defaultCustomer);
    setOpen(false);
  };

  // määritellään submit funktionaalisuus
  const handleSubmit = () => {
    if (!validateCustomerData(customer)) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((Response) => {
        if (!Response.ok) throw new Error("response was not ok");
        return Response.json();
      })
      .then(() => props.fetschCustomers())
      .then(() => handleClose())
      .then(() => setOpenSnack(true))
      .catch((e) => console.log(e));
  };
  //fieldit määritellään fieldDefinitions.ts tiedostossa
  //dialogi voidaan päivittää komponentilla jolle välitetään joko tyhjä customer tai costomer jolla on arvot!!!
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
