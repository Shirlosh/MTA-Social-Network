const fs = require('fs');

const json_file_name = 'users.json'

function create_json_file(json_object)
{
	if(!is_file_exist(json_file_name))
	{
		fs.writeFile(json_file_name, JSON.stringify(json_object), (err) => {
			if (err) {
				throw err;
			}
		});
	}
}

function update_json_file(json_object)
{
	fs.writeFile(json_file_name, JSON.stringify(json_object), (err) => {
		if (err) {
			throw err;
		}
	});
	console.log("json file updated.")
}

function is_file_exist(path) {

    if (fs.existsSync(path)) 
    {
        return true
    }
    else return false
}


module.exports = {create_json_file, update_json_file};