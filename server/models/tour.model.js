const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },              
  summary: { type: String, required: true },            
  slug: { type: String, unique: true },                  // best-of-turkey
  description: { type: String },                         // توضیحات کامل تور
  introduction: { type: String },                        // متن معرفی کوتاه
  startLocation: { type: String },                     
  endLocation: { type: String },                         // Istanbul
  durationDays: { type: Number },                        // 9
  destinations: [{ type: String }],                      // لیست مکان‌هایی که بازدید می‌شوند
  itinerary: [{
    day: Number,
    title: String,                                       // مثلاً Day 1: Istanbul
    description: String                                  // توضیح فعالیت‌های روز
  }],
  highlights: [{ type: String }],                        // Places You'll See یا Highlights
  pricePerNight: { type: Number },                       // 119
  discountPercent: { type: Number },                     // 10
  totalPrice: { type: Number },                          // 1246
  originalPrice: { type: Number },                       // 1071
  availableFrom: { type: Date },                         // Check-in
  availableTo: { type: Date },                           // Check-out
  operator: {
    name: String,                                        // Travel Walk
    rating: Number                                       // 4.5
  },
  ratings: {
    overall: Number,                                     // 4.7
    guide: Number,                                       // 4.9
    transport: Number,                                   // 4.9
    accommodation: Number,                               // 4.5
    food: Number                                         // 4.5
  },
  reviews: [{
    author: String,
    rating: Number,
    comment: String,
    createdAt: { type: Date, default: Date.now }
  }],
  contact: {
    phone: String                                        // +90 362 555 1919
  },
  media: [{
    url: String,
    alt: String
  }],
  featured: { type: Boolean, default: false },           // برای نمایش در صفحه اصلی
  isActive: { type: Boolean, default: true },            // فعال/غیرفعال بودن تور
  createdAt: { type: Date, default: Date.now }
});
