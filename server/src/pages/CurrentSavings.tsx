// CurrentSavings.tsx
import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Heading, Spinner, Text } from '@chakra-ui/react';
import { Pie } from 'react-chartjs-2';
import { Chart, Tooltip, Legend, ArcElement, Title, CategoryScale, LinearScale } from 'chart.js';
// import LinearScale from 'chart.js/dist/scales/scale.linear';
import { GET_CURRENT_SAVINGS } from './queries';

Chart.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const CurrentSavings: React.FC = () => {
  const { data, loading, error } = useQuery(GET_CURRENT_SAVINGS);

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.500">Error: {error.message}</Text>;

  const savingsCategories = data.currentSavings.map((savings: any) => savings.category);
  const amounts = data.currentSavings.map((savings: any) => savings.amount);

  const chartData = {
    labels: savingsCategories,
    datasets: [
      {
        label: 'Savings Breakdown',
        data: amounts,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md">
      <Heading as="h2" size="lg" mb={4}>
        Current Savings
      </Heading>
      <Pie data={chartData} />
    </Box>
  );
};

export default CurrentSavings;
