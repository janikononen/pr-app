import { CSVLink } from "react-csv";
import { CustomerDataProps } from "../../types";
import { Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

// komponentti lataamaan välitetyt tiedot csv-tiedostona
export default function ToCsvFile(props: CustomerDataProps) {
  return (
    <CSVLink
      data={props.customersData}
      target="_blank"
      filename="customers.csv"
    >
      <Button color="info" variant="outlined" startIcon={<FileDownloadIcon />}>
        CSV
      </Button>
    </CSVLink>
  );
}
