import React, { useEffect, useState } from 'react'
import axios from 'axios'
import'./Tv.css'
const Tv = () => {
    const imageURL = "https://image.tmdb.org/t/p/original"
    const [tv, setTv] = useState([]);


    // gettin the tv data 
    const getTv = async () => {
        const { data } = await axios.get("https://api.themoviedb.org/3/trending/tv/day?api_key=52bbcddeda849047525b51d6f8a12361")
        setTv(data.results);
    };

    useEffect(() => {
        getTv();
    }, []);


    return (
        <div>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-2">
                        <div className="brdr mb-5 w-50"></div>
                        <h2 className="title">Trending TV To watch right now </h2>
                        <p className="desc">Most watched TV </p>
                        <div className="brdr mt-5 w-50"></div>
                    </div>
                    {tv.slice(0, 11).map((ele, index) => {
                        return (
                            <div className="col-md-2" key={index}>
                                <div className="items position-relative">
                                    <img src={imageURL + ele.poster_path} className="img-fluid" alt="" />
                                    <h3>{ele.name.slice(0, 10)}</h3>
                                    <p>{ele.overview.slice(0, 20)}...</p>
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

export default Tv
