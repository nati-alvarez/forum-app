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
        },
        {
          id: 2345,
          community_id: 1,
          author_id: 1,
          title: 'Beulah\'s blog',
          body: 'test body'
        },
        {
          id: 2345234,
          community_id: 1,
          author_id: 1,
          title: 'Fisher\'s blog',
          body: 'test body'
        },
        {
          id: 623462,
          community_id: 1,
          author_id: 1,
          title: 'Rhodes\'s blog',
          body: 'test body'
        },
        {
          id: 724,
          community_id: 1,
          author_id: 1,
          title: 'Reilly\'s blog',
          body: 'test body'
        },
        {
          id: 6294,
          community_id: 1,
          author_id: 1,
          title: 'Gilmore\'s blog',
          body: 'test body'
        },
        {
          id: 23495,
          community_id: 1,
          author_id: 1,
          title: 'Rosario\'s blog',
          body: 'test body'
        },
        {
          id: 2349,
          community_id: 1,
          author_id: 1,
          title: 'Lola\'s blog',
          body: 'test body'
        },
        {
          id: 2345023,
          community_id: 1,
          author_id: 1,
          title: 'Munoz\'s blog',
          body: 'test body'
        },
        {
          id: 234521,
          community_id: 1,
          author_id: 1,
          title: 'Wilda\'s blog',
          body: 'test body'
        },
        {
          id: 22345,
          community_id: 1,
          author_id: 1,
          title: 'Patrica\'s blog',
          body: 'test body'
        },
        {
          id: 424522,
          community_id: 1,
          author_id: 1,
          title: 'Holly\'s blog',
          body: 'test body'
        },
        {
          id: 2462049,
          community_id: 1,
          author_id: 1,
          title: 'Payne\'s blog',
          body: 'test body'
        },
        {
          id: 44545,
          community_id: 1,
          author_id: 1,
          title: 'Britney\'s blog',
          body: 'test body'
        },
        {
          id: 25945,
          community_id: 1,
          author_id: 1,
          title: 'Roach\'s blog',
          body: 'test body'
        },
        {
          id: 994834,
          community_id: 1,
          author_id: 1,
          title: 'Conner\'s blog',
          body: 'test body'
        },
        {
          id: 23484984,
          community_id: 1,
          author_id: 1,
          title: 'Maryann\'s blog',
          body: 'test body'
        },
        {
          id: 984234,
          community_id: 1,
          author_id: 1,
          title: 'Townsend\'s blog',
          body: 'test body'
        },
        {
          id: 454545,
          community_id: 1,
          author_id: 1,
          title: 'Mullins\'s blog',
          body: 'test body'
        }
      ]);
    });
};
