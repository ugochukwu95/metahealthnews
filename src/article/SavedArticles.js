import React, {Component} from "react";
import {Preloader} from "../utilities/Preloader";
import { DataTypes } from "../data/Types";
import {ArticleCardsMobile} from "./ArticleCardsMobile";
import M from 'materialize-css';
import { uuid } from 'uuidv4';
import {Helmet} from "react-helmet";
import {DesktopNavList} from "./DesktopNavList";
import {Trends} from "./Trends";
import {WeatherDesktop} from "./WeatherDesktop";
import {ArticleCardsDesktop} from "./ArticleCardsDesktop";

export class SavedArticles extends Component {

	constructor(props) {
		super(props);
		this.state = {
			page: null,
			loading: false,
			pages: null,
			bannedId: null
		}
	}

	handleOnScroll = () => {
		let { cookies } = this.props;
		let userId = cookies.get("user_id");

  		let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
  		let scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
 		let clientHeight = document.documentElement.clientHeight || window.innerHeight;
  		let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

  		if (scrolledToBottom) {
     		if (this.state.page >= this.state.pages) {
     			this.setState({loading:false});
     			return;
     		}
     		this.setState({loading:true, page: Number(this.state.page) + 1}, () => this.props.loadSavedArticles(DataTypes.SAVED_ARTICLES, {userId: userId, page: Number(this.state.page)}))
		}
	}

	handleSaveForLater = id => ev => {
		ev.preventDefault();
		let articleId = id;
		let { cookies } = this.props;
		let userId = cookies.get("user_id");

		if (userId) {
			this.props.saveArticle && this.props.saveArticle(DataTypes.SAVED_ARTICLES_ID, {userId: userId, articleId: articleId});
			document.getElementById(`save_${articleId}`).classList.remove("show");
			document.getElementById(`remove_${articleId}`).classList.add("show");

			document.getElementById(`save_${articleId}`).classList.add("hide");
			document.getElementById(`remove_${articleId}`).classList.remove("hide");
		}
	}

	handleRemoveSavedArticle = id => ev => {
		ev.preventDefault();
		let articleId = id;
		let { cookies } = this.props;
		let userId = cookies.get("user_id");

		if (userId) {
			this.props.removeSavedArticle && this.props.removeSavedArticle(DataTypes.SAVED_ARTICLES_ID, {userId: userId, articleId: articleId});

			document.getElementById(`save_${articleId}`).classList.remove("hide");
			document.getElementById(`remove_${articleId}`).classList.add("hide");

			document.getElementById(`save_${articleId}`).classList.add("show");
			document.getElementById(`remove_${articleId}`).classList.remove("show");
	    	
	    	let toastHTML = "<span>Removed successfully.</span>";
	    	M.toast({html: toastHTML});
		}
	}

	handleBanSource = (source, id) => ev => {
		ev.preventDefault();
		let sourceName = source;
		let { cookies } = this.props;
		let userId = cookies.get("user_id");
		this.setState({bannedId: id});

		if (userId) {
			document.getElementById(`progress_${id}`).classList.add("show");
			document.getElementById(`progress_${id}`).classList.remove("hide");

			this.props.banSource && this.props.banSource(DataTypes.BAN_SOURCE, {userId: userId, sourceName: sourceName});
		}
		else {
			document.getElementById(`progress_${id}`).classList.add("show");
			document.getElementById(`progress_${id}`).classList.remove("hide");

			// set expiry in 7 days
			let expire = (new Date().getTime() / 1000) + 31536000;

			// create unique id 
			userId = uuid();

			// Set cookie for user
			cookies.set("user_id", userId, {path: "/", expires: new Date(expire * 1000)});

			this.props.banSource && this.props.banSource(DataTypes.BAN_SOURCE, {userId: userId, sourceName: sourceName});
		}
	}

	handleUndoBanSource = (source, id) => ev => {
		ev.preventDefault();
		let sourceName = source;
		let { cookies } = this.props;
		let userId = cookies.get("user_id");
		this.setState({bannedId: id});

		this.props.undoBanSource && this.props.undoBanSource(DataTypes.BAN_SOURCE, {userId: userId, sourceName: sourceName});
		document.getElementById(`progress_${id}`).classList.add("show");
		document.getElementById(`progress_${id}`).classList.remove("hide");
	}

