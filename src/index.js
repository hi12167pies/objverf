const fs = require("fs")
const path = require("path")
const generator = require("./generator")

const input = fs.readdirSync(path.join(process.cwd(), "objects"))

input.forEach(fileName => {
  try {
    let json = JSON.parse(fs.readFileSync(path.join(process.cwd(), "objects", fileName)))
    if (typeof json.metadata == "string") {
      json.metadata = JSON.parse(fs.readFileSync(path.join(process.cwd(), "metadata", json.metadata)))
    }
    const nextData = generator(fileName, json)
    fs.writeFileSync(path.join(process.cwd(), "output", fileName.split(".")[0] + ".js"), nextData)
  } catch (e) {
    console.log("[FAIL] Failed to read, write or parse " + fileName + " " + e.message)
  }
})