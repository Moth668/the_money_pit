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
    date: String
    }

  type Expense {
    month: String
    expense: Float
    date: String
  }

  type Savings {
    month: String
    savings: Float
    date: String
  }

  type Investment {
    month: String
    investment: Float
    date: String
  }
`;

export default user;
