import multer, { diskStorage } from 'multer'
import path from 'path';
import fs from 'fs';

const folderPath = path.join('public');
if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });

const upload = multer({storage: multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, folderPath)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, `image_${uniqueSuffix}${ext}`)
    }
})})

export default upload;