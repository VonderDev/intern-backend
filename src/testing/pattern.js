module.exports.authPattern = {
  role: String,
  isDeleted: Boolean(),
  _id: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  username: String,
  created_at: String,
  updated_at: String,
};

module.exports.arrayContentPattern = [
  {
    _id: String,
    author_id: String,
    content_body: String,
    title: String,
    uid_likes: [String],
    tag: [String],
    content_type: String,
    image: String,
    author_username: String,
    created_at: String,
    updated_at: String,
  },
];

module.exports.arrayCommentPattern = [
  {
    _id: String,
    comment_body: String,
    isDeleted: Boolean(),
    content_id: String,
    uid: String,
    created_at: String,
    updated_at: String,
    username: String,
  },
];