import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favoritesSongs: [],
    };
  }

  componentDidMount() {
    this.savedFavorites();
  }

  savedFavorites = async () => {
    const favoritesSongs = await getFavoriteSongs();
    this.setState({
      favoritesSongs,
    });
    console.log(favoritesSongs);
  };

  render() {
    const { favoritesSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { favoritesSongs && favoritesSongs.map((favorite) => (
          <div
            className="flex justify-center p-3"
            key={ favorite.trackId }
          >
            <h4 className=" p-4">{ favorite.trackName }</h4>
            <audio
              className=""
              data-testid="audio-component"
              src={ favorite.previewUrl }
              controls
            >
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
          </div>
        ))}
      </div>
    );
  }
}

export default Favorites;
