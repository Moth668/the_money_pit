// CurrentSavings.tsx
import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Heading, Spinner, Text } from '@chakra-ui/react';
import { Bar } from 'react-chartjs-2';
import { Chart, Tooltip, Legend, ArcElement, Title, CategoryScale, LinearScale } from 'chart.js';
// import LinearScale from 'chart.js/dist/scales/scale.linear';
import { GET_CURRENT_SAVINGS } from '../utils/queries';

// Register Chart.js components
Chart.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const CurrentSavings: React.FC = () => {
  const { data, loading, error } = useQuery(GET_CURRENT_SAVINGS);

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.500">Error: {error.message}</Text>;

  interface Savings {
    month: string;
    income: number;
  }
  // Data for chart
  const months  = data.currentSavings.map((savings: Savings) => savings.month);
  const saving = data.currentSavings.map((savings: Savings) => savings.income);

  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Monthly Savings',
        data: saving,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderColor: '#1D69E1',
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

//Chart options to customize the chart
const chartOptions = {
  responsive: true,
  plugin: {
    legend: {
      position: 'top',
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Month',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Savings ($)',
      },
      ticks: {
        beginAtZero: true,
        autoSkip: true,
        maxTicksLimit: 10,
      },
    },
  },
};


  return (
    <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md">
      <Heading as="h2" size="lg" mb={4}>
        Current Savings
      </Heading>
      <Bar data={chartData} options={chartOptions} />
    </Box>
  );
};

export default CurrentSavings;