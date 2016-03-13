import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Profile from './github/Profile.jsx'
import Search from './github/Search.jsx'

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: '3v3r3tt',
      userData: [],
      userRepos: [],
      perPage: 5
    }
  }

  getUserData(){
    $.ajax({
      url: 'https://api.github.com/users/' + this.state.username + '?client_id=' + this.props.clientId + '&client_secret=' + this.props.clientSecret,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({userData: data});
        console.log(data);
      }.bind(this),
      error: function(xhr, status, error) {
        this.setState({username: null});
        alert(error);
      }.bind(this)
    })
  }

  getUserRepos(){
    $.ajax({
      url: 'https://api.github.com/users/' + this.state.username + '/repos?per_page='+ this.state.perPage + '&client_id=' + this.props.clientId + '&client_secret=' + this.props.clientSecret + '&sort=created',
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({userRepos: data});
        console.log(data);
      }.bind(this),
      error: function(xhr, status, error) {
        this.setState({username: null});
        alert(error);
      }.bind(this)
    })
  }

  handleFormSubmit(username){
    this.setState({username: username}, function(){
      this.getUserData();
      this.getUserRepos();
    });
  }

  componentDidMount(){
    this.getUserData();
    this.getUserRepos();
  }

  render(){
    return(
      <div>
        <Search onFormSubmit={this.handleFormSubmit.bind(this)} />
        <Profile {...this.state}/>
      </div>
    )
  }
}

App.propTypes = {
  clientId: React.PropTypes.string,
  clientSecret: React.PropTypes.string
};
App.defaultProps = {
  clientId: '3943d9d751d62cab5f7e',
  clientSecret: 'b6584eb499b130ac05ed11a542a583aca41174a6'
}

export default App
