import React, { useEffect, useState } from 'react'
import Header from 'components/Header'
import client from 'adapters/localStorageClient';
import { Bill } from 'types/bill';

const Home: React.FC = () => {
  const [bills, setBills] = useState<Bill[] | null>([]);

  useEffect(() => {
    client.fetchBills().then((localBills) => {
      setBills(localBills);
    }).catch(() => {
      alert('Please try again later.')
    });
  }, []);

  return (
    <div>
      <Header title='我的账本' />
    </div>
  )
}

export default Home