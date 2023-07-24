# Lambda Function - Update Images Metadata

## Description
This AWS Lambda function is designed to be triggered when an image is uploaded to an S3 bucket. It automatically updates the `images.json` file stored in the same S3 bucket. The `images.json` file contains an array of objects, each representing an image. If an image with the same name already exists in the array, the Lambda function will update the metadata for that image; otherwise, it will add the new image metadata to the array. The function uses the AWS SDK to interact with S3 for downloading and uploading the `images.json` file.

## How to Use the Lambda Function
1. Log in to the AWS Management Console.
2. Navigate to the AWS Lambda service.
3. Click on "Create function" and choose "Author from scratch."
4. Provide a unique name for your Lambda function.
5. Select the runtime (Node.js, Python, etc.).
6. In the "Function code" section, copy and paste the code from `index.js`.
7. Set the execution role with appropriate permissions to access S3.
8. Click on "Create function" to create the Lambda function.
9. Configure an S3 trigger for the Lambda function:
   - Select the S3 bucket where you want to monitor image uploads.
   - Choose "All object create events."
   - Save the trigger.

## Issues Encountered During Deployment
During the deployment of this Lambda function, some common issues you may encounter include:
- Permission issues: Ensure that the Lambda function's execution role has the necessary permissions to interact with S3 (GetObject, PutObject) and any other required services.
- S3 bucket configuration: Make sure the S3 bucket where the images and `images.json` file are stored has the appropriate permissions set up (e.g., public read access if needed).
- Image metadata extraction: Implement the logic to extract the correct metadata from the uploaded image based on your specific use case. Incorrect metadata extraction may lead to unexpected behavior.


# -image-lambda
