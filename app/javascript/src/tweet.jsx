import React from "react";
import { deleteTweetCall } from "@src/tweetsutils";

class Tweet extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
		createdAtFormatted:'',
		updatedAtFormatted:''
    };
		this.deleteTweet = this.deleteTweet.bind(this);
		this.formatDates = this.formatDates.bind(this);
	}

deleteTweet(){
	console.log(this.props.id);
	deleteTweetCall(this.props.id, (result)=>{console.log(result);this.props.refreshFeed();});
}

formatDates(){
	let createdat = this.props.created_at.slice(0,this.props.created_at.search('T')) + " " + this.props.created_at.slice(this.props.created_at.search('T') + 1, this.props.created_at.search('T') + 6);
	this.setState({createdAtFormatted:createdat});
	let updatedat = this.props.updated_at.slice(0,this.props.created_at.search('T')) + " " + this.props.updated_at.slice(this.props.updated_at.search('T') + 1, this.props.updated_at.search('T') + 6);
	this.setState({updatedAtFormatted:updatedat});
}

componentDidMount(){
	this.formatDates();
}

render(){
	const {createdAtFormatted,updatedAtFormatted} = this.state;
		return(
			<React.Fragment>
				<div className="row">
					<div className="col-6">
						<div><a href={'/feed/' + this.props.username}>@{this.props.username}</a>:</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<div>{this.props.message}</div>
					</div>
				</div>
				<div className="row">
					<div className="col-4">
						<div>Tweeted On: {createdAtFormatted}</div>
					</div>
					<div className="col-4">
						<div>Modified On: {updatedAtFormatted}</div>
					</div>
					<div className="col-4">
						{(this.props.username === this.props.currentUser) && <button className = "btn btn-primary" onClick={this.deleteTweet}>Delete Tweet</button>}
					</div>
				</div>
			</React.Fragment>
		);
	};
};

export default Tweet;