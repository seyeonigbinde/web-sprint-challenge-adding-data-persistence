const db = require('../../data/dbConfig')

function getTasks() {
  return db('tasks as t')
  .select('t.*')
  .leftJoin('projects as p', 't.task_id', '=', 't.project_id')
  .leftJoin('project_resources as pr', 'pr.project_id', '=', 'p.project_id')
}

async function createTask(task) {
  const [task_id] = await db('tasks').insert(task)
  return getTasks().where({ task_id }).first()
}


module.exports = {
  getTasks,
  createTask,
};
