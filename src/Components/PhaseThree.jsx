import React , { Component } from "react";
import Ghibli from "./Ghibli.jsx";

export default class PhaseThree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            films : [] ,
            showPeople : false ,
            showFilms : false
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
                console.log(item);
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

    // this fucking function
    fetchPeople() {
       const people = [];
           this.state.films.map( (item , index) => {

           fetch(item.people)
               .then( (res) => {
                   return res.json();
               }).then( (object) => {
                   people[index] = object;
           }).catch( (error) => {
               console.log(`${error}!!!`);
           })
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
            // this bullshit
            const people = this.fetchPeople();
            const people_cards = people.map( (person,index) => {
                console.log(person);
                const link = "https://ghibliapi.herokuapp.com/films" + person.id;
                return(
                    <li key={person.id}>
                        <div className="card m-3 shadow-sm">
                            <div className="card-body">
                                <h5>{person.name}</h5>
                                <p>Gender: {person.gender}</p>
                                <p>Age: {person.age}</p>
                                <a href={link}>{person.name}'s link</a>

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
                        {/*{people_cards}*/}
                    </ul>
                </div>
            )
        }
    }
}