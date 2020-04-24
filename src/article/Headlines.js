import React, {Component} from "react";
import {Preloader} from "../utilities/Preloader";
import {ArticleCardsMobile} from "./ArticleCardsMobile";
// import { Link } from "react-router-dom";
import ReactTimeAgo from 'react-time-ago';
import { DataTypes } from "../data/Types";
import CountryData from "../utilities/CountryData";
import M from 'materialize-css';
import { uuid } from 'uuidv4';
import {cleanUrlText} from "../utilities/cleanUrlText";
import { Link } from "react-router-dom";
import {Helmet} from "react-helmet";

export class Headlines extends Component {
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
		let userId = cookies.get("user_id") || null;

  		let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
  		let scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
 		let clientHeight = document.documentElement.clientHeight || window.innerHeight;
  		let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;


  		if (scrolledToBottom) {
     		if (this.state.page >= this.state.pages) {
     			this.setState({loading:false});
     			return;
     		}
     		this.setState({loading:true, page: Number(this.state.page) + 1}, () => this.props.loadData(DataTypes.ARTICLES, {country: this.props.match.params['countryCode'], page: Number(this.state.page), userId: userId}))
		}
	}

	handleTryAgain = (ev) => {
		let { cookies } = this.props;
		let userId = cookies.get("user_id") || null;

		ev.preventDefault();
		this.props.clearArticlesData && this.props.clearArticlesData(DataTypes.ARTICLES);
		this.props.loadData && this.props.loadData(DataTypes.ARTICLES, {country: this.props.match.params['countryCode'], page: 1, userId: userId});
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
		let firstArticle = (this.props.articles && this.props.articles.data) && this.props.articles.data.slice(0,1)[0];
		let otherArticles = (this.props.articles  && this.props.articles.data) && this.props.articles.data.slice(1);

		// unique user id
		let userId = this.props.cookies && this.props.cookies.get("user_id");

		return <React.Fragment>
			<Helmet>
                <meta charSet="utf-8" />
                <title>Health news in {CountryData.find(obj => obj.code === this.props.match.params['countryCode'].toUpperCase())['value']} | MetaHealthNews</title>
                <meta name="description" content={`Get the latest health related news such as the Coronavirus, Cancer research, etc., from ${CountryData.find(obj => obj.code === this.props.match.params['countryCode'].toUpperCase())['value']}.`} />
                <link rel="canonical" href={`${document.location.host}${this.props.match.url}`} />
            </Helmet>
			{(this.props.articles  && this.props.articles.data && this.props.match && (this.props.articles.data.length === 0)) && <div className="row">
				<div className="col l6 offset-l3 m8 offset-m2 s12">
					<br />
					<div className="container">
						<div className="card-panel white">
							<h3 className="center grey-text text-darken-2">:(</h3>
							<p className="center">We cannot find health articles for this country: {CountryData.find(obj => obj.code === this.props.match.params['countryCode'].toUpperCase())['value']}.</p>
							<p className="center">
								<button onClick={this.handleTryAgain} className="btn btn-small white-text teal darken-2 ugTextTransform">Try again</button>
							</p>
						</div>
					</div>
				</div>
			</div>}

			{(this.props.articles && this.props.match && (this.props.articles.error)) && <div className="row">
				<div className="col l6 offset-l3 m8 offset-m2 s12">
					<br />
					<div className="container">
						<div className="card-panel white">
							<h3 className="center grey-text text-darken-2">:(</h3>
							<p className="center">{this.props.articles.error}</p>
							<p className="center">
								<button onClick={this.handleTryAgain} className="btn btn-small white-text teal darken-2 ugTextTransform">Try again</button>
							</p>
						</div>
					</div>
				</div>
			</div>}

			{
				firstArticle && <div className="card white z-depth-0 ugMobileCard">
					<div className="card-content">
						<div className="row">
							<div className="col l6 offset-l3 m8 offset-m2 s12">
								<Link to={`/article/${cleanUrlText(firstArticle.title)}/${firstArticle._id}`}>
									<img alt={firstArticle.source.name} src={firstArticle.urlToImage} className="responsive-img cardImageMobile" />
								</Link>
								<p><strong>{firstArticle.source.name || "Unidentified source"}</strong></p>
								<h5 className="ugTitle">
									<Link to={`/article/${cleanUrlText(firstArticle.title)}/${firstArticle._id}`} className="grey-text text-darken-2 ugCardLink">
										<strong>{firstArticle.title}</strong>
									</Link>
								</h5>
								<div>
									<small className="grey-text text-darken-2"><span><ReactTimeAgo date={Date.parse(firstArticle.publishedAt)}/></span></small><small data-target={`dropdown_${firstArticle._id}`} className="grey-text text-darken-2 right dropdown-trigger"><i className="fas fa-ellipsis-v"></i></small>
								</div>
								<div>
									<p>
										<Link to={`/article/${cleanUrlText(firstArticle.title)}/${firstArticle._id}`} className="grey-text text-darken-2 ugCardLink">
											{firstArticle.content}
										</Link>
									</p>
								</div>
							</div>
						</div>
					</div>

					<ul id={`dropdown_${firstArticle._id}`} className="dropdown-content">
		    			<li id={`save_${firstArticle._id}`} onClick={this.handleSaveForLater(firstArticle._id)} className={((firstArticle.savedBy.find(val => val.userId === userId)) ? "hide" : "show")}>
		    				<a href="#!" className="grey-text text-darken-2"><i className="far fa-bookmark"></i> Save for later</a>
		    			</li>

		    			<li id={`remove_${firstArticle._id}`} className={((firstArticle.savedBy.find(val => val.userId === userId)) ? "show" : "hide")} onClick={this.handleRemoveSavedArticle(firstArticle._id)}>
		    				<a href="#!" className="grey-text text-darken-2"><i className="fas fa-bookmark"></i> Saved</a>
		    			</li>

		    			<li><a href={firstArticle.url} className="grey-text text-darken-2" target="_blank" rel="noopener noreferrer"><i className="fas fa-link"></i> Go to {firstArticle.source.name || "Unidentified source"}</a></li>	

		    			<li id={`undoBan_${firstArticle._id}`} onClick={this.handleUndoBanSource(firstArticle.source.name, firstArticle._id)} className={((firstArticle.hiddenBy.find(val => val === userId)) ? "show" : "hide")}>
		    				<a href="#!" className="grey-text text-darken-2"><i className="fas fa-ban grey-text text-darken-2"></i> Undo ban</a>
		    			</li>

		    			<li id={`banSource_${firstArticle._id}`} onClick={this.handleBanSource(firstArticle.source.name, firstArticle._id)} className={((firstArticle.hiddenBy.find(val => val === userId)) ? "hide" : "show")}>
		    				<a href="#!" className="grey-text text-darken-2"><i className="fas fa-ban red-text"></i> Hide stories from {firstArticle.source.name || "Unidentified source"}</a>
		    				<div id={`progress_${firstArticle._id}`} className="hide">
			    				<br />
								<div className="progress">
									<div className="indeterminate"></div>
								</div>
							</div>
		    			</li>
		  			</ul>
				</div>
			}

			{otherArticles && <div className="row">
				<div className="col l6 offset-l3 m8 offset-m2 s12">
					<h5 className="center grey-text text-darken-2 hide-on-med-and-down">
						<strong>{CountryData.find(obj => obj.code === this.props.match.params['countryCode'].toUpperCase())['value']} Health News.</strong>
						<br />
					</h5>
					<ArticleCardsMobile handleBanSource={this.handleBanSource} handleUndoBanSource={this.handleUndoBanSource} userId={userId} saveArticle={this.handleSaveForLater} removeSavedArticle={this.handleRemoveSavedArticle} items={otherArticles} />
				</div>
			</div>}

			{(!this.props.articles || this.state.loading) && <Preloader />}
		</React.Fragment>
	}

	componentDidMount() {
		let elems = document.querySelectorAll('.dropdown-trigger');
		let options = {constrainWidth: false, coverTrigger: false};
    	M.Dropdown.init(elems, options);

    	let { cookies } = this.props;
		let userId = cookies.get("user_id") || null;

		// get articles if articles do not already exist
		this.props.clearArticlesData && this.props.clearArticlesData(DataTypes.ARTICLES);
		this.props.loadData(DataTypes.ARTICLES, {country: this.props.match.params['countryCode'], page: 1, userId: userId});
		(this.props.articles) && this.setState({page: this.props.articles['page'], pages: this.props.articles['pages']});

		// Create scroll event
		window.addEventListener('scroll', this.handleOnScroll);
	}

	componentDidUpdate(prevProps) {
		let elems = document.querySelectorAll('.dropdown-trigger');
		let options = {constrainWidth: false, coverTrigger: false};
    	M.Dropdown.init(elems, options);

    	let { cookies } = this.props;
		let userId = cookies.get("user_id") || null;

		window.addEventListener('scroll', this.handleOnScroll);

		// run this if you are switchong betweem headlines components
		if (prevProps.match.params['countryCode'] !== this.props.match.params['countryCode']) {
			this.props.clearArticlesData && this.props.clearArticlesData(DataTypes.ARTICLES);
			this.props.loadData(DataTypes.ARTICLES, {country: this.props.match.params['countryCode'], page: 1, userId: userId});
			(this.props.articles  && this.props.articles.data) && this.setState({page: this.props.articles['page'], pages: this.props.articles['pages']});
		}

		if ((prevProps.articles === null || prevProps.articles === undefined) && prevProps.articles !== this.props.articles) {
			(this.props.articles  && this.props.articles.data) && this.setState({page: this.props.articles['page'], pages: this.props.articles['pages']});
		}

			var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

			  if ("IntersectionObserver" in window) {
			    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
			      entries.forEach(function(entry) {
			        if (entry.isIntersecting) {
			          let lazyImage = entry.target;
			          lazyImage.src = lazyImage.dataset.src;
			          lazyImage.srcset = lazyImage.dataset.srcset;
			          lazyImage.classList.remove("lazy");
			          lazyImageObserver.unobserve(lazyImage);
			        }
			      });
			    });

			    lazyImages.forEach(function(lazyImage) {
			      lazyImageObserver.observe(lazyImage);
			    });
			  } else {
			    // Possibly fall back to a more compatible method here
			    let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
				  let active = false;

				  const lazyLoad = function() {
				    if (active === false) {
				      active = true;

				      setTimeout(function() {
				        lazyImages.forEach(function(lazyImage) {
				          if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
				            lazyImage.src = lazyImage.dataset.src;
				            lazyImage.srcset = lazyImage.dataset.srcset;
				            lazyImage.classList.remove("lazy");

				            lazyImages = lazyImages.filter(function(image) {
				              return image !== lazyImage;
				            });

				            if (lazyImages.length === 0) {
				              document.removeEventListener("scroll", lazyLoad);
				              window.removeEventListener("resize", lazyLoad);
				              window.removeEventListener("orientationchange", lazyLoad);
				            }
				          }
				        });

				        active = false;
				      }, 200);
				    }
				  };

				  document.addEventListener("scroll", lazyLoad);
				  window.addEventListener("resize", lazyLoad);
				  window.addEventListener("orientationchange", lazyLoad);
			  }
			window.addEventListener('scroll', this.handleOnScroll);

		if (prevProps.saved_articles_id !== this.props.saved_articles_id) {
			if (this.props.saved_articles_id) {
				let toastHTML = '<span>Saved successfully.</span>';
	    		M.toast({html: toastHTML});
	    	}
		}

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