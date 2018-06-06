var fs = require("fs");
var aws = require("aws-sdk");
const script = require("../lib");

aws.config.update({ region: "ap-southeast-2" });
var s3 = new aws.S3({ apiVersion: "2006-03-01" });

const mockBucketName = "dxlablivetesting";
const mockRekognitionFaceCollection = "mockCollection";

beforeAll(async done => {
  // Create S3 bucket and upload 1 image
  var createBucketParams = {};
  createBucketParams["Bucket"] = mockBucketName;
  createBucketParams["CreateBucketConfiguration"] = {
    LocationConstraint: "ap-southeast-2"
  };
  const result = await s3.createBucket(createBucketParams).promise();

  // Upload 1 image
  const fileName = "hood_00101r.jpg";
  const filePath =
    "C:\\Users\\Vignesh\\code\\dxlab-young-ct-award\\rekognition-init\\__tests__\\images\\hood_00101r.jpg";
  const buffer = fs.readFileSync(filePath);

  var uploadImageToBucketParams = {};
  uploadImageToBucketParams["Bucket"] = mockBucketName;
  uploadImageToBucketParams["Key"] = fileName;
  uploadImageToBucketParams["Body"] = buffer;

  const uploadResult = await s3.upload(uploadImageToBucketParams).promise();
  console.log(uploadResult);

  done();
});
afterAll(async () => {
  // Get all objects in the S3 bucket
  // Iterate through each object and delete them

  var getBucketObjectsParams = {};
  getBucketObjectsParams["Bucket"] = mockBucketName;
  const result = await s3.listObjectsV2(getBucketObjectsParams).promise();

  for (var i = 0; i < result.Contents.length; i++) {
    await s3
      .deleteObject({ Bucket: mockBucketName, Key: result.Contents[i].Key })
      .promise();
  }

  // Delete S3 bucket
  var deleteBucketParams = {};
  deleteBucketParams["Bucket"] = mockBucketName;
  await s3.deleteBucket(deleteBucketParams).promise();

  // Delete mock Rekognition face collection
});
describe("s3", () => {
  it("should return list of objects", async () => {
    const result = await script.imageList(mockBucketName);
    expect(result.length).toBe(1);
    expect(result[0]).toEqual("hood_00101r.jpg");
  });
});

describe("checkRekognitionCollections", () => {
  it("should check if sam hood face collection exists", async () => {
    const result = await script.checkFaceCollectionExists(
      mockRekognitionFaceCollection
    );
    expect(result).toEqual(false);
  });
});

describe("createRekognitionCollection", () => {
  it("should attempt creation of Rekognition face collection", async () => {
    const result = await script.createSamHoodFaceCollection();
    expect(result).toBeUndefined();
    // Add test for when collection already exists, should expect an exception e
  });
});

describe("saveImageFacesData", () => {
  it("should save indexFaces() call for each image into a JSON file in S3", async () => {
    const result = await script.indexFaces("samhood", "hood_00101r.jpg");
  });
});
