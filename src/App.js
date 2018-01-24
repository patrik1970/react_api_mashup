import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
//import Youtube from './Youtube';

const API = 'AIzaSyAOYG1Ai4mZy6L-ifZgQ8bzS87vA6v3JdA'
//const channelID = 'UCXgGY0wkgOzynnHvSEVmE3A'
//const searchQuery = 'Jaws: The Revenge (1987) trailer'
const searchQuery = ''
const result = 5;

// https://www.googleapis.com/youtube/v3/search?key=AIzaSyAOYG1Ai4mZy6L-ifZgQ8bzS87vA6v3JdA&channelId=UCXgGY0wkgOzynnHvSEVmE3A&part=snippet,id&order=date&maxResults=10

//https://www.googleapis.com/youtube/v3/search?key=AIzaSyAOYG1Ai4mZy6L-ifZgQ8bzS87vA6v3JdA&part=snippet&q='star wars new hope',id&order=date&maxResults=10

//var finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelID}&part=snippet,id&order=date&maxResults=${result}`

//var finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&part=snippet&q=${searchQuery},id&order=relevance&maxResults=${result}`

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      resultyt: []
    };
    this.clicked = this.clicked.bind(this);
  }
clicked(){
  event.preventDefault();
  let searchQuery = this.refs.movieSearch.value;
  var finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&part=snippet&q=${searchQuery},id&order=relevance&maxResults=${result}`;
  fetch(finalURL)
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        const resultyt = responseJson.items.map(obj => "https://www.youtube.com/embed/"+obj.id.videoId);
        this.setState({resultyt});
      })
      .catch((error) => {
        console.error(error);
      });
}



  render(){
    // console.log(finalURL);
    console.log(this.state.resultyt);

    return(
      <div>
        <input type="text" ref="movieSearch" placeholder="Write a movie" />
        <button onClick={this.clicked}>Get youtube videos</button>
          {
            this.state.resultyt.map((link, i) => {
              console.log(link);
              var frame = <div key={i} className="youtube"><iframe  width="560" height="315" src={link} frameBorder="0" allowFullScreen></iframe></div>
              return frame;
            })
          }
          {this.frame}


    </div>
    );
  }
}

export default App;
