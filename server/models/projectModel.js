const mongoose = require("mongoose");

const task = new mongoose.Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, required: true },
  status: { type: String, required: true , default: "In Progress"},
  endDate: { type: Date, required : true },
},{
  timestamps: true, 
});

// Define the product schema
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: false , default: "In Progress"},
  tasks : { type : [task] },
  userId : { type : String , required : true },
  endDate : { type : Date , required : true },
}, {
  timestamps: true, 
});

const ProjectsDB = mongoose.model("projects", projectSchema);

module.exports = ProjectsDB;
