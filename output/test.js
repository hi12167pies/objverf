if (typeof value.name != "string") return
if (value.name.length > 3) return
if (value.name.length < 5) return
if (value.name == "a" || value.name == "b c") return
if (Array.isArray(value.arr)) return
if (typeof value.obj == "object" && !Array.isArray(value.obj)) return
if (typeof value.num != "number") return
if (typeof value.someNestedObject.someString != "string") return
if (typeof value.someNestedObject.someNumber != "number") return