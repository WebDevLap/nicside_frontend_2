export default async function handler(req, res) {

    const {
        query: {category, search},
        method,
      } = req

    if (method === 'GET') {
        console.log(search)
        let settings = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/context/usersettings`, {
            headers: {
              'Authorization': '423583fb7dcb990fb44b9dfe79caf1bea689f321'
            }
          })
          settings = await settings.json()
        res.status(200).json(settings)
    } else {
      // Handle any other HTTP method
    }
  }