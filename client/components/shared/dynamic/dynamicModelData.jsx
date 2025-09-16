import { getLocale, getTranslations } from "next-intl/server";
import { modelsInfo } from "./modelInfo";


async function DynamicModelData(data) {
    const locale = await getLocale();
    const host = process.env.NEXT_PUBLIC_BASE_URL;
    const hostLang = host + (locale == "fa" ? "" : "/" + locale);
    const modelTranslate = await getTranslations("Model")
    const models = Object.keys(modelsInfo)
    const urlModels = { visa: "visas" }
    const items = data.map((item) => {
        let modelTarget = null;
        let idField = null;
        let icon = null;
        let schema = null;
        models.forEach(model => {
            if (item[model + "Id"]) {
                modelTarget = model;
                schema = modelsInfo[model].schema;
                icon = modelsInfo[model].icon;
                idField = model + "Id";
            }
        });

        const data = {
            link: hostLang + "/" + (urlModels[modelTarget] ? urlModels[modelTarget] : modelTarget) + "/" + item[idField] + "/" + item.slug,
            title: item.title,
            image: item.thumbnail ? item.thumbnail.url : item.gallery ? item.gallery[0].url : (host + "/banners/1.jpg"),
            icon: icon,
            nameModel: modelTranslate(modelTarget),
            schema: schema
        }

        return (
            data
        )
    })

    return items;
}

export default DynamicModelData;