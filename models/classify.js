const Base = require('./base');

class Classify extends Base {
    constructor(prop = 'classify'){
        super(prop);
    }
}

module.exports = new Classify()