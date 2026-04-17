import express from "express"

const router = express.Router()

router.get("/success", (req, res) => {
  const query = req.url.includes("?") ? req.url.substring(req.url.indexOf("?")) : ""
  res.redirect(`http://localhost:5173/success${query}`)
})

router.get("/failure", (req, res) => {
  res.redirect("http://localhost:5173/failure")
})

router.get("/pending", (req, res) => {
  res.redirect("http://localhost:5173/pending")
})

export default router