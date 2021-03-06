'use strict';

var inherit = require('inherit'),
    Base = require('./publish');

module.exports = inherit(Base, {
    __constructor: function (ref, options) {
        this.__base(ref, options);
        this._tasks = [
            new (require('../tasks/check-issues'))(this),
            new (require('../tasks/read-md'))(this),
            new (require('../tasks/read-deps'))(this),
            new (require('../tasks/read-showcase'))(this),
            new (require('../tasks/read-levels'))(this),
            new (require('../tasks/add-source-url'))(this),
            new (require('../tasks/write-result'))(this)
        ];
    }
});
