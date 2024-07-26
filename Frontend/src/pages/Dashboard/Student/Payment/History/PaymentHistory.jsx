import React, { useEffect } from 'react';
import { Pagination } from '@mui/material'; // Import the Pagination component
import useAxiosFetch from '../../../../../hooks/useAxiosFetch';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import useUser from '../../../../../hooks/useUser';
import { useState } from 'react';

const PaymentHistory = () => {
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useUser();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginatedPayments, setPaginatedPayments] = useState([]);
  const totalItem = payments.length;
  const [page, setPage] = useState(1);
  let itemsPerPage = 5;
  let totalPage = Math.ceil(totalItem / itemsPerPage);

  const handleChange = (event, value) => {
    setPage(value);
  }

  useEffect(() => {
    const lastIndex = page * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = payments.slice(firstIndex, lastIndex);
    setPaginatedPayments(currentItems);
  }, [page, payments]);

  useEffect(() => {
    if (currentUser && currentUser.email) { // Check if currentUser exists and has an email property
      axiosFetch.get(`/payment-history/${currentUser.email}`)
        .then(res => {
          setPayments(res.data);
          setLoading(false);
        })
        .catch(err => console.log(err));
    }
  }, [currentUser]);

  const totalPaidAmount = payments.reduce((acc, curr) => acc + curr.amount, 0);

  if (loading) {
    return <p>Loading...</p>;
  }
  console.log(payments);
  return (
    <div className='w-full'>
      <div className='text-center mt-6 mb-16'>
        <p className='text-gray-400'>Hey, <span className='text-secondary font-bold'>{currentUser ? currentUser.name : ''}</span> Welcome....</p>
        <h1 className='text-4xl font-bold'>My Payment History</h1>
        <p className='text-gray-500 text-sm my-3'>You can see your payment history here</p>
      </div>

      {/* payment table here */}
      <div className='w-full'>
        <div className='flex justify-between mb-4'>
          <p className='font-bold'>Total Payments: {payments.length}</p>
          <p className='font-bold'>Total Paid: {totalPaidAmount}</p>
        </div>

        <div className='bg-white rounded-lg shadow-md p-6 mb-4 overflow-x-auto'>
          <table className='w-full table-fixed'>
            <thead>
              <tr>
                <th className='text-left font-semibold p-4 border-b w-1/4'>#</th>
                <th className='text-left font-semibold p-4 border-b w-1/4'>Amount</th>
                <th className='text-left font-semibold p-4 border-b w-1/4'>Total Item</th>
                <th className='text-left font-semibold p-4 border-b w-1/4'>Time</th>
              </tr>
            </thead>
            <tbody>
              {
                paginatedPayments.length === 0
                  ? <tr><td colSpan='4' className='text-center text-2xl font-bold p-4'>No Payment record</td></tr>
                  : paginatedPayments.map((item, idx) => {
                    console.log(item);
                    const letIdx = (page - 1) * itemsPerPage + idx + 1;
                    return (
                      <tr key={item._id}>
                        <td className='p-4 border-b'>{letIdx}</td>
                        <td className='p-4 border-b'>{item.amount}</td>
                        <td className='p-4 border-b'>{item.classesId.length}</td>
                        <td className='p-4 border-b'>{item.date}</td>
                      </tr>
                    );
                  })
              }
            </tbody>
          </table>
        </div>

        <div className='flex justify-center mt-4'>
          <Pagination
            count={totalPage}
            page={page}
            onChange={handleChange}
            color='primary'
            showFirstButton
            showLastButton
          />
        </div>
      </div>
    </div>
  );
}

export default PaymentHistory;
