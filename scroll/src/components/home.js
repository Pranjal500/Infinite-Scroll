import React, { useEffect, useState } from 'react';
import MovieComponent from './movie';

const Home =()=>{
    const [card , setCard] = useState([]);
    const [page , setPage] = useState(1);

    const getCardData = async()=>{

        let result =await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=9&_page=${page}`);

        result = await result.json();
       // console.log(result)
        setCard((prev)=>[...prev,...result]);
    }
    useEffect(()=>{
         getCardData();
      },[page]);

  const   handleInfiniteScroll = async ()=>{
       // console.log("scrollHeight"+ document.documentElement.scrollHeight);
      //  console.log( "innerHeight" +window.innerHeight);
       // console.log("scrollTop" +document.documentElement.scrollTop  );
        try {
            if(window.innerHeight+ document.documentElement.scrollTop+1 >= document.documentElement.scrollHeight)
            {
                setPage((prev)=>prev +1)

            }

            
        } catch (error) {
            console.log(error);
        }
   }



  
 useEffect(()=>{
    window.addEventListener("scroll",  handleInfiniteScroll)
    return ()=> window.removeEventListener("scroll",handleInfiniteScroll)

 },[])


    return(
        <>
         <h1>Welcome to infinite-scroll Project</h1>
         <MovieComponent movieInfo={card} />
        </>
       
    )
}

export default Home;