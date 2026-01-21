import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Heart } from 'lucide-react';


import { useNavigate } from 'react-router-dom';
import Favourite from './Favourite';



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
    const [favmovie, setfavmovie] = useState<IMovie[]>([])
    const [favbutton, setfavbutton] = useState<boolean>(true)
    const [active, setactive] = useState("movie")



    const clickfav = (movie: IMovie) => {


        if (favmovie.some((item) => item.imdbID == movie.imdbID)) {
            setfavmovie(favmovie.filter((item) => item.imdbID != movie.imdbID))
        }
        else setfavmovie([...favmovie, movie])
    }

    const showfavmovie = () => {
        setfavbutton(false)
        setactive("favourite")


    }
    const showmovie=()=>{
        setactive("movie")
        setfavbutton(true)
    }



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
                    <h3 className='text-center text-3xl  font-semibold p-6'  >IDMB MOVIE</h3>
                    <div className='flex p-4  w-full justify-center items-center  h-full  ' >

                        <input type="text" className='border-4  p-6  w-7xl  bg-amber-900  rounded-3xl h-10  border-blue-500  '
                            onChange={(e) => setsearch(e.target.value)} />
                    </div>
                    <div className='flex p-7 gap-4 justify-center  ' >
                        <button onClick={showmovie} className={`text-xl ${active == "movie" ? "bg-amber-700" : "bg-white"}  border-2 p-4 px-12  hover:bg-amber-700  rounded-4xl  `}>  Movie</button>

                        <button onClick={showfavmovie} className={`  ${active == "favourite" ? "bg-amber-700" : "bg-white"} text-xl border-2 p-4 px-12  hover:bg-amber-700  rounded-4xl`}  >Favourite</button> </div>
                </div>


                {/*down*/}


                {favbutton ? (<div className=' flex flex-wrap  justify-center items-center '>

                    {movie.length === 0 ? (<h2>Search Your Favourite Movie</h2>) :
                        (movie.map((e) => (


                            <div className=' p-5 position relative h-120 bg-fixed bg-cover  overflow-hidden max-w-[300px ]'>
                                <div className='position absolute  top-7 left-60  '  >
                                    <button onClick={() => { clickfav(e) }}>
                                        {favmovie.some((item: IMovie) => item.Title == e.Title) ? (<Heart className='size-8 text-white overflow-hidden bg-red-600   ' />) : <Heart className=' text-white  size-8 overflow-hidden   ' />}
                                    </button>
                                </div>
                                <img onClick={() => navigate(`/movie/${e.imdbID}`)} src={e.Poster} alt="hello" />
                            </div>
                        ))
                        )
                    }



                </div>) : (<Favourite favmovie={favmovie} />)}




            </div>


        </>
    )
}

export default Home
