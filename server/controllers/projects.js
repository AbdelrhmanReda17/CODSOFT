const { default: mongoose } = require("mongoose");
const ProjectsDB = require("../models/projectModel");

const getProjects = async (req, res) => {
  const { page, searchText, filterBy } = req.query;
  const { id } = req.params;
  console.log(searchText, filterBy);
  const LIMIT = 8;
  const StartIndex = (Number(page) - 1) * LIMIT;

  if (mongoose.Types.ObjectId.isValid(id) || id === '1') {
    try {
      const query = { userId: id };

      // Check if searchText is provided and not an empty string
      if (searchText && searchText.trim() !== '') {
        // Use a regular expression to perform a case-insensitive search
        query.$or = [
          { name: { $regex: searchText, $options: 'i' } },
          { description: { $regex: searchText, $options: 'i' } },
        ];
      }

      let sortOptions = {};

      if (filterBy === 'Completed') {
        sortOptions.status = 1;
      } else if (filterBy === 'In Progress') {
        sortOptions.status = -1;
      } else if (filterBy === 'Expired') {
        sortOptions.endDate = 1; 
      }else{
        sortOptions._id = -1
      }

      const products = await ProjectsDB.find(query)
        .sort(sortOptions)
        .limit(LIMIT)
        .skip(StartIndex);

      const TOTAL = await ProjectsDB.countDocuments(query);

      res.status(200).json({
        projects: products,
        currentPage: Number(page),
        numberOfPages: Math.ceil(TOTAL / LIMIT),
        numberOfProjects: TOTAL,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  } else {
    res.status(404).json({ message: "Invalid ID" });
  }
};


const createProject = async (req, res) => {
    const body = req.body;     
    const NewProject = new ProjectsDB({...body});
    try {
      await NewProject.save();    
      res.status(200).json({ project: NewProject });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
};

const updateProjects = async (req, res) => {
  const  body  = req.body;    
  try {
    const existingProject = await ProjectsDB.findOne( { _id : body._id});

    if (!existingProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    Object.assign(existingProject, body);
    await existingProject.save();

    res.status(200).json({ project: existingProject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteProject = async (req, res) => {
  const  {id}  = req.params;    
  console.log(id)
  try {
    const existingProject = await ProjectsDB.findByIdAndDelete( { _id : id});
    if(existingProject === null) {
      return res.status(404).json({ message: "Project not found" });
    }else{
      res.status(200).json({ message: "Project deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    getProjects,
    createProject,
    updateProjects,
    deleteProject
};
  