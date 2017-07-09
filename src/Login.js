import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

const initialState = {
  submitted: false,
  dirty: false,
  loading: true,
  error: null
};

class Login extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    loginKey: PropTypes.string,
    passwordKey: PropTypes.string,
    groupClass: PropTypes.string,
    btnClass: PropTypes.string,
    blockClass: PropTypes.string,
    contentClass: PropTypes.string,
    inputClass: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.setState({
      loading: false
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    this.props.handleSubmit(e, this.state.formData)
      .then(submit => {
        this.setState({ 
          submitted: true, 
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          error: err.message,
          loading: false
        });
      });
  }

  renderError() {
    return this.state.error ? 
      <div className="alert alert-danger" role="alert">
        <strong>Oops</strong>, something's wrong: {this.state.error.toLowerCase()}.
      </div> : null;
  }

  handleChange(e) {
    this.setState({
      formData: {
        [e.target.name]: e.target.value
      }
    });
  }

  render() {
    const { title, disabled } = this.props;
    let { 
      groupClass, 
      inputClass, 
      blockClass, 
      contentClass, 
      btnClass, 
      passwordKey, 
      loginKey 
    } = this.props;

    if (!loginKey) {
      loginKey = 'login_email';
    }
    if (!passwordKey) {
      passwordKey = 'login_password';
    }
    if (!groupClass) {
      groupClass = 'form-group';
    }
    if (!inputClass) {
      inputClass = 'form-control'
    }
    if (!contentClass) {
      contentClass = 'card-block';
    }
    if (!blockClass) {
      blockClass = 'card';
    }
    if (!btnClass) {
      btnClass = 'btn btn-primary';
    }
    
    return (
      <div className={blockClass}>
        <form onSubmit={this.handleSubmit.bind(this)} className={contentClass}>
          <h2 className="card-title">{title}</h2>
          { this.renderError() }
          <div>
            <div className={groupClass}>
              <label htmlFor={loginKey}>Email</label>
              <input type="email"
                name={loginKey}
                className={inputClass}
                id={loginKey}
                required="true"
                onChange={this.handleChange.bind(this)} />
            </div>
            <div className={groupClass}>
              <label htmlFor={passwordKey}>Password</label>
              <input type="password"
                name={passwordKey}
                className={inputClass}
                id={passwordKey}
                required="true"
                onChange={this.handleChange.bind(this)} />
            </div>
          </div>
          <button type="submit" 
                  disabled={disabled || this.state.loading || this.state.submitted} 
                  className={btnClass}>
            { this.state.loading ? 'Loading...' : 'Login' }
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
