import axios from 'axios';
import filter from 'lodash/filter';

class Record {

    constructor(recordData) {
        recordData = recordData || {};

        this.id = recordData.id || '';
        this.name = recordData.name || '';
        this.keywords = recordData.keywords || '';
        this.notes = recordData.notes || '';
    }

    toJson() {
        return {
            id: this.id,
            name: this.name,
            keywords: this.keywords,
            notes: this.notes
        }
    }

}

const get = function(recordId='') {

    const recordData = {
        id: recordId,
        name: 'Adam Smith',
        keywords: 'economist',
        notes: 'Born in Scotland\nWrote "The Wealth of Nations"'
    }

    return Promise.resolve(new Record(recordData))

};

const getAll = function(searchFragment='') {

    const adams = [
        {name: 'Adams Smith', id: '1'},
        {name: 'Adamst Smith', id: '2'},
        {name: 'Adamw Smith', id: '3'},
        {name: 'Adamwp Smith', id: '4'},
        {name: 'Adam Smith', id: '5'}
    ]

    return Promise.resolve(filter(
        adams,
        (r) => {return r.name.toLowerCase().indexOf(searchFragment.toLowerCase()) > -1}
    ))

};

const save = function(recordModel) {
    console.log(recordModel)
    return Promise.resolve()
};

export {get, getAll, save, Record}
