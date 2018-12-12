function DeepTrim(obj) {
    for (var prop in obj) {
        var value = obj[prop], type = typeof value;

        if (value != null
            && (type == "string" || type == "object")
            && obj.hasOwnProperty(prop))

            if (type == "object")
                DeepTrim(obj[prop]);
            else
                obj[prop] = obj[prop].trim().replace(/\s+/g, ' ');
    }
}

String.prototype.insertAt = function(string, index) {
    return this.substring(0, index) + string + this.substring(index);
}

module.exports = {
    DeepTrim
}