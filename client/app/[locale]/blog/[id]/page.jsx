import Api from '@/utils/api';
import { notFound, permanentRedirect } from 'next/navigation';
export default async function RedirectBlog({ params }) {
    const { id, locale } = params;
    const host = process.env.NEXT_PUBLIC_BASE_URL;
    const hostLang = host + (locale == "fa" ? "" : "/" + locale);
    const blog = await Api('/dynamic/get-one/blog/blogId/' + id);
    if (!blog) {
        return notFound()
    }
    const url = hostLang + "/blog/" + id + "/" + encodeURIComponent(blog.translations.en.slug.trim())
    return permanentRedirect(url)
}