import multer from 'multer';

const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, '');
  },
});

export const uploadImage = multer({ storage: storage });
