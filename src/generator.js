module.exports = function generate(name, object) {
  let fileData = []

  let { metadata, data } = object

  metadata.indentsData = indents(metadata)
  metadata.wrongCaseData = wrongData(metadata)

  function loop(obj, nests=[]) {
    for (const key in obj) {
      const value = obj[key]
  
      switch (typeof value) {
        case "string":
          const data = value
            .split(/\s(?=(?:[^"]*"[^"]*")*[^"]*$)/)
            .map(data => data.replaceAll(/(?<!\\)"/g, ""))
          const type = data[0]
          fileData.push(typeStr(metadata, type, getVariableName(metadata, nests, key)))
          metaChecks(metadata, data.slice(1), getVariableName(metadata, nests, key)).forEach(data => {
            fileData.push(data)
          })
          break
        case "object":
          loop(value, [...nests, key])
          break
        default:
          console.log(`[FAIL] ${name}'s key ${key} is not a valid type.`)
          return
      }
    }
  }

  loop(data, [metadata.variable])

  return fileData.join("\n")
}

function typeStr(metadata, type, varName) {
  switch (type) {
    case "string":
      return `if (typeof ${varName} != "string") ${metadata.wrongCaseData}`
    case "number":
      return `if (typeof ${varName} != "number") ${metadata.wrongCaseData}`
    case "array":
      return `if (Array.isArray(${varName})) ${metadata.wrongCaseData}`
    case "object":
      return `if (typeof ${varName} == "object" && !Array.isArray(${varName})) ${metadata.wrongCaseData}`
    default:
      return "// Unhandled type " + type
  }
}

function metaChecks(metadata, options, varName) { 
  let fileData = []

  options.forEach(option => {
    const type = option.split(":")[0]
    const data = option.split(":").slice(1).join(":")

    switch (type) {
      case "minlen":
        fileData.push(`if (${varName}.length > ${data}) ${metadata.wrongCaseData}`)
        break
      case "maxlen":
        fileData.push(`if (${varName}.length < ${data}) ${metadata.wrongCaseData}`)
        break
      case "min":
        fileData.push(`if (${varName} > ${data}) ${metadata.wrongCaseData}`)
        break
      case "max":
        fileData.push(`if (${varName} < ${data}) ${metadata.wrongCaseData}`)
        break
      case "or":
      case "and":
        let statements = []
        data.split("|").forEach(opt => {
          statements.push(`${varName} == "${opt}"`)
        })
        fileData.push(`if (${statements.join(type == "or" ? " || " : "&&")}) ${metadata.wrongCaseData}`)
      break
      default:
        fileData.push("// Unhandled option " + option)
    }
  })

  return fileData
}

function wrongData(metadata) {
  let execute = Array.isArray(metadata.wrongCase.execute) ? metadata.wrongCase.execute.join("\n" + metadata.indentsData) : metadata.wrongCase.execute
  switch (metadata.wrongCase.type) {
    case "inline":
      return execute
    case "nested":
      return `{\n${metadata.indentsData}${execute}\n}`
    default:
      return `process.exit(1) // Unhandled error type ` + metadata.wrongCase.type
  }
}

function indents(metadata, num) {
  if (typeof metadata.wrongCase.indents == "number") {
    let str = ""
    for (let i = 0; i < metadata.wrongCase.indents; i++) {
      str += " "
    }
    return str
  }
  return metadata.wrongCase.indents ?? "  "
}

function getVariableName(metadata, nests, key) {
  return nests.join(".") + "." + key
}