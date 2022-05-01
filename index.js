const express = require("express")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const slugify = require("slugify")
const uniqueSlug = require("unique-slug")
const path = require("path")
const app = express()

app.use(cors())
app.use(express.json())
app.use(fileUpload())
const PORT = 5001





app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "Not file uploaded" })
  }
  console.log(req.body)
  const files = Array.isArray(req.files.files)
    ? req.files.files
    : [req.files.files]

  files.forEach((file) => {
    const name = path.parse(file.name).name
    const ext = path.parse(file.name).ext
    const slug =
      slugify(name, { remove: /[*+~.()'"!:@ ]/g }) +
      "-" +
      uniqueSlug(name) +
      ext
    console.log(slug)
    file.mv(`${__dirname}/client/public/upload/${slug}`)
  })

  res.status(200).json({})
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
