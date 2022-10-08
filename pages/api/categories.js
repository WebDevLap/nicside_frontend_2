export default async function handler(req, res) {

    const {
        query: {category, search},
        method,
      } = req

    if (method === 'GET') {
        console.log(search)
        let categories = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/entity/productfolder`, {
            headers: {
              'Authorization': '423583fb7dcb990fb44b9dfe79caf1bea689f321'
            }
          })
          categories = await categories.json()
        res.status(200).json(categories)
    } else {
      // Handle any other HTTP method
    }
  }