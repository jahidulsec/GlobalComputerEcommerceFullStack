"use client";


import { useEffect, useState } from 'react'

const Timer = ({offerTime}) => {

    const [day, setDay] = useState('')
    const [hour, setHour] = useState('')
    const [minute, setMinute] = useState('')
    const [second, setSecond] = useState('')
    const [offerText, setOfferText] = useState(true)

    // const countDownDate = new Date("Aug 2, 2023 17:00:00").getTime();
    const countDownDate = new Date(`${offerTime}`).getTime();


    useEffect(() => {
        // Update the count down every 1 second
        let x = setInterval(function() {

            // Get today's date and time
            let now = new Date().getTime();

            // Find the distance between now and the count down date
            let distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (seconds >= 0) {
                setDay(days)
                setHour(hours)
                setMinute(minutes)
                setSecond(seconds)
            }


            // If the count down is finished, write some text 
            if (distance < 0) {
                clearInterval(x);
                setOfferText(false)
              }

        }, 1000);
    },[second])


  return (
    <div className="offer">
        <p>{offerText ? `Offer ends at` : `OFFER EXPIRED`}</p>
        {offerText &&
            <ul className='flexcenter'>
                <li>{day}</li>
                <li>{hour}</li>
                <li>{minute}</li>
                <li>{second}</li>
            </ul>
        }
    </div>
  )
}

export default Timer