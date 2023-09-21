const {
  getProjects,
  createProject,
  updateProjects,
  deleteProject
  } = require("../controllers/projects");

  
const express =  require("express");

const router = express.Router();


router.get('/:id',  getProjects);
router.post('/:id',  updateProjects);
router.post('/',  createProject);
router.delete('/:id' , deleteProject);


module.exports = router;
