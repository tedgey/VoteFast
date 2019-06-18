const express = require('express'),
    router = express.Router(),
    Surveys = require('../models/survey_model');


// create a survey after login
router.get('/', async (req, res, next) => {
    res.render('template', { 
        locals: {
            title: "Your Custom survey",
            is_logged_in: req.session.is_logged_in,
            userName: req.session.first_name
        },
        partials: {
            partial: 'partial-survey-enter',
        }
    });
});

router.post('/', (req, res, next) => {
    console.log("posting the survey");
    const { question, first_answer, second_answer, third_answer, fourth_answer } = req.body;
    console.log(req.body);
    const userSurvey = new Surveys(null, question, first_answer, second_answer, third_answer, fourth_answer);
    console.log('instance', userSurvey);

    userSurvey.saveSurvey().then(response => {
    console.log("post survey-route response is", response);
    // res.sendStatus(200);
    res.redirect('/vote'); 
    }).catch(err => console.log(err))
})



module.exports = router;
