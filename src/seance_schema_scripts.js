

function getSeanceInfoUtil(serviceUrl, seanceId, httpConn) {
    let myUrl = serviceUrl + '/get_seance/' + seanceId;

    return httpConn.get(myUrl)
        .then(response => {
            console.log("Seance info:", response);
            return response.json();
        });
}


function createCircleByParameters(circle, placeId, blocked, placesCoordinates, placesVipInfo, basePrice, vipPrice) {
    let x = placesCoordinates[placeId].coordX;
    let y = placesCoordinates[placeId].coordY;
    let vip = placesVipInfo[placeId];
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
}

export {getSeanceInfoUtil}
export {createCircleByParameters}
