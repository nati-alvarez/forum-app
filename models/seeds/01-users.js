const bcrypt = require("bcrypt");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('User').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('User').insert([
        {
          username: "Test",
          password: bcrypt.hashSync("password", 14),
          bio: "This is a test"
        },
      ]);
    });
};
