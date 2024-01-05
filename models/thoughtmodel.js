const { mongoose } = require ('mongoose');
const moment = require ('moment');

const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
    reactionBody: {
        type: String,
        required:true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema]



}); 

reactionSchema.virtual('formattedCreatedAt').get(function() {
    return moment(this.createdAt).format("MMM DD, YYYY [at] hh:mm A");
  });
  

thoughtSchema.virtual('formattedCreatedAt').get(function() {
  return moment(this.createdAt).format("MMM DD, YYYY [at] hh:mm A");
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;


