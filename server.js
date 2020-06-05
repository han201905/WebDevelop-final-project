var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var peopleData = require('./peopleData');
console.log("== peopleData:", peopleData);

var app = express();

var port = 8000;

app.engine('handlebars', exphbs({ defaultLayout: null }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/people', function (req, res, next) {
  res.status(200).sendFile(__dirname + '/public/people.html');
});

var availablePeople = [
  'luke',
  'leia',
  'rey',
  'finn',
  'r2d2'
];

app.get('/people/:person', function (req, res, next) {
  var person = req.params.person.toLowerCase();
  if (availablePeople.indexOf(person) >= 0) {
    // res.status(200).sendFile(
    //   __dirname + '/public/people/' + person + '.html'
    // );
    // res.render('photoPage', {
    //   name: "Rey",
    //   photos: [
    //     {
    //       url: "https://placekitten.com/480/480",
    //       caption: "Rey as a kitten"
    //     },
    //     {
    //       url: "https://placekitten.com/480/480",
    //       caption: "Rey as a kitten"
    //     }
    //   ]
    // });
    res.status(200).render('photoPage', peopleData[person]);
  } else {
    next();
  }
});

app.get("*", function (req, res, next) {
  res.status(404).sendFile(__dirname + '/public/404.html');
});

app.listen(port, function (err) {
  if (err) {
    throw err;
  }
  console.log("== Server listening on port", port);
});
