export function toProductDTO(product) {
    return {
        code: product.code,
        name: product.name,
        price: product.price,
        id: product.id,
    }
}

export function toProductListDTO(products) {
    return products.map(toProductDTO);
}