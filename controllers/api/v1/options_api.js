const Question = require('../../../models/question');
const Option = require('../../../models/option');
const { options } = require('../../../routes');


module.exports.create = async function(req, res) {
    try {
        let question = await Question.findById(req.params.id);
        
        if(question) {
            let option = await Option.create({
                content: req.body.content,
                question: question.id,
                votes: 0,
            });

            option.link_to_vote = req.protocol + '://' + req.get('host') + '/options/' + option.id + '/add_vote';
            option.save();

            question.options.push(option.id);
            question.save();

            return res.json(200, {
                message: "Option created Succesfully",
                option: option
            })
        }
        
        return res.json(401, {
            message: "Couldn't create option, try again!"
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
        let option = await Option.findById(req.params.id);
        
        if(option.votes == 0) {
            let question = await Question.findById(option.question);
            option.remove();
            
            question.options = question.options.filter(o_id=>o_id!=option.id);
            question.save();

            return res.json(200, {
                message: "Option deleted successfully!"
            });
        } else {
            return res.json(401, {
                message: "Option has votes, can't delete it!"
            });
        }
    } catch (error) {
        console.log('Error', error);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}


module.exports.addVote = async function(req, res) {
    try {
        let option = await Option.findById(req.params.id);
        
        if(option) {
            option.votes += 1;
            option.save();
            
            return res.json(200, {
                message: "Vote Added!",
                option: option
            });
        }
            
        return res.json(401, {
            message: "Couldn't add vote, try again!"
        });
    } catch (error) {
        console.log('Error', error);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}