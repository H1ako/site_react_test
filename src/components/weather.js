import React from "react";
import WeatherDay from './weather_day';


class WeatherBoard extends React.Component {

    state = {
        city_img: undefined,
        temp: undefined,
        city:  undefined,
        country: undefined,
        weather: undefined,
        day: undefined,
        error: undefined
    }

    btn_on_click = () => {
        const city = prompt("City:");
        if (city) this.getWeather(city)
        else this.setState({error: 'Incorrect city'});        
    }

    getCityImg = async (city) => {
        const url = `https://source.unsplash.com/featured/?${city} street`;
        const data = await fetch(url);
        console.log(data.url);
        return data.url;
    }

    getWeekDate = () => {
        const day_num = new Date().getDay() - 1;
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        return days[day_num];
    }

    getWeather = async (city='London') => {
        const data = await 
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4976a831770c507ff01b1d19b4269107&units=metric`);
        const data_json = await data.json();
        if (data_json.cod !== '404') {
            const img = await this.getCityImg(city);
            this.setState({
                city_img: img,
                temp: data_json.main.temp,
                city: data_json.name,
                country: data_json.sys.country,
                weather: data_json.weather[0].main,
                day: this.getWeekDate(),
                error: undefined
            });
        }
        else{
            this.setState({
                error: 'Incorrect city'
            });
        }
    }

    componentDidMount() {
        this.getWeather();
    }

    render() {
        return (
            <div className='weather-board'>
                <div className="short-info" style={{backgroundImage: `url(${this.state.city_img})`}}>
                    <div className="short-info__city">{this.state.city}, {this.state.country}</div>
                    <div className="short-info__temp">{this.state.temp}</div>
                    <div className="short-info__weather">{this.state.weather}</div>
                </div>
                <div className="info">
                    <WeatherDay 
                    temp={this.state.temp}
                    day={this.state.day}
                    weather={this.state.weather}
                    country={this.state.country}
                    />
                </div>
                { this.state.error &&
                    <div id="error" class='error'>{this.state.error}</div>
                }
                
                <button className="btn" onClick={this.btn_on_click}>Change Location</button>
            </div>
        );
    }
}

export default WeatherBoard;