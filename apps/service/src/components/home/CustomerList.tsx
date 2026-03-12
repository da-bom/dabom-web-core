import { CustomerListType } from 'src/types/DataUsage';

import CustomerItem from './CustomerItem';

const CustomerList = ({ customers }: { customers: CustomerListType[] }) => {
  return (
    <ul className="flex w-full flex-col gap-4 px-[25px] pt-10 pb-5">
      {customers.map((customer) => (
        <CustomerItem key={customer.customerId} customer={customer} />
      ))}
    </ul>
  );
};

export default CustomerList;
