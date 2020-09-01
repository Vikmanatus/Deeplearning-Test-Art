// Defining Tenserflow.js
const tf = require('@tensorflow/tfjs-node');

// Defining a path to the images folder
const data = require('./data');

// Defining a path to the tenserflow model
const model = require('./model');

async function run (epochs,batchSize, modelSavePath){
    data.loadData();

    const {images:trainImages,labels:trainLabels}=data.getTrainData();

    console.log('Training images (shape): '+ trainImages.shape);
    console.log('Training labels (shape): '+ trainLabels.shape);

    model.summary();

    await model.fit(trainImages,trainLabels,{
        epochs,
        batchSize,
        validationSplit
    })

    const {images: testImages, labels:testLabels} = data.getTestData();
    const evalOutput = model.evaluate(testImages,testLabels);
    console.log(
        `\nEvaluation result:\n`+
        ` Loss = ${evalOutput[0].dataSync()[0].toFixed(3)}` +
        `Accuracy = ${evalOutput[1].dataSync()[0].toFixed(3)}`
    )

    await model.save(`file://${modelSavePath}`);
    console.log(`Saved model to path: ${modelSavePath}`);


}

run(100,32,'./model')