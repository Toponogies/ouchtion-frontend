export function hiddenName(name){
    var index = name.lastIndexOf(' ');
    if (index === -1){
        return name;
    }
    var newName = name.slice(index)
    return "******" + newName;
};