const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");
const path = require("path");

const TRAIN_IMAGES_DIR = "../data/train/sculpture";
const TEST_IMAGES_DIR = "../data/test/sculpture";

function loadImages(dataDir) {
  const images = [];
  const labels = [];

  var files = fs.readdirSync(dataDir);
  for (let i = 0; i < files.length; i++) {
    var filePath = path.join(dataDir, files[i]);
    var buffer = fs.readFileSync(filePath);
    var imageTensor = tf.node
      .decodeImage(buffer)
      .resizeNearestNeighbor([96, 96])
      .toFloat()
      .div(tf.scalar(255.0))
      .expandDims();
    images.push(imageTensor);

    var hasPainting = files[i].toLocaleLowerCase().startsWith('PAINTING');
    labels.push(hasPainting);
  }
  return [images,labels];
}


class PaintingDataset {
    constructor(){
        this.trainData = [];
        this.testData = [];
    }

    loadData(){
        console.log('Data is loading....');
        this.trainData = loadImages(TRAIN_IMAGES_DIR);
        this.testData = loadImages(TEST_IMAGES_DIR);
        console.log('Images loaded succesfully')
    }

    getTrainData(){
        return{
            images :  tf.concat(this.trainData[0]),
            labels : tf.oneHot(tf.tensor1d(this.trainData[1],"string"),2).toFloat()
        }

    }

    getTestData(){
        return{
            images :  tf.concat(this.testData[0]),
            labels : tf.oneHot(tf.tensor1d(this.testData[1],"string"),2).toFloat()
        }

    }

}
module.exports = new PaintingDataset();