import React , { Component } from "react";


export default class PhaseOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            films : []
        }
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

    render() {
        const films = this.state.films.map( (film , index) => {
            return(
                <li key={index}>
                    <div className="card mt-3 shadow">
                        <div className="card-title text-center"><h3>{film.title}</h3></div>
                        <div className="card-body"><p>{film.description}</p></div>
                    </div>
                </li>
            )
        });
        return(
            <div className="container-fluid">
                <ul className="list-unstyled">
                    { films }
                </ul>
            </div>
        );
    };
}