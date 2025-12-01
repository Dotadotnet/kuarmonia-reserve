require('dotenv').config();
const mongoose = require('mongoose');

// Connect to database
mongoose.connect(process.env.DATABASE_URL).then(async () => {
  console.log('Connected to database');
  
  // Import the Tag model
  const Tag = require('./models/tag.model');
  
  // Find all tags and display their tagId and title
  const tags = await Tag.find({}, 'tagId title thumbnail');
  console.log('Tags in database:');
  tags.forEach(tag => {
    console.log(`tagId: ${tag.tagId}, title: ${JSON.stringify(tag.title)}, thumbnail: ${JSON.stringify(tag.thumbnail)}`);
  });
  
  mongoose.connection.close();
  console.log('Disconnected from database');
});