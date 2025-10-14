/* internal import */

const dynamicImportModel = require("../utils/dynamicImportModel");
const replaceRef = require("../utils/replaceRef");

const NodeCache = require('node-cache');
const cron = require('node-cron');

const cache = new NodeCache({ stdTTL: 3600 }); // TTL = 60 دقیقه

async function fetchAndCacheData() {
    let langs = ["fa", "en", "tr"];
    for (let i = 0; i < langs.length; i++) {
        const lang = langs[i];
        let reqEdite = { headers: { lang: lang } };
        const result = {
            service: { fields: "title,slug,serviceId,icon" },
            news: { fields: "title,slug,_id,newsId,thumbnail,summary,categories,publishDate", page: "last" },
            // blog: { fields: "title,slug,_id,blogId,thumbnail,description,reviews,creator,publishDate", page: "last" },
            property: { fields: "title,variants,citizenshipStatus,building,address,currency,type,slug,_id,propertyId,thumbnail,tradeType,summary,saleType,createDate", page: "last" },
            opportunity: { fields: "title,slug,_id,city,opportunityId,citizenshipOutcome,endDate,startDate,thumbnail,summary,skills,refId", page: "last" },
            rent: { fields: "title,status,reviews,gallery,price,members,location,address,slug,_id,rentId,thumbnail,summary", page: "last" },
            visa: { fields: "title,processingTime,validity,difficultyLevel,country,type,slug_en,_id,visaId,thumbnail,summary", page: "last" },
            banner: { fields: "link,image,_id", page: "last" }
        }
        for (const [table, setting] of Object.entries(result)) {
            const Model = dynamicImportModel(table);
            const data = await Model.find().lean();
            reqEdite.query = setting
            const replaceRefData = await replaceDataDynamic(data, reqEdite)
            result[table] = replaceRefData
        }
        cache.set('dataPage' + lang, result);
    };
}

// اجرای اولیه
fetchAndCacheData();

// کرون‌جاب برای آپدیت هر ۶۰ دقیقه
cron.schedule('0 * * * *', fetchAndCacheData);
// هندلر برای استفاده از کش


async function replaceDataDynamic(data, req) {
    const replaceRefClass = new replaceRef(data, req);
    const replaceRefData = await replaceRefClass.getRefFields()
    return replaceRefData;
}

exports.home = async (req, res) => {
    const cached = cache.get('dataPage' + req.headers.lang);
    res.status(200).json({
        acknowledgement: true,
        message: "Ok",
        description: "Post updated successfully",
        data: cached
    });
};