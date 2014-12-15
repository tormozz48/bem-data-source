'use strict';
var path = require('path'),
    util = require('util'),

    vow = require('vow'),
    vowFs = require('vow-fs'),
    logger = require('../logger'),
    storage = require('../cocaine/api'),

    processExamples = require('../tasks/process-examples'),
    sendDoc = require('../tasks/send-doc'),

    TargetConvert  = function (options) {
        return this.init(options);
    },

    TargetConvertVersion = function(lib, version) {
        this.source = lib;
        this.ref = version;
        this.getOutputPath = function() {
            return path.join(process.cwd(), version);
        };
        this.getTempPath = this.getOutputPath();
        this.getSourceName = function() {
            return lib;
        };
    };

TargetConvert.prototype = {
    source: undefined,
    options: undefined,

    /**
     * Initialize target object
     * @returns {TargetConvert}
     */
    init: function (options) {
        this.source = path.basename(process.cwd());
        this.options = options;
        return this;
    },

    /**
     * Executes target
     * @returns {*}
     */
    execute: function () {
        return storage.init()
            .then(function () {
                return this._convertVersions();
            }, this);
    },

    _convertVersions: function() {
        logger.info(util.format('Start convert versions of %s library', this.source), module);
        var _this = this;
        return vowFs.listDir(process.cwd()).then(function(versions) {
            return versions.reduce(function (prev, item) {
                prev = prev.then(function () {
                    logger.debug(util.format('Start convert version %s of library %s', _this.source, item), module);
                    return _this._convertVersion(item);
                });
                return prev;
            }, vow.resolve());
        }, this);
    },

    _convertVersion: function(version) {
        var target = new TargetConvertVersion(this.source, version);
        return vow.all([
            this._processExamples(target),
            this._sendDoc(target)
        ]);
    },

    _processExamples: function(target) {
        return processExamples(target);
    },

    _sendDoc: function(target) {
        return sendDoc(target);
    }
};
