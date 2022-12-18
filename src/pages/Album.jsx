import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      songsTrack: [],
      verifyLoad: false,
      newLoad: false,
      favoriteSongs: [],
      catchFavorites: true,
    };
  }

  componentDidMount() {
    this.loadMusicList();
    this.fetchFavorites();
  }

  loadMusicList = () => {
    const { match } = this.props;
    const { params: { id } } = match;
    this.setState({
      verifyLoad: true,
    }, async () => {
      const musicList = await getMusics(id);
      this.setState({
        songsTrack: musicList,
        verifyLoad: false,
      });
    });
  };

  fetchFavorites = async () => {
    this.setState({
      catchFavorites: true,
    }, async () => {
      const getFav = await getFavoriteSongs();
      console.log(getFav);
      this.setState({
        favoriteSongs: getFav,
        catchFavorites: false,
      });
    });
  };

  addFavorite = async ({ target }) => {
    const { songsTrack } = this.state;
    const [, ...list] = songsTrack;
    const track = list.find((song) => song.trackId === Number(target.name));
    const check = target.checked;

    if (check) {
      this.setState({
        newLoad: true,
      }, async () => {
        await addSong(track);
        this.setState({
          newLoad: false,
        });
      });
    } else {
      this.setState({
        newLoad: true,
      }, async () => {
        await removeSong(track);
        this.setState({
          newLoad: false,
        });
      });
    }
  };

  render() {
    const { songsTrack, verifyLoad, newLoad, catchFavorites, favoriteSongs } = this.state;
    const [albumDetails, ...listTracks] = songsTrack;
    return (
      <div data-testid="page-album">
        <Header />
        {
          verifyLoad && <Loading />
        }
        {
          catchFavorites && <Loading />
        }
        <div>
          { albumDetails && (
            <div>
              <span data-testid="artist-name">
                Artista:
                { albumDetails.artistName}
                {' '}
              </span>
              <span data-testid="album-name">
                Album:
                {albumDetails.collectionName }
                {' '}
              </span>
            </div>
          )}

        </div>
        {
          newLoad && <Loading />
        }
        {listTracks.map((tracks) => (<MusicCard
          { ...tracks }
          key={ tracks.trackId }
          favorite={ favoriteSongs.some((song) => song.trackId === tracks.trackId) }
          addFavorite={ this.addFavorite }
        />)) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
export default Album;
