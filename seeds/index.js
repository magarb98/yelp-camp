const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose
  .connect("mongodb://localhost:27017/yelp-camp")
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("connection error:", err);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "62f04b99b2c1d74380e56237",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/qtar0/image/upload/v1659985846/YelpCamp/hsr1dzlitiqh5qdmsy2g.jpg",
          filename: "YelpCamp/hsr1dzlitiqh5qdmsy2g",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, porro laboriosam autem minima voluptas, debitis, sed hic quo sapiente expedita delectus maxime illum magni quia facere eos nihil maiores fugit!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
