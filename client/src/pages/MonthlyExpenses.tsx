// MonthlyExpenses.tsx
import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Heading, Spinner, Text } from '@chakra-ui/react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js/auto';
import { GET_MONTHLY_EXPENSES } from '../utils/queries';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const MonthlyExpenses: React.FC = () => {
  const { data, loading, error } = useQuery(GET_MONTHLY_EXPENSES);

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.500">Error: {error.message}</Text>;

  const categories = data.monthlyExpenses.map((expense: any) => expense.category);
  const amounts = data.monthlyExpenses.map((expense: any) => expense.amount);

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: 'Monthly Expenses',
        data: amounts,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md">
      <Heading as="h2" size="lg" mb={4}>
        Monthly Expenses
      </Heading>
      <Bar data={chartData} />
    </Box>
  );
};

export default MonthlyExpenses;
