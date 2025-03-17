require("dotenv").config();
const fetch = require("node-fetch");

const SMS_API_KEY = process.env.MELLI_PAYAMAK_API_KEY;
const SMS_SENDER_NUMBER = process.env.MELLI_PAYAMAK_SENDER;
const SMS_USERNAME = process.env.MELLI_PAYAMAK_USERNAME;
const SMS_PASSWORD = process.env.MELLI_PAYAMAK_PASSWORD;

exports.sendSms = async (phone, message) => {
  try {
    const response = await fetch("https://rest.payamak-panel.com/api/SendSMS/SendSMS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: SMS_USERNAME,
        password: SMS_PASSWORD,
        to: phone,
        from: SMS_SENDER_NUMBER,
        text: message,
        isflash: false,
      }),
    });

    const data = await response.json();

    if (data.RetStatus === 1) {
      console.log("✅ پیامک با موفقیت ارسال شد.");
      return true;
    } else {
      console.error("❌ خطا در ارسال پیامک:", data);
      return false;
    }
  } catch (error) {
    console.error("🚨 مشکل در ارسال درخواست به ملی پیامک:", error.message);
    return false;
  }
};
