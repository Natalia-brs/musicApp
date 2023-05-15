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
      <div
        data-testid="page-search"
      >
        <form className="bg-gray-800 go-800 shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
          <label
            htmlFor="find"
          >
            <span className="text-white font-poppins font-semibold">Artista:</span>
            <input
              className=" border rounded ml-2.5 py-2 px-3 text-gray-800
                leading-tight focus:outline-none focus:shadow-outline"
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
            className="shadow bg-cyan-600 hover:bg-cyan-400
          focus:shadow-outline ml-2.5 focus:outline-none text-white
          font-bold py-1 px-3 rounded"
            disabled={ this.validateArtist() }
            type="button"
            data-testid="search-artist-button"
            onClick={ this.SearchClick }
          >
            Pesquisar

          </button>
        </form>
        <Header />
        <h2 className="text-center m-4 font-poppins font-bold">
          {' '}
          {fetchAlbuns}
        </h2>

        <div className="  flex justify-center">
          { AlbunsArray.length > 0 && (
            <div
              className=" grid grid-cols-4 bg-gradient-to-r from-neutral-900 to-blue-300
         px-8 pt-6 pb-8 mb-4 gap-x-6 gap-y-4 w-5/6 rounded-2xl shadow-2xl shadow-black"
            >
              {
                AlbunsArray.map((album, index) => <Card Albuns={ album } key={ index } />)
              }
            </div>) }
        </div>

      </div>
    );
  }
}

export default Search;
