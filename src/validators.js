const constants = require('./constants');

/**
 * Validates provided by the user flags and throws an exception in case one or more flags are invalid
 * 
 * @param {Array.<String>} flags - list of flags provided from the terminal
 * @returns {void}
 */
 const validateFlags = (flags) => {
	const errors = [];

	flags.forEach((flag) => {
		if (!constants.KNOWN_FLAGS.includes(flag)) {
			errors.push(flag);
		}
	});

	if (errors.length > 0) {
		throw new Error(`Unknown flags: ${errors.join(', ')}`);
	}
};

/**
 * Validates list of provided colors, specified for colors order. Throws an exception, if one or more of provided colors are invalid
 * 
 * @param {Array.<String>} colors 
 */
const validateColors = (colors) => {
  const uniqueColors = Array.from(new Set(colors));

  if (uniqueColors.length !== colors.length) {
    throw new Error('Color list can\'t have repeating entries');
  }

  const errors = [];

  colors.forEach((color) => {
    if(!constants.VALID_COLORS.includes(color)) {
      errors.push(color);
    }
  });

  if (errors.length > 0) {
    throw new Error(`Unknown colors: ${errors.join(', ')}`);
  }
};

module.exports = {
  validateFlags,
  validateColors,
}
