import Api from '@/utils/api';
import { notFound, permanentRedirect } from 'next/navigation';
export default async function RedirectBlog({ params }) {
    const { id, locale } = params;
    const host = process.env.NEXT_PUBLIC_BASE_URL;
    const hostLang = host + (locale == "fa" ? "" : "/" + locale);
    const blog = await Api('/dynamic/get-one/blog/blogId/' + id + "?fields=slug");
    if (!blog) {
        return notFound()
    }
    const url = hostLang + "/blog/" + id + "/" + blog.slug
    return permanentRedirect(url)
}