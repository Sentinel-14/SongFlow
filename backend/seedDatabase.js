const mongoose = require('mongoose');
const Snippet = require('./models/Snippet');
const sampleData = require('./data/sampleData');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/song-snippetly';

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Snippet.deleteMany({});
    console.log('🗑️ Cleared existing snippets');

    // Insert sample data
    const insertedSnippets = await Snippet.insertMany(sampleData);
    console.log(`✅ Inserted ${insertedSnippets.length} sample snippets`);

    // Display summary
    const moodCounts = await Snippet.aggregate([
      { $unwind: '$mood' },
      { $group: { _id: '$mood', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    console.log('\n📊 Snippets by mood:');
    moodCounts.forEach(mood => {
      const emoji = {
        happy: '😊',
        sad: '😢',
        love: '❤️',
        party: '🎉',
        motivational: '💪'
      }[mood._id] || '🎵';
      console.log(`${emoji} ${mood._id}: ${mood.count} snippets`);
    });

    console.log('\n🎉 Database seeded successfully!');
    console.log('🚀 You can now start the server with: npm run dev');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the seed function
seedDatabase();