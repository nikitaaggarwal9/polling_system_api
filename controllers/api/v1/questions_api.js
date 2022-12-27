const Question = require('../../../models/question');
const Option = require('../../../models/option');

module.exports.create = async function(req, res) {
    try {
        let question = await Question.create({
            content: req.body.content,
        });
        
        if(question) {
            return res.json(200, {
                message: "Question created Succesfully",
                question: question
            })
        }
        
        return res.json(401, {
            message: "Couldn't create Question, try again!"
        })
    } catch (error) {
        console.log('Error', error);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}


module.exports.delete = async function(req, res) {
    try {
        let question = await Question.findById(req.params.id);
        
        if(question) {
            let options = await Option.find({question: req.params.id, votes: 0});
            if(options.length == question.options.length) {
                question.remove();
                await Option.deleteMany({question: req.params.id});

                return res.json(200, {
                    message: "Question deleted successfully!"
                });
            } else {
                return res.json(401, {
                    message: "Can't delete this question; options has votes!"
                });
            }
        }

        return res.json(401, {
            message: "Can't delete this question!"
        });
    } catch (error) {
        console.log('Error', error);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}


module.exports.view = async function(req, res) {
    try {
        let question = await Question.findById(req.params.id);
        
        if(question) {
            return res.json(200, {
                message: "Question viewed successfully!",
                question: question
            });
        }
            
        return res.json(401, {
            message: "Question not available!"
        });
    } catch (error) {
        console.log('Error', error);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}