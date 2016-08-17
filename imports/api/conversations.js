export const Conversations = new Mongo.Collection( 'conversations' );

Conversations.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Conversations.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});
