// MonthlyIncome.tsx
import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Heading, Spinner, Text } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Title, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';
import { GET_MONTHLY_INCOME } from '../utils/queries';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

const MonthlyIncome: React.FC = () => {
  const { data, loading, error } = useQuery(GET_MONTHLY_INCOME);

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.500">Error: {error.message}</Text>;

  const monthlyIncomeData = data.monthlyIncome; // assuming it has a list of months and amounts
  const months = monthlyIncomeData.map((income: any) => income.month);
  const amounts = monthlyIncomeData.map((income: any) => income.amount);

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

  return (
    <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md">
      <Heading as="h2" size="lg" mb={4}>
        Monthly Income
      </Heading>
      <Line data={chartData} />
    </Box>
  );
};

export default MonthlyIncome;
