import React from "react";
import WeatherDay from './weather_day';


class WeatherBoard extends React.Component {

    state = {
        temp: undefined,
        city:  undefined,
        country: undefined,
        weather: undefined,
        day: undefined
    }

    btn_on_click = async () => {
        const city = prompt("City:");
        this.getWeather(city);
    }

    getWeekDate = () => {
        const day_num = new Date().getDay() - 1;
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        return days[day_num];
    }

    getWeather = async (city='London') => {
        const api_url = await 
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4976a831770c507ff01b1d19b4269107&units=metric`);
        const data_json = await api_url.json();

        this.setState({
            temp: data_json.main.temp,
            city: data_json.name,
            country: data_json.sys.country,
            weather: data_json.weather[0].main,
            day: this.getWeekDate()
        });
    }

    componentDidMount() {
        this.getWeather();
        console.log(this.getWeekDate());
    }

    

    render() {
        return (
            <div className='weather-board'>
                <div className="short-info">
                    <div className="short-info__city">{this.state.city}, {this.state.country}</div>
                    <div className="short-info__temp">{this.state.temp}</div>
                    <div className="short-info__weather">{this.state.weather}</div>
                </div>
                <div className="info">
                    <WeatherDay 
                    temp={this.state.temp}
                    day={this.state.day}
                    weather={this.state.weather}
                    country={this.state.country}/>
                </div>
                <button className="btn" onClick={this.btn_on_click}>Change Location</button>
            </div>
        );
    }
}

export default WeatherBoard;