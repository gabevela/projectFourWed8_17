const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const contributorSchema = new Schema({
    name: {type: String, required: true}, 
    email: {type: String, required: true}, 
    city: {type: String, required: true}, 
    country: {type: String, required: true},
    image: {type: String, required: false},
    postedBy: {type: String, required: true},
    articles: [
        {type: Schema.Types.ObjectId,
        required: true,
        ref: 'Article',
        }
    ],
})

module.exports = mongoose.model('Contributor', contributorSchema);









// const userSchema = new Schema({
//     name: {type: String, required: true},
//     email: {
//       type: String,
//       unique: true,
//       trim: true, // trims whitespace if your user types something like " alex@123.com " into "alex@123.com"
//       lowercase: true,
//       required: true
//     },
//     password: {
//       type: String,
//       trim: true,
//       minLength: 3,
//       required: true
//     }
//   }, {
//     timestamps: true,
//     // A cool mongoose trick to not send passwords to clients! (even though they'll be hashed)
//     toJSON: {
//       transform: function(doc, ret) {
//         delete ret.password;
//         return ret;
//       }
//     }
//   });
  
//   module.exports = mongoose.model('User', userSchema);