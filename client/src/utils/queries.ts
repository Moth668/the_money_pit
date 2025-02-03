import { gql } from '@apollo/client';

export const GET_USER_DETAILS = gql`
query GET_USER_DETAILS($id: ID!) {
    user(id: $id) {
        name
        Income {
            month
            income
        }
        Expenses {
            month
            expense
        }
        Savings {
            month
            savings
        }
        Investments {
            month
            investment
        }
    }
}
`;

export const GET_CURRENT_SAVINGS = gql`
query ($id: ID!) {
    user(id: $id) {
        currentSavings {
            month
            savings
        }
    }
}
`;

export const GET_MONTHLY_INCOME = gql`
query($id: ID) {
  user(id: $id) {
    monthlyIncome {
      income
      month
    }
  }
}
`;

export const GET_MONTHLY_EXPENSES = gql`
  query ($id: ID!) {
    user(id: $id) {
      monthlyExpenses {
        month
        category
        expense
      }
    }
  }
`;

export const GET_INVESTMENT_BALANCE = gql`
query($id: ID) {
  user(id: $id) {
    currentInvestments {
      month
      investment
    }
  }
}
`;

export const QUERY_ME = gql`
   {
    me {
      _id
      username
      email
    }
}
`;