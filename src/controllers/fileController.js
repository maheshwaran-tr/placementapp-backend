import fileService from "../services/fileService.js";

const COMPANY_LOGO_FOLDER = "company-logo";

const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { buffer, originalname, mimetype } = req.file;
    const fileName = `${COMPANY_LOGO_FOLDER}/${originalname}`;

    const fileData = await fileService.uploadFile(buffer, fileName, mimetype);
    const fileUrl = fileService.getFileUrl(fileName);

    res.status(200).json({
      message: "File uploaded successfully!",
      url: fileUrl,
    });
  } catch (error) {
    const err = new Error(`Error uploading file - ${error.message}`);
    next(err);
  }
};

const getFileUrl = async (req, res) => {
  try {
    // const fileName = `${COMPANY_LOGO_FOLDER}/${req.params.fileName}`;
    const fileName = req.params.fileName;
    console.log(fileName);
    const fileUrl = fileService.getFileUrl(fileName);
    console.log(fileUrl);
    res.status(200).json({ url: fileUrl });
  } catch (error) {
    const err = new Error(`Error uploading file - ${error.message}`);
    next(err);
  }
};

const deleteFile = async (req, res) => {
  try {
    // const fileName = `${COMPANY_LOGO_FOLDER}/${req.params.fileName}`;
    const fileName = req.params.fileName;
    await fileService.deleteFile(fileName);
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    const err = new Error(`Error uploading file - ${error.message}`);
    next(err);
  }
};

export default {
  uploadFile,
  getFileUrl,
  deleteFile,
};
