export default async function handler(req, res) {

    const {
        query: {category, search},
        method,
      } = req

    if (method === 'GET') {
        console.log(search)
        let settings = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/context/usersettings`, {
            headers: {
              'Authorization': process.env.NEXT_PUBLIC_DADATA_API_KEY,
            }
          })
          settings = await settings.json()
        res.status(200).json(settings)
    } else {
      // Handle any other HTTP method
    }
  }
