import { toast } from "react-hot-toast";

class UploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return new Promise((resolve, reject) => {
      const file = this.loader.file;

      // بررسی اینکه فایل انتخاب‌شده یک تصویر است
      if (!file.type.startsWith('image/')) {
        toast.error('لطفاً یک فایل تصویر انتخاب کنید.');
        return reject('File is not an image');
      }

      const reader = new FileReader();

      reader.onload = () => {
        toast.success('تصویر با موفقیت آپلود شد!');
        resolve({
          default: reader.result, // برگرداندن URL base64
        });
      };

      reader.onerror = () => {
        toast.error('خطا در بارگذاری تصویر.');
        reject('An error occurred while reading the file.');
      };

      // خواندن فایل به صورت base64
      reader.readAsDataURL(file);
    });
  }

  abort() {
    // امکان لغو بارگذاری در صورت نیاز
  }
}

export function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new UploadAdapter(loader);
  };
}
