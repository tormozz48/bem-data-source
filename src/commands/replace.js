'use strict';

var _ = require('lodash'),

    config = require('../config'),
    Logger = require('../logger'),
    TargetReplace = require('../targets/replace');

module.exports = function () {
    return this
        .title('replace doc command')
        .helpful()
        .opt()
            .name('repo').title('Name of repository')
            .short('r').long('repo')
            .req()
            .end()
        .opt()
            .name('version').title('Version of repository (tag or branch)')
            .short('v').long('version')
            .req()
            .end()
        .opt()
            .name('doc').title('Document key: readme|changelog|migration|notes')
            .short('d').long('doc')
            .req()
            .end()
        .opt()
            .name('lang').title('Document language: ru|en|...')
            .short('l').long('lang')
            .end()
        .opt()
            .name('url').title('Github url of file with replacement content')
            .short('u').long('url')
            .req()
            .end()
        .act(function (opts) {
            var logger = new Logger(module, 'info'),
                o = _.extend({ doc: opts.doc, lang: opts.lang, url: opts.url },
                    { storage: config.get('storage') }),
                target = new TargetReplace(opts.repo, opts.version, o);
            return target.execute()
                .then(function () {
                    logger.info('REPLACE COMMAND HAS BEEN FINISHED SUCCESSFULLY');
                    process.exit(0);
                })
                .fail(function (err) {
                    logger.error('REPLACE COMMAND FAILED WITH ERROR %s', err.message);
                    process.exit(1);
                });
        });
};
