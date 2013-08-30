module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        "string-replace": {
            dist: {
                files: {
                    "overview/": "*.html", // includes files in dir and subdirs
                    "libraries/": "*.html"
                },
                options: {
                    replacements: [
                        // place files inline example
                        {
                            pattern: '/<!-- Piwik -->(.*)<!-- End Piwik Tracking Code -->/gi',
                            replacement: '\s'
                        }, {
                            pattern: '<a href="http://codeigniter.com">CodeIgniter</a>',
                            replacement: '<a href="http://www.codeigniter.org.pl">CodeIgniter</a>'
                        }
                    ]
                },

            }
        },

        s3: {
            options: {
                key: '',
                secret: '',
                region: 'eu-west-1',
                bucket: 'podrecznik.codeigniter.org.pl',
                access: 'public-read',
                debug: false,

                headers: {
                    // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
                    "Cache-Control": "max-age=630720000, public",
                    "Expires": new Date(Date.now() + 63072000000).toUTCString()
                }
            },
            dev: {
                // These options override the defaults
                options: {
                    encodePaths: false,
                    maxOperations: 20,
                    region: 'eu-west-1'
                },
                // Files to be uploaded.
                upload: [{
                        src: 'nav/*.js',
                        dest: 'nav/',
                        gzip: true,
                        headers: {
                            'Content-Type': 'text/javascript',
                            'Content-Encoding': 'gzip',
                            'Cache-Control': 'max-age=3600, must-revalidate'
                        }
                        //                      headers: {'Content-type': 'text/javascript', 'Content-Encoding': 'gzip', 'Cache-Control': 'max-age=3600, must-revalidate'}
                    }, {
                        src: 'userguide.css',
                        dest: 'userguide.css',
                        gzip: true,
                        headers: {
                            'Content-Type': 'text/css',
                            'Content-Encoding': 'gzip',
                            'Cache-Control': 'max-age=3600, must-revalidate'
                        }
                    }, {
                        src: 'database/*.html',
                        dest: 'database/',
                        gzip: true,
                        headers: {
                            'Content-Type': 'text/html',
                            'Content-Encoding': 'gzip',
                            'Cache-Control': 'max-age=3600, must-revalidate'
                        }
                    }, {
                        src: 'doc_style/*.html',
                        dest: 'doc_style/',
                        gzip: true,
                        headers: {
                            'Content-Type': 'text/html',
                            'Content-Encoding': 'gzip',
                            'Cache-Control': 'max-age=3600, must-revalidate'
                        }
                    }, {
                        src: 'general/*.html',
                        dest: 'general/',
                        gzip: true,
                        headers: {
                            'Content-Type': 'text/html',
                            'Content-Encoding': 'gzip',
                            'Cache-Control': 'max-age=3600, must-revalidate'
                        }
                    }, {
                        src: 'helpers/*.html',
                        dest: 'helpers/',
                        gzip: true,
                        headers: {
                            'Content-Type': 'text/html',
                            'Content-Encoding': 'gzip',
                            'Cache-Control': 'max-age=3600, must-revalidate'
                        }
                    }, {
                        src: 'installation/*.html',
                        dest: 'installation/',
                        gzip: true,
                        headers: {
                            'Content-Type': 'text/html',
                            'Content-Encoding': 'gzip',
                            'Cache-Control': 'max-age=3600, must-revalidate'
                        }
                    }, {
                        src: 'libraries/*.html',
                        dest: 'libraries/',
                        gzip: true,
                        headers: {
                            'Content-Type': 'text/html',
                            'Content-Encoding': 'gzip',
                            'Cache-Control': 'max-age=3600, must-revalidate'
                        }
                    }, {
                        src: 'overview/*.html',
                        dest: 'overview/',
                        gzip: true,
                        headers: {
                            'Content-Type': 'text/html',
                            'Content-Encoding': 'gzip',
                            'Cache-Control': 'max-age=3600, must-revalidate'
                        }
                    }, {
                        src: '*.html',
                        dest: '/',
                        gzip: true,
                        headers: {
                            'Content-Type': 'text/html',
                            'Content-Encoding': 'gzip',
                            'Cache-Control': 'max-age=3600, must-revalidate'
                        }
                    }

                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-s3');
    grunt.loadNpmTasks('grunt-string-replace');

    // Default task(s).
    grunt.registerTask('default', ['string-replace', 's3']);

};