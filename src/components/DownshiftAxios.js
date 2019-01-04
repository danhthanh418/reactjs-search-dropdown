import React, { Component } from 'react'
import Downshift from 'downshift';
import axios from 'axios';
import logo from '.././logo.svg'
export default class DownshiftAxios extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: []
        }
        this.fetchMovies = this.fetchMovies.bind(this)
        this.inputOnChange = this.inputOnChange.bind(this)
    }
    // onChange method for the input field
    inputOnChange(event) {
        if (!event.target.value) {
            return
        }
        this.fetchMovies(event.target.value)
    }
    // input field for the <Downshift /> component
    downshiftOnChange(selectedMovie) {
        alert(`your favourite movie is ${selectedMovie.title}`)
    }
    // method to fetch the movies from the movies API
    fetchMovies(movie) {
        const moviesURL = `https://api.themoviedb.org/3/search/movie?api_key=1b5adf76a72a13bad99b8fc0c68cb085&query=${movie}`;
        axios.get(moviesURL).then(response => {
            this.setState({ movies: response.data.results })
        })
    }
    render() {
        return (
            <Downshift onChange={this.downshiftOnChange} itemToString={item => (item ? item.title : '')}>
                {/* // pass the downshift props into a callback */}
                {({ selectedItem, getInputProps, getItemProps, highlightedIndex, isOpen, inputValue, getLabelProps }) => (
                    <div>
                        {/* // add a label tag and pass our label text to the getLabelProps function */}
                        <label style={{ marginTop: '1rem', display: 'block' }} {...getLabelProps()}>Choose your favourite movie</label> <br />
                        {/* // add a input tag and pass our placeholder text to the getInputProps function. We also have an onChange eventlistener on the input field */}
                        <div className='btn btn-group'>
                            <input {...getInputProps({
                                placeholder: "Search movies",
                                onChange: this.inputOnChange
                            })} />
                            <button className='btn btn-primary btn-search'><i class="fa fa-search" aria-hidden="true"></i>Tim</button>
                        </div>
                        {/* // if the input element is open, render the div else render nothing */}
                        {isOpen ? (
                            <div className="downshift-dropdown">
                                {
                                    // filter the movies in the state
                                    this.state.movies
                                        .filter(item => !inputValue || item.title.toLowerCase().includes(inputValue.toLowerCase()))
                                        .slice(0, 10) // return just the first ten. Helps improve performance
                                        // map the filtered movies and display their title
                                        .map((item, index) => (
                                            <div
                                                className="dropdown-item"
                                                {...getItemProps({ key: index, index, item })}
                                                style={{
                                                    flex:1,
                                                    display:'-webkit-flex flex',
                                                    backgroundColor: highlightedIndex === index ? 'lightgray' : 'lightblue',
                                                    fontWeight: selectedItem === item ? 'bold' : 'normal',
                                                }}>
                                                <div style={{ flex: 1, flexDirection: 'column', display: 'flex',}}>
                                                    <div style={{ color: 'red',}}>{item.title}</div>
                                                    
                                               </div>
                                                
                                            </div>
                                        ))
                                }
                            </div>
                        ) : null}
                    </div>
                )}
            </Downshift>
        )
    }
}