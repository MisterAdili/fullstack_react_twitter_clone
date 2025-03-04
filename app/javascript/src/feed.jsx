import React from 'react';
import { listTweets, postTweet } from '@src/tweetsutils';
import Tweet from '@src/tweet';

class Feed extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      newTweetContent: '',
      tweetsList: [],
      tweetsFeed: ''
    };
    
    this.handleNewTweetChange = this.handleNewTweetChange.bind(this);
    this.handlePostTweet = this.handlePostTweet.bind(this);
    this.refreshFeed = this.refreshFeed.bind(this);
    
  }

  handleNewTweetChange(event){
    this.setState({ newTweetContent : event.target.value });
  }

  handlePostTweet(event){
    event.preventDefault();
    let targetedItem = this.state;
    postTweet(this.props.currentUser, targetedItem.newTweetContent, ()=>this.refreshFeed());
  }

  refreshFeed(){
    listTweets((result)=>{
      let filteredResults = [];
      console.log(this.props.userFeedIndex);
      if (this.props.userFeedIndex === ''){
        filteredResults = result.tweets;
      } else {
        for (let i = 0; i < result.tweets.length; i++)
          if (result.tweets[i].username === this.props.userFeedIndex){
            filteredResults.push(result.tweets[i]);
          }
      }
      this.setState({ tweetsList: filteredResults });
    });

  }
  
  componentDidMount(){
    this.refreshFeed();
  }

  render(){
    const { newTweetContent, tweetsList } = this.state;
    const { currentUser } = this.props;
    return(
      <React.Fragment>
        <div className='container'>
          <form onSubmit={this.handlePostTweet}>
            <div className='row g-3'>
              <div className='col-md-12'>
                <label htmlFor='newTweetContent' className='form-label'>Create a Tweet</label>
              </div>
            </div>
            <div className='row g-3'>
              <div className='col-md-9 mb-3'>
                <input 
                  type="content" 
                  className="form-control" 
                  value={newTweetContent} 
                  onChange={this.handleNewTweetChange} 
                />
              </div>
              <div className="col-md-3 mb-3">
                <button type="submit" className="btn btn-primary">Post Tweet</button>
              </div>
            </div>
          </form>
          <div className='row g-3'>
            <div className="col-12">
              {tweetsList.map(tweet => (
                <Tweet
                  currentUser={currentUser}
                  key={tweet.id}
                  id={tweet.id}
                  username={tweet.username}
                  message={tweet.message}
                  created_at={tweet.created_at}
                  updated_at={tweet.updated_at} 
                  refreshFeed={this.refreshFeed}
                />
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };
};

export default Feed;