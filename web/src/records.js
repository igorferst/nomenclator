import axios from 'axios';
import filter from 'lodash/filter';

class Record {
    constructor(recordData) {
        this.id = recordData.id;
        this.name = recordData.name;
        this.nickname = recordData.nickname;
        this.notes = recordData.notes;
    }
}

const get = function(recordId='') {

    const recordData = {
        id: recordId,
        name: 'Adam Smith',
        nickname: 'adam econ',
        notes: 'Born in Scotland\n Wrote "The Wealth of Nations"'
    }

    return Promise.resolve(new Record(recordData))

};

const getAll = function(searchFragment='') {

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

const save = function(recordData) {

};

export {get, getAll}
