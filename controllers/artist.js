import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();
const ArtistModel = mongoose.model("Artist");

router.get("/", (req, res) => {
    res.render("add-artist", {
        viewTitle: "Insert Artist"
    })
})

router.post("/", (req, res) => {
    if(req.body._id == "")
        insertRecord(req, res)
    else
        updateRecord(req, res)
})

function insertRecord(req, res){
    var artist = new ArtistModel();
    artist.name = req.body.name;
    artist.type = req.body.type;
    artist.email = req.body.email;
    artist.phone = req.body.phone;
    artist.description = req.body.description
    artist.save((err, doc) => {
        if(!err) {
            res.redirect("/artist/list")
        // } else {
        //     if(err.name == "ValidationError") {
        //         // handleValidationError(err, req.body)
        //         res.render("add-artist", {
        //             viewTitle: "Insert Artist",
        //             artist: req.body
        //         })
        //     } else {
        //         res.send("Error occured" + err)
        //     }
         }
    });
}

function updateRecord(req, res){
    ArtistModel.findByIdAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err) {
            res.redirect("/artist/list")
        } else {
            if(err.name == "ValidationError") {
                // handleValidationError(err, req.body)
                res.render("add-artist", {
                    viewTitle: "Update Artist",
                    artist: req.body
                })
            } else {
                res.send("Error occured" + err)
            }
        }
    })
}

router.get('/list', (req, res) => {
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        ArtistModel.find({"name": regex}, (err, docs)=>{
            if(!err){
                if(docs.length < 1) {
                    var noMatch = "There is no artist that matches this request."
                }
                res.render("list", {list: docs})
            } else {
                res.send("Error")
            }
        });
    } else {
        ArtistModel.find((err, docs)=>{
            if(!err){
                res.render("list", {list: docs})
            } else {
                res.send("Error")
            }
        });
    }
});

router.get("/:id", (req, res) => {
    ArtistModel.findById(req.params.id, (err, docs) => {
        if(!err) {
            res.render("add-artist", {
                viewTitle: "Update Artist",
                artist: docs
            })
        }
    })
})

router.get("/delete/:id", (req, res) => {
    ArtistModel.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err) {
            res.redirect("/artist/list")
        } else {
            console.log("Error in artist delete:" + err)
        }
    })
})

function handleValidationError(err, body){
    for(field in err.errors){
        switch(err.errors[field].path){
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;