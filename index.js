const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Project = require('./models/project.model')
const { create, findByIdAndUpdate } = require('./models/project.model')
const Issue = require('./models/issue.model')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/project-backend', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Mongo is ready !"))
.catch(err=> console.log(err))


// project creation


app.post('/api/create', async (req, res) => {
	console.log(req.body)
	try {
        const projectCreate = await Project.create({
			projectName: req.body.projectName,
			clientName: req.body.clientName,
			count: req.body.count,
            projectStatus: req.body.projectStatus
		})
        if(projectCreate){
            return res.status(200).send("project created successfully")
        }else{
            return res.status(400).send("project creation failed")
        }projectName
		
	} catch (err) {
        console.log(err)
		return res.status(400).send("project went wrong")
	}

})
app.get('/api/getProject', async(req, res)=> {
    const project = await Project.find({});
    return res.status(200).send(project)
 });

 app.put('/api/updateProject/:id',async(req,res)=>{ 
     const id = req.params.id;
     const editProject = await Project.findByIdAndUpdate(id,
        {$set:req.body},
        {new:true}
        )
        if(editProject){
            return res.status(200).send("updated succesfully")
        }else{
            return res.status(400).send("something went wrong")
        }
 })

 app.delete('/api/deleteProject/:id',async(req,res)=>{
     const id = req.params.id;
     console.log(id)
     const deleteProject =  await Project.findOneAndDelete({_id:id});
     if(deleteProject){
         return res.status(200).send("deleted successfully")
     }else{
         return res.status(400).send("something went wrong")
     }
 })
app.get('/api/get', function (req, res) {
	console.log('hlo');
	res.send("Hello world!");
 });

//issue creation

app.post('/api/createIssue', async (req, res) => {
	console.log(req.body)
	try {
        const IssueCreate = await Issue.create({
			issueName: req.body.issueName,
			projectName: req.body.projectName,
			count: req.body.count,
            issueStatus: req.body.issueStatus
		})
        if(IssueCreate){
            return res.status(200).send("issue created successfully")
        }else{
            return res.status(400).send("issue creation failed")
        }
		
	} catch (err) {
        console.log(err)
		return res.status(400).send("something went wrong")
	}

})
app.get('/api/getIssue',async(req,res)=>{
    const issue = await Issue.find({});
    return res.status(200).send(issue);
})
app.put('/api/reopen/:id',async(req,res)=>{
    const id = req.params.id
    const reopenIssue = await Issue.findByIdAndUpdate(id,
        {$set:req.body},
        {new:true}
        )

        console.log(reopenIssue)
        if(reopenIssue){
            return res.status(200).send("reopened")
        }else{
            return res.status(400).send("something went wrong")
        }
})
app.delete('/api/close/:id',async(req,res)=>{
    const id = req.params.id;
    const closeIssue = await Issue.findOneAndDelete({_id:id});
    if(closeIssue){
        return res.status(200).send("issue closed")
    }else{
        return res.status(400).send("something went wrong")
    }
})

// total projects

app.get('/api/totalProjects',async(req,res)=>{
    const totalValue = await Project.find({});
    return res.status(200).send(totalValue);
})

// total issues

app.get('/api/totalIssues',async(req,res)=>{
    const totalIssue = await Issue.find({});
    return res.status(200).send(totalIssue) 
})



app.listen("3001", () => {
	console.log("server running on port 3000")
})