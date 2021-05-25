const SYNC_FLAG = '--sync';
const SKIP_RED_FLAG = '--skip-red';
const SKIP_GREEN_FLAG = '--skip-green';
const SKIP_BLUE_FLAG = '--skip-blue';
const SKIP_BLACK_FLAG = '--skip-black';
const SKIP_WHITE_FLAG = '--skip-white';
const HELP_FLAG = '--help';

const KNOWN_FLAGS = [
  SYNC_FLAG,
  SKIP_RED_FLAG,
  SKIP_GREEN_FLAG,
  SKIP_BLUE_FLAG,
  SKIP_BLACK_FLAG,
  SKIP_WHITE_FLAG,
  HELP_FLAG,
];
const VALID_COLORS = [
  'red',
  'green',
  'blue',
  'black',
  'white',
];

module.exports = {
  SYNC_FLAG,
  SKIP_BLACK_FLAG,
  SKIP_BLUE_FLAG,
  SKIP_GREEN_FLAG,
  SKIP_RED_FLAG,
  SKIP_WHITE_FLAG,
  HELP_FLAG,
  KNOWN_FLAGS,
  VALID_COLORS,
};
