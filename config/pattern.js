'use strict';

exports.getReadme = function() {
    return {
        'bem-mvc': {
            folder: '',
            pattern: {
                en: 'README.md',
                ru: 'README.ru.md'
            }
        },
        'bem-bl': {
            folder: '',
            pattern: {
                en: 'README.md',
                ru: 'README.ru.md'
            }
        },
        'bem-components': {
            folder: '',
            pattern: 'README.md'
        }
    };
};

exports.getChangelog = function() {
    return {
        'bem-core': {
            folder: '',
            pattern: 'CHANGELOG.md'
        },
        'bem-components': {
            folder: '',
            pattern: 'CHANGELOG.md'
        },
        'bem-mvc': {
            folder: '',
            pattern: {
                en: 'CHANGELOG.md',
                ru: 'CHANGELOG.ru.md'
            }
        },
        'islands-components': {
            folder: 'releases',
            pattern: 'changelog.md'
        },
        'islands-user': {
            folder: 'releases',
            pattern: 'changelog.md'
        },
        'islands-page': {
            folder: 'releases',
            pattern: 'changelog.md'
        },
        'islands-services': {
            folder: 'releases',
            pattern: 'changelog.md'
        },
        'islands-search': {
            folder: 'releases',
            pattern: 'changelog.md'
        },
        'islands-icons': {
            folder: 'releases',
            pattern: 'changelog.md'
        }
    };
};

exports.getMigration = function() {
    return {
        'islands-components': {
            folder: 'releases',
            pattern: 'MIGRATION.md'
        },
        'islands-user': {
            folder: 'releases',
            pattern: 'MIGRATION.md'
        },
        'islands-page': {
            folder: 'releases',
            pattern: 'MIGRATION.md'
        },
        'islands-services': {
            folder: 'releases',
            pattern: 'MIGRATION.md'
        },
        'islands-search': {
            folder: 'releases',
            pattern: 'MIGRATION.md'
        },
        'islands-icons': {
            folder: 'releases',
            pattern: 'MIGRATION.md'
        },
        'bem-components': {
            folder: '',
            pattern: 'MIGRATION.md'
        }
    };
};

exports.getPattern = function() {
    return {
        'bem-bl': {
            data: '%s.data.json',
            jsdoc: '%s.jsdoc.html'
        },
        'bem-core': {
            data: '%s.data.json',
            jsdoc: '%s.jsdoc.html'
        },
        'bem-components': {
            data: '%s.data.json',
            jsdoc: '%s.jsdoc.html'
        },
        'bem-mvc': {
            data: '%s.data.json',
            jsdoc: '%s.js-doc.html'
        }
    };
};

exports.getBuildCommand = function() {
    return {
        'bem-bl': "YENV=production enb make examples && enb make docs",
        'bem-core': "YENV=production enb make examples && enb make docs",
        'bem-components': "YENV=production enb make tests && enb make docs"
    };
};

exports.getCopyPatterns = function() {
    return {
        'bem-components': ['*.docs', '*.tests'],
        'bem-core': ['*.docs', '*.examples'],
        'bem-bl': ['*.docs', '*.examples']
    };
};
