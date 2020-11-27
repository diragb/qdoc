// Imports:
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';


// Constants:
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");


// Exports:
export default timeAgo;