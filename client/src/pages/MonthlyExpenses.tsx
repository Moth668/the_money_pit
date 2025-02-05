import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Heading, Spinner, Text } from '@chakra-ui/react-legacy';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js/auto';
import { GET_MONTHLY_EXPENSES } from '../utils/queries';
import { ChartData } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const MonthlyExpenses: React.FC = () => {
  const dummyUserId = "000000000000000000000001";
  const { data, loading, error } = useQuery(GET_MONTHLY_EXPENSES, {
    variables: { id: dummyUserId },
  });

  console.log("DATA: ", data);

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.500">Error: {error.message}</Text>;

  // Ensure data exists before proceeding
  if (!data || !data.user || !data.user.monthlyExpenses) {
    return <Text>No expense data available.</Text>;
  }

  // Extract expenses from the query result
  const expenses = data.user.monthlyExpenses;

  // Explicitly type the unique months and categories as string arrays
  interface Expense {
    month: string;
    category: string;
    expense: number;
  }

  const uniqueMonths: string[] = Array.from(new Set(expenses.map((e: Expense) => e.month)));
  const uniqueCategories: string[] = Array.from(new Set(expenses.map((e: Expense) => e.category)));

  // For each category, create a dataset with summed expenses per month.
  const datasets = uniqueCategories.map((category: string, index: number) => {
    // For each month, sum expenses for the current category
    const dataForCategory = uniqueMonths.map((month) => {
      const expensesForMonth = expenses.filter((e: Expense) => e.month === month && e.category === category);
      return expensesForMonth.reduce((sum: number, expense: Expense) => sum + expense.expense, 0);
    });

    // Define some colors for the dataset
    const colors = [
      "rgb(255, 99, 133)",
      "rgb(54, 163, 235)",
      "rgb(255, 207, 86)",
      "rgb(75, 192, 192)",
      "rgb(153, 102, 255)",
    ];
    const borderColors = [
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
      "rgb(0, 0, 0)",
    ];
    const colorIndex = index % colors.length;

    return {
      label: category, // Now explicitly a string
      data: dataForCategory,
      backgroundColor: colors[colorIndex],
      borderColor: borderColors[colorIndex],
      borderWidth: 1,
      borderRadius: 5,
    };
  });

  const chartData: ChartData<"bar", number[], unknown> = {
    labels: uniqueMonths,
    datasets: datasets,
  };

   // Chart options to customize the axes labels to be black
   const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'black', // Set label color to black
      },
    },
  },
    scales: {
      x: {
        ticks: {
          color: 'black', // Set x-axis label color to black
        },
      },
      y: {
        ticks: {
          color: 'black', // Set y-axis label color to black
        },
      },
    },
  };

  return (
    <Box p={7} borderWidth={5} borderRadius="md" boxShadow="md" borderColor='black'>
      <Heading as="h2" size="lg" mb={4}>
        Monthly Expenses
      </Heading>
      <Bar data={chartData} options={options} />
    </Box>
  );
};

export default MonthlyExpenses;
