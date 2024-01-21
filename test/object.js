function test(a) {
  console.log(a)
  console.log("obj: " + (typeof a == "object"))
  console.log("arr: " + (a instanceof Array))
  console.log("obj: " + (typeof a == "object" && !Array.isArray(a)))
  console.log("")
}

test([])
test({})
test(1)
test("")