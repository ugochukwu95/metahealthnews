import React, {Component} from "react";
import { DataTypes } from "../data/Types";
import WeatherImage from "./getImageForWeather";
import {Preloader} from "../utilities/Preloader";

export class Weather extends Component {
	constructor(props) {
		super(props);
		this.state = {
			SearchString: "",
			loading: false
		}
	}

	handleChange = (ev) => {
		this.setState({[ev.target.name]: ev.target.value});
	}

	handleSubmit = (ev) => {
		ev.preventDefault();
		this.setState({loading: true});
		if (this.state.SearchString === "") {
			return;
		}
		this.props.loadWeatherData && this.props.loadWeatherData(DataTypes.WEATHER, {city: this.state.SearchString})
	}

	render() {
		return <div id="myWeatherNav" className="weatherNav grey lighten-5">
			<div id="weather-details-nav" className="weather-details-nav">
				<p className="center grey-text text-darken-2">Weather {(this.props.current_location && this.props.weather) && (`at ${this.props.weather.location || this.props.current_location['city']}`)}</p>
				<a href="#!" className="closebtn teal-text text-darken-2" onClick={this.props.closeNav}>Back</a>
				<div className="divider"></div>
			</div>
			<br /><br /><br />
			{this.props.weather && <React.Fragment>
				{this.props.weather.weather && <div className="container">
					<div className="card white z-depth-0 weatherCard">
						<div className="card-content">
							<div className="textContainer">
								<img src={WeatherImage(this.props.weather.weather)} alt="get the weather today" className="responsive-img" />
								<div className="centered">
									<h4><strong>{this.props.weather.weather}</strong></h4>
									<h4><strong>{Math.round(this.props.weather.temperature)}&deg;C</strong></h4>
								</div>
							</div>
						</div>
					</div>
				</div>}

				{this.props.weather.error && <div className="container">
					<div className="card-panel white">
						<h3 className="center grey-text text-darken-2">:(</h3>
						<p className="center">Cannot find weather information for that city.</p>
					</div>
				</div>}

				<br />
				<div className="container">
					<p>
						<input type="text" className="browser-default weather_input_field" max-length="140" autoComplete="off" placeholder="Enter city to get weather information ..." name="SearchString" onChange={this.handleChange} value={this.state.SearchString} />
					</p>
					{this.state.loading && <div className="preloader-wrapper small active">
					    <div className="spinner-layer spinner-blue-only">
					      <div className="circle-clipper left">
					        <div className="circle"></div>
					      </div><div className="gap-patch">
					        <div className="circle"></div>
					      </div><div className="circle-clipper right">
					        <div className="circle"></div>
					      </div>
					    </div>
					  </div>
					}
					<p>
						<button className={`btn teal darken-2 white-text ugTextTransform ${(this.state.SearchString === "") ? "disabled" : ""}`} onClick={this.handleSubmit}>Submit</button>
					</p>
				</div> 
			</React.Fragment>}

			{!this.props.weather && <Preloader />}
		</div>
	}

	componentDidMount() {
		// Loads location data
	}

	componentDidUpdate(prevProps) {
		if ((prevProps.current_location !== this.props.current_location) && (/Mobi|Android/i.test(navigator.userAgent))) {
			(this.props.current_location && this.props.loadWeatherData) && this.props.loadWeatherData(DataTypes.WEATHER, {city: this.props.current_location['city']});
		}

		if (prevProps.weather !== this.props.weather) {
			this.setState({loading: false});
		}
	}
}