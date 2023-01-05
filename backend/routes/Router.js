const express = require("express")
const router = express.Router()
router.use("/api/users/", require("./UserRoutes"))
router.use("/api/posts/", require("./PostsRoutes"))

router.get("/api", (req, res)=>{
    res.json("Testando API.........")
})

module.exports = router