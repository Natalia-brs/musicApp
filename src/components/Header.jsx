import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      RenderLoad: true,
    };
  }

  componentDidMount() {
    this.fetchUserName();
  }

  fetchUserName = async () => {
    const getUserName = await getUser();
    this.setState({
      RenderLoad: false,
      name: getUserName.name,
    });
  };

  render() {
    const { name, RenderLoad } = this.state;

    if (RenderLoad) return <Loading />;
    return (
      <header
        className="flex justify-center items-center"
        data-testid="header-component"
      >
        <div
          className=" bg-white w-1/2 shadow-2xl
        rounded px-8 pt-6 pb-8 mb-4 text-center"
        >
          <h1
            className="italic text-xl  font-poppins"
            data-testid="header-user-name"
          >
            Usuario:
            { ' ' }
            { name }
          </h1>

          <div className="p-4 ">
            <Link
              className="-m-1.5"
              to="/search"
              data-testid="link-to-search"
            >
              <span className="m-4">Pesquisar</span>
            </Link>
            <Link to="/favorites" data-testid="link-to-favorites">
              <span className="m-4">Musicas Favoritas</span>
            </Link>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
