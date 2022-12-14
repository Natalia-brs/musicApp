import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Card from '../components/Card';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      verifyLoad: false,
      AlbunsArray: [],
      fetchAlbuns: '',
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

  SearchClick = async () => {
    const { name } = this.state;
    this.setState({
      name: '',
      verifyLoad: true,
    });
    const fetchAlbum = await searchAlbumsAPI(name);
    if (fetchAlbum.length > 0) {
      this.setState({
        verifyLoad: false,
        fetchAlbuns: `Resultado de álbuns de: ${name}`,
        AlbunsArray: fetchAlbum,
      });
    } else {
      this.setState({
        verifyLoad: false,
        fetchAlbuns: 'Nenhum álbum foi encontrado',
        AlbunsArray: [],
      });
    }
  };

  render() {
    const { name, verifyLoad, AlbunsArray, fetchAlbuns } = this.state;
    if (verifyLoad) {
      return (
        <div>
          <Header />
          <Loading />
        </div>
      );
    }
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
            onClick={ this.SearchClick }
          >
            Pesquisar

          </button>
        </form>
        <Header />
        <h2>
          {' '}
          {fetchAlbuns}
        </h2>
        {
          AlbunsArray.map((album, index) => <Card Albuns={ album } key={ index } />)
        }
      </div>
    );
  }
}

export default Search;
