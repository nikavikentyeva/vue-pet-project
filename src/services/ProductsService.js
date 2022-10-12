const API_URL = 'https://dummyjson.com'

class ProductService {

  async getSingle (id) {
    let res = await fetch(API_URL + '/products/' + id)
    return res.json()
  }

  async all (queryString = '', skip = 0) {
    let res = await fetch(API_URL + '/products/search?q=' + queryString + '&limit=3&skip=' + skip)
    return res.json()
  }

  async edit (id, title) {
    let res = await fetch(API_URL + '/products/' + id, {
      method: 'PUT', /* or PATCH */
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title
      })
    })
    return res.json()
  }

  async getAllProductsCategories () {
    let res = await fetch(API_URL + '/products/categories')
    return res.json()
  }
  async removeProduct (id) {
    let res = await fetch(API_URL + '/products/' + id, {
      method: 'DELETE',
    })
    return res.json()
  }

  async getProductsOfACategory (category) {
    let res = await fetch(API_URL + '/products/category/' + category)
    return res.json()
  }
  async addProduct (product) {
    await fetch(API_URL + '/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: product.title,
        desc: product.desc,
        price: product.price,
        rating: product.rating,
      })
    })
  }
}

export default new ProductService()