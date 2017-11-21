import React, { Component } from 'react';
import '../App.css';
import todayDate from './todayDate';

class UpdateMovie extends Component {
  constructor(props){
    super(props);
    this.state=
    {
      movie: {
        id: props.movie.id,
        name: props.movie.name,
        year: props.movie.year,
        date: props.movie.date,
        description: props.movie.description
      },
      clicked: false
    };
  }

  componentWillMount(){
    this.setState({clicked:false});
  }

  handleChange(event){
    this.setState({movie:{[event.target.name]: event.target.value}})
  }

  updateMovie(event){
    event.preventDefault();
    let id = this.props.movie.id;
    let name = this.refs.name.value;
    let year = this.refs.year.value;
    let description = this.refs.description.value;
    let releaseDate = this.refs.dateRelease.value;

    if (name !== '' && year !== '' && description !== '' && releaseDate !== ''){
    console.log(id,name,year,releaseDate,description)
      this.props.onUpdate(id,name,releaseDate,year,description);
      this.refs.name.value= '';
      this.refs.year.value = '';
      this.refs.description.value = '';
      this.refs.dateRelease.value = '';
    }else{
      alert('Please fill up all fields');
    }
  }

  handleClick(){
    this.setState({clicked:true});
  }

  render () {
    return (
      <div>
        <button className="btn btn-primary margin margin-left" onClick={this.handleClick.bind(this)}>Edit Movie</button>
          <div className={this.state.clicked===false? "hid": ""}>
            <div className="update-block">
              <h4 className="text-success text-center"><u>Edit Movie</u></h4>
              <form onSubmit={this.updateMovie.bind(this)}>
                <label>Movie name :<input type="text" ref="name" placeholder="Name" className="form-control input-width" value={this.state.movie.name} onChange={this.handleChange.bind(this)} required/></label><br/>
                <label>Release year :<input type="number" ref="year" placeholder="Year" className="form-control input-width" value={this.state.movie.year} onChange={this.handleChange.bind(this)} required/></label><br />
                <label>Date Of Release :<input type="date" className="form-control" ref="dateRelease" value={this.state.movie.date}  max={todayDate()} onChange={this.handleChange.bind(this)} required /></label><br />
                <label>Movie description :<textarea ref="description" placeholder="Write movie description" className="form-control" rows="4" cols="50" value={this.state.movie.description} onChange={this.handleChange.bind(this)} required/></label><br />
                <button type="submit">Update</button>
              </form>
            </div>
          </div>
      </div>

    )
  }

}

export default UpdateMovie ;
