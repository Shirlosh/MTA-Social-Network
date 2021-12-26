function create_unique_id(array)
{
    let prev_id = 0
    let found = null
    array.forEach(element => {
        if(prev_id + 1 != element.id)
        {
          found = prev_id + 1 
        }
        prev_id = element.id
    });

    if (found == null)
        found = array.length + 1

    return found
}


module.exports = {create_unique_id}