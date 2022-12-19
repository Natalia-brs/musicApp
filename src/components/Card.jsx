import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Card extends Component {
  render() {
    const { Albuns } = this.props;
    const { artistName, collectionName, artworkUrl100, collectionId } = Albuns;

    return (
      <div>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <div>
            <img
              src={ artworkUrl100 }
              alt={ collectionName }
            />
            <h2>
              {' '}
              { artistName }
            </h2>
            <span>
              {' '}
              {collectionName}
            </span>

          </div>
        </Link>
      </div>
    );
  }
}

Card.propTypes = {
  Albuns: PropTypes.shape({
    artistName: PropTypes.string,
    collectionName: PropTypes.string,
    artworkUrl100: PropTypes.string,
    collectionId: PropTypes.number,
  }).isRequired,
};

export default Card;
