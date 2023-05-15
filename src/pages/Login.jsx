import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import './Login.css';

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
      <div
        className="min-h-screen flex justify-center items-center image "
        data-testid="page-login"
      >
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-opacity-70"
        >
          <div className="mb-4 flex">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nome"
            >
              <span className=" font-poppins font-bold">Nome:</span>
              <input
                className="shadow appearance-none
                border rounded w-full py-2 px-3 text-gray-700
                leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                data-testid="login-name-input"
                id="nome"
                name="name"
                value={ name }
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="shadow bg-purple-500 hover:bg-purple-400
             focus:shadow-outline
             focus:outline-none text-white font-bold py-2 px-4 rounded
             "
              disabled={ this.validateName() }
              type="button"
              data-testid="login-submit-button"
              onClick={ this.click }
            >
              Entrar

            </button>
          </div>
        </form>
        {redirect && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
