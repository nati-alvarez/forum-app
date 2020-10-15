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
        },
        {
          id: 2,
          community_id: 1,
          author_id: 1,
          title: "How many times",
          body: "How many? Will we know?"
        },
        {
          id: 3,
          community_id: 1,
          author_id: 1,
          title: "I like this place",
          body: "blah blah blah blah, it's nice :)"
        },
        {
          id: 4,
          community_id: 1,
          author_id: 1,
          title: "Why is the sky blue",
          body: "and why is this a dumb post"
        }
      ]);
    });
};
