import React from 'react';
import { createUser, signInUser } from '@src/utils';

class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      usernameSignin: '',
      passwordSignin: '',
      usernameCreate: '',
      passwordCreate: '',
      emailCreate: '',
      results: [],
      error: ''
    };

    this.handleUsernameSigninChange = this.handleUsernameSigninChange.bind(this);
    this.handlePasswordSigninChange = this.handlePasswordSigninChange.bind(this);
    this.handleUsernameCreateChange = this.handleUsernameCreateChange.bind(this);
    this.handlePasswordCreateChange = this.handlePasswordCreateChange.bind(this);
    this.handleEmailCreateChange = this.handleEmailCreateChange.bind(this);
    this.handleSignin = this.handleSignin.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.changeCurrentUser = this.props.changeCurrentUser.bind(this);
  }

  handleUsernameSigninChange(event) {
    this.setState({ usernameSignin: event.target.value})
  }
  handlePasswordSigninChange(event) {
    this.setState({ passwordSignin: event.target.value})
  }
  handleUsernameCreateChange(event) {
    this.setState({ usernameCreate: event.target.value})
  }
  handlePasswordCreateChange(event) {
    this.setState({ passwordCreate: event.target.value})
  }
  handleEmailCreateChange(event) {
    this.setState({ emailCreate: event.target.value})
  }
  handleSignin(event) {
    event.preventDefault();
    signInUser(this.state.usernameSignin, this.state.passwordSignin, ()=>{this.changeCurrentUser();});
  }
  handleCreate(event) {
    event.preventDefault();
    createUser(this.state.usernameCreate, this.state.passwordCreate, this.state.emailCreate,()=>{
      signInUser(this.state.usernameCreate, this.state.passwordCreate, ()=>{this.changeCurrentUser();});
    });
  }

  render() {
    const { usernameSignin, passwordSignin, usernameCreate, passwordCreate, emailCreate } = this.state;

    return(
      <React.Fragment>
        <div className='container'>
          <form className='row g-3' onSubmit={this.handleSignin}>
            <div className="col-12">
              <legend>Log in</legend>
            </div>
            <div className="col-md-6">
              <label htmlFor='usernameSignin' className='form-label'>Username</label>
                <input 
                  type="username" 
                  className="form-control" 
                  value={usernameSignin} 
                  onChange={this.handleUsernameSigninChange} 
                />
            </div>
            <div className="col-md-6">
              <label htmlFor='passwordSignin' className='form-label'>Password</label>
              <input 
                type="password" 
                className="form-control" 
                value={passwordSignin} 
                onChange={this.handlePasswordSigninChange} 
              />
            </div>
            <div className="col-12 mb-3">
              <button type="submit" className="btn btn-primary">Log in</button>
            </div>
          </form>
          <form className='row g-3' onSubmit={this.handleCreate}>
            <div className="col-12">
              <legend>Sign Up</legend>
            </div>
            <div className="col-md-4">
              <label htmlFor='usernameCreate' className='form-label'>Username</label>
                <input 
                  type="username" 
                  className="form-control" 
                  value={usernameCreate} 
                  onChange={this.handleUsernameCreateChange}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor='passwordCreate' className='form-label'>Password</label>
              <input 
                type="password" 
                className="form-control" 
                value={passwordCreate} 
                onChange={this.handlePasswordCreateChange}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor='emailCreate' className='form-label'>Email</label>
              <input 
                type="email" 
                className="form-control" 
                value={emailCreate} 
                onChange={this.handleEmailCreateChange} 
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">Sign Up</button>
            </div>
          </form>
        </div>
      </React.Fragment>
    )
  }
}
  
export default Login;
