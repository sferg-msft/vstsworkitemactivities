﻿module.exports = function (grunt) {
    grunt.initConfig({
        ts: {
            build: {
                src: ["scripts/**/*.ts"],
                tsconfig: true
            },
            options: {
                fast: 'never'
            }
        },
        typings: {
            install: {}
        },
        exec: {
            package: {
                command: "tfx extension create --manifest-globs vss-extension.json",
                stdout: true,
                stderr: true
            },
            publish: {
                command: "tfx extension publish --service-url https://marketplace.visualstudio.com --manifest-globs vss-extension.json",
                stdout: true,
                stderr: true
            }
        },
        copy: {
            scripts: {
                files: [{
                    expand: true, 
                    flatten: true, 
                    src: ["node_modules/vss-web-extension-sdk/lib/VSS.SDK.min.js"], 
                    dest: "scripts",
                    filter: "isFile" 
                }]
            }
        },
        
        clean: ["scripts/**/*.js", "*.vsix"]
    });
    
    grunt.loadNpmTasks("grunt-exec");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-typings");

    grunt.registerTask("install", ["typings:install"]);
    grunt.registerTask("build", ["ts:build", "copy:scripts"]);
    grunt.registerTask("package", ["build", "exec:package"]);
    grunt.registerTask("publish", ["default", "exec:publish"]);        
    
    grunt.registerTask("default", ["package"]);
};