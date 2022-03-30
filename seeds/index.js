const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');
const dbUrl = 'mongodb://localhost:27017/yelp-camp';

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 20; i++) {
        const rand1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '623b8e07483608afedda0d34', 
            //author: '62422014ad295031f78ed59f',
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            //image:'https://source.unsplash.com/collection/483251',
            description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas a ullam odit animi quos recusandae nobis earum consequatur deserunt vero corporis fugit veritatis perferendis eos, tenetur magnam et, necessitatibus velit? Quo totam, vitae velit eos exercitationem sapiente harum corrupti, animi officiis quaerat nesciunt ducimus quod aliquid cupiditate asperiores minima. Tenetur aliquam hic est veritatis nemo asperiores quo vero eos in?",
            price, 
            geometry: { type: 'Point', coordinates: [ cities[rand1000].longitude, cities[rand1000].latitude ] },
            images:[
                {
                  url: 'https://res.cloudinary.com/dakrexvhj/image/upload/v1648158074/YelpCamp/svzvigbqehm6dmn8wp1g.jpg',
                  filename: 'YelpCamp/svzvigbqehm6dmn8wp1g'
                },
                {
                  url: 'https://res.cloudinary.com/dakrexvhj/image/upload/v1648158076/YelpCamp/gl6kxu8ykieuoiit7xx1.jpg',
                  filename: 'YelpCamp/gl6kxu8ykieuoiit7xx1'
                }
              ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})