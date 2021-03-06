const Jimp = require('jimp')
    , fs = require('fs')
    , path = require('path')
    , Promise = require('bluebird')
    , fileType = require('file-type');

module.exports = {
    convertImgs(files) {

        let promises = [];

        files.forEach((file) => {

            //Create a new promise for each image processing
            let promise = new Promise((resolve, reject) => {

                //Resolve image file type
                let type = fileType(file.buffer);

                //Create a jimp instance for this image
                new Jimp(file.buffer, (err, image) => {

                    //Resize this image
                    image.resize(304, 375)
                    //lower the quality by 90%
                        .quality(20)
                        .getBuffer(type.mime, (err, buffer) => {
                            //Transfer image file buffer to base64 string
                            let base64Image = buffer.toString('base64');
                            let imgSrcString = 'data:' + type.mime + ';base64,' + base64Image;
                            //Resolve base94 string
                            resolve(imgSrcString);
                        });
                })
            });

            promises.push(promise);
        });

        //Return promise array
        return Promise.all(promises);
    }
};
