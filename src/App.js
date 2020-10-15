import React, { Component } from 'react';
import './App.css';

const ytApiKey = 'AIzaSyAOYG1Ai4mZy6L-ifZgQ8bzS87vA6v3JdA'
const ytResult = 5;
const omdbApiKey = '99ad3b53'

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      movies: [],
      resultyt: [],
      title: 'Movie Search'
    };
    this.searchClick = this.searchClick.bind(this);
    this.movieClick = this.movieClick.bind(this);
    this.backClick = this.backClick.bind(this);  
  }
  
  searchClick(event) {
    event.preventDefault();
    let query = this.refs.query.value;
    let omdbUrl =`https://www.omdbapi.com/?apikey=${omdbApiKey}&s="${query}"&type=movie`;
    let that = this;
    fetch(omdbUrl)
      .then((response) => response.json())
      .then((responseJson) => {
        const resultOmdb = responseJson;
        that.setState({
          movies: resultOmdb.Search
      });
      })
      .catch((error) => {
        console.error(error);
      });
      this.refs.query.value = '';   
  }

  movieClick(ev) {
    this.setState({viewMovie: true});
    var movieYear = ev.target.value; 
    var movieTitle = ev.target.dataset.name;
    var ytUrl = `https://www.googleapis.com/youtube/v3/search?q=${movieTitle} ${movieYear} trailer&order=relevance&part=snippet&type=video&maxResults=${ytResult}&key=${ytApiKey}`;
    fetch(ytUrl)
      .then((response) => response.json())
      .then((responseJson) => {
        const resultyt = responseJson.items.map(obj => "https://www.youtube.com/embed/"+obj.id.videoId);
        this.setState({resultyt});
      })
      .catch((error) => {
        console.error(error);
      });    
  }

  backClick() {
    this.setState({viewMovie: false});
  }

  renderNormal() {
    let title = this.state.title;
    var movies = this.state.movies.map(function(movie,i){
      return <a href='#' key={i}><li   data-name={movie.Title} value={movie.Year}>{movie.Title} {movie.Year}</li></a>
    });
    return (
      <div className="flex-container">
        <h1>{title}</h1>
        <form>
          <input className="app_input" ref="query" type="text"/>
          <button onClick={this.searchClick}>Search</button>
        </form>
        <ul onClick={this.movieClick}>
          {movies}
        </ul>
      </div>
    );
  }

  renderView() {
    return (
      <div className="flex-container">
        <h1>Movie Result</h1>
        <div className="youtubeClip">      
          {
            this.state.resultyt.map((link,i) => {
              var frame = <div key={i} ><iframe  width="560" height="315" src={link} frameBorder="0" allowFullScreen></iframe></div>
              return frame;
            })
          }
          {this.frame}
          <button onClick={this.backClick}>Back</button>
        </div>
      </div>
    );
  }

  render() {
    if(this.state.viewMovie){
      return this.renderView();
    }else{
      return this.renderNormal();
    }
  }
}

export default App;
