const { json } = require('express/lib/response');
const fs = require('fs');


function create_json_file(json_file_name)
{
	if(!fs.existsSync(json_file_name))
		create_json(json_file_name)

	return import_json_data(json_file_name)
}

function update_json_file(json_object, json_file_name)
{
	fs.writeFileSync(json_file_name, JSON.stringify(json_object), (err) => {
		if (err) {
			throw err;
		}
	});
	console.log("json file updated.")
}

function create_json(json_file_name)
{
	fs.writeFileSync(json_file_name,"")
	console.log("json file created.")
}

function import_json_data(json_file_name)
{
	rawdata = fs.readFileSync(json_file_name)
	if(rawdata.buffer.byteLength != 0)
		datalist = JSON.parse(rawdata)
	else datalist = null
	return datalist
}


module.exports = {create_json_file, update_json_file};