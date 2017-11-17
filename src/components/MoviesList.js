import React, { Component } from 'react';
import Movie from './Movie';
import ShowMovie from './ShowMovie';
import MyJson from '../json/movies.json';

class MoviesList extends Component {
  constructor(props){
    super(props);
    this.state={
      search_name: '',
      search_year: '',
      movies: MyJson.movies,
      movie: {
        id: 0,
        name: '',
        year: '',
        description: ''
      },
      movies_list: false,
      add_movie: false
    };
  }

  updateSearchName(event){
    this.setState(
      {
        search_name: event.target.value
      }
    )
  }

  updateSearchYear(event){
    this.setState(
      {
        search_year: event.target.value
      }
    )
  }

  addMovie(event){
    event.preventDefault();
    let name = this.refs.name.value;
    let year = this.refs.year.value;
    let description = this.refs.description.value;
    if (name !== '' && year !== '' && description !== ''){
      this.setState(
        {
          movies: this.state.movies.concat({name,year,description}),
          search_name: '',
          search_year: '',
          add_movie: true
        }
      )
      alert('movie added');
      this.refs.name.value= '';
      this.refs.year.value = '';
      this.refs.description.value = '';
    }else{
      alert('Please fill up all fields');
    }
  }

  showThisMovie(name){
    let movies = this.state.movies;
    let found_movie = movies.findIndex(x => x.name === name)
    this.setState({
      movie: movies[found_movie],
      movies_list: true
    })
  }

  update(Id,Name,Year,Description){
    this.setState({
      movie:{
        id: Id,
        name: Name,
        year: Year,
        description: Description
      }
    },function(){
      var id = this.state.movie.id;
      var updated_movies = this.state.movies;
      updated_movies[id-1] = this.state.movie;
      this.setState({
        movies: updated_movies,
        movies_list: false
      })
      alert('Movie updated successfully')
    })
  }

  backButton(){
    this.setState({
      movies_list: false
    })
  }

  onSearch(){
    this.setState({
      movies_list: false
    })
  }

  render () {
    let filteredMovieNames = this.state.movies.filter(
      (movie) => {
        var counter = 0;
        var movies_array = movie.name.split(' ');
        movies_array.map(item =>
          {
            if (item.toLowerCase().indexOf(this.state.search_name.toLowerCase()) === 0) {
            counter = 1;
            }
            return false;
          })
        if ( counter === 1)
        {
          return true;
        }else{
          return false;
        }
      }
    )

    let filteredMovieYears = this.state.movies.filter(
      (movie) => {
        return movie.year.indexOf(this.state.search_year) === 0 ;
      }
    )

    var commonValues = filteredMovieNames.filter(function(value) {
                      return filteredMovieYears.indexOf(value) > -1;
    });

    if (commonValues.length > 0){
      var element =  commonValues.map((movie) => {
        return <Movie movie={movie} key={movie.name} onShow = {this.showThisMovie.bind(this)}/>
        })
    }
    else {
       element = <li className = "new-movie">
                    <div>
                      <p className="text-danger text-center">No movies found.</p>
                      <h4 className="text-info margin-left">Add a new movie</h4>
                      <form onSubmit={this.addMovie.bind(this)} className="margin-left" >
                        <label>Movie name :<input type="text" ref="name" placeholder="Name" className="form-control input-width" required/></label><br/>
                        <label>Release year :<input type="number" ref="year" placeholder="Year" className="form-control input-width" required/></label><br />
                        <label>Movie description :<textarea ref="description" placeholder="Write movie description" className="form-control" rows="4" cols="50" required/></label><br />
                        <button type="submit">Add new movie</button>
                    </form>
                    </div>
                  </li>
    }

    if(this.state.movies_list !== false){
      element = <ShowMovie movie={this.state.movie} onUpdate={this.update.bind(this)} clickButton={this.backButton.bind(this)} />
    }

    return (
      <div>
        <div className="bg-info">
          <div className="container">
            <div className="text-center">
            <span className="text-biggest margin-right">Search movies :</span>
              <input type="text" className="search-box margin-right" placeholder="Movie name" value={this.state.search_name} onChange={this.updateSearchName.bind(this)} onClick={this.onSearch.bind(this)} />
              <input type="text" className="search-box" placeholder="Release year" value={this.state.search_year} onChange={this.updateSearchYear.bind(this)} onClick={this.onSearch.bind(this)}/>
            </div>
          </div>
        </div>
        <div className="container margin">
          <ul className="list-unstyled">
            {element}
          </ul>
        </div>
      </div>
    )
  }

}

export default MoviesList;
