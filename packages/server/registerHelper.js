const { getLogLevelName } = require("@namics/remlog-utils");

module.exports.index_to_number = value => `${value + 1}`;
module.exports.loglevel_name = level => getLogLevelName(level || "");
module.exports.to_lower = input => (input ? input.toString().toLowerCase() : "" || input);
module.exports.local_date = (date, anotherDate) => {
	const d = new Date(date || anotherDate);
	return `${d.toLocaleDateString()} ${d.getHours()}:${d.getMinutes()}`;
};
