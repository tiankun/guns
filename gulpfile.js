//引入gulp模块
const gulp = require('gulp');

//引入雪碧图合成插件
const spritesmith = require('gulp.spritesmith');
gulp.task('spritesmith', function () {
    gulp.src('guns-admin/src/main/webapp/static/uploads_img/*.png')
        .pipe(spritesmith({
            imgName: 'sprite.png',//保存合并后的名称
            cssName: 'dest/css/sprite.css',//保存合并后css样式的地址
            padding: 0,//合并时两个图片的间距
            algorithm: 'binary-tree',//注释1
            //cssTemplate:'dest/css/handlebarsStr.css'//注释2
            cssTemplate: function (data) {             //如果是函数的话，这可以这样写
                var arr = [];
                data.sprites.forEach(function (sprite) {
                    arr.push(".icon-" + sprite.name + "{" + "background-image: url('" + sprite.escaped_image + "');" + "background-position: " + sprite.px.offset_x + "px " + sprite.px.offset_y + "px;" + "width:" + sprite.px.width + ";" + "height:" + sprite.px.height + ";" + "}\n");
                });
                return arr.join("");
            }
        }))
        .pipe(gulp.dest('dest/images'));
});
gulp.task('default', ['spritesmith']);