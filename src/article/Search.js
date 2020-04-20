import React, {Component} from "react";
import { DataTypes } from "../data/Types";
import {ArticleCardsMobile} from "./ArticleCardsMobile";
import {Preloader} from "../utilities/Preloader";

export class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: null,
			pages: null,
			SearchString: ""
		}
	}

	handleOnScroll = () => {
  		let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
  		let scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
 		let clientHeight = document.documentElement.clientHeight || window.innerHeight;
  		let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

  		if (scrolledToBottom) {
     		if (this.state.page >= this.state.pages) {
     			return;
     		}
     		this.setState({page: Number(this.state.page) + 1}, () => this.props.loadSearchResults(DataTypes.ARTICLES_SEARCH_RESULTS, {country: this.props.cookies.get('country_code').toLowerCase(), page: Number(this.state.page), searchString: this.props.match.params['searchstring']}))
		}
	}

	render() {
		let otherArticles = (this.props.articles_search_results  && this.props.articles_search_results.data) && this.props.articles_search_results.data;

		return <React.Fragment>
			<div className="">
				<h5 className="grey-text text-darken-2 ugBigFont searchTitlePadding center">
					{this.props.match && <strong>Search Results for: {this.props.match.params['searchstring']}</strong>}
				</h5>
				{otherArticles && <div className="row">
					<div className="col l6 offset-l3 m8 offset-m2 s12">
						<ArticleCardsMobile items={otherArticles} />
					</div>
				</div>}

				{(!this.props.articles_search_results || this.props.articles_search_results === null) && <Preloader />}

				{(this.props.articles_search_results && this.props.articles_search_results.data && (this.props.articles_search_results.data.length === 0)) && <div className="row">
					<div className="col s12">
						<br />
						<div className="container">
							<div className="card-panel white">
								<h3 className="center grey-text text-darken-2">:(</h3>
								<p className="center">No results.</p>
							</div>
						</div>
					</div>
				</div>}
			</div>
		</React.Fragment>
	}

	componentDidMount() {
		this.props.clearArticlesData && this.props.clearArticlesData(DataTypes.ARTICLES_SEARCH_RESULTS);
		
		(this.props.match && this.props.loadSearchResults) && this.props.loadSearchResults(DataTypes.ARTICLES_SEARCH_RESULTS, {country: this.props.cookies.get('country_code').toLowerCase(), page: 1, searchString: this.props.match.params['searchstring']});

		this.props.articles_search_results && this.setState({page: this.props.articles_search_results['page'], pages: this.props.articles_search_results['pages'], SearchString: this.props.match.params['searchstring']})

		// Create scroll event
		window.addEventListener('scroll', this.handleOnScroll);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.match.params['searchstring'] !== this.props.match.params['searchstring']) {
			this.props.clearArticlesData && this.props.clearArticlesData(DataTypes.ARTICLES_SEARCH_RESULTS);

			(!this.props.articles_search_results && this.props.match && this.props.loadSearchResults) && this.props.loadSearchResults(DataTypes.ARTICLES_SEARCH_RESULTS, {country: this.props.cookies.get('country_code').toLowerCase(), page: 1, searchString: this.props.match.params['searchstring']});

			this.props.articles_search_results && this.setState({page: this.props.articles_search_results['page'], pages: this.props.articles_search_results['pages'], SearchString: this.props.match.params['searchstring']});

			// Create scroll event
			window.addEventListener('scroll', this.handleOnScroll);
		}
	}
}