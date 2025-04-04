export default async function sendSms(phone, message) {
  try {
    const response = await fetch("https://rest.payamak-panel.com/api/SendSMS/SendSMS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: process.env.MELLI_PAYAMAK_USERNAME,
        password: process.env.MELLI_PAYAMAK_PASSWORD,
        to: phone,
        from: process.env.MELLI_PAYAMAK_SENDER,
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
}
