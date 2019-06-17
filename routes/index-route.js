const express = require('express'),
  router = express.Router();
  Surveys = require('../models/survey_model');

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('template', {
    locals: { 
    title: 'Home Page',
    is_logged_in: req.session.is_logged_in,
    userName: req.session.first_name,
  },
  partials: {
      partial: 'partial-index'
    }
  });
});

// get recorded survey to vote on.
router.get('/vote', async (req, res, next) => {
  const surveyid = req.params.id;
  const sessionSurvey = await Surveys.getOne(surveyid);
  console.log(sessionSurvey)
  res.render('template', { 
      locals: {
          title: "Your Custom survey",
          is_logged_in: req.session.is_logged_in,
          userName: req.session.first_name,
          surveyDetails: sessionSurvey
      },
      partials: {
          partial: 'partial-vote',
      }
  });
});

module.exports = router;
