import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

function createName(name) {
    return {
        type: 'CREATE_NAME',
        name
    };
}

const reducer = (state, action) => {
  switch (action.type) {
      case 'INCREMENT':
        return { ...state, counter: state.counter + 1 };
      case 'DECREMENT':
        return { ...state, counter: state.counter - 1 };
      case 'CREATE_NAME':
          return {...state, name: action.name};
    default:
      return state;
    }
};

const store = createStore(reducer, { counter: 0, name: 'You' });

class Counter extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            name: ''
        };

        this.onNameChange = this.onNameChange.bind(this);
    }



  // static propTypes = {
  //   counter: PropTypes.number,
  //   onIncrement: PropTypes.func,
  //   onDecrement: PropTypes.func,
  //   name: PropTypes.string,
  //   onNameChange: PropTypes.func,
  // };


  onNameChange (event) {
      const name = this.state.name;
      this.setState({
          name: event.target.value
      });
  };

  onClickOK() {
      this.props.createName(this.state.name);
  }


  render() {
    const { counter, onDecrement, onIncrement, name, onChange, createName, onClickOK } = this.props;

    return (
      <div>
        <div>{name}</div>
        <input
            type="text"
            placeholder="Imię"
            value={this.state.name}
            onChange={this.onNameChange} />
        <button onClick={onClickOK}>OK</button>

        <div>{counter}</div>
        <button onClick={onDecrement}>-</button>
        <button onClick={onIncrement}>+</button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    onIncrement: () => dispatch({ type: 'INCREMENT' }),
    onDecrement: () => dispatch({ type: 'DECREMENT' }),
    onClickOK: () => dispatch(createName())
  }
};

Counter = connect(mapStateToProps, mapDispatchToProps)(Counter);

render(
  <Provider store={store}>
    <Counter />
  </Provider>
  , document.getElementById('root')
);