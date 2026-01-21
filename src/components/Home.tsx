import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';



const Home = () => {
    const navigate = useNavigate();

    type IMovie = {
        Title: string;
        Year: string;
        Poster: string;
        imdbID: string;
    };





    const API = "fdbe6157";

    const [movie, setmovie] = useState<IMovie[]>([])
    const [search, setsearch] = useState("")



    useEffect(() => {

        const fetchdata = async () => {

            if (search === null) {
                setmovie([])
            }
            //setloading(true)

            try {
                const { data } = await axios.get("https://www.omdbapi.com/", {
                    params:
                    {
                        apikey: API,
                        s: search,
                    },
                });

                if (data) {
                    setmovie(data.Search ?? [])
                }
                else setmovie([])
            }

            catch (error) {
                console.log(error);
            }
            // setloading(false);

        }

        fetchdata();

    }, [search]);

    console.log(movie)

    return (
        <>
            <div className='bg-sky-200 min-h-screen  h-auto  '          >

                <div className='flex-col  justify-center  h-auto  '   >{/*Upper*/}
                    <h3 className='text-center text-3xl  font-semibold p-6'  >IDMB MOVIEffffS</h3>
                    <div className='flex p-4  w-full justify-center items-center  h-full  ' >

                        <input type="text" className='border-4  p-6  w-7xl  bg-amber-900  rounded-3xl h-10  border-blue-500 bg-white   '
                            onChange={(e) => setsearch(e.target.value)} />
                    </div>
                    <div className='flex p-7 justify-center  ' >
                        <button className='text-xl   border-2 p-4 px-12  hover:bg-amber-700  rounded-4xl  '  >Favourite</button> </div>
                </div>


                <div className='   flex flex-wrap  justify-center items-center '>{/*down*/}

                    {movie.length === 0 ? (<h2>Search Your Favourite Movie</h2>) :
                        (movie.map((e) => (

                            <div onClick={() => navigate(`/movie/${e.imdbID}`)}
                                className=' p-5   max-[400px]: overflow-hidden max-w-[300px ]    ' >
                                <img src={e.Poster} alt="hello" />
                            </div>
                        ))
                        )
                    }
                    s
                </div>

            </div>
        </>
    )
}

export default Home
