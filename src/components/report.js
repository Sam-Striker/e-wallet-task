import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './report.css'; 

function ReportComponent(props) {
  const generateReport = () => {
    const { transactions, startDate, endDate } = props;
    const filteredTransactions = transactions.filter(
      (transaction) =>
        transaction.date >= startDate && transaction.date <= endDate
    );

    const doc = new jsPDF('p', 'pt');
    doc.text(20, 20, 'Transaction Report');

    const tableColumns = ['Transaction Type', 'Date', 'Amount', 'Category', 'Subcategory'];
    const tableRows = [];

    filteredTransactions.forEach((transaction) => {
      const rowData = [
        transaction.type,
        transaction.date,
        transaction.amount,
        transaction.category,
        transaction.subcategory,
      ];
      tableRows.push(rowData);
    });

    doc.autoTable({
      head: [tableColumns],
      body: tableRows,
      startY: 50,
      styles: { halign: 'center', cellPadding: 10 },
    });

    doc.save('TransactionReport.pdf');
  };

  return (
    <div className="report-component">
      <button onClick={generateReport}>Generate Report</button>
    </div>
  );
}

export default ReportComponent;
