// MonthlyIncome.tsx
import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Heading, Spinner, Text } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Title, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';
import { GET_MONTHLY_INCOME } from './queries';
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);
const MonthlyIncome = () => {
    const { data, loading, error } = useQuery(GET_MONTHLY_INCOME);
    if (loading)
        return React.createElement(Spinner, { size: "xl" });
    if (error)
        return React.createElement(Text, { color: "red.500" },
            "Error: ",
            error.message);
    const monthlyIncomeData = data.monthlyIncome; // assuming it has a list of months and amounts
    const months = monthlyIncomeData.map((income) => income.month);
    const amounts = monthlyIncomeData.map((income) => income.amount);
    const chartData = {
        labels: months,
        datasets: [
            {
                label: 'Monthly Income',
                data: amounts,
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: true,
            },
        ],
    };
    return (React.createElement(Box, { p: 4, borderWidth: 1, borderRadius: "md", boxShadow: "md" },
        React.createElement(Heading, { as: "h2", size: "lg", mb: 4 }, "Monthly Income"),
        React.createElement(Line, { data: chartData })));
};
export default MonthlyIncome;
