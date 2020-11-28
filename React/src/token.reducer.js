export default function(token=[], action){
    if(action.type == 'token'){
        token.push(action.token)
      
        
        return token

    }
}