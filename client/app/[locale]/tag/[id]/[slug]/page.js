// import NotFound from "@/app/404";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import Main from "@/layouts/Main";
// import { Link } from "@/i18n/navigation";
// import Pagination from "@/components/shared/pagination/PaginationUrl";
// import { notFound } from "next/navigation";
import Api from "@/utils/api";
import { getTranslations } from "next-intl/server";
import { FaTags } from "react-icons/fa";



export default async function Page({ params }) {
    const { id, slug } = params;
    const tag = await Api("/dynamic/get-one/tag/tagId/" + id)
    const transitionSeo = await getTranslations("Seo")
    return (
        <>
            <Main>
                <div className="pt-28 min-h-[100vh] px-5 sm:px-20 sm:pt-34">
                    <b className="flex">

                      <p className="flex items-center text-2xl sm:text-3xl"><FaTags className="text-3xl sm:text-4xl" /> <span className="mr-2"> {transitionSeo("TagName") + " :   "} </span> <h1 className="inline mr-2"> { tag.title } </h1></p>  
                    </b>
                    sdafasdfasdfsda
                    <br />
                    asdfafads
                </div>
                <br />
                <br />

            </Main>
        </>
    );
}    