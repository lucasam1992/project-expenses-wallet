import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenses as deleteExpensesAction } from '../actions';

class Table extends React.Component {
  render() {
    const { expenses, deleteExpenses } = this.props;
    const headingNames = ['Descrição', 'Tag',
      'Método de pagamento', 'Valor', 'Moeda', 'Câmbio utilizado',
      'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <div>
        <table>
          <thead>
            <tr>{headingNames.map((heading, key) => <th key={ key }>{heading}</th>)}</tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={ index }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.value}</td>
                <td>{expense.exchangeRates[expense.currency].name.split('/')[0]}</td>
                <td>
                  {parseFloat(
                    expense.exchangeRates[expense.currency].ask,
                  ).toFixed(2)}
                </td>
                <td>{expense.value * expense.exchangeRates[expense.currency].ask}</td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => deleteExpenses(expense.id) }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenses: (id) => dispatch(deleteExpensesAction(id)),
});

Table.propTypes = {
  expenses: PropTypes.string.isRequired,
  deleteExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
