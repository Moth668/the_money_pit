const user = `
  type Query {
    name: String
    monthlyIncome: [Income]
    monthlyExpenses: [Expense]
    currentSavings: [Savings]
    currentInvestments: [Investment]
  }

  type Income {
    month: String
    income: Float
  }

  type Expense {
    month: String
    expense: Float
  }

  type Savings {
    month: String
    savings: Float
  }

  type Investment {
    month: String
    investment: Float
  }
`;

export default user;
