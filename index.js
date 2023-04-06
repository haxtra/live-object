"use strict"

const fs = require('fs')

function loadObject(filePath, dflt, opts={}){

	// use default value if reset is requested
	if(opts.reset)
		return typeof dflt == 'function' ? dflt() : dflt

	// try loading file from disk
	try {
		return JSON.parse(fs.readFileSync(filePath, 'utf8'))
	} catch(e) {
		if(e.code == 'ENOENT')
			return typeof dflt == 'function' ? dflt() : dflt
		else
			throw e
	}
}

function saveObject(filePath, obj, pretty){
	// JSON.stringify will drop .save method automatically
	fs.writeFileSync(filePath, JSON.stringify(obj, null, pretty ? '\t' : null), 'utf8')
}

function liveObject(filePath, dflt={}, opts) {

	const data = loadObject(filePath, dflt, opts)

	const live = {
		save(fileSavePath, pretty) {
			saveObject(fileSavePath || filePath, this, pretty)
		}
	}

	return Object.assign(live, data)
}

module.exports = liveObject
