import React from 'react';
import Header from '../components/header';
import AlbumSearch from '../components/albumSearch';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      validação: true,
      albums: [],
      nomeDigitado: '',
    };
  }

  habilitar = () => {
    const { nome } = this.state;
    const TWO = 2;
    if (nome.length >= TWO) {
      return this.setState({ validação: false });
    }
    return this.setState({ validação: true });
  };

  handleChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      nome: value,
    }, () => {
      this.habilitar();
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { nome } = this.state;
    const func = await searchAlbumsAPI(nome);
    this.setState({ albums: func });
    this.setState({ nomeDigitado: nome });
    this.setState({ nome: '' });
  };

  render() {
    const { nome, validação, albums, nomeDigitado } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        search
        <form>
          <labe>
            <input
              data-testid="search-artist-input"
              type="text"
              onChange={ this.handleChange }
              value={ nome }
            />
          </labe>
          <button
            data-testid="search-artist-button"
            type="submit"
            disabled={ validação }
            onClick={ this.handleSubmit }
          >
            Pesquisar
          </button>
        </form>

        {albums.length > 0
          ? <h1>{`Resultado de álbuns de: ${nomeDigitado}`}</h1>
          : null }

        { albums.length > 0
          ? albums.map((album) => (
            <AlbumSearch
              key={ album.collectionId }
              artistId={ album.artistId }
              artistName={ album.artistName }
              collectionId={ album.collectionId }
              collectionName={ album.collectionName }
              artworkUrl100={ album.artworkUrl100 }
            />
          ))
          : <p>Nenhum álbum foi encontrado</p>}
      </div>
    );
  }
}

export default Search;
