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
  const uniqueMonths: string[] = Array.from(new Set(expenses.map((e: any) => e.month)));
  const uniqueCategories: string[] = Array.from(new Set(expenses.map((e: any) => e.category)));

  // For each category, create a dataset with summed expenses per month.
  const datasets = uniqueCategories.map((category: string, index: number) => {
    // For each month, sum expenses for the current category
    const dataForCategory = uniqueMonths.map((month) => {
      const expensesForMonth = expenses.filter((e: any) => e.month === month && e.category === category);
      return expensesForMonth.reduce((sum: number, expense: any) => sum + expense.expense, 0);
    });

    // Define some colors for the dataset
    const colors = [
      "rgba(255,99,132,0.2)",
      "rgba(54,162,235,0.2)",
      "rgba(255,206,86,0.2)",
      "rgba(75,192,192,0.2)",
      "rgba(153,102,255,0.2)",
    ];
    const borderColors = [
      "rgba(255,99,132,1)",
      "rgba(54,162,235,1)",
      "rgba(255,206,86,1)",
      "rgba(75,192,192,1)",
      "rgba(153,102,255,1)",
    ];
    const colorIndex = index % colors.length;

    return {
      label: category, // Now explicitly a string
      data: dataForCategory,
      backgroundColor: colors[colorIndex],
      borderColor: borderColors[colorIndex],
      borderWidth: 1,
    };
  });

  const chartData: ChartData<"bar", number[], unknown> = {
    labels: uniqueMonths,
    datasets: datasets,
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
