const path = require("path");
const stream = require("stream");
const { google } = require("googleapis");

const KEYFILEPATH = path.join(__dirname, "/apikeys.json");
const scopes = ["https://www.googleapis.com/auth/drive"];

exports.ROOT_FOLDER = {
  bmc: "1MZdEInxIq7Qz31srlAfqw_wy-3djW7i0",
  futureceo: "1apJr1hZ4tF4K1mrmFtx-kGyiCkNHOCk0",
  chamber: "",
  companyvisit: "",
  summit: "",
};

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: scopes,
});

const uploadImage = async (fileObject, folderId) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);

  const { data } = await google
    .drive({
      version: "v3",
      auth: auth,
    })
    .files.create({
      media: {
        mimeType: fileObject.mimeType,
        body: bufferStream,
      },
      requestBody: {
        name: fileObject.originalname,
        parents: [folderId],
      },
      fields: "id,name",
    });

  return data.id;
};
const generatePublicLink = async (imgFileId) => {
  try {
    const drive = google.drive({ version: "v3", auth });
    await drive.permissions.create({
      fileId: imgFileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const link = await drive.files.get({
      fileId: imgFileId,
      fields: "webViewLink",
    });

    return link.data.webViewLink;
  } catch (error) {
    throw error;
  }
};

exports.createFolder = async (name, rootFolderId) => {
  const service = google.drive({ version: "v3", auth });
  const fileMetadata = {
    name: name,
    mimeType: "application/vnd.google-apps.folder",
    parents: [rootFolderId],
  };
  try {
    const file = await service.files.create({
      requestBody: fileMetadata,
      fields: "id",
    });
    return file.data.id;
  } catch (err) {
    throw err;
  }
};

exports.getImageURLsList = async (files, folderId) => {
  const publicURL = [];

  for (let f = 0; f < files.length; f++) {
    const imgFileId = await uploadImage(files[f], folderId);
    publicURL.push(await generatePublicLink(imgFileId));
  }

  return publicURL;
};
