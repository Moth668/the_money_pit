import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Heading, Spinner, Text } from '@chakra-ui/react-legacy';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Title, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';
import { GET_MONTHLY_INCOME } from '../utils/queries';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

const MonthlyIncome: React.FC = () => {
  const dummyUserId = "000000000000000000000001";
  const { data, loading, error } = useQuery(GET_MONTHLY_INCOME, {
    variables: { id: dummyUserId },
  });

  console.log("DATA: ", data);

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.500">Error: {error.message}</Text>;

  // Check the correct field returned by the server
  if (!data || !data.user || !data.user.monthlyIncome) {
    return <Text>No income data available.</Text>;
  }

  // Use the correct field name: monthlyIncome (all lowercase)
  const monthlyIncomeData = data.user.monthlyIncome;
  interface IncomeData {
    month: string;
    income: number;
  }

  const months = monthlyIncomeData.map((income: IncomeData) => income.month);
  const amounts = monthlyIncomeData.map((income: IncomeData) => income.income);

  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Monthly Income',
        data: amounts,
        borderColor: 'rgb(14, 1, 1)',
        backgroundColor: 'rgba(245, 245, 40, 0.94)',
        fill: true,
      },
    ],
  };

  // Customize chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'black', // Make the legend text black
        },
      },
    },
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md">
      <Heading as="h2" size="lg" mb={4}>
        Monthly Income
      </Heading>
      <Line data={chartData} options={options} />
    </Box>
  );
};

export default MonthlyIncome;
