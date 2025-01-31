import React, { useState, FormEvent } from 'react';

const MyForm = () => {
    // State to store form data
    const [income, setIncome] = useState('');
    const [monthlyExpenses, setMonthlyExpense] = useState('');
    const [monthlySavings, setMonthlySavings] = useState('');
    const [error, setError] = useState('');

    // Handle form submission
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Basic validation
        

        // Clear error and handle form data
        setError('');
        const formData = {
            income,
            monthlyExpenses,
            monthlySavings,
        };
        console.log('Form Data Submitted:', formData);

        // Clear the form
        setIncome('');
        setMonthlyExpense('');
        setMonthlySavings('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Income:
                    <input
                        type="text"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                    />
                </label>
            </div>
            <label>
                Total Monthly Expenses:
                <input
                    type="number"
                    value={monthlyExpenses}
                    onChange={(e) =>setMonthlyExpense(e.target.value)}
                    placeholder="Enter your expenses"
                />
            </label>
            <div>
            <input
                    type="number"
                    value={monthlySavings}
                    onChange={(e) =>setMonthlySavings(e.target.value)}
                    placeholder="Enter your Savings"
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Submit</button>
        </form>
    );
};

export default MyForm;