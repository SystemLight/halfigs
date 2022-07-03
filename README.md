# halfigs

[![NPM version](https://img.shields.io/npm/v/halfigs.svg)](https://www.npmjs.com/package/halfigs)

Halfigs allows you to delete, copy or create folders directly.  
NPM page: https://www.npmjs.com/package/halfigs

# Installation

```
npm install halfigs
```

# User Guide

```
const {halfigs} = require('./main.bundle');

const {
  info,
  create,
  copy,
  remove
}=halfigs


copy.cp("./index.html", "./a/b/index.html").then(result => {
    console.log("cp", result);
    return remove.rm("./a");
}).then(result => {
    console.log("rm", result);
});

create.createNestedFile("./k/b/c/index.txt", "hello,file").then(result => {
    console.log("createNestedFile", result);
    return info.exists("./k/b/c/index.txt");
}).then(result => {
    console.log("exists", result);
});
```

# Note

- None

# Resources

You can read [halfigs Documentation](https://github.com/SystemLight/halfigs/wiki/API-Document) online for more
information.

# License

halfigs uses the MIT license, see LICENSE file for the details.
