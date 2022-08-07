module.exports = (mongoose) => {
  const countLoveSchema = mongoose.Schema(
    {
      index: Number,
      name: String,
      message: String,
      timeStart: Date,
      type: String,
    },
    { timestamps: true }
  );

  const user = mongoose.Schema({
    number: String,
    createNew: Number,
    password: String,
    firstLogin: Boolean,
    pages: [countLoveSchema],
  },
  { timestamps: true }
  )

  user.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("user", user);
  return User;
};
