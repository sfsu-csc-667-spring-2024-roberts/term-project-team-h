import express from "express";


const router = express.Router()

router.get("/", (_request, response) => {
    response.render("root", {
        //pass data to ejs
        title: "667"
    })
})

export default router;