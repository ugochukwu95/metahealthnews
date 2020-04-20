import React, {Component} from "react";
import ReactTimeAgo from 'react-time-ago';
import { Link } from "react-router-dom";

export class ArticleCardsMobile extends Component {
	render() {
		return this.props.items && this.props.items.map(item => <div key={item._id} className="card white ugMobileCard z-depth-0">
			<div className="card-content">
				<div className="row">
					<div className="col s8">
						<strong>{item.source.name || "Unidentified source"}</strong>
						<h5 className="ugTitleMobile">
							<a href={item.url} target="_blank" rel="noopener noreferrer" className="grey-text text-darken-2 ugCardLink"><strong>{item.title}</strong></a>
						</h5>
					</div>
					<div className="col s4">
						<a href={item.url} target="_blank" rel="noopener noreferrer">
							<img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" data-src={item.urlToImage} data-srcset={`${item.urlToImage} 1x`} className="lazy responsive-img cardImageMobile" />
						</a>
					</div>
				</div>
				<div>
					<small className="grey-text text-darken-2"><span><ReactTimeAgo date={item.publishedAt}/></span></small><small className="grey-text text-darken-2 right"><i className="fas fa-ellipsis-v"></i></small>
				</div>
			</div>
		</div>)
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
		if (prevProps.items.page !== this.props.items.page) {
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