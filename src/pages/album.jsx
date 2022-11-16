import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import AlbumMusic from '../components/AlbumMusic';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      imagem: '',
      musicas: [],
      album: '',
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const salvarMusica = await getMusics(id);
    this.setState({
      musicas: salvarMusica,
      artistName: salvarMusica[0].artistName,
      album: salvarMusica[0].collectionName,
    });
  }

  render() {
    const { artistName,
      imagem,
      musicas,
      album,
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h3 data-testid="artist-name">{ artistName }</h3>
        <p data-testid="album-name">{ album }</p>
        <img src={ imagem } alt={ artistName } />
        {
          musicas.map((musica) => (
            musica.previewUrl
              ? (
                <div>
                  <AlbumMusic
                    key={ musica.collectionName }
                    trackName={ musica.trackName }
                    previewUrl={ musica.previewUrl }
                    ID={ musica.collectionName }
                  />
                </div>
              ) : ''
          ))
        }
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
