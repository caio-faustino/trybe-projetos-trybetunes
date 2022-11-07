import React from 'react';
import Props from 'prop-types';
import Loading from '../components/loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
      validação: true,
    };
  }

  habilitar = () => {
    const { name } = this.state;
    const THREE = 3;
    if (name.length >= THREE) {
      return this.setState({ validação: false });
    }
    return this.setState({ validação: true });
  };

  handleChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      name: value,
    }, () => {
      this.habilitar();
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { history } = this.props;
    const { name } = this.state;
    createUser({ name });
    setInterval(() => {
      history.push('/search');
    });
  };

  render() {
    const { name, loading, validação } = this.state;

    return (
      <div data-testid="page-login">
        login
        <form>
          <labe>
            Nome:
            <input
              data-testid="login-name-input"
              type="text"
              name="name"
              onChange={ this.handleChange }
              value={ name }
            />
          </labe>
          <button
            data-testid="login-submit-button"
            type="submit"
            onClick={ this.handleSubmit }
            disabled={ validação }
          >
            Entrar
          </button>
        </form>
        {(loading) ? <Loading /> : null}
      </div>
    );
  }
}
Login.propTypes = {
  history: Props.shape({
    push: Props.func.isRequired,
  }),
}.isRequired;

export default Login;
