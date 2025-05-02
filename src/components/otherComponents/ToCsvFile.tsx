import { CSVLink } from "react-csv";
import { CustomerDataProps, CustomerDTO } from "../../types";
import { Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useEffect, useState } from "react";

// funktionaalisuus csv tiedoston luomiseen
export default function ToCsvFile(props: CustomerDataProps) {
  const [customerData, setCustomerData] = useState<CustomerDTO[]>([]);

  useEffect(() => {
    const sanitizedData = props.customersData.map(
      ({ _links, ...rest }) => rest
    );
    setCustomerData(sanitizedData);
  }, [props.customersData]);

  return (
    <CSVLink data={customerData} target="_blank" filename="customers.csv">
      <Button color="info" variant="outlined" startIcon={<FileDownloadIcon />}>
        CSV
      </Button>
    </CSVLink>
  );
}
