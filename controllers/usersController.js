const { thoughtmodel, User } = require("../models");


module.exports = {
  async findUsers (req, res) {
    try{
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async getOneUser (req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("friends")
      .populate("thoughts")

      if(!user) {
        return res.status(404).json({ message: "No user with this ID"});
      }

      res.json(user);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },


  async createUser (req,res) {
    try {
      const user = await User.create(req.body);
      res.json(user);

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async removeUser (req,res) {
    try {
      const user = await User.findOneAndDelete ({ _id: req.params.userId })

      if (!user) {
        return res.status(404).json ({message:"No USer with this ID"});
      }

      await thoughtRoutes.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message:"User Deleted"})
    } catch (err){
      console.log(err)
      res.status(200).json ({message:"user and thoughts deleted"});
    }
  },
  
  async updateUser (req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({message: "No User with this ID"});
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }, 
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )

      if(!user) {
        return res.status(404).json({message: "No User with this ID"});
      }
      res.json(user);
    } catch (err){
      console.log(err)
      res.status(500).json(err);
    }
  },

  async removeFriend(req, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "No User with this ID" });
        }

        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
};