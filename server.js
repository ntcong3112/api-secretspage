const express = require("express");
const cors = require("cors");

const app = express();

const allowedOrigins = ['localhost:5001',
                      'secretspage.com',
                      'www.secretspage.com',
                      'setup.secretspage.com',
                    '127.0.0.1:5500'];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }

}));


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, PUT, POST, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
//   res.header('Access-Control-Allow-Credentials', true);
//   next();
// });
app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

require("./app/routes/turorial.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
