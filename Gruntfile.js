module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        //Get some details from the package.json
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
        ' * <%= pkg.config.name %> - version <%= pkg.version %> \n' +
        ' * <%= pkg.description %>\n' +
        ' *\n' +
        ' * <%= pkg.author %>\n' +
        ' * Build at <%= grunt.template.today("dd-mm-yyyy") %>\n' +
        ' * Released under MIT License \n' +
        ' */\n',
        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>'
                },
                files: {
                    src: [ 'build/*.js' ]
                }
            }
        },
        //Typescript settings per build
        ts: {
            options: {
                module: 'amd',
                target: 'es5',
                sourceMap: true,
                declaration: true,
                noImplicitAny: true
            },
            dist: {
                src: ['ts/**/*.ts'],
                dest: 'build/<%= pkg.config.name %>.js'
            }
        },
        watch: {
            files: ['ts/**/*.ts'],
            tasks: ['ts', 'concat'],
            options: {
                livereload: true
            }
        },
        connect: {
            server: {
                options: {
                    base: ['./build', './example', './node_modules'],
                    port: 8080
                }
            }
        },
        concat: {
            dist: {
                files: {
                    'build/<%= pkg.config.name %>.js': [
                        'node_modules/i18next/i18next.js',
                        'build/<%= pkg.config.name %>.js'
                    ]
                }
            }
        },
        uglify: {
            options: {
                compress: {
                    sequences: true,
                    dead_code: true,
                    conditionals: true,
                    booleans: true,
                    unused: true,
                    if_return: true,
                    join_vars: true,
                    drop_console: false
                },
                mangle: true,
                beautify: false
            },
            dist: {
                files: {
                    'build/<%= pkg.config.name %>.min.js': [
                        'build/<%= pkg.config.name %>.js'
                    ]
                }
            }
        },
        clean: {
            dist: ['build']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //dist Build
    grunt.registerTask('dist', [
        'clean:dist',       //Clean the dist folder
        'ts:dist',          //Run typescript on the preprocessed files, for dist (client)
        'concat:dist',      //Concat the lib and externals
        'uglify:dist',      //Minify everything
        'usebanner:dist'    //Minify everything
    ]);

    grunt.registerTask('dev', [
        'ts:dist',
        'concat:dist',      //Concat the lib and externals
        'connect',
        'watch'
    ]);

};
