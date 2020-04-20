import React, {Component} from "react";
import ReactTimeAgo from 'react-time-ago';
import { Link } from "react-router-dom";
import {Preloader} from "../utilities/Preloader";
import { DataTypes } from "../data/Types";
import {ArticleCardsMobile} from "./ArticleCardsMobile";

export class ArticleListMobile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			page: 1,
		}
	}

	clearSearchData = (ev) => {
		this.props.clearArticlesData && this.props.clearArticlesData(DataTypes.ARTICLES_SEARCH_RESULTS);
	}

	handleOnScroll = (event) => {
		if ((/Mobi|Android/i.test(navigator.userAgent))) {
			let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
	  		let scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
	 		let clientHeight = document.documentElement.clientHeight || window.innerHeight;
	  		let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= (scrollHeight - 300);

	  		if (scrolledToBottom && (this.state.page === 1)) {
	     		
	     		this.setState({loading:true, page: Number(this.state.page) + 1}, () => this.props.loadSearchResults(DataTypes.ARTICLES_SEARCH_RESULTS, {country: this.props.cookies.get('country_code').toLowerCase(), page: 1, searchString: "Coronavirus"}))
			}

			if (scrolledToBottom && (this.state.page === 2)) {
				// get articles from the us if not a us citizen
				(this.props.articles_search_results) && this.setState({loading:true, page: Number(this.state.page) + 1}, () => this.props.loadArticlesForUSData(DataTypes.ARTICLES, {country: "us", page: 1}))

			}

			if (scrolledToBottom && (this.state.page === 3)) {
				// get articles from the uk if not a uk citizen

				(this.props.articles_search_results && this.props.articles_for_us) && this.setState({loading:true, page: Number(this.state.page) + 1}, () => this.props.loadArticlesForUKData(DataTypes.ARTICLES, {country: "gb", page: 1}))
			}

			if (scrolledToBottom && this.state.page > 3) {
     			this.setState({loading:false});
     			return;
     		}
		}
	}

	handleTryAgain = (ev) => {
		ev.preventDefault();
		this.props.clearArticlesData && this.props.clearArticlesData(DataTypes.ARTICLES);
		this.props.loadData && this.props.loadData(DataTypes.ARTICLES, {country: this.props.cookies.get('country_code').toLowerCase(), page: 1});
	}

	render() {
		let firstArticle = (this.props.articles && this.props.articles.data && (/Mobi|Android/i.test(navigator.userAgent))) && this.props.articles.data.slice(0,1)[0];
		let otherArticles = (this.props.articles && this.props.articles.data && (/Mobi|Android/i.test(navigator.userAgent))) && this.props.articles.data.slice(1);

		return (/Mobi|Android/i.test(navigator.userAgent)) && <React.Fragment>
			{(this.props.articles && this.props.match && (this.props.articles.error)) && <div className="row">
				<div className="col s12">
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
			{firstArticle && <div className="card white z-depth-0 ugMobileCard">
				<div className="card-content">
					<div className="row">
						<div className="col s12">
							<a href={firstArticle.url} target="_blank" rel="noopener noreferrer">
								<img src={firstArticle.urlToImage} className="responsive-img cardImageMobile" />
							</a>
							<p><strong>{firstArticle.source.name || "Unidentified source"}</strong></p>
							<h5 className="ugTitle">
								<a href={firstArticle.url} target="_blank" rel="noopener noreferrer" className="grey-text text-darken-2 ugCardLink"><strong>{firstArticle.title}</strong></a>
							</h5>
							<div>
								<small className="grey-text text-darken-2"><span><ReactTimeAgo date={firstArticle.publishedAt}/></span></small><small className="grey-text text-darken-2 right"><i className="fas fa-ellipsis-v"></i></small>
							</div>
						</div>
					</div>
				</div>
			</div>}

			{otherArticles && <ArticleCardsMobile items={otherArticles} />}
			{(otherArticles && this.props.current_location) && <div className="center">
				<p><Link to={`/headlines/${this.props.current_location['country_code'].toLowerCase()}`} className="teal-text text-darken-2"><strong>Read more stories from Headlines</strong></Link></p>
				<div className="divider frontPageDivider"></div>
			</div>}

			{(this.props.articles_search_results && this.props.articles_search_results.data) && <React.Fragment>
				<br />
				<h5 className="grey-text text-darken-2 ugBigFont titleCardSamePadding">
					<b>Coronavirus</b>
				</h5>
				<br />
				<ArticleCardsMobile items={this.props.articles_search_results.data} />
			</React.Fragment>}
			{(this.props.articles_search_results && this.props.articles_search_results.data) && <div className="center">
				<p><Link to="/search/coronavirus" onClick={this.clearSearchData} className="teal-text text-darken-2"><strong>Read more stories about the Coronavirus</strong></Link></p>
				<div className="divider frontPageDivider"></div>
			</div>}

			{(this.props.articles_for_us && this.props.articles_for_us.data) && <React.Fragment>
				<br />
				<h5 className="grey-text text-darken-2 ugBigFont titleCardSamePadding">
					<b>United States of America</b>
				</h5>
				<br />
				<ArticleCardsMobile items={this.props.articles_for_us.data} />
			</React.Fragment>}
			{(this.props.articles_for_us && this.props.articles_for_us.data) && <div className="center">
				<p><Link to="/headlines/us" className="teal-text text-darken-2"><strong>Read more health news from the United States of America</strong></Link></p>
				<div className="divider frontPageDivider"></div>
			</div>}

			{(this.props.articles_for_uk && this.props.articles_for_uk.data) && <React.Fragment>
				<br />
				<h5 className="grey-text text-darken-2 ugBigFont titleCardSamePadding">
					<b>United Kingdom</b>
				</h5>
				<br />
				<ArticleCardsMobile items={this.props.articles_for_uk.data} />
			</React.Fragment>}
			{(this.props.articles_for_uk && this.props.articles_for_uk.data) && <div className="center">
				<p><Link to="/headlines/gb" className="teal-text text-darken-2"><strong>Read more health news from the United Kingdom</strong></Link></p>
				<div className="divider frontPageDivider"></div>
			</div>}

			{this.state.loading && <Preloader />}
		</React.Fragment>
	}

	componentDidMount() {
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

		// Create scroll event
		window.addEventListener('scroll', this.handleOnScroll);
	}

	componentDidUpdate(prevProps) {
		if ((prevProps.articles_search_results !== this.props.articles_search_results) || (prevProps.articles_for_us !== this.props.articles_for_us) || (prevProps.articles_for_uk !== this.props.articles_for_uk)) {
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
		}
	}
}