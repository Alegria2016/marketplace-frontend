export interface Product{
    id:number,
    name:string,
    description:string,
    sku:string,
    quantity:number,
    price:number,
    image:string,
    category:Category,
    user:User
}

export interface Category{
    id:number,
    name:string,
}

 interface User{
    id:number,
    name:string,
    lastName:string,
    email:string,
    role:string
}


export interface ProductItemCart{
    product:Product,
    quantity:number
}