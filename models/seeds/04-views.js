exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('View').del()
    .then(function () {
      // Inserts seed entries
      return knex('View').insert([
        {
          user_id: 1,
          post_id: 1
        },
        {
          user_id: 1,
          post_id: 4
        }
      ]);
    });
};
