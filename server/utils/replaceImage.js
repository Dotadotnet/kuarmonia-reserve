const fs = require("fs").promises;
const path = require("path");

/**
 * Replace an old image with a new one
 * @param {string} oldImagePath - Path to the old image file
 * @param {string} newImagePath - Path to the new image file
 * @returns {Promise<boolean>} - Resolves to true if replacement is successful
 */
async function replaceImage(oldImagePath, newImagePath) {
  try {
    // Check if old image exists
    if (oldImagePath) {
      try {
        await fs.access(oldImagePath);
        // Remove the old image
        await fs.unlink(oldImagePath);
        console.log(`Old image removed: ${oldImagePath}`);
      } catch (err) {
        // Old image doesn't exist or can't be accessed, which is fine
        console.log(`Old image not found or inaccessible: ${oldImagePath}`);
      }
    }

    // If we have a new image path, ensure its directory exists
    if (newImagePath) {
      const newImageDir = path.dirname(newImagePath);
      try {
        await fs.access(newImageDir);
      } catch (err) {
        // Directory doesn't exist, create it
        await fs.mkdir(newImageDir, { recursive: true });
        console.log(`Directory created: ${newImageDir}`);
      }
    }

    return true;
  } catch (error) {
    console.error("Error in replaceImage:", error);
    throw error;
  }
}

module.exports = replaceImage;