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
};