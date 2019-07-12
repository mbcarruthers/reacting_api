import React , { Component } from "react";
import Ghibli from "./Ghibli.jsx";
let count = 0; // variable to see how often something is running , needs to be global for now
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

    addPerson( person ) {
        this.setState({
            people : [person , ...this.state.people]
        })
    }

    componentDidMount() {
        fetch("https://ghibliapi.herokuapp.com/films")
            .then( ( res ) => {
                return res.json();
            }).then( (object) => {
            object.forEach( (item) => {
                this.addFilm(item);
            })
        });
        fetch("http://ghibliapi.herokuapp.com/people")
            .then( (res) => {
                return res.json();
            }).then( (object) => {
            object.forEach( (item) => {
                this.addPerson( item );
            });
            ++count;
            console.log(count);
        }).catch( (error) => {
            console.log(`There has been an ERROR!! ${error}`);
        });
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
                            {/*<a href={film.people}>people</a>*/}
                        </div>
                    </li>
                )
            });
            return(
                <div className="container-fluid text-center bg-info">
                    <Ghibli />
                    <button className="btn btn-primary m-3" onClick={this.handleFilms}>Load Films</button>
                    <button className="btn btn-primary" onClick={this.handlePeople}>Load People</button>
                    <ul className="list-unstyled">
                        { films }
                    </ul>
                </div>
            )
        } else if(this.state.showPeople) {
            const people_cards = this.state.people.map( (item , index) => {

               return(
                   <li key={index}>
                       <div className="mt-3 card shadow-sm">
                           <div className="card-title text-center"><h5>Name: { item.name }</h5></div>
                           <div className="card-body text-center">
                               <p className="text-center">Gender: { item.gender }</p>
                               <a href={item.url} target="_blank"> {item.name} Link</a>
                           </div>
                       </div>
                   </li>
               )
            });
            return(
                <div className="container-fluid text-center bg-danger">
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