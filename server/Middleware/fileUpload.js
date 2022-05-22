//For image uplaod we use multer
const multer = require("multer")
const { v4 } = require("uuid");

//allowed image extension 
const MIME_TYPE_MAP = {
    'image/png': "png",
    'image/jpeg': "jpeg",
    'image/jpg': 'jpg'
}

//function to save image on backend
const fileUpload = multer({
    limits: 500000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/images');
        },
        filename: (req, file, cb) => {
            const ext = MIME_TYPE_MAP[file.mimetype]
            cb(null, v4() + "." + ext)
        }
    }),
    fileFilter: (req, file, cb) => {
        const isValid = !!MIME_TYPE_MAP[file.mimetype]
        let error = isValid ? null : new Error('Invalid File Type!')
        cb(error, isValid)
    }
})

module.exports = fileUpload