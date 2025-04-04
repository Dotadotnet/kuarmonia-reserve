import Link from "next/link";


export default function Setting() {
  const settings = [
    { name: "تنظیمات عمومی", path: "./general" },
    { name: "اسلایدها", path: "./setting/slides" },
    { name: "درباره ما", path: "./about-us" },
    { name: "تماس با ما", path: "./contact" },
    { name: "شبکه‌های اجتماعی", path: "./social-media" },
    { name: "سوالات متداول", path: "./setting/faqs" }
  ];

  return (
    <Panel>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {settings.map((setting) => (
            <Link key={setting.path} href={setting.path}>
              <button className="w-full custom-button  text-white py-4 px-6 rounded shadow transition duration-200">
                {setting.name}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </Panel>
  );
}
