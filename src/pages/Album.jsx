import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import {
  addSong,
  getFavoriteSongs,
  removeSong,
} from '../services/favoriteSongsAPI';

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

  //  após a renderização do componente é feito o carregamento das musicas do album e das musicas favoritas
  componentDidMount() {
    this.loadMusicList();
    this.fetchFavorites();
  }

  // obtém o id do album através do parâmetro da url
  getIdFromURL = async () => {
    const { match } = this.props;
    const { params: { id } } = match;
    return id;
  };

  // efetua a requisição das musicas através da função getMusics
  loadMusicList = async () => {
    this.setState(
      { verifyLoad: true },
      async () => {
        const id = await this.getIdFromURL();
        const musicList = await getMusics(id);
        this.setState({
          songsTrack: musicList,
          verifyLoad: false,
        });
      },
    );
  };

  // efetua o carregamento das musicas favoritas e salva no estado do componente
  fetchFavorites = async () => {
    this.setState(
      { catchFavorites: true },
      async () => {
        const getFav = await getFavoriteSongs();
        this.setState({
          catchFavorites: false,
          favoriteSongs: getFav,
        });
      },
    );
  };

  // obtém o id através do name do input
  // verifica se o checkbox está checked (adiciona ou remove a musica das favoritas)
  addFavorite = async ({ target }) => {
    const { songsTrack } = this.state;
    const list = songsTrack.slice(1);

    // encontra a musica de acordo com id passado pelo target.name
    // track armazena um objeto com as informações da musica o qual é usado para adicionar(addSong) ou remover(removeSong)
    const track = list.find((song) => song.trackId === Number(target.name));

    if (target.checked) {
      this.setState(
        {
          newLoad: true,
        },
        async () => {
          await addSong(track);
          this.setState({
            newLoad: false,
          });
        },
      );
    } else {
      this.setState(
        {
          newLoad: true,
        },
        async () => {
          await removeSong(track);
          this.setState({
            newLoad: false,
          });
        },
      );
    }
  };

  render() {
    const { songsTrack, verifyLoad, newLoad, catchFavorites, favoriteSongs } = this.state;
    const [albumDetails, ...listTracks] = songsTrack;
    /* controla o loading das musicas favoritas através da função  fetchFavorites */
    if (catchFavorites) return <Loading />;
    return (
      <div
        data-testid="page-album"
      >
        <Header />
        {/* controla o loading das musicas obtidas pela api através da função loadMusicList */}
        {verifyLoad && <Loading />}

        <div>
          {
            albumDetails
          && (
            <div className="grid justify-items-center gap-3 font-poppins">
              <span data-testid="artist-name">
                Artista:
                { ' ' }
                {albumDetails.artistName}
              </span>
              <img
                className="w-32 rounded-md"
                src={ albumDetails.artworkUrl100 }
                alt={ albumDetails.artworkUrl100 }
              />
              <span data-testid="album-name">
                Album:
                { ' ' }
                {albumDetails.collectionName}
              </span>

              {/* controla o loading quando adiciona ou remove uma musica favorita através das função addFavorite  */}
              {newLoad && <Loading />}
              <div
                className="grid grid-cols-2
              justify-items-center auto-cols-fr
              gap-9 border rounded px-3 text-gray-800
              font-poppins mb-11
              bg-gray-100 "
              >
                {listTracks.map((tracks) => (
                  <MusicCard
                    { ...tracks }
                    key={ tracks.trackId }
                    // favorite -> props armazena um boll, true caso a mesma ja tenha sido favoritada, será utilizada no componente MusicCard
                    favorite={ favoriteSongs.some(
                      (music) => music.trackId === tracks.trackId,
                    ) }
                    // função que sera utilizada no onChange no componente MusicCard
                    addFavorite={ this.addFavorite }
                  />
                ))}
              </div>
            </div>)
          }
        </div>

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
