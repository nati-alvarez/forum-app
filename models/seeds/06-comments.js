exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Comment').del()
    .then(function () {
      // Inserts seed entries
      return knex('Comment').insert([
        {
          id: 1,
          post_id: 1,
          user_id: 1,
          body: "Hey, what's up"
        },
        {
          id: 2,
          post_id: 1,
          user_id: 1,
          body: "Wow, what a great post."
        }
      ]);
    });
};
