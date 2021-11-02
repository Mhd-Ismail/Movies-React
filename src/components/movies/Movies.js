import React, { useEffect, useState } from 'react'
import './Movies.css'
import axios from 'axios'

const Movies = () => {
    const imageURL = "https://image.tmdb.org/t/p/original"
    const [movies, setMovies] = useState([]);
    
    // get the Movies data 
    const getMovies = async () => {
        const { data } = await axios.get("https://api.themoviedb.org/3/trending/movie/day?api_key=52bbcddeda849047525b51d6f8a12361")
        setMovies(data.results);
    };

    useEffect(() => {
        getMovies();
    }, []);



    return (
        <div>
            <div className="container">
                {/* movies section */}
                <div className="row mt-5">
                    <div className="col-md-2">
                        <div className="brdr mb-5 w-50"></div>
                        <h2 className="title">Trending Movies To watch right now </h2>
                        <p className="desc">most watched movies </p>
                        <div className="brdr mt-5 w-50"></div>
                    </div>
                    {movies.slice(0,11).map((ele, index) => {
                        return (
                            <div className="col-md-2 " key={index}>
                                <div className="items position-relative ">
                                    <img src={imageURL + ele.poster_path} className="img-fluid" alt="" />
                                    <h3>{ele.title.slice(0,10)}</h3>
                                    <p>{ele.overview.slice(0,20)}...</p>
                                    <div className="voting">{ele.vote_average}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )




}

export default Movies

