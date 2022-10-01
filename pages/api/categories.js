export default async function handler(req, res) {

    const {
        query: {category, search},
        method,
      } = req

    if (method === 'GET') {
        console.log(search)
        let categories = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/entity/productfolder`, {
            headers: {
              'Authorization': 'f57f5925ec35cc1d94f1aff9bb4c6cf25c261deb'
            }
          })
          categories = await categories.json()
        res.status(200).json(categories)
    } else {
      // Handle any other HTTP method
    }
  }