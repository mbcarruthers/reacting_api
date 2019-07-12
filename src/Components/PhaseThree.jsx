import React , { Component } from "react";
import Ghibli from "./Ghibli.jsx";

export default class PhaseThree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            films : [] ,
            showPeople : false ,
            showFilms : false ,
            people : []
        };
        this.handleFilms = this.handleFilms.bind(this);
        this.handlePeople = this.handlePeople.bind(this);
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
                // console.log(item);
                this.addFilm(item);
            })
        })
    }
    handleFilms() {
        this.setState({
            showFilms : true,
            showPeople : false
        })
    }
    handlePeople() {
        this.setState({
            showPeople : true,
            showFilms : false
        })
    }
    // not being used ATM
    async fetchPeople() {
        const people = await fetch("http://ghibliapi.herokuapp.com/people")
            .then( (res) => {
                return res.json();
            }).then( (object) => {
            return object;
        });
        return people;
    }
    render() {
        if( !this.state.showPeople && !this.state.showFilms) {
            return(
                <div className="container-fluid text-center">
                    <Ghibli />
                    <button className="btn btn-primary m-3" onClick={this.handleFilms}>Load Films</button>
                    <button className="btn btn-primary" onClick={this.handlePeople}>Load People</button>
                </div>
            )
        } else if(this.state.showFilms) {
            const films = this.state.films.map( (film , index) => {
                return(
                    <li key={index}>
                        <div className="card mt-3 shadow-sm">
                            <div className="card-title text-center"><h3>{film.title}</h3></div>
                            <div className="card-body"><p>{film.description}</p></div>
                            <a href={film.people}>people</a>
                        </div>
                    </li>
                )
            });
            return(
                <div className="container-fluid text-center">
                    <Ghibli />
                    <button className="btn btn-primary m-3" onClick={this.handleFilms}>Load Films</button>
                    <button className="btn btn-primary" onClick={this.handlePeople}>Load People</button>
                    <ul className="list-unstyled">
                        { films }
                    </ul>
                </div>
            )
        } else if(this.state.showPeople) {
            let count = 0; // count property to see how many times this is running, got kicked out before i could see
                            // what is says
            fetch("http://ghibliapi.herokuapp.com/people/") // something about this code, which is almost
                                                                   // which is just about the same thing as the load films
                .then( (res) => {
                    return res.json();
                }).then( (object) => {
                    object.forEach( (item) => {
                        this.setState({
                            people : [item , ...this.state.people]
                        })
                    });
                    ++count;
            });
            const people_cards = this.state.people.map( (item , index) => {
               return(
                   <li key={index}>
                       <div className="mt-3 card shadow-sm">
                           <div className="card-title text-center"><h5>{ item.name }</h5></div>
                           <div className="card-body text-center">
                               <p className="text-center">{ count }</p>
                           </div>
                       </div>
                   </li>
               )
            });

            return(
                <div className="container-fluid text-center">
                    <Ghibli />
                    <button className="btn btn-primary m-3" onClick={this.handleFilms}>Load Films</button>
                    <button className="btn btn-primary" onClick={this.handlePeople}>Load People</button>
                    <ul className="list-unstyled">
                        {people_cards}
                    </ul>
                </div>
            )
        }
    }
}