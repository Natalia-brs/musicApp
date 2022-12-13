import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      verifyLoad: false,
      redirect: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  validateName = () => {
    const numbervalid = 3;
    const { name } = this.state;
    const valid = (name.length < numbervalid);
    return valid;
  };

  click = () => {
    const { name } = this.state;
    this.setState(
      { verifyLoad: true },
      async () => {
        const obj = {
          name,
        };
        await createUser(obj);
        this.setState({
          verifyLoad: false,
          redirect: true,
        });
      },
    );
  };

  render() {
    const { name, verifyLoad, redirect } = this.state;
    if (verifyLoad) return <Loading />;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="nome">
            <span>Nome:</span>
            <input
              type="text"
              data-testid="login-name-input"
              id="nome"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>

          <button
            disabled={ this.validateName() }
            type="button"
            data-testid="login-submit-button"
            onClick={ this.click }
          >
            Entrar

          </button>
        </form>
        {redirect && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
