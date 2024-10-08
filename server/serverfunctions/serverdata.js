var userInfo = [];
var count = 0;

exports.addUser = function(input,socket){

    if (userInfo.some(user => user.name.toLowerCase() === input.toLowerCase())){ // check if username is already exist
        console.log('user already existed!');
        socket.emit("fail_addUser")

    } else{
        userInfo.push({name:input,score:0,id:socket.id});
        count++;
        socket.emit("success_addUser")
    }
}

exports.removeUser = function(socketId,io){
    userInfo.forEach((user,index) =>{
        if(user.id === socketId){
            userInfo.splice(index,1);
        }
    })
    count--;
    io.emit("userRemoved",exports.get_userInfo()); //must check if info correct
}

exports.get_nameFromId = function(socketId){
    for(const user of userInfo){
        if(user.id === socketId){
            return user.name;
        }
    }
    return null;
}

exports.get_userInfo = function(){
    return userInfo;
}

exports.get_count = function(){
    return count;
}
