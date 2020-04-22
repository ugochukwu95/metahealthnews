import React, {Component} from "react";
import {MainNav} from "./MainNav";
import {FrontPage} from "./FrontPage";
import {Headlines} from "./Headlines";
import {Search} from "./Search";
import {About} from "./About";
import {SavedArticles} from "./SavedArticles";
import {ArticleDetails} from "./ArticleDetails";
import {HiddenSources} from "./HiddenSources";

export class Article extends Component {
	render() {
		let comp;
		// This matches the front page and loads the FrontPage component
		if (this.props.match.path === '/') {
			// Run a spinner when department prop hasnt loaded
			comp = <FrontPage {...this.props} />;
		}
		else if (this.props.match.path === '/headlines/:countryCode') {
			// Run a spinner when department prop hasnt loaded
			comp = <Headlines {...this.props} />;
		}
		else if (this.props.match.path === "/search/:searchstring") {
			comp = <Search {...this.props} />;
		}
		else if (this.props.match.path === "/about") {
			comp = <About {...this.props} />;
		}
		else if (this.props.match.path === "/saved-articles") {
			comp = <SavedArticles {...this.props} />;
		}
		else if (this.props.match.path === "/article/:title/:id") {
			comp = <ArticleDetails {...this.props} />;
		}
		else if (this.props.match.path === "/hidden-sources") {
			comp = <HiddenSources {...this.props} />;
		}

		return <React.Fragment>
			<header>
				<MainNav {...this.props} />
			</header>
			<main>
				{comp}
			</main>
			<footer>

			</footer>
		</React.Fragment>
	}
}