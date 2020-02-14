const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data'); // Import of the data from './data.json'

const MONGODB_URI = 'mongodb://localhost/recipeApp';

// Connection to the database "recipeApp"

mongoose
	.connect(MONGODB_URI, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(self => {
		console.log(`Connected to the database: "${self.connections[0].name}"`);
		// Run your code here, after you have insured that the connection was made
		console.log('Connection has been established');
		return self.connection.dropDatabase();
	})
	.then(() => {
		return Recipe.create({
			title: 'Chocolate Chip Cookies',
			level: 'Amateur Chef',
			ingredients: [
				'1/2 cup light brown sugar',
				'1 large egg',
				'2 tablespoons milk',
				'1 1/4 teaspoons vanilla extract',
				'2 cups semisweet chocolate chips'
			],
			cuisine: 'French',
			dishType: 'Dish',
			image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
			duration: 30,
			creator: 'Chef Jennifer'
		});
	})
	.then(Recipe => {
		console.log(Recipe.title);
	})
	.then(() => {
		return Recipe.insertMany(data);
	})
	.then(() => {
		return Recipe.findOneAndUpdate(
			{ title: 'Rigatoni alla Genovese' },
			{ $set: { duration: '100' } }
		);
	})
	.then(() => {
		return Recipe.deleteOne({ title: 'Carrot Cake' });
	})
	.then(() => {
		return mongoose.disconnect();
	})
	.catch(error => {
		console.error('Error connecting to the database', error);
	});
