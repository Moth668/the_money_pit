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
}`
export const GET_CURRENT_SAVINGS = gql`
query GET_CURRENT_SAVINGS($id: ID!) {
    user(id: $id) {
        Savings {
            month
            savings
        }
    }
}`

export const GET_MONTHLY_INCOME = gql`
query GET_MONTHLY_INCOME($id: ID!) {
    user(id: $id) {
        Income {
            month
            income
        }
    }
}`

export const GET_MONTHLY_EXPENSES = gql`
query GET_MONTHLY_EXPENSES($id: ID!) {
    user(id: $id) {
        Expenses {
            month
            expense
        }
    }
}`

export const GET_INVESTMENT_BALANCE = gql`
query GET_INVESTMENT_BALANCE($id: ID!) {
    user(id: $id) {
        Investments {
            month
            investment
        }
    }
}`

export const QUERY_ME = gql`
   {
    me {
      _id
      username
      email
    }
`;