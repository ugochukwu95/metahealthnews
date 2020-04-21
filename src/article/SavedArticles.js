import React, {Component} from "react";
import {Preloader} from "../utilities/Preloader";
import { DataTypes } from "../data/Types";
import {ArticleCardsMobile} from "./ArticleCardsMobile";
import M from 'materialize-css';

export class SavedArticles extends Component {

	constructor(props) {
		super(props);
		this.state = {
			page: null,
			loading: false,
			pages: null,
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

	render() {
		let {cookies} = this.props;
		let userId = cookies.get("user_id");

		return <React.Fragment>
			{
				(this.props.saved_articles) && <React.Fragment>
					<div className="row">
						<div className="col s12">
							<h5 className="grey-text text-darken-2 ugBigFont center">
								<strong>You have {this.props.saved_articles.data.length} articles saved</strong>
							</h5>

							<ArticleCardsMobile userId={userId} saveArticle={this.handleSaveForLater} removeSavedArticle={this.handleRemoveSavedArticle} items={this.props.saved_articles['data']} />
						</div>
					</div>
				</React.Fragment>
			}

			{
				(!this.props.saved_articles || this.state.loading) && <Preloader />
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
	}
}