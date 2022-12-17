import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      songsTrack: [],
      verifyLoad: false,
    };
  }

  componentDidMount() {
    this.loadMusicList();
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

  render() {
    const { songsTrack, verifyLoad } = this.state;
    const [albumDetails, ...listTracks] = songsTrack;
    console.log(albumDetails);
    return (
      <div data-testid="page-album">
        <Header />
        {
          verifyLoad && <Loading />
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
        {listTracks.map((tracks) => <MusicCard { ...tracks } key={ tracks.trackId } />) }
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
