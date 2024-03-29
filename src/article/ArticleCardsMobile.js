import React, {Component} from "react";
import ReactTimeAgo from 'react-time-ago';
//import { Link } from "react-router-dom";
import M from 'materialize-css';
import {cleanUrlText} from "../utilities/cleanUrlText";
import { Link } from "react-router-dom";

export class ArticleCardsMobile extends Component {
	render() {
		return this.props.items && this.props.items.map(item => <div key={item._id} className="card white ugMobileCard z-depth-0">
			<div className="card-content">
				<div className="row">
					<div className="col s8">
						<strong>{item.source.name || "Unidentified source"}</strong>
						<h5 className="ugTitleMobile">
							<Link to={`/article/${cleanUrlText(item.title)}/${item._id}`} className="grey-text text-darken-4 ugCardLink">
								<strong>{item.title}</strong>
							</Link>
						</h5>
					</div>
					<div className="col s4">
						<Link to={`/article/${cleanUrlText(item.title)}/${item._id}`}>
							<img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" data-src={item.urlToImage || `/unavailable-image.png`} alt={item.source.name || "Unidentified source"} data-srcset={`${item.urlToImage || `/unavailable-image.png`} 1x`} className="lazy responsive-img cardImageMobile" />
						</Link>
					</div>
				</div>
				<div>
					<small className="grey-text text-darken-2"><span><ReactTimeAgo date={Date.parse(item.publishedAt)}/></span></small><small data-target={`dropdown_${item._id}`} className="grey-text text-darken-2 right dropdown-trigger"><i className="fas fa-ellipsis-v"></i></small>
				</div>
			</div>
			
			<ul id={`dropdown_${item._id}`} className="dropdown-content">
    			<li id={`save_${item._id}`} onClick={this.props.saveArticle(item._id)} className={((item.savedBy.find(val => val.userId === this.props.userId)) ? "hide" : "show")}>
    				<a href="#!" className="grey-text text-darken-2"><i className="far fa-bookmark"></i> Save for later</a>
    			</li>

    			<li id={`remove_${item._id}`} className={((item.savedBy.find(val => val.userId === this.props.userId)) ? "show" : "hide")} onClick={this.props.removeSavedArticle(item._id)}>
    				<a href="#!" className="grey-text text-darken-2"><i className="fas fa-bookmark"></i> Saved</a>
    			</li>

    			<li><a href={item.url} className="grey-text text-darken-2" target="_blank" rel="noopener noreferrer"><i className="fas fa-link"></i> Go to {item.source.name || "Unidentified source"}</a></li>	

    			<li id={`undoBan_${item._id}`} onClick={this.props.handleUndoBanSource(item.source.name, item._id)} className={((item.hiddenBy.find(val => val === this.props.userId)) ? "show" : "hide")}>
    				<a href="#!" className="grey-text text-darken-2"><i className="fas fa-ban red-text"></i> Undo ban</a>
    			</li>

    			<li id={`banSource_${item._id}`} onClick={this.props.handleBanSource(item.source.name, item._id)} className={((item.hiddenBy.find(val => val === this.props.userId)) ? "hide" : "show")}>
    				<a href="#!" className="grey-text text-darken-2"><i className="fas fa-ban red-text"></i> Hide stories from {item.source.name || "Unidentified source"}</a>
    				<div id={`progress_${item._id}`} className="hide">
	    				<br />
						<div className="progress">
							<div className="indeterminate"></div>
						</div>
					</div>
    			</li>
  			</ul>
		</div>)
	}

	componentDidMount() {
		let elems = document.querySelectorAll('.dropdown-trigger');
		let options = {constrainWidth: false, coverTrigger: false};
    	M.Dropdown.init(elems, options);

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
	}

	componentDidUpdate(prevProps) {
		let elems = document.querySelectorAll('.dropdown-trigger');
		let options = {constrainWidth: false, coverTrigger: false};
    	M.Dropdown.init(elems, options);

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
	}
}