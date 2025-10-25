import express from "express";
import multer from "multer";
import fs from "fs";

const app = express();

import path from "node:path";
import { fileURLToPath } from "node:url";

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

const imageStore = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "";

    if (req.baseUrl.includes("products")) {
      folder = "products";
    }

    const uploadPath = path.join(__dirName, `../../uploads/${folder}`);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

export const imageUpload = multer({
  storage: imageStore,
  limits: { fileSize: "500000" },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png||jpg||webp)$/)) {
      return cb(
        new Error("Por favor, envie apenas arquivos: JPG, PNG ou WEBP")
      );
    }
    cb(null, true);
  },
});
