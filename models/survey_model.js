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

    static async getOne(id) {
        try {
            const response = await db.any(`select * from surveys where id=${id};`);
            console.log(response);
            return response;
        } 
        catch(err) {
            return err.message;
        }
    }

    async saveSurvey() {
        try {
            const response = await db.one(`
                insert into surveys
                    (question, first_answer, second_answer, third_answer, fourth_answer)
                values
                    ($1, $2, $3, $4, $5)
                returning id
                `, [this.question, this.first_answer, this.second_answer, this.third_answer, this.fourth_answer]);
            console.log("survey was created with id:", response.id);
            return response;
        } catch(err) {
            return err.message;
        }
    }

}

module.exports = Surveys;