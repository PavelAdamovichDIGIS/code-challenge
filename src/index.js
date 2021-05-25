const { getColor } = require('./apiMock');
const { Color } = require('./classes');
const constants = require('./constants');
const { validateColors, validateFlags } = require('./validators');

/**
 * @typedef {Object} IColorObject
 * @property {String} name
 * @property {String} HEX
 * @property {Object} RGB
 * @property {Number} RGB.R
 * @property {Number} RGB.G
 * @property {Number} RGB.B
 */
/**
 * 
 * @param {String} color
 * @param {Object} options
 * @param {Boolean} options.red
 * @param {Boolean} options.green
 * @param {Boolean} options.blue
 * @param {Boolean} options.black
 * @param {Boolean} options.white
 * @returns {Promise.<IColorObject>}
 */
const getColors = async (color, options) => {
	if (!options[color]) {
		return null;
	}

	try {
		const colorObject = await getColor(color);
	
		return new Color(
			colorObject.name,
			colorObject.HEX,
			{ r: colorObject.RGB.R, g: colorObject.RGB.G, b: colorObject.RGB.B }
		);
	} catch (e) {
		console.error(`Failed to fetch info for color ${color}. Error: ${e}`);

		return null;
	}
}

/**
 * Prints information about provided color object(s). Shows information like color name, its HEX code and RGB values
 * 
 * @param {Array.<Color> | Color} colors - a single color object, or list of color objects for output
 * @returns {void}
 */
const displayColors = (colors) => {
	const colorsToDisplay = Array.isArray(colors) ? colors : [colors];

	colorsToDisplay.forEach((color) => {
		if (!color) {
			return;
		}

		console.log(`${color}`);
	});
};

const getHelp = () => {
	console.log(`To start application run:
	node <path_to_code_challenge>/src/index.js [...flags] colorsOrder
	or under challenge root directory, type in your terminal
	npm start -- [...flags] colorsOrder
	\nList of available flags:
	--sync - allows you to run the application in synchronous mode. With this flag, colors will be processed one by one. Otherwise, all colors would be processed at the same time
	--skip-red - disallows fetching information for red color. This color won't be displayed at output as well
	--skip-green - same as --skip-red
	--skip-blue - same as --skip-red
	--skip-black - same as --skip-red
	--skip-white - same as --skip-red
	--help - shows this message
	\nList of available options:
	colorsOrder - allows you to specify comma separated values, which will determine the order in which colors would be outputted on the screen. Example: red,white,blue,green,black. List of available colors: red, green, blue, black, white. Each color can be specified only once`);
};

const main = async () => {
	// refactored way of providing app options. made them to look more like an actual console application arguments
	// since boolean values are not usually have set format (they can be written as true, True, y, Yes, etc.)
	// and relying on user to provide valid JSON is also error prone, and not as easy to use
	// than simple comma separated values
	const { flags, params } = process.argv.slice(2)
		.reduce((acc, arg) => {
			if (arg.startsWith('--')) {
				acc.flags.push(arg);
			} else {
				acc.params.push(arg);
			}

			return acc;
		}, { flags: [], params: [] });

	if (flags.includes(constants.HELP_FLAG)) {
		getHelp();

		return;
	}

	try {
		validateFlags(flags);
	} catch (e) {
		console.error(e);
		getHelp();

		return;
	}

	const [colorOrder] = params;
	const isSync = flags.includes(constants.SYNC_FLAG);
	const colorsToFetch = colorOrder.split(',');
	const unlistedColors = constants.VALID_COLORS.filter((color) => !colorsToFetch.includes(color));
	// in case some of the colors were omitted from the arguments list, show those colors in default order
	colorsToFetch.push(...unlistedColors);

	try {
		validateColors(colorsToFetch)
	} catch (e) {
		console.error(e);
		getHelp();

		return;
	}

	const options = {
		red: !flags.includes(constants.SKIP_RED_FLAG),
		green: !flags.includes(constants.SKIP_GREEN_FLAG),
		blue: !flags.includes(constants.SKIP_BLUE_FLAG),
		black: !flags.includes(constants.SKIP_BLACK_FLAG),
		white: !flags.includes(constants.SKIP_WHITE_FLAG),
	};

	if (isSync) {
		// in synchronous mode, each color will be fetched one-by-one consecutively
		for (const color of colorsToFetch) {
			const colorObject = await getColors(color, options);

			displayColors(colorObject)
		}
	} else {
		const parsedColors = await Promise.all(colorsToFetch.map((color) => getColors(color, options)));

		displayColors(parsedColors);
	}
}

// Renamed this function to "main" to avoid variable shadowing across the app. color as a function name
// is not descriptive, and disallows usage of this name as a variable  in places, where it can be more fitting
main();

/*
To run application:
node <code_challenge_dir>/src/index.js --skipGreen green,blue,red
*/
