exports.up = function(knex, Promise) {
  return knex.schema.createTable("students", students => {
    students.increments();
    students
      .string("name", 255)
      .notNullable()
      .unique();
    students
      .integer("cohorts_id")
      .unsigned()
      .references("id")
      .inTable("cohorts")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    students.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("students");
};
