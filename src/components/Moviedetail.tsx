import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Moviedetail = () => {
  const navigate = useNavigate();


  type MovieDetail = {
    Title: string;
    Year: string;
    Poster: string;
    Plot: string;
    Genre: string;
    Actors: string;
    Rated: string;
    Released: string;
    Writer: string;
    imdbRating: string;
    Director: string;


  };

  const API = "fdbe6157";

  const { id } = useParams();
  const [movie, setmovie] = useState<MovieDetail>()


  useEffect(() => {

    const fetchdata = async () => {



      try {
        const { data } = await axios.get("https://www.omdbapi.com/", {
          params:
          {
            apikey: API,
            i: id,
          },
        });

        if (data) {
          setmovie(data)
        }

      }
      catch (error) {
        console.log(error);
      }
    }
    fetchdata();
  }, [id]);

  console.log(movie)


  return (


    <div className='h-auto bg-sky-300 ' >



      <div className='h-auto flex justify-between px-40  p-7 items-center  pt-5 '    >  {/*upper*/}
        <div className='   mt-36  ' >{/*image*/}
          <img className='w-[430px] h-160 ' src={movie?.Poster} alt="" />

        </div>

        <div className='h-auto'>
          <h2 className='text-5xl p-7  pb-20' >{movie?.Title}</h2>
          <ul className=' flex flex-col p-4 pl-8 gap-2.5 text-2xl  text-white bg-rose-600 h-auto w-5xl ' >
            <li className='  p-4 w-full  hover:bg-amber-200  transform  transition delay-150 ' > Genre:{movie?.Genre}</li>
            <li className='  p-4    hover:bg-amber-200  transform  transition delay-150 ' >   Rated:  {movie?.Rated}</li>
            <li className=' p-4 w-full  hover:bg-amber-200  transform  transition delay-150 ' > Released  {movie?.Released}</li>
            <li className=' p-4 w-full  hover:bg-amber-200  transform  transition delay-150 ' > IMDB Rating:   {movie?.imdbRating}</li>
            <li className=' p-4 w-full  hover:bg-amber-200  transform  transition delay-150 ' > Director : {movie?.Director}</li>
            <li className=' p-4 w-full  hover:bg-amber-200  transform  transition delay-150 ' > Writer:  {movie?.Writer}</li>
            <li className=' p-4 w-full  hover:bg-amber-200  transform  transition delay-150  h-auto ' > Actors  {movie?.Actors}</li>

          </ul>
        </div>
      </div>

      <div className='text-2xl p-5 pl-32 flex flex-col gap-5' >{/*lower*/}

        <h3 className='text-4xl  font-semibold' >Plot</h3>
        <div className='bg-rose-600 p-6 rounded-xl    hover:bg-amber-200  transform  transition delay-150  text-white   '  >
          {movie?.Plot}
        </div>
        <div className=' m-3'>
          <button className=' mr-3.5 p-2   rounded-2xl  border-white border-2 text-rose-600' >View IDMB</button>
          <button onClick={() => navigate("/")} className=' ml-3.5  hover:bg-rose-400   transform  transition delay-150 p-2 rounded-2xl border-white border-2 text-rose-600' >Go Back to search</button>
        </div>




      </div>












    </div>


  )
}

export default Moviedetail
