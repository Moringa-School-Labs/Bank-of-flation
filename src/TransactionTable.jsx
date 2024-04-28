import React from 'react';

function TransactionTable({ transactions, handleDelete, handleSort, sortOrder }) {
  const sortedTransactions = sortOrder ? [...transactions].sort((a, b) => {
    const itemA = a[sortOrder].toLowerCase();
    const itemB = b[sortOrder].toLowerCase();
    if (itemA < itemB) return -1;
    if (itemA > itemB) return 1;
    return 0;
  }) : transactions;

  return (
    <table className="transactions-table">
      <thead>
        <tr>
          <th onClick={() => handleSort('date')} className='table'>Date {sortOrder === 'date' ? '▲' : '▼'}</th>
          <th onClick={() => handleSort('description')} className='table'>Description {sortOrder === 'description' ? '▲' : '▼'}</th>
          <th onClick={() => handleSort('category')} className='table'>Category {sortOrder === 'category' ? '▲' : '▼'}</th>
          <th>Amount</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {sortedTransactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.date}</td>
            <td>{transaction.description}</td>
            <td>{transaction.category}</td>
            <td>{transaction.amount}</td>
            <td>
              <button onClick={() => handleDelete(transaction.id)} className='delete-button'>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TransactionTable;