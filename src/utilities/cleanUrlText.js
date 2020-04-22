export const cleanUrlText = (data) => {
	// Remove all characters that aren't a-z, 0-9, dash, underscore or space
	let not_acceptable_characters_regex = /[^-a-zA-Z0-9_ ]/g;
	data = data.replace(not_acceptable_characters_regex, '');
	// Remove all leading and trailing spaces
	data = data.trim();
	// Change all dashes, underscores and spaces to dashes
	data = data.replace(/[-_ ]+/g, '-');

	return data.toLowerCase();
}