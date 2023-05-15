import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Card extends Component {
  render() {
    const { Albuns } = this.props;
    const { artistName, collectionName, artworkUrl100, collectionId } = Albuns;

    return (
      <div
        className=" w-60"
      >
        <Link
          style={ { color: 'black' } }
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }

        >
          <div
            className=" grid  justify-center text-center
          place-content-center rounded-xl
          hover:scale-105 ease-in duration-750
          bg-white bg-opacity-30
           backdrop-blur-lg drop-shadow-lg "
          >
            <div className="flex justify-center items-center mt-4 ">
              <img
                className="rounded-lg"
                src={ artworkUrl100 }
                alt={ collectionName }
              />
            </div>
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
