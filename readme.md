# Generate checks for your javascript based on a json file

| directory | description |
| --- | --- |
| `/objects` | Contains all your JSON files for your different checks |
| `/output` | Contains the output Javascript code for your objects in `/objects` |
| `/metadata` | If multiple objects have the same metadata, you can put `"metadata": "example.json"` and it will point to example.json in this directory |


```json
{
  // This is the metadata for your object
  // If you have multiple checks that use the same metadata, put this metadata object into a seperate json file in "metadata" directory, and put the name of the file here.
  "metadata": {
    // This is the variable that will be checked, example: if (value == "example")
    "variable": "value",
    // In the case that it does not match this is what code to run
    "wrongCase": {
      // Type: How should the wrong code be shown
      // - inline: The code will be inline, example:
      //   if (condition) return 
      // - nested: The code will be nested, example:
      //   if (condition) {
      //      return
      //   } 
      "type": "inline",
      // If nested mode is used you can specifiy how many indents you want, you can also use a string for custom indent character
      "indents": 2,
      // The code to execute if you have the wrong case
      "execute": "return",
      // Can also be an array for multiple lines:
      "execute": [
        "console.log('Uh oh! Error')"
        "return"
      ]
    }
  },

  // This here is the actual object data, you will structure it just like the object that will be checked, but instead of the values you will put some data see the next seection for more aabout this
  "data": {
    "key": "type options...",
    "nestedExample": {
      "key": "type options...",
    }
  }
}
```

## Type
The type is what type of data the key should be:
- string
- object
- array
- number

## Options

An option can be specified like so: `name:data`
| Name | Value Description | Example |
| --- | --- | --- |
| `minlen` | Min length of a string | `minlen: 3` | 
| `maxlen` | Min length of a string | `maxlen: 15` |
| `min` | Minimum for a number | `min: 3` |
| `max` | Maximum for a number | `max: 5` |
| `or` | Check if the value is either a or b | `or:a\|b\|c` |
| `and` | Check if the value is a and b | `and:a\|b\|c` |