import { useEffect, useState } from "react";
import { Customer } from "../types";
import Customertable from "../components/tables/Customertable";
import AddCustomer from "../components/dialogs/AddCustomer"; // Adjust the path as needed
import ToCsvFile from "../components/otherComponents/ToCsvFile";

function CustomerlistPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetchCustomers();
    document.title = "Customer List";
  }, []);

  const fetchCustomers = () => {
    fetch(`${import.meta.env.VITE_API_URL}customers`)
      .then((Response) => {
        if (Response.ok) return Response.json();
        throw new Error("response was not ok");
      })
      .then((data) => {
        setCustomers(data._embedded.customers);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  };

  return (
    <div>
      <h1>Customer List</h1>
      <p> Here is a list of customers</p>
      <div>
        <AddCustomer
          fetschCustomers={fetchCustomers}
          customersData={customers}
        />
        <ToCsvFile customersData={customers} fetschCustomers={fetchCustomers} />
        <Customertable
          customersData={customers}
          fetschCustomers={fetchCustomers}
        />
      </div>
    </div>
  );
}

export default CustomerlistPage;
