import React, {Component} from "react";
import ReactTimeAgo from 'react-time-ago';
import { Link } from "react-router-dom";
import {Preloader} from "../utilities/Preloader";
import { DataTypes } from "../data/Types";
import {cleanUrlText} from "../utilities/cleanUrlText";

export class ArticleList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			page: null,
			loading: false,
			pages: null,
		}
	}

	static getDerivedStateFromProps(props, state) {
		return {
			page: props.articles.page,
			pages: props.articles.pages,
		}
	}

	handleTryAgain = (ev) => {
		ev.preventDefault();
		this.props.clearArticlesData && this.props.clearArticlesData(DataTypes.ARTICLES);
		this.props.loadData && this.props.loadData(DataTypes.ARTICLES, {country: this.props.cookies.get('country_code').toLowerCase(), page: 1});
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
	     		this.setState({loading:true, page: Number(this.state.page) + 1}, () => this.props.loadData(DataTypes.ARTICLES, {country: this.props.cookies.get('country_code').toLowerCase(), page: Number(this.state.page) + 1}))
			}
	}

	render() {
		return (this.props.articles) && <React.Fragment>
			<div id="scrollCont">
			{this.props.articles.data && this.props.articles.data.map(item => <div key={item._id} className="card white ugCard z-depth-0">
				<div className="card-content">
					<div className="row">
						<div className="col l8 s7">
							<h5 className="ugTitle">
								<Link to={`/article/${cleanUrlText(item.title)}/${item._id}`} className="grey-text text-darken-2 ugCardLink"><strong>{item.title}</strong></Link>
							</h5>
							<small className="grey-text">{item.source.name} - <span><ReactTimeAgo date={item.publishedAt}/></span></small>
						</div>
						<div className="col l4 s5">
							<Link to={`/article/${cleanUrlText(item.title)}/${item._id}`} className="grey-text text-darken-2">
								<img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" data-src={item.urlToImage || `/unavailable-image.jpg`} data-srcset={`${item.urlToImage || `/unavailable-image.jpg`} 1x`} className="cover responsive-img cardImage lazy" alt={item.title} />
							</Link>
						</div>
					</div>
				</div>
			</div>)}

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

			{this.state.loading && <Preloader />}
			</div>
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
		window.addEventListener('scroll', this.handleOnScroll);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.articles.page !== this.props.articles.page) {
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