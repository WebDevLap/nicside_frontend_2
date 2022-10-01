export default async function handler(req, res) {

    const {
        query: {category, search},
        method,
      } = req

    if (method === 'GET') {
        console.log(search)
        let products = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/entity/assortment?expand=product,product.images,images&limit=100&filter=${search ? 'search=' + search + ';' : ''}stockMode=positiveOnly;stockStore=https://online.moysklad.ru/api/remap/1.2/entity/store/8179a7a1-c29d-11eb-0a80-048e00039ac0;quantityMode=positiveOnly${category ? ';pathname=' + category: ''}`, {
            headers: {
            'Authorization': 'f57f5925ec35cc1d94f1aff9bb4c6cf25c261deb'
            }
        })
        products = await products.json()
        res.status(200).json(products)
    } else {
      // Handle any other HTTP method
    }
  }