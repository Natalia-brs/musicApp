import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
  }

  handleArtist = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  validateArtist = () => {
    const numbervalid = 2;
    const { name } = this.state;
    const valid = (name.length < numbervalid);
    return valid;
  };

  render() {
    const { name } = this.state;
    return (
      <div data-testid="page-search">
        <form>
          <label htmlFor="find">
            <span>Artista:</span>
            <input
              placeholder="Nome do Artista"
              type="text"
              data-testid="search-artist-input"
              id="find"
              name="name"
              value={ name }
              onChange={ this.handleArtist }
            />
          </label>

          <button
            disabled={ this.validateArtist() }
            type="button"
            data-testid="search-artist-button"
          >
            Pesquisar

          </button>
        </form>
        <Header />
      </div>
    );
  }
}

export default Search;
