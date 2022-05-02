// -searchName

function getResturant(){
    return require('./data/resturante.json')
}

function getBar(){
    return require('./data/bar.json')
}

function getBakery(){
    return require('./data/bakery.json')
}

export default {getResturant, getBakery, getBar}; 