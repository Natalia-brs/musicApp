import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      favoritesInput: false,
      verifyLoad: false,
    };
  }

  componentDidMount() {
    this.changeFavorite();
  }

  changeFavorite = () => {
    const { favorite } = this.props;
    this.setState({
      favoritesInput: favorite,
    });
  };

  handleChecked = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.checked,
    });
  };

  render() {
    const { favoritesInput, verifyLoad } = this.state;
    const {
      addFavorite,
      trackId,
      previewUrl,
      trackName } = this.props;
    return (

      <div>
        {
          verifyLoad && <Loading />
        }
        <span>
          {' '}
          { trackName }
          {' '}
        </span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>

        <label htmlFor="favorites">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            id="favorites"
            value={ favoritesInput }
            name={ trackId }
            onChange={ addFavorite }
            onClick={ this.handleChecked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  favorite: PropTypes.bool.isRequired,
  addFavorite: PropTypes.func.isRequired,
  trackId: PropTypes.number.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
};

export default MusicCard;
