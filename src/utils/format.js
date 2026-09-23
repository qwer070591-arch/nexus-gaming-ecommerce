export const money = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'TWD', maximumFractionDigits: 0 }).format(value)

export const productPath = (id) => `/products/${id}`
