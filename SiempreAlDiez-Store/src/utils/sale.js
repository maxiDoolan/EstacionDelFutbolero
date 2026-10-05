// Devuelve el % de descuento si el producto tiene precio anterior mayor al actual
export const getDiscount = (product) => {
  const old = Number(product?.oldPrice)
  const price = Number(product?.price)
  if (!old || !price || old <= price) return 0
  return Math.round((1 - price / old) * 100)
}

export const isOnSale = (product) => getDiscount(product) > 0
