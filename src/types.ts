export type Training = {
    id: number;
    date: string;
    duration: number;
    activity: string;
    customer: Customer;
}

export type Customer = {
    id: number;
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
    _links: {
        self: {
            href: string;
        };
        customer: {
            href: string;
        };
    };
}

export type TrainingDTO = {
    date: string;
    duration: string;
    activity: string;
    customer: string;
}

export type CustomerDTO = {
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
}

export type CustomerDataProps = {
  customersData: Customer[];
  fetschCustomers: () => void;
};

export type EditCustomerProps = {
  customer: Customer;
  fetchCustomers: () => void;
};

export type TrainingTableProps = {
  trainingsData: Training[];
  fetchTrainings: () => void;
};