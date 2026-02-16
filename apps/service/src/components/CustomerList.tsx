import { CustomerListType } from "src/types/dataUsage";

import CustomerItem from "./CustomerItem";

const CustomerList = ({ customers }: { customers: CustomerListType[] }) => {
  return (
    <ul className="flex flex-col gap-8">
      {customers.map((customer) => (
        <CustomerItem key={customer.customerId} customer={customer} />
      ))}
    </ul>
  );
};

export default CustomerList;
