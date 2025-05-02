import { TrainingTableProps } from "../../types";
import dayjs from "dayjs";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Box, Snackbar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export default function TrainingTable(props: TrainingTableProps) {
  const [deleteOpenSnack, setDeleteOpenSnack] = useState(false);

  // sarakkeet taulukossa
  const columns: GridColDef<(typeof props.trainingsData)[number]>[] = [
    {
      field: "date",
      headerName: "Date",
      flex: 0.7,
      valueGetter: (_, trainingsData) =>
        dayjs(trainingsData.date).format("DD.MM.YYYY"),
    },
    {
      field: "time",
      headerName: "Time",
      flex: 0.5,
      valueGetter: (_, trainingsData) =>
        dayjs(trainingsData.date).format("HH:mm"),
    },
    { field: "activity", headerName: "Activity", flex: 1 },
    {
      field: "customer",
      headerName: "Customer",
      flex: 1,
      valueGetter: (_, trainingsData) =>
        trainingsData.customer.firstname +
        " " +
        trainingsData.customer.lastname,
    },
    { field: "duration", headerName: "Duration(min)", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.4,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <>
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={() => handleDelete(params)}
            />
          </>
        );
      },
    },
  ];

  // funktionaalisuus delete-napille
  const handleDelete = (params: GridRenderCellParams) => {
    if (window.confirm("Are you sure?")) {
      fetch(`${import.meta.env.VITE_API_URL}trainings/` + params.id, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) throw new Error("response was not ok");
          return response.json();
        })
        .then(() => setDeleteOpenSnack(true))
        .then(() => props.fetchTrainings())
        .catch((e) => console.log(e));
    }
  };

  // itse taulukon määritys
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={props.trainingsData}
        columns={columns}
        getRowId={(row) => row.id}
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
        message="Training deleted!"
      />
    </Box>
  );
}
