import axios from 'axios';
import filter from 'lodash/filter';

const get = function(searchFragment='') {

    const adams = [
        {name: 'Adams Smith', id: 1},
        {name: 'Adamst Smith', id: 2},
        {name: 'Adamw Smith', id: 3},
        {name: 'Adamwp Smith', id: 4},
        {name: 'Adam Smith', id: 5}
    ]

    return Promise.resolve(filter(
        adams,
        (r) => {return r.name.toLowerCase().indexOf(searchFragment.toLowerCase()) > -1}
    ))

};

export default get;
