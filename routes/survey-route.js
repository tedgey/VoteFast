const express = require('express'),
    router = express.Router(),
    Surveys = require('../models/survey_model');


router.post('/survey', (req, res, next) => {
    console.log("posting the survey");
    const { question, first_answer, second_answer, third_answer, fourth_answer } = req.body;

    const userSurvey = new Surveys(null, question, first_answer, second_answer, third_answer, fourth_answer);
    console.log('instance', userSurvey);
    userSurvey.saveSurvey().then(response => {
    console.log("post survey-route response is", response);
    res.sendStatus(200);
    }).catch(err => console.log(err))
})

// GET recorded survey.
router.get('/survey/', async (req, res, next) => {
    const surveyid = req.params.id;
    const sessionSurvey = await Surveys.getOne(surveyid);
    res.render('template', { 
        locals: {
            title: "Your Custom survey",
            is_logged_in: req.session.is_logged_in,
            userName: req.session.first_name,
            surveyDetails: sessionSurvey
        },
        partials: {
            partial: 'partial-survey-enter',
        }
    });
});



module.exports = router;
