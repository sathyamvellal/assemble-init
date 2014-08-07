'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: {
            src: 'src',
            dist: 'dist'
        },
        assemble: {
            options: {
                flatten: true,
                assets: '<%= config.src %>/assets',
                layoutdir: '<%= config.src %>/templates/layouts',
                data: '<%= config.src %>/data/*.{json,yml}',
                partials: '<%= config.src %>/templates/partials/**/*.hbs',
                marked: {
                    breaks: false,
                    gfm: true,
//                    highlight: function (code, lang, callback) {
//                        pygmentize({
//                                lang: lang,
//                                format: 'html'
//                            },
//                            code,
//                            function (err, result) {
//                                callback(err, result.toString());
//                            }
//                        );
//                    },
                    langPrefix: 'language-',
                    pedantic: false,
                    sanitize: false,
                    silent: false,
                    smartLists: false,
                    smartypants: false,
                    tables: true
                }
            },
            pages: {
                options: {
                    flatten: true,
                    assets: '<%= config.dist %>/assets'
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>/templates/pages/',
                    src: '**/*.hbs',
                    dest: '<%= config.dist %>/'
                }]
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>/assets/',
                    src: '**',
                    dest: '<%= config.dist %>/assets/'
                }]
            }
        },
        clean: ['<%= config.dist %>/**/*'],
        watch: {
            pages: {
                files: '<%= config.src %>/{templates,data}/**',
                tasks: ['newer:assemble']
            },
            assets: {
                files: '<%= config.src %>/assets/**',
                tasks: ['newer:copy']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('assemble');

    grunt.registerTask('generate', ['assemble', 'copy']);
    grunt.registerTask('build', ['clean', 'generate']);
    grunt.registerTask('default', ['clean', 'build', 'watch']);
};