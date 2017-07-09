import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

class Login extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    loginKey: PropTypes.string,
    passwordKey: PropTypes.string,
    groupClass: PropTypes.string,
    btnClass: PropTypes.string,
    blockClass: PropTypes.string,
    contentClass: PropTypes.string,
    inputClass: PropTypes.string,
    emailPlaceholder: PropTypes.string,
    passwordPlaceholder: PropTypes.string,
    async: PropTypes.bool.isRequired,
    action: (props, propName, componentName) => {
      if (props.action && typeof props.action !== 'string') {
        return new Error(`Props '${propName}' must be a string, '${typeof props.action}' given in ${componentName}.`);
      }
      if (!props.action && !props.handleSubmit) {
        return new Error(`One of props 'action' or 'handleSubmit' was not specified in '${componentName}'.`);
      }
    },
    handleSubmit: (props, propName, componentName) => {
      if (props.handleSubmit && typeof props.handleSubmit !== 'function') {
        return new Error(`Props '${propName}' must be a function, '${typeof props.handleSubmit}' given in ${componentName}.`);
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      dirty: false,
      loading: true,
      error: null,
      formData: {
        [this.props.loginKey]: '',
        [this.props.passwordKey]: ''
      }
    };

    if (this.props.async && typeof this.props.handleSubmit !== 'function') {
      throw new Error(`If props 'async' is truthy, handleSubmit must be a function: ${typeof this.props.handleSubmit} given.`);
    }
  }

  componentDidMount() {
    this.setState({
      loading: false
    });
  }

  handleSubmit(e) {
    if (this.props.async) {
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
  }

  renderError() {
    return this.state.error ? 
      <div className="alert alert-danger" role="alert">
        <strong>Oops</strong>, something's wrong: {this.state.error.toLowerCase()}.
      </div> : null;
  }

  handleChange(e) {
    const formData = { [e.target.name]: e.target.value };

    this.state.dirty ? 
      this.setState({ formData }) : 
      this.setState({ dirty: true, formData });
  }

  render() {
    const { title, disabled } = this.props;
    let { 
      action,
      groupClass, 
      inputClass, 
      blockClass, 
      contentClass, 
      btnClass, 
      passwordKey, 
      loginKey,
      emailPlaceholder,
      passwordPlaceholder
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
    if (!passwordPlaceholder) {
      passwordPlaceholder = 'Password';
    }
    if (!emailPlaceholder) {
      emailPlaceholder = 'Email';
    }
    
    return (
      <div className={blockClass}>
        <form onSubmit={this.handleSubmit.bind(this)} action={action} className={contentClass}>
          <h2 className="card-title">{title}</h2>
          { this.renderError() }
          <div>
            <div className={groupClass}>
              <label htmlFor={loginKey}>Email</label>
              <input type="email"
                name={loginKey}
                className={inputClass}
                value={this.state.formData.loginKey}
                placeholder={emailPlaceholder}
                id={loginKey}
                required="true"
                onChange={this.handleChange.bind(this)} />
            </div>
            <div className={groupClass}>
              <label htmlFor={passwordKey}>Password</label>
              <input type="password"
                name={passwordKey}
                className={inputClass}
                placeholder={passwordPlaceholder}
                value={this.state.formData.passwordKey}
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
