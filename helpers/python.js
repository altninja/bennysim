const ps = require('python-shell')
	
function python(message, script) {
	return new Promise((rs, rj) => {
		const options = {
			mode: 'json',
			pythonPath: 'python3',
			scriptPath: './',
			args: [message]
		}

		ps.PythonShell.run(script, options, (err, results) => {
			if (err) throw err
			rs(results)
		})
	})
}

module.exports = python
