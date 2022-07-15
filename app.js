const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
const dbUrl =
  'mongodb+srv://mahadahmad:test112233@node-blog-app.llqzl.mongodb.net/Node-Blog-app?retryWrites=true&w=majority';
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => app.listen(3000), console.log('connected to database'))
  .catch((err) => console.log(err));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
// app.set('views', './frontEndFiles');

// app.use((req, res, next) => {
//   console.log('path: ', req.path);
//   console.log('method: ', req.method);
//   console.log('host: ', req.hostname);
//   next();
// });

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.use('/blogs', blogRoutes);

app.use((req, res) => {
  res.status(404).res.render('404', { title: '404' });
});
