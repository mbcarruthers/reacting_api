import React , { Component } from "react";
import Ghibli from "./Ghibli.jsx";

export default class PhaseTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            films : [] ,
            shouldShow : false
        };

        this.handleClick = this.handleClick.bind(this);
    }
    addFilm( film ) {
        this.setState({
            films : [film , ...this.state.films]
        })
    }
    componentDidMount() {
        fetch("https://ghibliapi.herokuapp.com/films")
            .then( ( res ) => {
                return res.json();
            }).then( (object) => {
            object.forEach( (item) => {
                this.addFilm( item );
            })
        })
    }

    handleClick() {
        this.setState({
            shouldShow : true
        });
    }
    render() {
        if(this.state.shouldShow) {
            const films = this.state.films.map( (film , index) => {
                return(
                    <li key={index}>
                        <div className="card mt-3 shadow-sm">
                            <div className="card-title text-center"><h3>{film.title}</h3></div>
                            <div className="card-body"><p>{film.description}</p></div>
                        </div>
                    </li>
                )
            });
            return(
                <div className="container-fluid text-center">
                    <Ghibli />
                    <ul className="list-unstyled">
                        { films }
                    </ul>
                </div>
            );
        } else {
            return(
                <div className="container-fluid text-center">
                    <Ghibli />
                    <button className="btn btn-primary" onClick={this.handleClick}>
                        Load Films
                    </button>
                </div>

            )
        }
    };
}