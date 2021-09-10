import React from 'react';

class WeatherDay extends React.Component{
    render() {
        return (
            <div className="info__day">
                <div className="info__day__name">{this.props.day}</div>
                <div className="info__day__temp">{this.props.temp}</div>
                <div className="info__day__weather">{this.props.weather}</div>
            </div>
        );
    }
}

export default WeatherDay;