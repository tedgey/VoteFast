const db = require('./conn.js');

class Surveys {
    constructor(id, question, first_answer, second_answer, third_answer, fourth_answer) {
        this.id = id;
        this.question = question;
        this.first_answer = first_answer;
        this.second_answer = second_answer;
        this.third_answer = third_answer;
        this.fourth_answer = fourth_answer;
    }

    // this will call the most recently added survey submission
    static async getOne(id) {
        try {
            const response = await db.any(`select * from surveys where id= (
                select max(id) from surveys)
            ;`);
            console.log("double check", response);
            return response;
        } 
        catch(err) {
            return err.message;
        }
    }

    // to call one survey object
    static async getOne(id) {
        try {
            const response = await db.one(`select * from surveys where id= (
                select max(id) from surveys)
            ;`);
            console.log("triple check", response);
            return response;
        } 
        catch(err) {
            return err.message;
        }
    }

    // records the survey into postgresql
    async saveSurvey() {
        try {
            const response = await db.one(`
                insert into surveys
                    (question, first_answer, second_answer, third_answer, fourth_answer)
                values
                    ($1, $2, $3, $4, $5)
                returning id
                `, [this.question, this.first_answer, this.second_answer, this.third_answer, this.fourth_answer]);

            console.log("survey was created with id:", response.question);
            return response;
        } catch(err) {
            return err.message;
        }
    }

}

module.exports = Surveys;
