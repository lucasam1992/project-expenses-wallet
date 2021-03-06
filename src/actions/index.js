// Coloque aqui suas actions
import getCurrentMoneyAPILocation from '../services/MoneyAPI';

export const LOGIN = 'LOGIN';
export const REQUEST_API = 'REQUEST_API';
export const GET_MONEY = 'GET_MONEY';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const SUM_TOTAL = 'SUM_TOTAL';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';

export const login = (email) => ({
  type: LOGIN,
  payload: {
    email,
  },
});

export const requestAPI = () => ({
  type: REQUEST_API,
}); // info esta sendo chamada - carregando

export const getMoney = (currencies) => ({
  type: GET_MONEY,
  payload: {
    currencies,
  },
});

export const thunkMoneyAPI = () => (dispatch) => {
  dispatch(requestAPI()); // loading

  getCurrentMoneyAPILocation() // chamada da api
    .then((res) => {
      const recieveCurriencesAPIKey = Object.keys(res);
      const filterUSDT = recieveCurriencesAPIKey
        .filter((currencieKey) => currencieKey !== 'USDT'); // filtrando para fora USDT
      dispatch(getMoney(filterUSDT));
    });
};

export const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  payload: {
    expenses,
  },
}); // REQ 8

export const deleteExpenses = (expenses) => ({
  type: DELETE_EXPENSES,
  payload: {
    expenses,
  },
});
