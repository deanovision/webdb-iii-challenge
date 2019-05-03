exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { cohorts_id: 1, name: "Student 1" },
        { cohorts_id: 2, name: "Student 2" },
        { cohorts_id: 3, name: "Student 3" }
      ]);
    });
};
