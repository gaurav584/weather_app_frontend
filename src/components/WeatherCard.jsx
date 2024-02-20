import React from 'react'
import "./WeatherCard.css";

const WeatherCard = ({day,date,temprature,description}) => {
  return (
    <>
    <div className="weather-card">
       <h2>{day}</h2>
       <h4>{date}</h4>
       <p className='temperature'>{temprature}° C</p>
       <p>{description}</p>
    </div>
    </>
  )
}

export default WeatherCard;
