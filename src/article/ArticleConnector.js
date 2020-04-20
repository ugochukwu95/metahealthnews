import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loadData, loadLocationData, loadTrendsData, loadSearchResults, loadArticlesForUSData, loadArticlesForUKData, loadWeatherData, clearArticlesData } from "../data/ActionCreators";
import { DataTypes } from "../data/Types";
import { Article } from "./Article";
import { withCookies } from 'react-cookie';

const mapStateToProps = (dataStore) => ({
	...dataStore
})

const mapDispatchToProps = {
	loadData, loadLocationData, loadTrendsData, loadSearchResults, loadArticlesForUSData, loadArticlesForUKData, loadWeatherData, clearArticlesData
}

const ArticleConnector = connect(mapStateToProps, mapDispatchToProps)(
	class extends Component {
		render() {
			return <Switch>
				<Route path={["/", "/headlines/:countryCode", "/search/:searchstring", "/about"]} exact={true} render={ (routeProps) => <Article { ...this.props } { ...routeProps } cookies={this.props.cookies} />} />
				<Redirect to="/" />
			</Switch>
		}

		componentDidMount() {
			let { cookies } = this.props;
			let countryCode = cookies.get("country_code");

			this.props.loadLocationData(DataTypes.CURRENT_LOCATION);


			if (countryCode) {
				this.props.loadTrendsData(DataTypes.TRENDS, {country: countryCode});

			}
		}

		componentDidUpdate(prevProps) {
			let { cookies } = this.props;
			let countryCode = cookies.get("country_code");

			if ((prevProps.current_location !== this.props.current_location) && !countryCode) {
				// set expiry in 7 days
				let expire = (new Date().getTime() / 1000) + 604800;

				this.props.current_location && this.props.loadTrendsData(DataTypes.TRENDS, {country: this.props.current_location['country_code']});

				this.props.current_location && cookies.set("country_code", this.props.current_location['country_code'], {path: "/", expires: new Date(expire * 1000)});
			}
		}
	}
)

export default withCookies(ArticleConnector);