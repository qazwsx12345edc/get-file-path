var fs = require('fs');
var path = require('path');

//要遍历的文件夹所在的路径
var filePath = path.resolve('guestPics');

//调用文件遍历方法
fileDisplay(filePath);

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath) {
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.warn(err, "读取文件夹错误！")
    } else {
      //遍历读取到的文件列表
      files.forEach(function (filename) {
        //获取当前文件的绝对路径
        var fileDir = path.join(filePath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(fileDir, function (error, stats) {
          if (error) {
            console.warn('获取文件stats失败');
          } else {
            var isFile = stats.isFile(); //是文件
            var isDir = stats.isDirectory(); //是文件夹
            if (isFile) {
              /**
               * full path
               */
              console.log(fileDir);
              /**
               * file name
               */
              const fileName = fileDir.toString().split("\\")[fileName.length - 1]
              /**
               * file name without file-type
               */
              const name = fileName.split(".")[0]
              console.log(name);
            }
            if (isDir) {
              fileDisplay(fileDir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          }
        })
      });
    }
  });
}
