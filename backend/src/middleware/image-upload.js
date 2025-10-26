import express from "express";
import multer from "multer";

const app = express();

const storage = multer.memoryStorage();

export const imageUpload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|webp)$/i)) {
      return cb(
        new Error("Por favor, envie apenas arquivos: JPG, PNG ou WEBP")
      );
    }
    cb(null, true);
  },
});
