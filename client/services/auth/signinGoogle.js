export async function signinGoogle({ email, name, image ,googleId}) {
  try {


    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user/signin-google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name, image,googleId }),
      credentials: "include",
    });

    const data = await response.json();

    if (data.success) {
      return { success: true, accessToken: data.accessToken };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error('خطا در ورود با گوگل:', error);
    return { success: false, message: error.message };
  }
}
