
import { useNavigate } from 'react-router-dom';


interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
}

interface Props {
  favmovie: Movie[];
}




const Favourite = ({favmovie}:Props) => {


    const navigate=useNavigate();

    
  return (
    <div  className='flex flex-wrap  justify-center items-center' >
        <div className='   flex flex-wrap  justify-center items-center '>

                    {favmovie.map((e) => (
                            <div className=' p-5 position relative h-120 bg-fixed   overflow-hidden max-w-[300px ]'>
                            
                                <img onClick={() => navigate(`/movie/${e.imdbID}`)} src={e.Poster} alt="hello" />
                            </div>
                        ))
                        
                    }



                </div>
      
    </div>
  )
}

export default Favourite
