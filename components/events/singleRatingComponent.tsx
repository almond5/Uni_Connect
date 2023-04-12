import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { FaRegStar, FaStar } from "react-icons/fa";


const SingleRatingComponent = (props: { ratingVal: any }) => {
    //const [ratingVal, setRatingVal] = useState('');
    var starArr = []
    for(let i = 0; i<props.ratingVal;i++){
        starArr.push(1)
    }
    const emptyStars = 5 - starArr.length;
    for(let i = 0; i<emptyStars;i++){
        starArr.push(0)
    }

    const stars = starArr.map((val, i) => {
        if(val === 1){
            return (
                <FaStar size={42} />
            )
        }
        else{
            return (
                <FaRegStar size={42}/>
            )
        }
       
        })

    return(
        <div className='flex flex-row'>
            {stars}
        </div>
        
    )
}

export default SingleRatingComponent;