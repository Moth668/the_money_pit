import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Heading, Spinner, Text } from '@chakra-ui/react-legacy';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js/auto';
import { GET_INVESTMENT_BALANCE } from '../utils/queries';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

const InvestmentBalance: React.FC = () => {
  const dummyUserId = "000000000000000000000001"; // Make sure this matches the seeded dummy user
  const { data, loading, error } = useQuery(GET_INVESTMENT_BALANCE, {
    variables: { id: dummyUserId },
  });

  console.log("DATA: ", data);

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.500">Error: {error.message}</Text>;

  // Defensive check: ensure that data.user and data.user.currentInvestments exist
  if (!data || !data.user || !data.user.currentInvestments) {
    return <Text>No investment data available.</Text>;
  }

  const investmentData = data.user.currentInvestments;
  const months = investmentData.map((item: any) => item.month);
  const investments = investmentData.map((item: any) => item.investment);

  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Investment Balance',
        data: investments,
        borderColor: 'rgb(3, 55, 5)',
        backgroundColor: 'rgb(232, 206, 9)',
        fill: true,
      },
    ],
  };

  // Chart options with custom x and y axis title colors
  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months', // Label for the x-axis
          color: 'black', // Make the x-axis title black
          font: {
            size: 16, // Adjust the font size if needed
          },
        },
        ticks: {
          color: 'black', // Make x-axis ticks black
        },
      },
      y: {
        title: {
          display: true,
          text: 'Investment Balance', // Label for the y-axis
          color: 'black', // Make the y-axis title black
          font: {
            size: 16, // Adjust the font size if needed
          },
        },
        ticks: {
          color: 'black', // Make y-axis ticks black
        },
      },
    },
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
        Investment Balance
      </Heading>
      <Line data={chartData} options={options} />
    </Box>
  );
};

export default InvestmentBalance;