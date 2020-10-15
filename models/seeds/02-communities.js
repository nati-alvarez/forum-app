
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Community').del()
    .then(function () {
      // Inserts seed entries
      return knex('Community').insert([
        {
          id: 1,
          name: "Test Community",
          description: "A community for testing",
          owner_id: 1
        }
      ]);
    });
};
