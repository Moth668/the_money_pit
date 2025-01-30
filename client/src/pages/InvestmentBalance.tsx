// InvestmentBalance.tsx
import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Heading, Spinner, Text } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js/auto';
import { GET_INVESTMENT_BALANCE } from './queries';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

const InvestmentBalance: React.FC = () => {
  const { data, loading, error } = useQuery(GET_INVESTMENT_BALANCE);

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.500">Error: {error.message}</Text>;

  const investmentData = data.investmentBalance; // assuming it has a list of months and balances
  const months = investmentData.map((investment: any) => investment.month);
  const balances = investmentData.map((investment: any) => investment.balance);

  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Investment Balance',
        data: balances,
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
        fill: true,
      },
    ],
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md">
      <Heading as="h2" size="lg" mb={4}>
        Investment Balance
      </Heading>
      <Line data={chartData} />
    </Box>
  );
};

export default InvestmentBalance;
