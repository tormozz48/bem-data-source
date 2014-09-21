'use strict';

var util = require('util'),

    express = require('express'),

    config = require('./config'),
    logger = require('./logger'),
    template = require('./template'),
    controllers = require('./controllers');

/**
 * Starts express server
 * @param {Object} app - initialized express with default params
 */
module.exports = function () {
    var app = express();
    app
        .set('port', config.get('server:port') || 3000)
        .use(function (req, res, next) {
            logger.debug(util.format('retrieve request %s', req.path), module);
            next();
        })
        .get('/', controllers.index)
        .get('/libraries', controllers.getLibraries)
        .get('/:lib/versions', controllers.getVersions)
        .post('/publish/:lib/:version', controllers.publish)
        .post('/replace', controllers.replaceDoc)
        .post('/remove', controllers.remove)
        .listen(app.get('port'), function () {
            logger.info(util.format('Express server listening on port %s', app.get('port')), module);
            template.init({ level: 'common', bundle: 'index' });
        });
    return app;
};