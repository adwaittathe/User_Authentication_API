const router = require('express').Router();
const userModel = require('../model/User');
const teamModel = require('../model/team');
const jwt = require('jsonwebtoken');
const verifyToken = require('../verifyToken');



router.get('/getJudgeProfile' , verifyToken   ,async function (req, res) {
    const user = await userModel.findOne({_id : req.user._id});
    if(!user) return res.status(400).send({
        status : res.statusCode,
        message : 'Error while finding user in database'
    });
    // team = [
    //     {
    //     "id":"1",
    //     "name" : "TechGeeks",
    //     "score" : {}
    //     },
    //     {
    //     "id":"2",    
    //     "name" : "3idiots",
    //     "score" : {}
    //     },
    //     {
    //     "id":"3",
    //     "name" : "JustDoIt",
    //     "score" : {}
    //     },
    //     {
    //     "id":"4",
    //     "name" : "Dragons",
    //     "score" : {}
    //     }
    // ]
    // for(let i=0;i<team.length;i++){
    //     const teamObj =  new teamModel({
    //         teamId : team[i].id,
    //         name : team[i].name,
    //         score : {},
    //         finalScore : "0"
    //     });
    //     //console.log(teamObj);
    //     await teamObj.save();
    // }
    res.send({
        status : res.statusCode,
        userId : user._id,
        firstName : user.firstName, 
        lastName : user.lastName,
        email : user.email,
        gender : user.gender,
        contactNo : user.contactNo,
        age : user.age,
        createdAt : user.createdAt
    });
})


router.post('/getTeamById' , verifyToken   ,async function (req, res) {
    const user = await userModel.findOne({_id : req.user._id});
    if(!user) return res.status(400).send({
        status : res.statusCode,
        message : 'Error while finding user in database'
    });
    const team = await teamModel.findOne({teamId : req.body.teamId});
    if(!team) return res.status(400).send({
        status : res.statusCode,
        message : 'Error while finding team in database'
    });
    res.send({
        status : res.statusCode,
        teamId : team.id,
        name : team.name, 
        score : team.score
    });  
})


router.post('/sendScoreForTeam' , verifyToken, async function (req, res) {
    const user = await userModel.findOne({_id : req.user._id});
    if(!user) return res.status(400).send({
        status : res.statusCode,
        message : 'Error while finding user in database'
    });
    const team = await teamModel.findOne({teamId : req.body.teamId});
    if(!team) return res.status(400).send({
        status : res.statusCode,
        message : 'Error while finding team in database'
    });    
    dictData = {}
    if(team.score){
        dictData = team.score      
    }
    dictData[user.id]= req.body.score
    let sum = 0;
    for (var key in dictData) {
        var value = dictData[key];
        sum+= parseInt(value);
    }
    var size = Object.keys(dictData).length;
    sum = sum/size;
    await teamModel.findByIdAndUpdate({_id : team._id},{
    $set:{
        score : dictData,
        finalScore : sum
    }})
    res.status(200).send({
        status: res.statusCode,
        message : "Team Score updated successfully"
    }); 
})


router.get('/getTeamScore' , verifyToken, async function (req, res) {
    const user = await userModel.findOne({_id : req.user._id});
    if(!user) return res.status(400).send({
        status : res.statusCode,
        message : 'Error while finding user in database'
    });
    let team = await teamModel.find();
    if(!team) return res.status(400).send({
        status : res.statusCode,
        message : 'Error while finding team in database'
    });
    team = team.sort((a, b) => (parseInt(a.finalScore) > parseInt(b.finalScore)) ? -1 : 1)
    res.send({
        status : res.statusCode,
        team : team
    });  
})

module.exports = router;