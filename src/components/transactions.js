import React, { useState,useEffect } from "react";
import "./transactions.css";
import Report from "./report";

function TransactionTracker() {
    const [transactions, setTransactions] = useState([]);
    const [transactionType, setTransactionType] = useState("Income");
    const [transactionDate, setTransactionDate] = useState("");
    const [transactionAmount, setTransactionAmount] = useState("");
    const [transactionCategory, setTransactionCategory] = useState("");
    const [transactionSubCategory, setTransactionSubCategory] = useState("");
    const [transactionDescription, setTransactionDescription] = useState("");
    const [budget, setBudget] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
    const [budgetExceeded, setBudgetExceeded] = useState(false);
  
    const categories = [
      "Groceries",
      "Entertainment",
      "Clothing",
      "Travel",
      "Investments",
      "Salary",
      "Gifts",
      "Other Expenses",
    ];
  
    const subcategories = {
      Groceries: ["Supermarket", "Local Market"],
      Entertainment: ["Movies", "Concerts", "Games", "Books"],
      Clothing: ["Shoes", "Accessories", "T-Shirts", "Dresses"],
      Travel: ["Flights", "Hotels", "Transportation", "Tours"],
      Investments: ["Stocks", "Bonds", "Cryptocurrency"],
      Salary: ["Job 1", "Job 2", "Job 3"],
      Gifts: ["Friends", "Family", "Colleagues"],
      "Other Expenses": ["Utilities", "Healthcare", "Education", "Miscellaneous"],
    };
  
    const handleAddTransaction = () => {
      if (transactionDate && transactionAmount && transactionCategory && transactionSubCategory) {
        const newTransaction = {
          type: transactionType,
          date: transactionDate,
          amount: parseFloat(transactionAmount),
          category: transactionCategory,
          subcategory: transactionSubCategory,
          description: transactionDescription,
        };
  
        setTransactions([...transactions, newTransaction]);
        setTransactionType("Income");
        setTransactionDate("");
        setTransactionAmount("");
        setTransactionCategory("");
        setTransactionSubCategory("");
        setTransactionDescription("");
      }
    };
  
    const updateBudget = () => {
      const newBudget = parseFloat(prompt("Enter new budget:"));
      setBudget(newBudget);
      setBudgetExceeded(false);
    };
  
    useEffect(() => {
      const income = transactions
        .filter((transaction) => transaction.type === "Income")
        .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
  
      const expense = transactions
        .filter((transaction) => transaction.type === "Expense")
        .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
  
      const totalAmount = income - expense;
      setTotalIncome(income); // You need to define setTotalIncome and setExpenseSum
      setTotalExpense(expense);
  
      if (totalAmount > budget) {
        setBudgetExceeded(true);
      } else {
        setBudgetExceeded(false);
      }
    }, [transactions, budget]);
  
    const income = transactions
      .filter((transaction) => transaction.type === "Income")
      .reduce((total, transaction) => total + transaction.amount, 0);
  
    const expense = transactions
      .filter((transaction) => transaction.type === "Expense")
      .reduce((total, transaction) => total + transaction.amount, 0);
      

  return (
    <div className="transaction-tracker-app">
        <h2>Budget:</h2>
        <p className="budget-exceeds">
          {budgetExceeded ? "Budget Exceeded! " : ""}${budget.toLocaleString()}
        </p>
<button onClick={updateBudget} className="budget-button">Set Budget</button>

      <h1>Transaction Tracker</h1>

      <div className="transaction-form">
        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        <input
          type="date"
          value={transactionDate}
          onChange={(e) => setTransactionDate(e.target.value)}
        />

<div className="subcategory-selection">
  <label htmlFor="category">Category:</label>
  <select
    id="category"
    value={transactionCategory}
    onChange={(e) => setTransactionCategory(e.target.value)}
  >
    <option value="">Select Category</option>
    {categories.map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    ))}
  </select>
  
</div>


        <div className="subcategory-selection">
          <label htmlFor="subcategory">Subcategory:</label>
          <select
            id="subcategory"
            value={transactionSubCategory}
            onChange={(e) => setTransactionSubCategory(e.target.value)}
          >
            <option value="">Select Subcategory</option>
            {subcategories[transactionCategory] &&subcategories[transactionCategory] ?
              subcategories[transactionCategory].map((subcategory,index) => (
                <option key={index} value={subcategory}>
                  {subcategory}
                </option>
              )):null}
          </select>
        </div>

        <input
          type="text"
          placeholder="Description"
          value={transactionDescription}
          onChange={(e) => setTransactionDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={transactionAmount}
          onChange={(e) => setTransactionAmount(e.target.value)}
        />

        <button onClick={handleAddTransaction}>Add Transaction</button>
      </div>

      <div className="summary">
        <h2>Summary</h2>
        <div>
          <strong>Total Income:</strong> ${totalIncome.toFixed(2)}
        </div>
        <div>
          <strong className="message">Total Expense:</strong> ${totalExpense.toFixed(2)}
        </div>
        <div>
          <strong>Balance:</strong> ${(income - expense).toFixed(2)}
        </div>
      </div>

      <div className="transaction-list">
      <div className="report-section">
            <Report
              transactions={transactions}
              startDate={startDate}
              endDate={endDate}
            />
          </div>
          <div className="transaction-form">
            <label>Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label>End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        <h2>Transaction History</h2>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.type}</td>
                <td>{transaction.date}</td>
                <td>{transaction.category}</td>
                <td>{transaction.description}</td>
                <td>${transaction.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionTracker;
