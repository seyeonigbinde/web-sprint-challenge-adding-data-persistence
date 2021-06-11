const db = require('../../data/dbConfig')

function getTasks() {
  return db('tasks as t')
    .select('t.*', 'project_name', 
        'project_description')
    .leftJoin('projects as p', 
        't.project_id', '=', 
        'p.project_id')
}

async function createTask(task) {
  const [task_id] = await 
    db('tasks').insert(task)
  return getTasks()
    .where({ task_id })
    .first()
}

module.exports = {
  getTasks,
  createTask,
}
