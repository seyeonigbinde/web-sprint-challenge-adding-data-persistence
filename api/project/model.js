const db = require('../../data/dbConfig')

function getProjects() {
    return db('projects as p')
            .select('p.*')

}

async function createProject(project) {
  const [project_id] = 
    await db('projects')
    .insert(project)
    
  return getProjects()
    .where({ project_id })
    .first()

}


module.exports = {
  getProjects,
  createProject,
}
