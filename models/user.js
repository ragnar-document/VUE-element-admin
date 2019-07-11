const Base = require('./base');
class User extends Base {
    constructor(props = 'users'){
        super(props);
    }
}

module.exports = new User()