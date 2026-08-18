
export async function getProducts(){

    const res= await fetch("https://fakestoreapi.com/products"
 
    
    
    )
if(!res.ok){
    return new Error("faild")

}



return res.json();

}