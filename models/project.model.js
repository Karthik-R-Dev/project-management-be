const mongoose = require('mongoose')

const Project = new mongoose.Schema(
	{
		projectName: { type: String, required: true },
		clientName: { type: String, required: true, unique: true },
		count: { type: String, required: true },
        projectStatus:{type:String},
		totalProjects:{type:Number},
		
	}
)

const model = mongoose.model('ProjectData', Project)

module.exports = model