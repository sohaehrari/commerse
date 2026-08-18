import Image from "next/image";
import Link from "next/link";

export default async function ProductDetailsPage({params}){
const {id}= await params
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
        cache:"no-store",
      });


    if(!res.ok){
    new Error("failed")
    }
  const product= await  res.json();
return(


       <div className="productdet">
        <Image
  src={product.image}
  alt={product.title}
  width={400}
  height={400}
/>

    <h3>{product.title}</h3>
    <p>${product.price}</p>

    
<Link className="btn btn-primary text-align-center" href="/products">

  back to Product
</Link>
</div>







)

}