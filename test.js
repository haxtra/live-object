"use strict"

const fs = require('fs')
const liveObject = require('./')

const cleanup = true // remove test files after run
const filePath = '~testfile.json'
const filePathAlt = '~testfile-alt.json'
let obj, onDisk;

function assert(v1, v2){
	if(v1 === v2)
		return true
	console.error('✖ assert fail')
	console.error(v1)
	console.error(v2)
	process.exit(1)
}

// Test 1
obj = liveObject(filePath, {foo:'bar'}, {reset:true})
obj.boo = 123
delete obj.foo
obj.save()

onDisk = fs.readFileSync(filePath, 'utf-8')
assert(JSON.stringify(obj), onDisk)

// Test 2
obj = liveObject(filePath)
obj.foo = 'bar'
obj.baz = {qux:'bux'}
obj.save(filePathAlt, true)

onDisk = fs.readFileSync(filePathAlt, 'utf-8')
assert(onDisk, '{\n\t"boo": 123,\n\t"foo": "bar",\n\t"baz": {\n\t\t"qux": "bux"\n\t}\n}')

// Happy message
console.log('✔ test passed')

// Cleanup
if(cleanup){
	fs.unlinkSync(filePath)
	fs.unlinkSync(filePathAlt)
}