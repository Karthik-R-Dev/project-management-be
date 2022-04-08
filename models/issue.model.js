const mongoose = require('mongoose')

const Issue = new mongoose.Schema(
	{
		issueName: { type: String, required: true },
		projectName: { type: String, required: true, unique: true },
		count: { type: String, required: true },
        issueStatus:{type:String, default:"Active"},
		totalIssues:{type:String},
		isReopened:{type:Boolean, default:false},
		reopenedCount:{type:Number,default:0}
	}
)

const model = mongoose.model('IssueData', Issue)

module.exports = model