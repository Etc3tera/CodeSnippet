/*
Small script to validate structure of Javascript Object

HOW TO USE

var validStructure = {
    "id": "number",
    "name": "string",
    "friends": ["string"],
    "languageProficient": [{
        "lang": "string",
        "level": "string"
    }],
    "message": "string|nullable"
};
var myObject = {
    id: 1,
    name: "Alice",
    friends: ["Edward", "Himeno"],
    languageProficient: [
        {
            lang: 'English',
            level: 'Very Well'
        },
        {
            lang: 'Japanese',
            level: 'Well'
        }
    ],
    message: null
}

var myObject2 = {
    id: 2,
    name: "Sawaka",
    friends: [],
    languageProficient: [
        {
            lang: 'Japanese',
            level: null         // failed here
        },
    ],
    message: null
}

console.log(ValidateObject(myObject, validStructure));          // true
console.log(ValidateObject(myObject2, validStructure));         // false

*/

function ValidateObject(obj, valid){
    if(typeof valid === 'object' && !(valid instanceof Array)){
        if(obj === null || typeof obj !== 'object'){
            console.log('EXPECT: Non-Nullable object but type of ' + typeof(obj));
            console.log(valid, obj);
            debugger;
            return false;
        }
        
        if(obj instanceof Array){
            console.log('EXPECT: Non-Nullable object but type of Array');
            console.log(valid, obj);
            debugger;
            return false;
        }
        
        var valids_key = new Set(Object.keys(valid));
        var keys = Object.keys(obj);

        if(keys.length != valids_key.size){
            console.log('Number of key in Object not same.')
            console.log(valid, obj);
            debugger;
            return false;
        }
        
        var checkCount = 0;
    
        keys.forEach(k => {
            if(valids_key.has(k))
                checkCount++;
        });
        
        if(valids_key.size !== checkCount){
            console.log('Number of key in Object same but key name is different')
            console.log(valid, obj);
            debugger;
            return false;
        }
        
        return keys.every(k => ValidateObject(obj[k], valid[k]));
    }
    else if(valid instanceof Array){
        if(!(obj instanceof Array)){
            console.log('EXPECT: Array but type of ' + typeof(obj));
            console.log(valid, obj);
            debugger;
            return false;
        }
        
        return obj.length === 0 || obj.every(o => ValidateObject(o, valid[0]));
    }
    else {
        var allowNull = false;
        if(valid.indexOf('|nullable') >= 0){
            allowNull = true;
        }
        valid = valid.split('|')[0];
        
        if(obj === null){
            if(!allowNull){
                console.log("EXPECT: Non-Nullable " + valid + " but NULL");
                console.log(valid, obj);
                debugger;
                return false;
            }else{
                return true;
            }
        }
        if(valid !== typeof(obj)){
            console.log("EXPECT: " + valid + " but " + typeof(obj));
            console.log(valid, obj);
            debugger;
            return false;
        }
        
        return true;
    }
};