const { thoughtmodel , User } = require("../models");

module.exports = {

    async pullallThoughts(req, res) {
        try {
            const thought = await thoughtmodel.find()
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }      
    },

    async pulloneThought(req, res) {
        try {
            const thought = await thoughtmodel.findOne({ _id: req.params.thoughtId })

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
          const thought = await thoughtmodel.create(req.body);
          const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { applications: thought._id } },
            { new: true }
          );
    
          if (!user) {
            return res.status(404).json({
              message: 'Thought Created',
            })
          }
    
          res.json('Created the application ');
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },

      async editThought(req, res) {
        try {
            console.log('Editing thought:', req.params.thoughtid, req.body);
    
            const thought = await thoughtmodel.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
    
            if (!thought) {
                console.error('No thought with this id');
                return res.status(404).json({ message: "No thought with this id" });
            }
    
            console.log('Thought updated:', thought);
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await thoughtmodel.findOneAndRemove({ _id: req.params.thoughtId })

            if (!thought) {
                return res.status(404).json({ message: "No Thought with this id" })
            }

            const noThought = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughtRoutes: req.params.thoughtId } },
                { new: true }
            );

            if (!noThought) {
                return res.status(200).json({ message: "Thought Deleted" })
            };
            res.json({ message: "Thought Deleted" })
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async newReaction(req, res) {
        try {
            const reaction = await thoughtmodel.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if(!reaction) {
                return res.status(404).json({message: "No matching Id found"})
            }

        res.json(reaction);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },
 

    async deleteReaction(req, res) {
       try {
        const noThought = await thoughtmodel.findOneAndUpdate(
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

