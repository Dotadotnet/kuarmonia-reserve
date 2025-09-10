import { BiErrorCircle } from 'react-icons/bi';
import Link from 'next/link';
import { useTranslations } from "next-intl";

const NotFound = () => {
    const t = useTranslations("notFound");

    return (
        <section className="flex flex-col items-center justify-center gap-y-4 fixed top-0 left-0 w-screen h-screen bg-secondary dark:bg-gray-900">
            <h1 className="md:text-4xl text-2xl font-semibold text-gray-800 dark:text-white text-center">
                <BiErrorCircle className="text-6xl" />
            </h1>
            <div className="flex flex-col items-center gap-y-2">
                <h1 className="md:text-4xl text-2xl font-semibold text-gray-800 dark:text-white text-center">
                    {t("title")}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                    {t("message")}
                </p>
            </div>
            <Link
                href="/"
                className="px-4 py-2 shadow hover:bg-primary hover:text-white rounded-full dark:hover:bg-primary dark:hover:text-white"
            >
                {t("button")}
            </Link>
        </section>
    );
};

export default NotFound;
