
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Community_Member').del()
    .then(function () {
      // Inserts seed entries
      return knex('Community_Member').insert([
        {user_id: 1, community_id: 1}
      ]);
    });
};
