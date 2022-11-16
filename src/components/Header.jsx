import React from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/search" data-testid="link-to-search"> Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </header>
    );
  }
}

export default Header;
