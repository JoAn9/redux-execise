import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

const reducer = (state, action) => {
  switch (action.type) {
      case 'INCREMENT':
        return { ...state, counter: state.counter + 1 };
      case 'DECREMENT':
        return { ...state, counter: state.counter - 1 };
      case 'CREATE_NAME':
          return {...state, name };
    default:
      return state;
    }
};

const store = createStore(reducer, { counter: 0, name: 'You' });

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };

        this.onNameChange = this.onNameChange.bind(this);
    }

  // static propTypes = {
  //   counter: PropTypes.Number,
  //   onIncrement: PropTypes.func,
  //   onDecrement: PropTypes.func,
  //   name: PropTypes.String,
  //   onNameChange: PropTypes.func,
  //   onBlurInput: PropTypes.func
  // };


  onNameChange (event) {
      const name = 'mar';
      this.setState({
          name: event.target.value
      });

  };


  render() {
    const { counter, onDecrement, onIncrement, name, onChange } = this.props;

    return (
      <div>
        <div>{name}</div>
        <input
            type="text"
            placeholder="Imię"
            value={this.state.name}
            onChange={this.onNameChange}
        />
        <button onClick={onChange}>OK</button>

        <div>{counter}</div>
        <button onClick={onDecrement}>-</button>
        <button onClick={onIncrement}>+</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: () => dispatch({ type: 'INCREMENT' }),
    onDecrement: () => dispatch({ type: 'DECREMENT' }),
    onChange: () => dispatch({ type: 'CREATE_NAME' })
  }
};

Counter = connect(mapStateToProps, mapDispatchToProps)(Counter);

render(
  <Provider store={store}>
    <Counter />
  </Provider>
  , document.getElementById('root')
);