	render() {
		let {cookies} = this.props;
		let userId = cookies.get("user_id");

		return <React.Fragment>
			<Helmet>
                <meta charSet="utf-8" />
                <title>Saved Articles | MetaHealthNews</title>
                <meta name="description" content="Find your saved aricles." />
                <link rel="canonical" href={`${document.location.host}${this.props.match.url}`} />
            </Helmet>
			{
				(this.props.saved_articles) && <React.Fragment>
					<div className="row hide-on-large-only">
						<div className="col m8 offset-m2 s12">
							<h5 className="grey-text text-darken-2 ugBigFont center">
								<strong>You have {this.props.saved_articles.data.length} articles saved</strong>
							</h5>

							<ArticleCardsMobile handleBanSource={this.handleBanSource} handleUndoBanSource={this.handleUndoBanSource} userId={userId} saveArticle={this.handleSaveForLater} removeSavedArticle={this.handleRemoveSavedArticle} items={this.props.saved_articles['data']} />
						</div>
					</div>

					<div className="row hide-on-med-and-down">
						<div className="col l3">
							<DesktopNavList {...this.props} />
						</div>
						<div className="col l6">
							<br /><br />
							<ArticleCardsDesktop items={this.props.saved_articles['data']} />
						</div>
						<div className="col l3">
							<br /><br />
							<WeatherDesktop {...this.props} />
							<Trends {...this.props} />
						</div>
					</div>
				</React.Fragment>
			}

			{
				!userId && <div className="container">
					<div className="card-panel white">
						<h3 className="center grey-text text-darken-2">:(</h3>
						<p className="center">You have no saved articles.</p>
					</div>
				</div>
			}

			{
				((!this.props.saved_articles || this.state.loading) && userId) && <Preloader />
			}

			{
				(this.props.saved_articles && (this.props.saved_articles['data'].length === 0)) && <div className="container">
					<div className="card-panel white">
						<h3 className="center grey-text text-darken-2">:(</h3>
						<p className="center">You have no saved articles.</p>
					</div>
				</div>
			}
		</React.Fragment>
	}

	componentDidMount() {
		let {cookies} = this.props;
		let userId = cookies.get("user_id");

		this.props.clearArticlesData && this.props.clearArticlesData(DataTypes.SAVED_ARTICLES);

		if (userId) {
			this.props.loadSavedArticles && this.props.loadSavedArticles(DataTypes.SAVED_ARTICLES, {userId: userId, page: 1});
			this.props.saved_articles && this.setState({pages: this.props.saved_articles['pages'], page: this.props.saved_articles['page']})
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.saved_articles_id !== this.props.saved_articles_id) {
			if (this.props.saved_articles) {
				let toastHTML = '<span>Saved successfully.</span>';
	    		M.toast({html: toastHTML});
	    	}
		}

		let elems = document.querySelectorAll('.dropdown-trigger');
		let options = {constrainWidth: false, coverTrigger: false};
    	M.Dropdown.init(elems, options);

    	if (prevProps.ban_source !== this.props.ban_source) {
			if (!this.props.ban_source.error && !this.props.ban_source.undone) {
				document.getElementById(`progress_${this.state.bannedId}`).classList.add("hide");
				document.getElementById(`progress_${this.state.bannedId}`).classList.remove("show");

				document.getElementById(`undoBan_${this.state.bannedId}`).classList.add("show");
				document.getElementById(`undoBan_${this.state.bannedId}`).classList.remove("hide");

				document.getElementById(`banSource_${this.state.bannedId}`).classList.add("hide");
				document.getElementById(`banSource_${this.state.bannedId}`).classList.remove("show");

				let toastHTML = '<span>Successfully hidden.</span>';
		    	M.toast({html: toastHTML});
		    }

	    	if (this.props.ban_source.undone) {
		    	document.getElementById(`progress_${this.state.bannedId}`).classList.add("hide");
				document.getElementById(`progress_${this.state.bannedId}`).classList.remove("show");

				document.getElementById(`undoBan_${this.state.bannedId}`).classList.add("hide");
				document.getElementById(`undoBan_${this.state.bannedId}`).classList.remove("show");

				document.getElementById(`banSource_${this.state.bannedId}`).classList.add("show");
				document.getElementById(`banSource_${this.state.bannedId}`).classList.remove("hide");

				let toastHTML = '<span>Successfully undone.</span>';
		    	M.toast({html: toastHTML});	
		    }
		}
	}
}