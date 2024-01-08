const { thoughtRoutes, userRoutes } = require("../models");

module.exports = {

    async pullallThoughts(req, res) {
        try {
            const thought = await thoughtRoutes.find()
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }      
    },

    async pulloneThought(req, res) {
        try {
            const thought = await thoughtRoutes.findOne({ _id: req.params.thoughtid })

            if (!thought) {
                return res.status(404).json({ message: "No Id for that route, get it right next time" })
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
          const thought = await thoughtRoutes.create(req.body);
          const user = await userRoutes.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { applications: thought._id } },
            { new: true }
          );
    
          if (!user) {
            return res.status(404).json({
              message: 'Application created, but found no user with that ID',
            })
          }
    
          res.json('Created the application 🎉');
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },

    async editThought(req, res) {
        try {
            const thought = await thoughtRoutes.findOneAndUpdate(
                { _id: req.params.thoughtid },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: "No thought with this id" })
            }
            res.json(thought);

        } catch (err) {
            res.status(500).json(err)
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await thoughtRoutes.findOneAndRemove({ _id: req.params.thoughtid })

            if (!thought) {
                return res.status(404).json({ message: "No Thought with this id" })
            }

            const noThought = await userRoutes.findOneAndUpdate(
                { thoughts: req.params.thoughtid },
                { $pull: { thoughtRoutess: req.params.thoughtid } },
                { new: true }
            );

            if (!noThought) {
                return res.status(404).json({ message: "thoughtRoutes created but no user with this id" })
            };
            res.json({ message: "Thought Deleted" })
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async newReaction(req, res) {
        try {
            const reaction = await thoughtRoutes.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if(!reaction) {
                return res.status(404).json({message: "No matching Id found"})
            }

        res.json(reaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },
 

    async deleteReaction(req, res) {
       try {
        const noThought = await thoughtRoutes.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        );
        if(!noThought) {
            return res.status(404).json({message: "No matching Id found"})
        }
        res.json(noThought);
       } catch(err) {
        res.status(500).json(err)
       }
    }

};

