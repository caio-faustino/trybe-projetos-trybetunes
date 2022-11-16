import React from 'react';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      loading: true,
    };
  }

  async componentDidMount() {
    const func = await getUser();
    this.setState({
      nome: func.name,
      loading: false,
    });
  }

  render() {
    const { nome, loading } = this.state;
    return (
      <header
        data-testid="header-component"
      >
        {loading ? (<>Carregando...</>) : (<p data-testid="header-user-name">{nome}</p>) }
      </header>
    );
  }
}

export default Header;
