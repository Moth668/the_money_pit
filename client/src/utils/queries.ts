import { gql } from '@apollo/client';



export const GET_USER_DETAILS = gql`
query GET_USER_DETAILS($id: ID!) {
    user(id: $id) {
        name
        Income {
            month
            income
            date
        }
        Expenses {
            month
            expense
            date
        }
        Savings {
            month
            savings
            date
        }
        Investments {
            month
            investment
            date
        }
    }
}`
export const GET_CURRENT_SAVINGS = gql`
query GET_CURRENT_SAVINGS($id: ID!) {
    user(id: $id) {
        Savings {
            month
            savings
            date
        }
    }
}`

export const GET_MONTHLY_INCOME = gql`
query GET_MONTHLY_INCOME($id: ID!) {
    user(id: $id) {
        Income {
            month
            income
            date
        }
    }
}`

export const GET_MONTHLY_EXPENSES = gql`
query GET_MONTHLY_EXPENSES($id: ID!) {
    user(id: $id) {
        Expenses {
            month
            expense
            date
        }
    }
}`

export const GET_INVESTMENT_BALANCE = gql`
query GET_INVESTMENT_BALANCE($id: ID!) {
    user(id: $id) {
        Investments {
            month
            investment
            date
        }
    }
}`;