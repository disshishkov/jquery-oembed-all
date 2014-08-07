module.exports = function(grunt) 
{   
    grunt.initConfig(
    {
        pkg: grunt.file.readJSON("package.json"),
        meta:
        {
            banner: '/*<%= pkg.name %> - v<%= pkg.version %>'
                    + '\n<%= pkg.site %>'
                    + '\nCopyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;'
                    + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>'
                    + '\nOriginal plugin: <%= pkg.originalPlugin.name %>(<%= pkg.originalPlugin.homepage %>) by <%= pkg.originalPlugin.author.name %>*/\n'
        },
        ts:
        {
            options:
            {
                target: "es5",
                module: "commonjs",
                sourcemap: false
            },
            tsc:
            {
                src: ["ts/OEmbedYoutube.ts"],
                out: "<%= pkg.pluginName %>.js"
            }
        },
        uglify: 
        {
            options: 
            {
                banner: "<%= meta.banner %>"
            },
            js: 
            {
                files: 
                { 
                    "<%= pkg.pluginName %>.min.js": ["<%= ts.tsc.out %>"]
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.registerTask("default", ["ts", "uglify"]);
};