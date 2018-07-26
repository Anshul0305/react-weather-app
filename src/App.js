import React, { Component } from 'react'
import Titles from './components/Titles'
import Form from './components/Form'
import Weather from './components/Weather'

const APIKEY = 'bd3731c915d7fd9da55ee364398cc146'

class App extends Component {
  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWeatherData = async (e) => {
    e.preventDefault()
    e.persist()
    const city = e.target.elements.city.value
    const country = e.target.elements.country.value
    const apiCall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APIKEY}&units=metric`)
    const data = await apiCall.json()
    console.log(data)
    if (city && country)
    {
      if(data.cod === '404'){
        this.setState({
          temp: undefined,
          city: undefined,
          country: undefined,
          humidity: undefined,
          description: undefined,
          error: 'An error occured, please enter correct City and Country'
        })
      } else {
        this.setState({
          temp: data.main.temp,
          city: data.name,
          country: data.sys.country,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          error: ''
        })
      }
    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: 'Please enter the City an Country value'
      })

    }
  }
  render() {
    return (
      <div>
          <div className="wrapper">
            <div className="main">
              <div className="container">
                <div className="row">
                  <div className="col-xs-5 title-container">
                    <Titles />
                  </div>
                  <div className="col-xs-6 form-container">
                    <Form getWeather={this.getWeatherData} />
                    <Weather 
                      temp={this.state.temp} 
                      city={this.state.city} 
                      country={this.state.country}
                      humidity={this.state.humidity}
                      description={this.state.description}
                      error={this.state.error}  />
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }
}

export default App