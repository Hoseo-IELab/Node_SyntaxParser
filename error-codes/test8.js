try {
    throw new URIError('Hello', 'someFile.js', 10)
  } catch (e) {
    console.log(e instanceof URIError)  // true
    console.log(e.message)              // "Hello"
    console.log(e.name)                 // "URIError"
    console.log(e.fileName)             // "someFile.js"
    console.log(e.lineNumber)           // 10
    console.log(e.columnNumber)         // 0
    console.log(e.stack)                // "@Scratchpad/2:2:9\n"
  }