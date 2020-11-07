const mongoose = require("mongoose");

var ArtistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "This field is required."
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    type: {
        type: String
    },
    description: {
        type: String
    }
});

// ArtistSchema.path('email'). validate((val) => {
//     emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
//     return emailRegex.test(val);
// }, "Invalid email.")

mongoose.model("Artist", ArtistSchema);