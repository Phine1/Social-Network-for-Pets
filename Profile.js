import React from 'react';
import { fetchUserData, cancelFetch } from './dataFetcher';
import { Userlist } from './Userlist';

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userData: null }
  }
  
  loadUserData() {
    this.setState({userData: null});
    this.fetchID = fetchUserData(this.props.username, (userData) => {
      this.setState({ userData});
    });
  }
  componentDidMount() {
    this.loadUserData();
  }
  componentWillUnmount() {
    cancelFetch(this.fetchID)
  }

  componentDidUpdate(prevProps) {
    if (this.props.username!==prevProps.username) {
      cancelFetch(this.fetchID);
      this.loadUserData();
    }
  }
  render() {
    const isLoading = this.state.userData === null? true : false;

    let className = 'Profile';
    if (isLoading) {
      className += ' loading';
    }
    let name;
    if (isLoading === true) {
      name = 'Loading pets name'
    } else {
      name = this.state.userData.name
    }
    let bio;
    if (isLoading === true) {
      bio = 'This is my bio'
    } else { bio = this.state.userData.bio
    }
    let friends;
    if (isLoading === true) {
      friends = [] 
      } else { friends = this.state.userData.friends
      }
      const profilePic = isLoading ? 'loading pic' : <img src={this.state.userData.profilePictureUrl} alt="" />;
    return (
      <div className={className}>
        <div className="profile-picture">{profilePic}</div>
        <div className="profile-body">
          <h2>{name}</h2>
          <h3>@{this.props.username}</h3>
          <p>{bio}</p>
          <h3>{friends}</h3>
          <Userlist usernames={friends} onChoose={this.props.onChoose} />
        </div>
      </div>
    );
  } 
}