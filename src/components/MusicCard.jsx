import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      favoritesInput: false,
    };
  }

  // apos a renderização é velicado se a musica ja é favorita
  componentDidMount() {
    const { favorite } = this.props;
    this.setState({
      favoritesInput: favorite,
    });
  }

  // o input ao receber um click, é atualizado se o mesmo esta checked ou não;
  // atualiza o estado da musica favorita conforme o checked
  handleChecked = ({ target: { checked } }) => {
    this.setState({
      favoritesInput: checked,
    });
  };

  render() {
    const {
      addFavorite,
      trackId,
      previewUrl,
      trackName,
    } = this.props;
    const { favoritesInput } = this.state;
    return (
      <div>
        <h4 className=" text-center mt-4">{ trackName }</h4>
        <div
          className="text-justify grid grid-cols-2 justify-items-center auto-cols-fr
        bg-red-lightest shadow-lg rounded-lg bg-gray-300 mb-2.5"
        >
          <div>
            <span>
              Favorita
            </span>
            <label
              className="grid "
              htmlFor="favorites"
            >
              <input
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                id="favorites"
                // true or false, dependendo do valor armazenado no estado co componente
                checked={ favoritesInput }
                // name ->  armazena o id da musica que será utilizado na função addFavorite do componente Album
                name={ trackId }
                // addFavorite -> recebe a função addFavorite do componente Album responsável por adicionar ou remover musica favorita
                onChange={ addFavorite }
                // atualiza o estado da musica favorita conforme o checked
                onClick={ this.handleChecked }
              />

            </label>
          </div>
          <audio
            className="pt-3 pl-3 pr-3 pb-3"
            data-testid="audio-component"
            src={ previewUrl }
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
