import React, { useState, useEffect } from "react";
import Header from "../common/header/Header";
import Home from '../screens/home/Home';
import Details from '../screens/details/Details';
import Confirmation from '../screens/confirmation/Confirmation';
import { UserLoginContext } from "../common/UserLoginContext";
import { Route, Switch, useLocation,useHistory } from "react-router-dom";
import BookShow from "./bookshow/BookShow"
import LoginRegisterModal from "../common/login_register_modal/LoginRegisterModal";

const Controller = () => {

    const location = useLocation();
    const background = location.state && location.state.background;

    const [allMoviesList, setAllMoviesList] = useState([]);
    const [publishedMovie, setPublishedMovie] = useState([]);
    const [releasedMovies, setReleasedMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [artists, setArtists] = useState([]);
    const [clickedMovie,setClickedMovie] = useState([]);
    const [movieId,setMovieId] = useState("");
    const history=useHistory();

        

    const baseUrl = ()=>{return "http://localhost:8085/api/v1/"};

    const movieClickHandler = (movieId) =>{
        setMovieId(movieId);
        history.push('/movie/' + movieId);

        let currentState = allMoviesList.filter((mov) => {
            console.log(mov.id,"|",movieId,"|",mov.id === movieId);
            return mov.id === movieId
        })[0];

        console.log("clicked movie",currentState);
        if (currentState != null && currentState != [])
            setClickedMovie(currentState);   
        console.log("clicked movie1",clickedMovie);
    }

    const isUserLoggedIn = () => {
        return getAccessToken() !== null;
    }

    const getAccessToken = () => {
        return window.localStorage.getItem('access-token');
    }

    const [userLoggedIn, setUserLoggedIn] = useState(isUserLoggedIn());

    const loginHandler = async (username, password) => {
        const authorization = window.btoa(`${username}:${password}`);

        const rawResponse = await fetch("http://localhost:8085/api/v1/auth/login",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'authorization': `Basic ${authorization}`
                }
            }
        );

        if (rawResponse.status === 200) {
            const userDetails = await rawResponse.json();
            window.localStorage.setItem('user-details', JSON.stringify(userDetails));
            window.localStorage.setItem('access-token', rawResponse.headers.get('access-token'));

            setUserLoggedIn(true);

            return true;
        } else {
            return false;
        }
    }

    const registerUserHandler = async (registerUserForm) => {
        console.log(registerUserForm);
        const rawResponse = await fetch("http://localhost:8085/api/v1/signup",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerUserForm)
            }
        );

        
        const data = await rawResponse.json();

        
        console.log(data);

        if (data && "ACTIVE" === data.status) {
            return true;
        } else {
            return false;
        }
    }

    const logoutHandler = async () => {
        const authorization = getAccessToken();

        const rawResponse = await fetch("http://localhost:8085/api/v1/auth/logout",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json;charset=UTF-8',
                    'authorization': `Bearer ${authorization}`
                }
            }
        );

        const responseHeaders = rawResponse.headers;

        console.log(responseHeaders);

        if (rawResponse.status === 200) {
            window.localStorage.removeItem('user-details');
            window.localStorage.removeItem('access-token');

            setUserLoggedIn(false);
        }
    }

    const filterReleasedMovies = () =>{
        let releasedMovies = allMoviesList.filter(movies=>{
            console.log(allMoviesList.status === 'RELEASED');
            return allMoviesList.status === 'RELEASED';
        });
        console.log("released MOvies",allMoviesList)
        setReleasedMovies(releasedMovies);
        }

    async function loadData() {

        const rawResponse = await fetch("http://localhost:8085/api/v1/movies?page=1&limit=20")
        const data = await rawResponse.json()
        setAllMoviesList(data.movies);
        
        let publishedMovies = data.movies.filter(movies=>{
            console.log(movies.status === 'PUBLISHED');
            return movies.status === 'PUBLISHED';
        });
        setPublishedMovie(publishedMovies);

        let releasedMovies = data.movies.filter(movies=>{
            console.log(movies.status === 'RELEASED');
            return movies.status === 'RELEASED';
        });

        setReleasedMovies(releasedMovies);
    }

    async function loadGenres() {

        const rawResponse = await fetch("http://localhost:8085/api/v1/genres")
        const data = await rawResponse.json()
        setGenres(data.genres);
    }

    async function loadArtists() {

        const rawResponse = await fetch("http://localhost:8085/api/v1/artists")
        const data = await rawResponse.json()
        setArtists(data.artists);
    }

    const search = data => {

        let filertredResult = allMoviesList.filter(movies => {
            let filter = true;

            if (movies.title && !movies.title.includes(data.movieName)) {
                filter = false;
            }

            if (filter && movies.genres && data.genres.length > 0) {
                const filteredGenresResult = data.genres.filter(gen => {
                    return movies.genres.includes(gen);
                })

                if (filteredGenresResult.length === 0) {
                    filter = false;
                }
            }


            if (filter && movies.artists && data.artists.length > 0) {
                const filteredArtistResult = data.artists.filter(art => {
                    const innerFilter = movies.artists.filter(artM => {
                        let fullname = artM.first_name + " " + artM.last_name;
                        return fullname === art;
                    })

                    return innerFilter.length !== 0;

                })

                if (filteredArtistResult.length === 0) {
                    filter = false;
                }

            }

            return filter;
        })

        if (filertredResult != null && filertredResult != [])
            setReleasedMovies(filertredResult);
    }

    useEffect(() => {
        loadData();
        loadGenres();
        loadArtists();
    }, [])

    return (
        <div className="main-container">
            <UserLoginContext.Provider value={userLoggedIn}>
                <Header logoutHandler={logoutHandler} movieId={movieId}/>
            </UserLoginContext.Provider>

            <Switch location={background || location}>
                <Route exact path='/' render={({ history }, props) => <Home {...props} history={history} allMoviesList={allMoviesList} genres={genres} releasedMovies={releasedMovies} publishedMovie={publishedMovie} artists={artists} movieClickHandler={movieClickHandler} search={(data) => search(data)}  />} />
                <Route path='/movie/:id' render={(props) => <Details {...props} allMoviesList={allMoviesList} clickedMovie={clickedMovie}/>} />
                <Route path='/bookshow/:id' render={(props) => <BookShow {...props} />} />
                <Route path='/confirm/:id' render={(props) => <Confirmation {...props} />} />
            </Switch>

            {background && <Route path="/login-register-modal" children={<LoginRegisterModal loginHandler={loginHandler} registerUserHandler={registerUserHandler} />} />}
        </div>
    )
}

export default Controller;