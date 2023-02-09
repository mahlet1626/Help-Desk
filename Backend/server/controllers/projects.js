const Project = require('../models/projects');
const route = require('../routes/project')
const path = require('path');
const formidable = require('formidable');
const _ = require('lodash');// for replacing?
const { getAuth } = require ('firebase-admin/auth');

//projectby id middleware
exports.projectById=(req,res,next,id)=>{
    Project.findById(id).exec((err,project)=>{
     if(err|| !project){
        return res.status(400).json({
            error:"Project not found"
        });
     }
     req.project = project;
        next();
       
    });
    
}

// create and save new project
exports.create = (req, res) => {
    let form =new formidable.IncomingForm()
    // form.keepExtensions = true;
    form.parse(req, (err, fields) => {

        // check for all fields
        const { title, department, description, priority} = fields;

        if (!title || !department || !description || !priority) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        } 
        let project = new Project(fields); 

        project.save((err,result)=>{
            if (err){
                return res.status(400).json({
                err
            });
        }
            res.json(result);
            });
    });
};

// retrieve and return all projects/ retrive and return a single project
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

       Project.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found project with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving project with id " + id})
            })

    }else{
        Project.find()
            .then(project => {
                res.send(project)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving project information" })
            })
    }

    
}

// Update a new idetified project by project id
exports.update = (req, res) => {

    let form =new formidable.IncomingForm()
   
    form.parse(req,(err,fields)=>{
 
  let project = req.project;
  project = _.extend(project, fields);

  project.save((err,result)=>{
    if (err){
        return res.status(400).json({
        err
    });
}
    res.json(result);
    });

});
};
  
// Delete a project with specified project id in the request

exports.delete = (req, res) => {
    let project = req.project;
    
    project.delete((err, deletedProject) => {
        if (err){
            return res.status(400).json({
            err
        });
        }
        res.json({
            message: 'Project deleted successfully!'
        });
    });
};