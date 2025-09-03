export default function analizeComments(objectModel) {
    let reviews = []
    let reviewCount = 0;
    let reviewPoint = 0;
    
    if (!Array.isArray(objectModel.reviews)) {
        if (typeof objectModel.reviews == "object") {
            reviews = [objectModel.reviews]
        } else {
            reviews = []
        }
    } else {
        reviews = objectModel.reviews
    }

    reviews.forEach(review => {
        reviewCount++;
        reviewPoint += review.rating
    });
       console.log({ reviews, reviewCount, reviewPoint });
       
    return { reviews, reviewCount, reviewPoint }
}