import { Customer, CustomerDataProps } from "../../types";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Box, Snackbar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditCustomer from "../dialogs/EditCustomer";
import { useState } from "react";
import AddTrainingToCustomerDialog from "../dialogs/AddTrainingFromCustomerDialog";

export default function Customertable(props: CustomerDataProps) {
  const [deleteOpenSnack, setDeleteOpenSnack] = useState(false);
  // sarakkeet taulukossa
  const columns: GridColDef<(typeof props.customersData)[number]>[] = [
    {
      field: "firstname",
      headerName: "First Name",
      flex: 1,
    },
    { field: "lastname", headerName: "Last Name", flex: 1 },
    {
      field: "streetaddress",
      headerName: "Street Address",
      flex: 1,
    },

    { field: "postcode", headerName: "Postcode", flex: 0.6 },
    { field: "city", headerName: "City", flex: 0.8 },
    { field: "email", headerName: "Email", flex: 1.2 },
    { field: "phone", headerName: "Phone", flex: 0.8 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.8,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <>
            <EditCustomer
              customer={params.row as Customer}
              fetchCustomers={props.fetschCustomers}
            />
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={() => handleDelete(params)}
            />
            <AddTrainingToCustomerDialog
              customer={params.row as Customer}
              fetchCustomers={props.fetschCustomers}
            />
          </>
        );
      },
    },
  ];

  // delete funktionaalisuus
  const handleDelete = (params: GridRenderCellParams) => {
    if (window.confirm("Are you sure?")) {
      fetch((params.row as Customer)._links.self.href, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) throw new Error("response was not ok");
          return response.json();
        })
        .then(() => setDeleteOpenSnack(true))
        .then(() => props.fetschCustomers())
        .catch((e) => console.log(e));
    }
  };

  // itse taulukon määritys
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={props.customersData}
        columns={columns}
        getRowId={(customersData) => customersData._links.self.href}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
      ></DataGrid>
      <Snackbar
        open={deleteOpenSnack}
        autoHideDuration={4000}
        onClose={() => setDeleteOpenSnack(false)}
        message="Customer deleted!"
      />
    </Box>
  );
}
