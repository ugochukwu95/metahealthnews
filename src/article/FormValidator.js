import React, { Component } from "react";
import { ValidateData } from "./validation";
import { ValidationContext } from "./ValidationContext";

export class FormValidator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			errors: {},
			dirty: {},
			formSubmitted: false,
			getMessagesForField: this.getMessagesForField
		}
	}

	static getDerivedStateFromProps(props, state) {
		return {
			errors: ValidateData(props.data, props.rules)
		};
	}

	get formValid() {
		return Object.keys(this.state.errors).length === 0;
	}

	handleChange = (ev) => {
		let name = ev.target.name;
		this.setState(state => state.dirty[name] = true);
	}

	handleClick = (ev) => {
		this.setState({ formSubmitted: true }, () => {
			if (this.formValid) {
				this.props.submit(this.props.data)
			}
		});
	}

	handleCancel = (ev) => {
		this.setState({ formSubmitted: false }, () => {
			this.props.cancel();
		});
	}

	getButtonClasses() {
		return this.state.formSubmitted && !this.formValid ? "red darken-2" : "teal darken-2";
	}

	getMessagesForField = (field) => {
		return (this.state.formSubmitted || this.state.dirty[field]) ? this.state.errors[field] || [] : []
	}

	render() {
		return <React.Fragment>
			<ValidationContext.Provider value={ this.state }>
				<div onChange={ this.handleChange }>
					{ this.props.children }
				</div>
			</ValidationContext.Provider>

			<div className="center">
				<button className={ `btn-large white-text ugSubmitComment btn-flat ${ this.getButtonClasses() }`}
					onClick={ this.handleClick } disabled={ this.state.formSubmitted && !this.formValid } >
					Submit
				</button>
				<button className="btn-large teal-text text-darken-2 ugCancelComment btn-flat"
					onClick={ this.handleCancel }>
					Cancel
				</button>
			</div>
		</React.Fragment>
	}
}