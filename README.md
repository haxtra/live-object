# live-object

Standard javascript object with built-in JSON serialization to file. Dreams do come true sometimes.


## Install

`npm i @haxtra/live-object`


## Usage

```js
const liveObject = require('@haxtra/live-object')

const obj = liveObject('/path/to/file')
obj.foo = 'bar'
obj.save()
```

```console
$ cat /path/to/file
> {"foo":"bar"}
```

## API

```js
obj = liveObject(filePath, default?, opts?)

// filePath   - (str) json file path, to load and save (required)
// default    - (obj) used when file at path is not found
// opts.reset - (bool) ignore file even if it exists, force default

obj.save(filePath?, pretty?)

// filePath   - (str) alternative file to save to, used for this save only
//                    does not change/update path given at creation time
// pretty     - (bool) save formatted json, with proper indentation
```

## Rules

- read/write uses sync api
- `save` key is reserved
- `JSON.stringify` rules apply, see [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description)


## License

MIT