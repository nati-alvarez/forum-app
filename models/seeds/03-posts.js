exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Post').del()
    .then(function () {
      // Inserts seed entries
      return knex('Post').insert([
        {
          id: 1,
          community_id: 1,
          author_id: 1,
          title: "Welcome to the website",
          body: "Let's hope this turns out nice :)"
        }
      ]);
    });
};
