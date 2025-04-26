import { CustomerDataProps } from "../types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

export default function Customertable({ customersData }: CustomerDataProps) {
  // sarakkeet taulukossa
  const columns: GridColDef<(typeof customersData)[number]>[] = [
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

    { field: "postcode", headerName: "Postcode", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
  ];

  // itse taulukon määritys
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={customersData}
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
    </Box>
  );
}
