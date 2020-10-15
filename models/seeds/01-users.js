const bcrypt = require("bcrypt");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('User').del()
    .then(function () {
      // Inserts seed entries
      return knex('User').insert([
        {
          id: 1,
          username: "Test",
          password: bcrypt.hashSync("password", 14),
          bio: "This is a test"
        },
      ]);
    });
};
