var serviceUrl = 'http://51.68.137.193:9000/movie-park';

function formatDate(date){
    date = new Date(date);
    console.log('Format date: ', date);
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    return  yyyy + '-' + mm + '-' + dd;
}

function parseDateFromStr(dateStr) {
    let parts = dateStr.split('-');
    return  Date(parts[0], parts[1] - 1, parts[2]);
}

function getTodayMovieList(httpConnection, dateStr) {
    console.log('Start to get today movies list.');
    let myUrl = serviceUrl + '/get-all-movies-by-date/' + dateStr;

    return httpConnection.get(myUrl)
        .then(response => {
            console.log("Today movies:", response);
            return response.json();
        }).then(console.log('Finish getting today movies list.'));
}

function drawAllMovies(document, todayMoviesList) {
    console.log('Start drawing all movies.');
    let container = document.getElementById('todayMovies');

    for (const index of Object.keys(todayMoviesList)) {
        //create new element
        let movie = document.createElement('div');
        movie.setAttribute('class', "col-3 movie");
        movie.setAttribute('id', index);
        movie.textContent = todayMoviesList[index];
        container.appendChild(movie);
    }
    console.log('Finish drawing all movies.');
}

function getSeanceInfoById(httpConnection, seanceId) {
    console.log('Start getting seance info by id: ', seanceId);
    let myUrl = serviceUrl + '/get-seance-info/' + seanceId;

    return httpConnection.get(myUrl)
        .then(response => {
            return response.json();
        }).then(console.log('Finish getting seance info by id: ', seanceId));
}

function getSeancePlacesInfoById(httpConnection, seanceId) {
    console.log('Start getting seance places info by id.');
    let myUrl = serviceUrl + '/get-seance-places-info/' + seanceId;

    return httpConnection.get(myUrl)
        .then(response => {
            return response.json();
        }).then(console.log('Finish getting seance places info by id.'));
}

function getAllSeancesByMovieAndDate(httpConnection, movieId, dateAsString) {
    console.log('Start getting all seances by movie and date.');
    let myUrl = serviceUrl + '/get-seances-by-movie-and-date/' + movieId + '/' + dateAsString;

    return httpConnection.get(myUrl)
        .then(response => {
            console.log("All seances in all movie parks:", response);
            return response.json();
        }).then(console.log('Finish getting all seances by movie and date.'));
}

function createCircleByParameters(circle, placeId, blocked, hallPlacesInfo, basePrice, vipPrice) {
    let x = hallPlacesInfo[placeId].coordX;
    let y = hallPlacesInfo[placeId].coordY;
    let vip = hallPlacesInfo[placeId].isVip;
    let price = basePrice;
    let r = "2.5%";
    circle.setAttributeNS(null, 'id', placeId);
    circle.setAttributeNS(null, 'cx', x + '%');
    circle.setAttributeNS(null, 'cy', y + '%');

    if (blocked === true) {
        r = "1.5%";
        circle.setAttributeNS(null, 'class', 'seat blocked');
    } else if (vip === true) {
        circle.setAttributeNS(null, 'class', 'seat vip');
        price = vipPrice;
    } else {
        circle.setAttributeNS(null, 'class', 'seat');
    }

    circle.setAttributeNS(null, 'r', r);
    circle.setAttributeNS(null, 'price', price);
    circle.setAttributeNS(null, 'blocked', blocked);
    circle.setAttributeNS(null, 'selected', false);
    console.log('finish creating circle by place id: ', placeId);
    return circle;
}

function createScreen(curvedLine, width, height) {
    let curvedLineCoord = "M {0} {1} Q {2} {3} {4} {5}".format(
        0.20*width, 0.15*height, 0.50*width, 0.05*height, 0.80*width, 0.15*height);
    curvedLine.setAttribute('id', 'screen');
    curvedLine.setAttribute('d', curvedLineCoord);
    curvedLine.setAttribute('stroke', "grey");
    curvedLine.setAttribute('stroke-width', "1%");
    curvedLine.setAttribute('fill', "transparent");
    console.log('Finish creating screen.');
    return curvedLine;
}

function prepareBlockPlacesRequestBody(httpConnection, document, placesBlockInfo, seanceId) {
    console.log('Start preparing block places request body.');
    let container = document.getElementById('seanceGraphArea');

    let blockPlacesRequestBody = {
        "seanceId": seanceId,
        "blocked": true,
        "placeIdList" : []
    };

    for(let i = 0; i < placesBlockInfo.length; i++) {
        let eachPlace = placesBlockInfo[i];
        let placeId = eachPlace['placeId'];
        //remove old element
        let currentElement = container.getElementById(placeId);
        if (currentElement === null) {
            throw {};
        }
        if (currentElement.getAttribute('selected') === 'true') {
            blockPlacesRequestBody.placeIdList.push(placeId);
        }
    }
    console.log("Start preparing block places request body.: %s", blockPlacesRequestBody);
    return blockPlacesRequestBody;
}

function blockPlacesUtil(httpConnection, blockPlacesRequestBody) {
    console.log('Start blocking places.');
    let myUrl = serviceUrl + '/block-unblock-place';
    httpConnection.post(myUrl, blockPlacesRequestBody)
        .then(response => {
            return response.json();
        })
        .then(blockedPlace => {
            console.log('Finish blocking places. ', blockedPlace);
        });
}

export {formatDate}
export {getTodayMovieList}
export {drawAllMovies}
export {getSeanceInfoById}
export {getSeancePlacesInfoById}
export {getAllSeancesByMovieAndDate}
export {createCircleByParameters}
export {createScreen}
export {prepareBlockPlacesRequestBody}
export {blockPlacesUtil}
