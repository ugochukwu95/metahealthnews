import React, {Component} from "react";
import {ArticleList} from "./ArticleList";
import {Trends} from "./Trends";
import {ArticleListMobile} from "./ArticleListMobile";
import {WeatherDesktop} from "./WeatherDesktop";
import { DataTypes } from "../data/Types";
import {Preloader} from "../utilities/Preloader";
import {Helmet} from "react-helmet";

export class FrontPage extends Component {

	render() {
		return <React.Fragment>
			<Helmet>
                <meta charSet="utf-8" />
                <title>Health news in one place | MetaHealthNews</title>
                <meta name="description" content="Get the latest health related news such as the Coronavirus, Cancer research, etc., from 50+ countries from around the world." />
                <link rel="canonical" href={`${document.location.host}${this.props.match.url}`} />
            </Helmet>
			{!this.props.articles && <Preloader />}
			{this.props.articles && <div className="" id="infinite-list">
				<div className="row">
					<div className=" col l2 m2 hide-on-med-and-down">

					</div>
					<div className="col l5 m8 offset-m2 s12">
						<div>
							<h5 className="grey-text text-darken-2 ugBigFont hide-on-small-only">
								<br />
								<strong>Headlines</strong>
							</h5>
							<h5 className="grey-text text-darken-2 ugBigFont hide-on-med-and-up titleCardSamePadding">
								<strong>Headlines</strong>
							</h5>
						</div>
						<div className="hide-on-med-and-down">
							{(!(/Mobi|Android/i.test(navigator.userAgent))) && <ArticleList {...this.props} />}
						</div>
						<div className="hide-on-large-only">
							<ArticleListMobile {...this.props} />
						</div>
					</div>
					<div className="col l3 m1 s12 hide-on-med-and-down">
						<br />
						<WeatherDesktop {...this.props} />
						<Trends {...this.props} />
					</div>
					<div className="col l2 m2 hide-on-med-and-down">

					</div>
				</div>
			</div>}
		</React.Fragment>
	}

	componentDidMount() {
		let { cookies } = this.props;
		let countryCode = cookies.get("country_code");
		let userId = cookies.get("user_id");

		if (countryCode) {
			// console.log("hi");
			// this.props.loadLocationData(DataTypes.CURRENT_LOCATION);
			this.props.clearArticlesData && this.props.clearArticlesData(DataTypes.ARTICLES);
			this.props.clearArticlesData && this.props.clearArticlesData(DataTypes.ARTICLES_SEARCH_RESULTS);
			this.props.clearArticlesData && this.props.clearArticlesData(DataTypes.CANCER);
			this.props.clearArticlesData && this.props.clearArticlesData(DataTypes.DIABETES);
			this.props.clearArticlesData && this.props.clearArticlesData(DataTypes.HEART_DISEASE);
			this.props.clearArticlesData && this.props.clearArticlesData(DataTypes.ARTICLES_FOR_UK);
			this.props.clearArticlesData && this.props.clearArticlesData(DataTypes.ARTICLES_FOR_US);
			if (userId) {
				this.props.loadData && this.props.loadData(DataTypes.ARTICLES, {country: countryCode.toLowerCase(), page: 1, userId: userId});
			}
			else {
				this.props.loadData && this.props.loadData(DataTypes.ARTICLES, {country: countryCode.toLowerCase(), page: 1, });
			}

			// load google trends
		}
		else if (!countryCode) {
			// set expiry in 7 days
			let expire = (new Date().getTime() / 1000) + 604800;
			this.props.clearArticlesData && this.props.clearArticlesData(DataTypes.ARTICLES);

			if (userId) {
				this.props.current_location && this.props.loadData(DataTypes.ARTICLES, {country: this.props.current_location['country_code'].toLowerCase(), page: 1, userId: userId});
			}
			else {
				this.props.current_location && this.props.loadData(DataTypes.ARTICLES, {country: this.props.current_location['country_code'].toLowerCase(), page: 1});
			}

			this.props.current_location && cookies.set("country_code", this.props.current_location['country_code'], {path: "/", expires: new Date(expire * 1000)});
		}
	}

	componentDidUpdate(prevProps) { 

		let { cookies } = this.props;
		let countryCode = cookies.get("country_code");
		let userId = cookies.get("user_id");

		/*if (this.props.articles === null && (prevProps.articles !== null && prevProps.articles !== undefined)) {
			let { cookies } = this.props;
			let countryCode = cookies.get("country_code");

			// this.props.clearArticlesData && this.props.clearArticlesData(DataTypes.ARTICLES);
			// this.props.loadData(DataTypes.ARTICLES, {country: countryCode.toLowerCase(), page: 1});
		}*/

		if ((prevProps.current_location !== this.props.current_location) && !countryCode) {
			// set expiry in 7 days
			let expire = (new Date().getTime() / 1000) + 604800;

			this.props.current_location && this.props.loadTrendsData(DataTypes.TRENDS, {country: this.props.current_location['country_code']});

			if (userId) {
				this.props.current_location && this.props.loadData(DataTypes.ARTICLES, {country: this.props.current_location['country_code'].toLowerCase(), page: 1, userId: userId});
			}
			else {
				this.props.current_location && this.props.loadData(DataTypes.ARTICLES, {country: this.props.current_location['country_code'].toLowerCase(), page: 1});
			}

			this.props.current_location && cookies.set("country_code", this.props.current_location['country_code'], {path: "/", expires: new Date(expire * 1000)});
		}
	}
}