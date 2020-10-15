
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Post_Vote').del()
    .then(function () {
      // Inserts seed entries
      return knex('Post_Vote').insert([
        {
          id: 1,
          user_id: 1,
          post_id: 1,
          status: 1
        }
      ]);
    });
};
