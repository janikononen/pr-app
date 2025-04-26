import { Training } from "../types";
import dayjs from "dayjs";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

// tyyppi
type TrainingTableProps = {
  trainingsData: Training[];
};

export default function TrainingTable({ trainingsData }: TrainingTableProps) {
  //päivämäärämuotoilija dayjs
  const dateFormatter = (dateString: string) => {
    return dayjs(dateString).format("DD.MM.YYYY");
  };

  // sarakkeet taulukossa
  const columns: GridColDef<(typeof trainingsData)[number]>[] = [
    {
      field: "date",
      headerName: "Date",
      flex: 1, // Jakaa tilan tasaisesti
      valueGetter: (_, trainingsData) => dateFormatter(trainingsData.date),
    },
    { field: "activity", headerName: "Activity", flex: 1 }, // Jakaa tilan tasaisesti
    {
      field: "customer",
      headerName: "Customer",
      flex: 1, // Jakaa tilan tasaisesti
      valueGetter: (_, trainingsData) =>
        trainingsData.customer.firstname +
        " " +
        trainingsData.customer.lastname,
    },
    { field: "duration", headerName: "Duration(min)", flex: 1 }, // Jakaa tilan tasaisesti
  ];

  // itse taulukon määritys
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={trainingsData}
        columns={columns}
        getRowId={(trainingsData) => trainingsData.id}
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
