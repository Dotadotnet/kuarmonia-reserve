import fs from "fs";
import path from "path";
import { BsBadgeSdFill } from "react-icons/bs";
import { RiArrowDownSFill } from "react-icons/ri";

// حذف فایل از مسیر ذخیره‌سازی
async function removeFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error removing file: ${filePath}`, err);
        return reject(err);
      }
      console.log(`File removed: ${filePath}`);
      resolve(true);
    });
  });
}

export default removeFile;



