import React, { Component } from 'react';
import '../App.css';

class Movie extends Component {
  showMovie(name){
    this.props.onShow(name);

  }
    render () {
      return (
          <div>
            <div className="block">
              <li className="text-bigger text-info text-center margin" >
                <span className="movie-link" onClick={this.showMovie.bind(this,this.props.movie.name)}>{this.props.movie.name}</span>
              </li>
            </div>
          </div>

      )
    }
}

export default Movie ;
