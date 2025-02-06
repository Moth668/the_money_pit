import { gql } from '@apollo/client';

export const ADD_MONTHLY_INCOME = gql`
mutation AddMonthlyIncome($id: ID!, $month: String!, $income: Float!, $date: String!) {
    addIncome(id: $id, month: $month, income: $income, date: $date) {
        month
        income
        date
    }
}
`;

export const ADD_MONTHLY_EXPENSES = gql`
mutation AddMonthlyExpenses($id: ID!, $month: String!, $expense: Float!, $date: String!) {
    addExpense(id: $id, month: $month, expense: $expense, date: $date) {
        month
        expense
        date
    }
}
`;

export const ADD_CURRENT_SAVINGS = gql`
mutation AddCurrentSavings($id: ID!, $month: String!, $savings: Float!, $date: String!) {
    addSavings(id: $id, month: $month, savings: $savings, date: $date) {
        month
        savings
        date
    }
}
`;

export const ADD_CURRENT_INVESTMENTS = gql`
mutation AddInvestmentBalance($id: ID!, $month: String!, $investment: Float!, $date: String!) {
    addInvestment(id: $id, month: $month, investment: $investment, date: $date) {
        month
        investment
        date
    }
}
`;

export const DELETE_MONTHLY_INCOME = gql`
mutation DeleteIncome($id: ID!, $month: String!) {
    deleteIncome(id: $id, month: $month) {
        month
        income
        date
    }
}
`;

export const DELETE_MONTHLY_EXPENSES = gql`
mutation DeleteExpense($id: ID!, $month: String!) {
    deleteExpense(id: $id, month: $month) {
        month
        expense
        date
    }
}
`;

export const DELETE_CURRENT_SAVINGS = gql`
mutation DeleteSavings($id: ID!, $month: String!) {
    deleteSavings(id: $id, month: $month) {
        month
        savings
        date
    }
}
`;

export const DELETE_CURRENT_INVESTMENTS = gql`
mutation DeleteInvestment($id: ID!, $month: String!) {
    deleteInvestment(id: $id, month: $month) {
        month
        investment
        date
    }
}
`;

export const LOGIN_USER = gql`
  mutation Login($login: String!, $password: String!) {
  login(login: $login, password: $password) {
      token
      user {
        username
        email
        id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      user {
        id
        username
      }
    }
  }
`;