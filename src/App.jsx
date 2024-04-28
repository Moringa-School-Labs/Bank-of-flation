import React, { useState, useEffect } from 'react';
import TransactionForm from './TransactionForm';
import SearchBar from './SearchBar';
import TransactionTable from './TransactionTable';
import './App.css';

const fetchURL = 'https://flatiron-bank-transactions.onrender.com/transactions';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    category: '',
    amount: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState(null); 

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    fetch(fetchURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        setTransactions(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(fetchURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to submit data');
        }
        return response.json();
      })
      .then((data) => {
        setTransactions([...transactions, data]);
        setFormData({ date: '', description: '', category: '', amount: '' });
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
      });
  }

  function handleDelete(id) {
    fetch(`${fetchURL}/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete transaction');
        }
        setTransactions(transactions.filter((transaction) => transaction.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting transaction:', error);
      });
  }

  function handleSort(field) {
    const sortedTransactions = [...transactions].sort((a, b) => {
      const itemA = a[field].toLowerCase();
      const itemB = b[field].toLowerCase();
      if (itemA < itemB) return -1;
      if (itemA > itemB) return 1;
      return 0;
    });

    // Toggle the sort order on subsequent clicks
    if (sortOrder === field) {
      sortedTransactions.reverse();
      setSortOrder(null); // Reset sort order
    } else {
      setSortOrder(field);
    }

    setTransactions(sortedTransactions);
  }

  function filterTransaction(transaction) {
    return transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
  }

  const filteredTransactions = transactions.filter(filterTransaction);

  return (
    <div className="container">
      <h1 className="title">The Royal Bank of Flatiron</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <TransactionForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      <TransactionTable
        transactions={filteredTransactions}
        handleDelete={handleDelete}
        handleSort={handleSort}
        sortOrder={sortOrder}
      />
    </div>
  );
}

export default App;