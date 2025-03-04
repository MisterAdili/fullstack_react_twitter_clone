import React from 'react';
import { signOutUser } from '@src/utils';

class Header extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      findUser: '',
      results: [],
      error: ''
    };

    this.changeCurrentUser = this.props.changeCurrentUser.bind(this);
    this.navbarMarkActive = this.navbarMarkActive.bind(this);
    this.handleFindUser = this.handleFindUser.bind(this);
  }

  handleSignOut = (event) => {
    event.preventDefault();
    signOutUser(()=>{this.props.changeCurrentUser();});
  }

  navbarMarkActive(){
    console.log('userFeedIndex:' + this.props.userFeedIndex);
    if (this.props.userFeedIndex == ''){
      this.setState({
        homeFeedIsActive: 'active',
        myFeedIsActive: '',
        userFeedIsActive: ''
      })
    } else if (this.props.userFeedIndex == this.props.currentUser){
      this.setState({
        homeFeedIsActive: '',
        myFeedIsActive: 'active',
        userFeedIsActive: ''
      })
    } else {
      this.setState({
        homeFeedIsActive: '',
        myFeedIsActive: '',
        userFeedIsActive: 'active'
      })
    }
  }

  handleFindUser(event){
    this.setState({findUser:event.target.value});
  }

  componentDidMount(){
    this.navbarMarkActive();
  }

  render (){

    const {homeFeedIsActive, userFeedIsActive, myFeedIsActive, findUser} = this.state;
    const {currentUser, userMessage, loggedIn, userFeedIndex} = this.props;

    return(
    <React.Fragment>
      <nav className="navbar static-top navbar-expand navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="/">TwiXter</a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">All Posts</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={"/feed/"+currentUser}>My Posts</a>
              </li>
              <li className="nav-item">
                <a className='nav-link' href={'/feed/'+findUser}>Go to User:</a>
              </li>
              <li className="nav-item">
                <input 
                  type="username" 
                  className="form-control" 
                  value={findUser} 
                  onChange={this.handleFindUser} 
                />
              </li>
            </ul>
          </div>
            <div className="navbar-text br-3">{userMessage}{currentUser+'  '}{loggedIn && <a href='' onClick={this.handleSignOut}>Log Out</a>}</div>
        </div>
      </nav>
    </React.Fragment>
    );
  }
}

export default Header;