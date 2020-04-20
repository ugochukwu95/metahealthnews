import React, {Component} from "react";
import { DataTypes } from "../data/Types";
import WeatherImage from "./getImageForWeather";
import {Preloader} from "../utilities/Preloader";

export class WeatherDesktop extends Component {
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
		return <React.Fragment>
			{this.props.weather && <React.Fragment>
				{this.props.weather.weather && <div className="">
					<div className="card white z-depth-0 desktopWeatherCard">
						<div className="card-content">
							<br />
							<p className="grey-text text-darken-2 center ugTitle"><strong>Weather {(this.props.current_location && this.props.weather) && (`in ${this.props.weather.location || this.props.current_location['city']}`)}</strong></p>
							<br />
							<div className="textContainer">
								<img src={WeatherImage(this.props.weather.weather)} className="responsive-img" />
								<div className="centered">
									<h4><strong>{this.props.weather.weather}</strong></h4>
									<h4><strong>{Math.round(this.props.weather.temperature)}&deg;C</strong></h4>
								</div>
							</div>
						</div>
					</div>
				</div>}

				{this.props.weather.error && <div className="card-panel white">
						<h3 className="center grey-text text-darken-2">:(</h3>
						<p className="center">Cannot find weather information for that city.</p>
					</div>
				}

				<p className="ugPadding">
					<input type="text" className="browser-default  weather_input_field" max-length="140" autoComplete="off" placeholder="Enter city to get weather information ..." name="SearchString" onChange={this.handleChange} value={this.state.SearchString} />
				</p>
				{this.state.loading && <Preloader />
				}
				<p className="ugPadding center">
					<button className={`btn btn-small teal darken-2 white-text ugTextTransform ${(this.state.SearchString === "") ? "disabled" : ""}`} onClick={this.handleSubmit}>Submit</button>
				</p>

			</React.Fragment>}
		</React.Fragment>
	}
	componentDidMount() {
		// Loads location data
		(this.props.loadLocationData && this.props.loadLocationData(DataTypes.CURRENT_LOCATION));
	}

	componentDidUpdate(prevProps) {
		if (prevProps.current_location !== this.props.current_location) {
			(this.props.current_location && this.props.loadWeatherData) && this.props.loadWeatherData(DataTypes.WEATHER, {city: this.props.current_location['city']});
		}

		if (prevProps.weather !== this.props.weather) {
			this.setState({loading: false});
		}
	}
}