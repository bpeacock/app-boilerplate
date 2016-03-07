var browserifyDefaultOptions = {
    transform: ['grunt-less-browserify', 'browserify-handlebars']
};

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            phonegap: {
                files: {
                    'platforms/PhoneGap/www/js/index.js': ['platforms/PhoneGap/index.js']
                },
                options: browserifyDefaultOptions
            },
            dist: {
                files: {
                    'builds/Web/app.js': ['views/main.js']
                },
                options: browserifyDefaultOptions
            },
            test: {
                files: {
                    'test/build/test.js': ['test/test.js']
                },
                options: {
                    transform: ['grunt-less-browserify'],
                    debug:     true
                }
            }
        },
        lessBrowserify: {
            imports: ['node_modules/helpers.less/helpers.less']
        },
        watch: {
            files: [ "views/**/*", "models/**/*" ],
            tasks: [ 'browserify:dist' ]
        },
        jshint: {
            options: {
                curly:  true,
                eqeqeq: true,
                eqnull: true,
                browser: true
            },
            uses_defaults: [ 'views/**/*.js', 'models/**/*.js' ]
        },
        uglify: {
            dist: {
                files: {
                    'builds/Web/app.min.js': ['builds/Web/app.js']
                },
                options: {
                    sourceMap: true
                }
            }
        },
        qunit: {
            files: ['test/index.html']
        },
        shell: {
            phonegap: {
                command: "sudo sh platforms/PhoneGap/build.sh",
                options: {
                    stdout: true
                }
            },
            web: {
                command: "sudo sh platforms/Web/build.sh",
                options: {
                    stdout: true
                }
            },
            "install-phonegap": {
                command: "sudo sh platforms/PhoneGap/install.sh",
                options: {
                    stdout: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('install-phonegap', [
        'shell:install-phonegap'
    ]);

    grunt.registerTask('phonegap', [
        'browserify:phonegap',
        'shell:phonegap'
    ]);

    grunt.registerTask('web', [
        'browserify:dist',
        'uglify',
        'shell:web'
    ]);

    grunt.registerTask('test', [
        'browserify:test',
        'qunit',
        'jshint'
    ]);

    grunt.registerTask('default', [
        'test',
        'web',
        'install-phonegap',
        'phonegap'
    ]);
};
