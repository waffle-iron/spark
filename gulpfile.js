var gulp = require("gulp");
var gulpTypings = require("gulp-typings");
var path = require("path");
var exec = require("child_process").exec;

gulp.task("typings:browser", (cb) => {
    installTypings(path.join(__dirname, "src", "browser"), cb);
});

gulp.task("typings", gulp.parallel("typings:browser"));

function installTypings(typingsConfigPath, cb) {
    console.log("Platform: " + process.platform);
    console.log("Typings path: " + typingsConfigPath);
    var commandFile = "typings.cmd";
    if(process.platform !== "win32") {
        commandFile = "typings";
    }
    var typingsPath = path.join(__dirname, "node_modules", ".bin", commandFile);

    console.log("Typings command: " + typingsPath);
    var child = exec(typingsPath + " install", { cwd: typingsConfigPath });
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);

    child.on("exit", () => {
        cb();
    });
}
