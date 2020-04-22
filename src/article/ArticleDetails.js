import React, {Component} from "react";
import { DataTypes } from "../data/Types";
import {Preloader} from "../utilities/Preloader";
import M from 'materialize-css';
import { uuid } from 'uuidv4';
import ReactTimeAgo from 'react-time-ago';

export class ArticleDetails extends Component {
	handleTryAgain = (ev) => {
		ev.preventDefault();
		this.props.clearArticlesData && this.props.clearArticlesData(DataTypes.ARTICLE);
		(this.props.loadArticle && this.props.match) && this.props.loadArticle(DataTypes.ARTICLE, {articleId: this.props.match.params['id']});
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
		else {
			// set expiry in 7 days
			let expire = (new Date().getTime() / 1000) + 31536000;

			// create unique id 
			userId = uuid();

			// Set cookie for user
			cookies.set("user_id", userId, {path: "/", expires: new Date(expire * 1000)});
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

	handleBanSource = source => ev => {
		ev.preventDefault();
		let sourceName = source;
		let { cookies } = this.props;
		let userId = cookies.get("user_id");

		if (userId) {
			document.getElementById('progress').classList.add("show");
			document.getElementById('progress').classList.remove("hide");

			this.props.banSource && this.props.banSource(DataTypes.BAN_SOURCE, {userId: userId, sourceName: sourceName});
		}
		else {
			document.getElementById('progress').classList.add("show");
			document.getElementById('progress').classList.remove("hide");

			// set expiry in 7 days
			let expire = (new Date().getTime() / 1000) + 31536000;

			// create unique id 
			userId = uuid();

			// Set cookie for user
			cookies.set("user_id", userId, {path: "/", expires: new Date(expire * 1000)});

			this.props.banSource && this.props.banSource(DataTypes.BAN_SOURCE, {userId: userId, sourceName: sourceName});
		}
	}

	handleUndoBanSource = source => ev => {
		ev.preventDefault();
		let sourceName = source;
		let { cookies } = this.props;
		let userId = cookies.get("user_id");

		this.props.undoBanSource && this.props.undoBanSource(DataTypes.BAN_SOURCE, {userId: userId, sourceName: sourceName});
		document.getElementById('progress').classList.add("show");
		document.getElementById('progress').classList.remove("hide");
	}

	render() {

		// unique user id
		let userId = this.props.cookies && this.props.cookies.get("user_id");

		return <React.Fragment>
			{
				(this.props.article && !this.props.article.error) && <div className="card white z-depth-0">
					<div className="card-content">
						<div className="row">
							<div className="col s12">
								<a href={this.props.article.url} target="_blank" rel="noopener noreferrer">
									<img alt={this.props.article.source.name} src={this.props.article.urlToImage} className="responsive-img cardImageMobile" />
								</a>
								<p><strong>{this.props.article.source.name || "Unidentified source"}</strong></p>
								<h5 className="ugTitle">
									<a href={this.props.article.url} target="_blank" rel="noopener noreferrer" className="grey-text text-darken-2 ugCardLink"><strong>{this.props.article.title}</strong></a>
								</h5>
								<div>
									<small className="grey-text text-darken-2">
										<span><ReactTimeAgo date={Date.parse(this.props.article.publishedAt)}/></span>
									</small>
								</div>
								<div>
									<br />
									<p className="grey-text text-darken-2">
										{this.props.article.content || this.props.article.description}
									</p>
									<br />

									<ul className="ugMoreLinks">
										<li>
											<a href={this.props.article.url} target="_blank" rel="noopener noreferrer" className="teal-text text-darken-2 btn white ugArticleDetailsBtn">
												Go to {this.props.article.source.name || "Unidentified source"}
											</a> 
										</li>
										<li id={`save_${this.props.article._id}`} onClick={this.handleSaveForLater(this.props.article._id)} className={((this.props.article.savedBy.find(val => val.userId === userId)) ? "hide" : "show")}>
											<a href="#!" className="teal-text text-darken-2 btn white ugArticleDetailsBtn"><i className="far fa-bookmark"></i> Save for later</a>
										</li> 
										<li id={`remove_${this.props.article._id}`} className={((this.props.article.savedBy.find(val => val.userId === userId)) ? "show" : "hide")} onClick={this.handleRemoveSavedArticle(this.props.article._id)}>
											<a href="#!" className="teal-text text-darken-2 btn white ugArticleDetailsBtn"><i className="fas fa-bookmark"></i> Saved</a>
										</li>
										<li id="undoBan" className={((this.props.article.hiddenBy.find(val => val === userId)) ? "show" : "hide")} onClick={this.handleUndoBanSource(this.props.article.source.name)}>
											<a href="#!" className="teal-text text-darken-2 btn white ugArticleDetailsBtn" target="_blank" rel="noopener noreferrer">
												<i className="fas fa-ban grey-text text-darken-2"></i> Undo ban
											</a>
										</li>
										<li id="banSource" className={((this.props.article.hiddenBy.find(val => val === userId)) ? "hide" : "show")} onClick={this.handleBanSource(this.props.article.source.name)}>
											<a href="#!" className="teal-text text-darken-2 btn white ugArticleDetailsBtn" target="_blank" rel="noopener noreferrer">
												<i className="fas fa-ban red-text"></i> Hide stories from {this.props.article.source.name || "Unidentified source"}
											</a>
											<br />
											<div id="progress" className="progress hide">
      											<div className="indeterminate"></div>
  											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			}

			{
				!this.props.article && <Preloader />
			}

			{
				(this.props.article && this.props.article.error) && <div className="row">
					<div className="col s12">
						<br />
						<div className="container">
							<div className="card-panel white">
								<h3 className="center grey-text text-darken-2">:(</h3>
								<p className="center">{this.props.articles.data.error}</p>
								<p className="center">
									<button onClick={this.handleTryAgain} className="btn btn-small white-text teal darken-2 ugTextTransform">Try again</button>
								</p>
							</div>
						</div>
					</div>
				</div>
			}
		</React.Fragment>
	}

	componentDidMount() {
		this.props.clearArticlesData && this.props.clearArticlesData(DataTypes.ARTICLE);
		(this.props.loadArticle && this.props.match) && this.props.loadArticle(DataTypes.ARTICLE, {articleId: this.props.match.params['id']});
	}

	componentDidUpdate(prevProps) {
		if (prevProps.saved_articles_id !== this.props.saved_articles_id) {
			if (this.props.saved_articles_id) {
				let toastHTML = '<span>Saved successfully.</span>';
	    		M.toast({html: toastHTML});
	    	}
		}

		if (prevProps.ban_source !== this.props.ban_source) {
			if (!this.props.ban_source.error && !this.props.ban_source.undone) {
				document.getElementById('progress').classList.add("hide");
				document.getElementById('progress').classList.remove("show");

				document.getElementById('undoBan').classList.add("show");
				document.getElementById('undoBan').classList.remove("hide");

				document.getElementById('banSource').classList.add("hide");
				document.getElementById('banSource').classList.remove("show");

				let toastHTML = '<span>Successfully hidden.</span>';
		    	M.toast({html: toastHTML});
		    }

		    if (this.props.ban_source.undone) {
		    	document.getElementById('progress').classList.add("hide");
				document.getElementById('progress').classList.remove("show");

				document.getElementById('undoBan').classList.add("hide");
				document.getElementById('undoBan').classList.remove("show");

				document.getElementById('banSource').classList.add("show");
				document.getElementById('banSource').classList.remove("hide");

				let toastHTML = '<span>Successfully undone.</span>';
		    	M.toast({html: toastHTML});	
		    }
		}
	}
}