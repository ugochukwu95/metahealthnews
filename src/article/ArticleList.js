import React, {Component} from "react";
import ReactTimeAgo from 'react-time-ago';
import { Link } from "react-router-dom";
import {Preloader} from "../utilities/Preloader";
import { DataTypes } from "../data/Types";
import {cleanUrlText} from "../utilities/cleanUrlText";
import {ArticleCardsDesktop} from "./ArticleCardsDesktop";

export class ArticleList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			page: 1,
			loading: false,
			pages: 1,
		}
	}

	/*static getDerivedStateFromProps(props, state) {
		return {
			page: props.articles.page,
			pages: props.articles.pages,
		}
	}*/

	handleTryAgain = (ev) => {
		ev.preventDefault();
		this.props.clearArticlesData && this.props.clearArticlesData(DataTypes.ARTICLES);
		this.props.loadData && this.props.loadData(DataTypes.ARTICLES, {country: this.props.cookies.get('country_code').toLowerCase(), page: 1});
	}

	clearSearchData = (ev) => {
		this.props.clearArticlesData && this.props.clearArticlesData(DataTypes.ARTICLES_SEARCH_RESULTS);
	}

	handleOnScroll = (event) => {
		let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
  		let scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
 		let clientHeight = document.documentElement.clientHeight || window.innerHeight;
  		let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= (scrollHeight - 300);

  		let { cookies } = this.props;
  		let userId = cookies.get("user_id") || null;

  		// Load search results for coronavirus
  		if (scrolledToBottom && (this.state.page === 1)) {
     		
     		this.setState({loading:true, page: Number(this.state.page) + 1}, () => this.props.loadSearchResults(DataTypes.ARTICLES_SEARCH_RESULTS, {country: this.props.cookies.get('country_code').toLowerCase(), page: 1, searchString: "Coronavirus", userId: userId}))
		}

		// load search results for cancer
		if (scrolledToBottom && (this.state.page === 2)) {
			this.setState({loading:true, page: Number(this.state.page) + 1}, () => this.props.loadCancerSearchResults(DataTypes.CANCER, {country: this.props.cookies.get('country_code').toLowerCase(), page: 1, searchString: "Cancer", userId: userId}))
		}

		// load search results for DIABETES
		if (scrolledToBottom && (this.state.page === 3)) {
			this.setState({loading:true, page: Number(this.state.page) + 1}, () => this.props.loadDiabetesSearchResults(DataTypes.DIABETES, {country: this.props.cookies.get('country_code').toLowerCase(), page: 1, searchString: "Diabetes", userId: userId}))
		}

		// load search results for Heart Disease
		if (scrolledToBottom && (this.state.page === 4)) {
			this.setState({loading:true, page: Number(this.state.page) + 1}, () => this.props.loadHeartDiseaseSearchResults(DataTypes.HEART_DISEASE, {country: this.props.cookies.get('country_code').toLowerCase(), page: 1, searchString: "Heart Disease", userId: userId}))
		}

		if (scrolledToBottom && (this.state.page === 5)) {
			// get articles from the us if not a us citizen
			(this.props.articles_search_results) && this.setState({loading:true, page: Number(this.state.page) + 1}, () => this.props.loadArticlesForUSData(DataTypes.ARTICLES, {country: "us", page: 1, userId: userId}))

		}

		if (scrolledToBottom && (this.state.page === 6)) {
			// get articles from the uk if not a uk citizen
			(this.props.articles_search_results && this.props.articles_for_us) && this.setState({loading:true, page: Number(this.state.page) + 1}, () => this.props.loadArticlesForUKData(DataTypes.ARTICLES, {country: "gb", page: 1, userId: userId}))
		}

		if (scrolledToBottom && (this.state.page > 6)) {
 			this.setState({loading:false});
 			return;
 		}
	}

	render() {
		let firstArticle = (this.props.articles && this.props.articles.data) && this.props.articles.data.slice(0,1)[0];
		let firstOtherArticles = (this.props.articles && this.props.articles.data) && this.props.articles.data.slice(1,6);
		let otherArticles = (this.props.articles && this.props.articles.data) && this.props.articles.data.slice(6);

		let {cookies} = this.props;
		let userId = cookies.get("user_id") || null;

		return <React.Fragment>
			<div id="scrollCont">
				{
					firstArticle && <React.Fragment>
						<div className="card white z-depth-0 firstArticleDesktopCard">
							<div className="card-content">
								<div className="row">
									<div className="col l9 firstArticleDesktop">
										<h5 className="ugTitle">
											<Link to={`/article/${cleanUrlText(firstArticle.title)}/${firstArticle._id}`} className="grey-text text-darken-4 ugCardLink">
												<strong>{firstArticle.title}</strong>
											</Link>
										</h5>
										<p>
											<small>
												{firstArticle.source.name || "Unidentified source"}
											</small> - &nbsp; 
											<small className="grey-text text-darken-2">
												<span>
													<ReactTimeAgo date={Date.parse(firstArticle.publishedAt)}/>
												</span>
											</small>
										</p>

										<ul>
											{
												firstOtherArticles.map(obj => <li key={obj._id}>
													<h6 className="ugTitleSmall">
														<Link to={`/article/${cleanUrlText(obj.title)}/${obj._id}`} className="grey-text text-darken-4 ugCardLink">
															<strong>{obj.title}</strong>
														</Link>
													</h6>
													<p>
														<small>
															{obj.source.name || "Unidentified source"}
														</small> - &nbsp; 
														<small className="grey-text text-darken-2">
															<span>
																<ReactTimeAgo date={Date.parse(obj.publishedAt)}/>
															</span>
														</small>
													</p>
												</li>)
											}
										</ul>
									</div>
									<div className="col l3">
										<Link to={`/article/${cleanUrlText(firstArticle.title)}/${firstArticle._id}`}>
											<img alt={firstArticle.source.name} src={firstArticle.urlToImage || `/unavailable-image.png`} className="responsive-img cardImageMobile" />
										</Link>
									</div>
								</div>
							</div>
						</div>
					</React.Fragment>
				}
				{
					otherArticles && otherArticles.map(item => <div key={item._id} className="card white ugCard z-depth-0">
						<div className="card-content">
							<div className="row">
								<div className="col l9">
									<h5 className="ugTitle">
										<Link to={`/article/${cleanUrlText(item.title)}/${item._id}`} className="grey-text text-darken-4 ugCardLink"><strong>{item.title}</strong></Link>
									</h5>
									<small className="grey-text">{item.source.name} - <span><ReactTimeAgo date={Date.parse(item.publishedAt)}/></span></small>
								</div>
								<div className="col l3">
									<Link to={`/article/${cleanUrlText(item.title)}/${item._id}`} className="grey-text text-darken-2">
										<img src="https://upload.wikimedia.org/wikipedia/commons/strong/b1/Loading_icon.gif" data-src={item.urlToImage || `/unavailable-image.png`} data-srcset={`${item.urlToImage || `/unavailable-image.jpg`} 1x`} className="cover responsive-img cardImage lazy" alt={item.title} />
									</Link>
								</div>
							</div>
						</div>
					</div>)
				}
				{
					(otherArticles && this.props.current_location) && <div className="center">
						<p>
							<Link to={`/headlines/${this.props.current_location['country_code'].toLowerCase()}`} className="teal-text text-darken-2">
								<strong>Read more stories from Headlines</strong>
							</Link>
						</p>
						<div className="divider frontPageDivider"></div>
					</div>
				}

				{
					(this.props.articles_search_results && this.props.articles_search_results.data) && <React.Fragment>
						<br />
						<h5 className="grey-text text-darken-2 ugBigFont">
							<strong>Coronavirus</strong>
						</h5>
						<ArticleCardsDesktop items={this.props.articles_search_results.data} />
					</React.Fragment>
				}
				{
					(this.props.articles_search_results && this.props.articles_search_results.data) && <div className="center">
						<p>
							<Link to="/search/coronavirus" onClick={this.clearSearchData} className="teal-text text-darken-2">
								<strong>Read more stories about the Coronavirus</strong>
							</Link>
						</p>
						<div className="divider frontPageDivider"></div>
					</div>
				}

				{
					(this.props.cancer && this.props.cancer.data) && <React.Fragment>
						<br />
						<h5 className="grey-text text-darken-2 ugBigFont">
							<strong>Cancer</strong>
						</h5>
						<ArticleCardsDesktop items={this.props.cancer.data} />
					</React.Fragment>
				}
				{
					(this.props.cancer && this.props.cancer.data) && <div className="center">
						<p>
							<Link to="/search/cancer" onClick={this.clearSearchData} className="teal-text text-darken-2">
								<strong>Read more stories about Cancer</strong>
							</Link>
						</p>
						<div className="divider frontPageDivider"></div>
					</div>
				}

				{(this.props.diabetes && this.props.diabetes.data) && <React.Fragment>
					<br />
					<h5 className="grey-text text-darken-2 ugBigFont ">
						<strong>Diabetes</strong>
					</h5>
					<ArticleCardsDesktop handleBanSource={this.handleBanSource} handleUndoBanSource={this.handleUndoBanSource} userId={userId} saveArticle={this.handleSaveForLater} removeSavedArticle={this.handleRemoveSavedArticle} items={this.props.diabetes.data} />
				</React.Fragment>}
				{(this.props.diabetes && this.props.diabetes.data) && <div className="center">
					<p><Link to="/search/diabetes" onClick={this.clearSearchData} className="teal-text text-darken-2"><strong>Read more stories about Diabetes</strong></Link></p>
					<div className="divider frontPageDivider"></div>
				</div>}



				{(this.props.heart_disease && this.props.heart_disease.data) && <React.Fragment>
					<br />
					<h5 className="grey-text text-darken-2 ugBigFont ">
						<strong>Heart Disease</strong>
					</h5>
					<ArticleCardsDesktop handleBanSource={this.handleBanSource} handleUndoBanSource={this.handleUndoBanSource} userId={userId} saveArticle={this.handleSaveForLater} removeSavedArticle={this.handleRemoveSavedArticle} items={this.props.heart_disease.data} />
				</React.Fragment>}
				{(this.props.heart_disease && this.props.heart_disease.data) && <div className="center">
					<p><Link to="/search/heart%20disease" onClick={this.clearSearchData} className="teal-text text-darken-2"><strong>Read more stories about Heart Diseases</strong></Link></p>
					<div className="divider frontPageDivider"></div>
				</div>}



				{(this.props.articles_for_us && this.props.articles_for_us.data && !(this.props.current_location && this.props.current_location.country_code === "US")) && <React.Fragment>
					<br />
					<h5 className="grey-text text-darken-2 ugBigFont ">
						<strong>United States of America</strong>
					</h5>
					<ArticleCardsDesktop handleBanSource={this.handleBanSource} handleUndoBanSource={this.handleUndoBanSource} userId={userId} saveArticle={this.handleSaveForLater} removeSavedArticle={this.handleRemoveSavedArticle} items={this.props.articles_for_us.data} />
				</React.Fragment>}
				{(this.props.articles_for_us && this.props.articles_for_us.data) && <div className="center">
					<p><Link to="/headlines/us" className="teal-text text-darken-2"><strong>Read more health news from the United States of America</strong></Link></p>
					<div className="divider frontPageDivider"></div>
				</div>}




				{(this.props.articles_for_uk && this.props.articles_for_uk.data && !(this.props.current_location && this.props.current_location.country_code === "UK")) && <React.Fragment>
					<br />
					<h5 className="grey-text text-darken-2 ugBigFont ">
						<strong>United Kingdom</strong>
					</h5>
					<ArticleCardsDesktop handleBanSource={this.handleBanSource} handleUndoBanSource={this.handleUndoBanSource} userId={userId} saveArticle={this.handleSaveForLater} removeSavedArticle={this.handleRemoveSavedArticle} items={this.props.articles_for_uk.data} />
				</React.Fragment>}
				{(this.props.articles_for_uk && this.props.articles_for_uk.data) && <div className="center">
					<p><Link to="/headlines/gb" className="teal-text text-darken-2"><strong>Read more health news from the United Kingdom</strong></Link></p>
					<div className="divider frontPageDivider"></div>
				</div>}
				{
					/*firstArticle && <div className="card white z-depth-0 ugMobileCard">
						<div className="card-content">
							<div className="row">
								<div className="col s12">
									
									<p><strong>{firstArticle.source.name || "Unidentified source"}</strong></p>
									<h5 className="ugTitle">
										<Link to={`/article/${cleanUrlText(firstArticle.title)}/${firstArticle._id}`} className="grey-text text-darken-2 ugCardLink">
											<strong>{firstArticle.title}</strong>
										</Link>
									</h5>
									<div>
										<small className="grey-text text-darken-2"><span><ReactTimeAgo date={Date.parse(firstArticle.publishedAt)}/></span></small><small data-target={`dropdown_${firstArticle._id}`} className="grey-text text-darken-2 right dropdown-trigger"><i className="fas fa-ellipsis-v"></i></small>
									</div>
								</div>
							</div>
						</div>*/

						/*<ul id={`dropdown_${firstArticle._id}`} className="dropdown-content">
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
								  			</ul>*/
					//</div>
				}
				{
					/*this.props.articles.data && */
				}

				{
					(this.props.articles && this.props.match && (this.props.articles.error)) && <div className="row">
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
					</div>
				}

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