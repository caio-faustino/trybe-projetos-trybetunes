import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      artistId: '',
      artistName: '',
      collectionId: '',
      collectionName: '',
      artworkUrl100: '',
    };
  }

  componentDidMount() {
    const {
      artistId,
      artistName,
      collectionId,
      collectionName,
      artworkUrl100,
    } = this.props;

    this.setState({
      artistId,
      artistName,
      collectionId,
      collectionName,
      artworkUrl100,
    });
  }

  render() {
    const {
      artistId,
      artistName,
      collectionId,
      collectionName,
      artworkUrl100,
    } = this.state;
    return (
      <li key={ artistId }>
        <img src={ artworkUrl100 } alt={ artistName } />
        <p>{ collectionName }</p>
        <p>{ artistName }</p>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          Escutar
        </Link>
      </li>

    );
  }
}

AlbumSearch.propTypes = {
  artistId: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
};

export default AlbumSearch;
