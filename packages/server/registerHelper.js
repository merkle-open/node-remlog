const hbs = require('hbs');
const { getLogLevelName } = require('@remlog/scheme');

hbs.registerHelper('index_to_number', value => `${value + 1}`);
hbs.registerHelper('loglevel_name', level => getLogLevelName(level));
hbs.registerHelper('to_lower', input => input.toString().toLowerCase() || input);
hbs.registerHelper('local_date', (date, anotherDate) => {
    const d = new Date(date || anotherDate);

    return `${d.toLocaleDateString()} ${d.getHours()}:${d.getMinutes()}`;
});
