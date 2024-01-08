const { thoughtRoutes, userRoutes } = require("../models");


module.exports = {
  async findUsers (req, res) {
    try{
      const users = await userRoutes.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getOneUser (req, res) {
    try {
      const user = await userRoutes.findOne({ _id: req.params.userId })
      .populate("thoughts")
      .populate("friends")
      .select("-__v")

      if(!user) {
        return res.status(404).json({ message: "No user with this ID"});
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  async createUser (req,res) {
    try {
      const user = await userRoutes.create(req.body);
      res.json(user);

    } catch (err) {
      res.status(500).json(err);
    }
  },

  async removeUser (req,res) {
    try {
      const user = await userRoutes.findOneAndDelete ({ _id: req.params.userId })

      if (!user) {
        return res.status(404).json ({message:"No USer with this ID"});
      }

      await thoughtRoutes.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message:"User Deleted"})
    } catch (err){
      res.status(500).json(err);
    }
  },
  
  async updateUser (req, res) {
    try {
      const user = await userRoutes.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({message: "No User with this ID"});
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }, 
  async addFriend(req, res) {
    try {
      const user = await userRoutes.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )

      if(!user) {
        return res.status(404).json({message: "No User with this ID"});
      }
      res.json(user);
    } catch (err){
      res.status(500).json(err);
    }
  },

  async removeFriend (req,res) {
    try{
      const user = userRoutes.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      )

      if(!user) {
        return res.status(404).json({message: "No User with this ID"});
      }
      res.jso(user);
    } catch (err) {
      res.status(500).json(err)
    }
  }
};