import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

function createUser(name, band) {
    return {
        type: 'CREATE_USER',
        name,
        band
    };
}

const reducer = (state, action) => {
  switch (action.type) {
      case 'CREATE_USER':
          return {...state, name: action.name, band: action.band};

    default:
      return state;
    }
};

const store = createStore(reducer, { name: 'You', band: '' });

class User extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            name: '',
            band: ''
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onBandChange = this.onBandChange.bind(this);
    }


    onNameChange (event) {
        const name = this.state.name;
        this.setState({
            name: event.target.value
        });
    };

    onBandChange (event) {
        const band = this.state.band;
        this.setState({
            band: event.target.value
        });
    };

    onOKClick = (e) => {
      e.preventDefault();
      this.props.onOKClick(this.state.name, this.state.band);
    };


  render() {
    const { name, band } = this.props;

    return (
      <form onSubmit={e => this.onOKClick(e)}>
        <div>Imię: {name}</div>
        <div>Zespół: {band}</div>
        <input
            type="text"
            placeholder="Imię"
            value={this.state.name}
            onChange={this.onNameChange} />

        <input
            type="text"
            placeholder="Zespół"
            value={this.state.band}
            onChange={this.onBandChange} />

        <input type="submit" value="Submit" />

      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    onOKClick: (name, band) => dispatch(createUser(name, band)),
  }
};

User = connect(mapStateToProps, mapDispatchToProps)(User);

render(
  <Provider store={store}>
    <User />
  </Provider>
  , document.getElementById('root')
);