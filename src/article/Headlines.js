import React, {Component} from "react";
import {Preloader} from "../utilities/Preloader";
import {ArticleCardsMobile} from "./ArticleCardsMobile";
import { Link } from "react-router-dom";
import ReactTimeAgo from 'react-time-ago';
import { DataTypes } from "../data/Types";
import CountryData from "../utilities/CountryData";

export class Headlines extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: null,
			loading: false,
			pages: null,
		}
	}

	handleOnScroll = () => {
  		let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
  		let scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
 		let clientHeight = document.documentElement.clientHeight || window.innerHeight;
  		let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

  		if (scrolledToBottom) {
     		if (this.state.page >= this.state.pages) {
     			this.setState({loading:false});
     			return;
     		}
     		this.setState({loading:true, page: Number(this.state.page) + 1}, () => this.props.loadData(DataTypes.ARTICLES, {country: this.props.match.params['countryCode'], page: Number(this.state.page)}))
		}
	}

	handleTryAgain = (ev) => {
		ev.preventDefault();
		this.props.clearArticlesData && this.props.clearArticlesData(DataTypes.ARTICLES);
		this.props.loadData && this.props.loadData(DataTypes.ARTICLES, {country: this.props.match.params['countryCode'], page: 1});
	}

	render() {
		let firstArticle = (this.props.articles && this.props.articles.data) && this.props.articles.data.slice(0,1)[0];
		let otherArticles = (this.props.articles  && this.props.articles.data) && this.props.articles.data.slice(1);

		return <React.Fragment>
			{!this.props.articles && <Preloader />}

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

			{firstArticle && <div className="card white z-depth-0 ugMobileCard hide-on-large-only">
				<div className="card-content">
					<div className="row">
						<div className="col l6 offset-l3 m8 offset-m2 s12">
							<img src={firstArticle.urlToImage} className="responsive-img cardImageMobile" />
							<p><strong>{firstArticle.source.name || "Unidentified source"}</strong></p>
							<h5 className="ugTitle">
								<Link to="/" className="grey-text text-darken-2 ugCardLink"><strong>{firstArticle.title}</strong></Link>
							</h5>
							<div>
								<small className="grey-text text-darken-2"><span><ReactTimeAgo date={firstArticle.publishedAt}/></span></small><small className="grey-text text-darken-2 right"><i className="fas fa-ellipsis-v"></i></small>
							</div>
						</div>
					</div>
				</div>
			</div>}

			{otherArticles && <div className="row">
				<div className="col l6 offset-l3 m8 offset-m2 s12">
					<h5 className="center grey-text text-darken-2 hide-on-med-and-down">
						<strong>{CountryData.find(obj => obj.code === this.props.match.params['countryCode'].toUpperCase())['value']} Health News.</strong>
						<br />
					</h5>
					<ArticleCardsMobile items={otherArticles} />
				</div>
			</div>}

			{this.state.loading && <Preloader />}
		</React.Fragment>
	}

	componentDidMount() {
		// get articles if articles do not already exist
		this.props.clearArticlesData && this.props.clearArticlesData(DataTypes.ARTICLES);
		this.props.loadData(DataTypes.ARTICLES, {country: this.props.match.params['countryCode'], page: 1});

		// Create scroll event
		window.addEventListener('scroll', this.handleOnScroll);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.match.params['countryCode'] !== this.props.match.params['countryCode']) {
			this.props.clearArticlesData && this.props.clearArticlesData(DataTypes.ARTICLES);
			this.props.loadData(DataTypes.ARTICLES, {country: this.props.match.params['countryCode'], page: 1});
			window.addEventListener('scroll', this.handleOnScroll);
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

	}
}