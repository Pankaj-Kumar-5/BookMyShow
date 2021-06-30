import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import './Details.css';
import YouTube from 'react-youtube';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Link } from 'react-router-dom';

export default function Details(props){
    const [movies,setMovieData] = useState([]);
    const [selectedMovie,setMovie] = useState( {
                    movie: {},
                    starIcons: [{
                        id: 1,
                        stateId: "star1",
                        color: "black"
                    },
                    {
                        id: 2,
                        stateId: "star2",
                        color: "black"
                    },
                    {
                        id: 3,
                        stateId: "star3",
                        color: "black"
                    },
                    {
                        id: 4,
                        stateId: "star4",
                        color: "black"
                    },
                    {
                        id: 5,
                        stateId: "star5",
                        color: "black"
                    }]
                });
        
           const loadMovie = async()=>{
                let currentState = selectedMovie;
                const rawResponse = await fetch(props.baseUrl+"movies/"+props.match.params.id);
                currentState['movie'] = await rawResponse.json()
                setMovie({...currentState});
                setMovieData(selectedMovie['movie']);
            }
        
            useEffect(()=>{
                loadMovie();
            },[]);


        const opts = {
                        height: '300',
                        width: '700',
                        playerVars: {
                            autoplay: 1
                        }
                    }
                            
        const artistClickHandler = (url) => {
                    window.location = url;
                }

        const starClickHandler = (id) => {
                    let starIconList = [];
                    for (let star of selectedMovie.starIcons) {
                        let starNode = star;
                        if (star.id <= id) {
                            starNode.color = "yellow"
                        }
                        else {
                            starNode.color = "black";
            
                        }
                        starIconList.push(starNode);
                    }
                    let currentState = selectedMovie;
                    currentState['starIcons'] = starIconList;
                    setMovie({ ...currentState});
                }

                const getVideoUrl=()=>{
                    if(movies.trailer_url!=null)
                        return  movies.trailer_url.split("?v=")[1];
                }

        
                
    return (
        <div className="details">
            <div className="back">
                <Typography>
                    <Link to="/">  Back to Home</Link>
                </Typography>
            </div>
            <div className="flex-containerDetails">
                <div className="leftDetails">
                    <img src={movies.poster_url} alt={movies.title} />
                </div>

                <div className="middleDetails">
                    <div>
                        <Typography variant="inherit" component="h2">{movies.title} </Typography>
                    </div>
                    <br />
                    <div>
                        <Typography>
                            <span className="bold">Genres: </span> {movies.genres!=null && movies.genres.join(', ') }
                        </Typography>
                    </div>
                    <div>
                        <Typography><span className="bold">Duration:</span> {movies.duration} </Typography>
                    </div>
                    <div>
                        <Typography><span className="bold">Release Date:</span> {new Date(movies.release_date).toDateString()} </Typography>
                    </div>
                    <div>
                        <Typography><span className="bold"> Rating:</span> {movies.critics_rating}  </Typography>
                    </div>
                    <div className="marginTop16">
                        <Typography><span className="bold">Plot:</span> <a href={movies.wiki_url}>(Wiki Link)</a> {movies.storyline} </Typography>
                    </div>
                    <div className="trailerContainer">
                        <Typography>
                            <span className="bold">Trailer:</span>
                        </Typography>
                        <YouTube
                            videoId={getVideoUrl()}
                            opts={opts}
                            // onReady={this._onReady}
                        />
                    </div>
                </div>

                <div className="rightDetails">
                    <Typography>
                        <span className="bold">Rate this movie: </span>
                    </Typography>
                    {selectedMovie.starIcons.map(star => (
                        <StarBorderIcon
                            className={star.color}
                            key={"star" + star.id}
                            onClick={() => starClickHandler(star.id)}
                        />
                    ))}

                    <div className="bold marginBottom16 marginTop16">
                        <Typography>
                            <span className="bold">Artists:</span>
                        </Typography>
                    </div>
                    <div className="paddingRight">
                        <GridList cellHeight={160} cols={2}>
                            {movies.artists != null && movies.artists.map(artist => (

                                <GridListTile
                                    className="gridTile"
                                    onClick={() => artistClickHandler(artist.wiki_url)}
                                    key={artist.id}>
                                    <img src={artist.profile_url} alt={artist.first_name + " " + artist.last_name} />
                                    <GridListTileBar
                                        title={artist.first_name + " " + artist.last_name}
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                </div>
            </div>
        </div>
    )
}