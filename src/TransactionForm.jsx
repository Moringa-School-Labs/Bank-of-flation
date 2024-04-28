import React from 'react';

function TransactionForm({ formData, handleInputChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className='transaction-form'>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          max={new Date().toISOString().split('T')[0]}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className='transaction-div'>
        <button type="submit" className='transaction-button'>Add Transaction</button>
      </div>
    </form>
  );
}

export default TransactionForm;