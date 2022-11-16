import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      validação: true,
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

  render() {
    const { nome, validação } = this.state;
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
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
