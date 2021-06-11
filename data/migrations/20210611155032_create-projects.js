exports.up = function (knex) {
    return knex.schema
      .createTable('projects', table => {
        table.increments('project_id')
        table.string('project_name', 138)
              .notNullable()
        table.string('project_description', 256)
        table.boolean('project_completed')
              .defaultTo(true)
      })
      .createTable('resources', table => {
        table.increments('resource_id')
        table.string('resource_name', 138)
              .notNullable().unique()
        table.integer('resource_description', 256)
      })
      .createTable('tasks', table => {
        table.increments('task_id')
        table.string('task_description', 256)
              .notNullable()
        table.string('task_notes', 256)
        table.boolean('task_completed')
              .defaultTo(true)
        table.integer('project_id')
          .unsigned()
          .notNullable()
          .references('project_id')
          .inTable('projects')
          .onDelete('CASCADE')
          .onUpdate('CASCADE')
      })
      .createTable('project_resources', table => {
        table.increments('project_resources_id')
        table.integer('project_id')
            .unsigned()
            .notNullable()
            .references('project_id')
            .inTable('projects')
            .onDelete('RESTRICT')
        table.integer('resource_id')
          .unsigned()
          .notNullable()
          .references('resource_id')
          .inTable('resources')
          .onDelete('CASCADE')
          .onUpdate('CASCADE')
      })
  };
  
  exports.down = function (knex) {
   
    return knex.schema
        .dropTableIfExists('project_resources')
        .dropTableIfExists('tasks')
        .dropTableIfExists('resources')
        .dropTableIfExists('projects')
  };
