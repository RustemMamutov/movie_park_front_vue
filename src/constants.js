var serviceUrl = 'http://51.68.137.193:9000/movie-park';
var getAllMoviesByPeriodUrl = serviceUrl + '/get-all-movies-by-period/';
var getSeanceInfoUrl = serviceUrl + '/get-seance-info/';
var getSeancePlacesInfoUrl = serviceUrl + '/get-seance-places-info/';
var getSeancesByMovieAndDateUrl = serviceUrl + '/get-seances-by-movie-and-date/';
var blockUnblockPlaceUrl = serviceUrl + '/block-unblock-place';


window.monthDict = {
    "0":"янв",
    "1":"фев",
    "2":"март",
    "3":"апр",
    "4":"май",
    "5":"июнь",
    "6":"июль",
    "7":"авг",
    "8":"сент",
    "9":"окт",
    "10":"ноч",
    "11":"дек",
};

window.daysDict = {
    "0":"вс",
    "1":"пн",
    "2":"вт",
    "3":"ср",
    "4":"чт",
    "5":"пт",
    "6":"сб"
};

export {getAllMoviesByPeriodUrl}
export {getSeanceInfoUrl}
export {getSeancePlacesInfoUrl}
export {getSeancesByMovieAndDateUrl}
export {blockUnblockPlaceUrl}