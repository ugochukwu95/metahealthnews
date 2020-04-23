import validator from "validator";

export function ValidateData(data, rules) {
	let errors = {};
	Object.keys(data).forEach(field => {
		let fielderrors = [];
		let val = data[field];
		if (rules[field].required && validator.isEmpty(val)) {
			fielderrors.push("Value required");
		}

		if (!validator.isEmpty(data[field])) {
			if (rules[field].minlength && !validator.isLength(val, rules[field].minlength)) {
				fielderrors.push(`Enter at least ${rules[field].minlength}` + " characters");
			}
		}

		if (fielderrors.length > 0) {
			errors[field] = fielderrors;
		}
	})
	return errors;
}