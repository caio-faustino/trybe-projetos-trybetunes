import React from 'react';
import PropTypes from 'prop-types';
import Loading from './loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      musicasFav: [],
      checked: false,
    };
  }

  componentDidMount() {
    this.CarregandoFavoritos();
  }

  handleClick = async (event) => {
    const { name, checked } = event.target;
    this.setState({
      loading: true,
      [name]: checked,
    });
    const { results } = this.props;
    await addSong(results);
    this.setState({ loading: false });
  };

  CarregandoFavoritos = async () => {
    const result = await getFavoriteSongs();
    this.setState({ musicasFav: result }, () => {
      const { musicasFav } = this.state;
      const { trackId } = this.props;
      const isFavorite = musicasFav.some((music) => trackId === music.trackId);
      this.setState({ checked: isFavorite });
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, checked } = this.state;
    return (
      <div>
        {loading && <Loading />}
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackName } data-testid={ `checkbox-music-${trackId}` }>
          Favoritar
          <input
            type="checkbox"
            name="checked"
            id={ trackName }
            onClick={ this.handleClick }
            checked={ checked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  results: PropTypes.bool.isRequired,
};

export default MusicCard;
