const AWS = require('aws-sdk');

const s3 = new AWS.S3();

exports.updateImagesMetadata = async (event, context) => {
  try {
    const bucketName = event.Records[0].s3.bucket.name;
    const objectKey = event.Records[0].s3.object.key;

    let images = [];
    try {
      const data = await s3.getObject({ Bucket: bucketName, Key: 'images.json' }).promise();
      images = JSON.parse(data.Body.toString());
    } catch (error) {}

    const imageMetadata = {
      name: objectKey,
      size: 0, 
      type: 'image/jpeg', 
    };

    const existingIndex = images.findIndex((image) => image.name === imageMetadata.name);

    if (existingIndex !== -1) {
      images[existingIndex] = imageMetadata;
    } else {
      images.push(imageMetadata);
    }

    const updatedImagesJson = JSON.stringify(images);

    await s3.putObject({ Bucket: bucketName, Key: 'images.json', Body: updatedImagesJson }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Images metadata updated successfully.' }),
    };
  } catch (error) {
    console.error('Error updating images metadata:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
