import React, { Component } from 'react';
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
      <header data-testid="header-component">
        <h1 data-testid="header-user-name">
          {' '}
          { name }
        </h1>
      </header>
    );
  }
}

export default Header;
