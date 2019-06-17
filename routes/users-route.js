const express = require('express'),
  bcrypt = require('bcryptjs'),
  router = express.Router(),
  User = require('../models/user_model');


/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('template', {
    locals: {
      title: 'User Page',
      is_logged_in: req.session.is_logged_in
    },
    partials: {
      partial: 'partial-index'
    }
  });
});

router.get('/login', (req, res, next) => {
  res.render('template', {
    locals: {
      title: 'Login Page',
      is_logged_in: req.session.is_logged_in
    },
    partials: {
      partial: 'partial-login-form'
    }
  });
});

router.get('/signup', (req, res, next) => {
  res.render('template', {
    locals: {
      title: 'Sign Up Page',
      is_logged_in: req.session.is_logged_in
    },
    partials: {
      partial: 'partial-signup-form'
    }
  });
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  const userInstance = new User(null, null, null, email, password);
  console.log(userInstance);
  userInstance.login().then(response => {
    req.session.is_logged_in = response.isValid;

    if (!!response.isValid) {
      req.session.first_name = response.first_name;
      req.session.last_name = response.last_name;
      req.session.user_id = response.user_id;
      res.redirect('/');
    } else {
      res.sendStatus(401);
    }
  });
});

router.post('/signup', (req, res, next) => {
  console.log("this is a post");
  const { first_name, last_name, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const userInstance = new User(null, first_name, last_name, email, hash);
  console.log('instance', userInstance);
  userInstance.save().then(response => {
    console.log("response is", response);
    res.sendStatus(200);
  }).catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
})

module.exports = router;
