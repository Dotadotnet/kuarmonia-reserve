/* internal import */
const homepageService = require('./api/homepage.service');

exports.home = async (req, res) => {
    try {
        const language = req.headers.lang || 'fa';
        const data = await homepageService.getHomepageData(language);
        
        res.status(200).json({
            acknowledgement: true,
            message: "Ok",
            description: "Homepage data fetched successfully",
            data: data
        });
    } catch (error) {
        console.error('Error in home controller:', error);
        res.status(500).json({
            acknowledgement: false,
            message: "Error",
            description: "خطا در دریافت اطلاعات صفحه اصلی",
            error: error.message
        });
    }
};
