export default function(wishList=[], action) {
  
  if(action.type == 'like') {
    let  isExict= false; 
    var wishCopyList= [...wishList];
      for (let i = 0; i< wishCopyList.length; i++){
           
            if (wishCopyList[i].title === action.articleLike.title){
                        isExict=true
            }
            
                    
      }
      if(!isExict){
             wishCopyList.push(action.articleLike)
            console.log("Le reducer envoie l'article:")
            console.log(wishCopyList)
      }
       

        
      

     
    return wishCopyList
  } 
  else if(action.type == 'delete'){
      var wishCopyList= [...wishList];
      wishCopyList.splice(action.articleToDelete._id, 1)
      return wishCopyList
  }
  else {
    return wishList;
  }
    

   
    
}