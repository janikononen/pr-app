import { useEffect, useState } from "react";
import { Customer } from "../types";
import Customertable from "../components/Customertable";
import AddCustomer from "../components/AddCustomer"; // Adjust the path as needed

function Customerlist() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch(
      "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers"
    )
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
      <AddCustomer fetchCustomers={fetchCustomers} />
      <Customertable customersData={customers} />
    </div>
  );
}

export default Customerlist;
