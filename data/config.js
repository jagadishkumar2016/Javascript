var path = require('path');
var appDir = path.dirname(require.main.filename);
appDir = appDir.substring(0,appDir.length - 4);

var config = {
    "rootFolderPath":appDir,
    "dataFolderPath":appDir+"/data",
    "imageFolderPath":"./public/images",
    "menuItemImagesPath":"./images/menuitems"
}

module.exports = config;