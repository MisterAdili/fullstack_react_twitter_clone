import React from 'react';
import Header from '@src/header';
import Footer from '@src/footer';
import Login from '@src/login';
import Feed from '@src/feed';
import { authenticateUser } from './utils';

class Layout extends React.Component{
  constructor (props){
    super(props);
    this.state = {
      currentUser:'',
      userMessage:'',
      userFeedIndex: '',
      loggedIn: undefined
    };

    this.changeCurrentUser = this.changeCurrentUser.bind(this);
    this.parseURL = this.parseURL.bind(this);
  };

  changeCurrentUser(){
    authenticateUser((response) => {
      console.log(response);
      if (response.authenticated == true){
        this.setState({ userMessage : 'Logged in as @' });
        this.setState({ currentUser : response.username });
        this.setState({ loggedIn : response.authenticated });
        return response;
      } else {
        this.setState({ userMessage : 'Not Logged In' });
        this.setState({ currentUser : '' });
        this.setState({ loggedIn : response.authenticated });
        return response;
      }
    });
    return;
  }

  parseURL(){
    const windowURL = window.location.pathname;
    console.log(windowURL);
    if (windowURL === '/'){
      this.setState({userFeedIndex:''});
    } else {
      this.setState({userFeedIndex:(window.location.pathname.replace('/feed/', ''))});
    }
  }

  componentDidMount(){
    this.changeCurrentUser();
    this.parseURL();
  };

  render (){

    const {currentUser,loggedIn,userMessage, userFeedIndex} = this.state;

    return(
      <React.Fragment>
        <Header currentUser={currentUser} userMessage={userMessage} loggedIn={loggedIn} userFeedIndex={userFeedIndex} changeCurrentUser={this.changeCurrentUser}/>
        {loggedIn ? 
        <Feed currentUser={currentUser} loggedIn={loggedIn} userFeedIndex={userFeedIndex} changeCurrentUser={this.changeCurrentUser}/> :
        <Login currentUser={currentUser} loggedIn={loggedIn} changeCurrentUser={this.changeCurrentUser}/>}
        <Footer />
      </React.Fragment>
    );
  };
}

export default Layout;