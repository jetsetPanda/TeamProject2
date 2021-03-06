var moment = require('moment');
var db = require("../models");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;



module.exports = function (app) {
    app.get("/", function (req, res) {
        
        db.Session.findAll({
            include: [
                {
                    model: db.Client, 
                }
               
            ]
        }).then(function (response) {
            const retVal = response.map(r => {
                return {
                    title: r.Client.first_name +" " + r.Client.last_name,
                    start: r.schedule_date,
                    end: new Date(new Date(r.schedule_date).setHours(new Date(r.schedule_date).getHours() + 1))
                }
            })
            // res.json(retVal)
            res.render("index", {schedule: retVal});
        });
    });

    app.get("/clients/all", function(req, res) {
        db.Client.findAll({}).then(function(data) {
            res.render("table-view", {client: data});
        });
    });

    app.get("/clients/:id", function(req, res) {
        var id = req.params.id;
        db.Client.findAll({where: {
            id: id
        }}).then(function(data) {
            res.render("edit-view", {client: data});
        });
    });

    app.get("/packages/all", function(req, res){
        db.Package.findAll({

        }).then(function(response){
            // res.json(response);
            res.render("package", {package: response})
        })
    });

    app.get("/sessions/all", function(req, res) {
        db.Session.findAll({
        include: {
            model: db.Client
        }}).then(function (response) {
            res.render("table-view", {session: response});
        });
    });

    app.get("/sessions/:id", function(req, res) {
        var id = req.params.id
        db.Session.findAll({where: {
            id: id
        }}).then(function (response) {
            res.render("edit-view", {session: response});
        });
    });

};