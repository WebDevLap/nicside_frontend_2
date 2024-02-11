export default async function handler(req, res) {

    const {
        query: {category, search},
        method,
      } = req
    if (method === 'GET') {
        let categories = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/entity/productfolder`, {
            headers: {
              'Authorization': process.env.NEXT_PUBLIC_DADATA_API_KEY
            }
          })
          categories = await categories.json()
        res.status(200).json(categories)
    } else {
      // Handle any other HTTP method
    }
  }
