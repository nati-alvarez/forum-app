exports.up = function(knex) {
    return knex.schema.alterTable("User", table=>{
        table.string("pfp").defaultTo("https://res.cloudinary.com/nati/image/upload/v1603354875/kFF10vg1Da_grkddr.png").alter();
    });
};

exports.down = function(knex) {
  return knex.schema.alterTable("User", table=>{
      table.string("pfp");
  })
};
