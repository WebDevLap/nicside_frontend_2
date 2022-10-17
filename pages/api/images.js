export default async function handler(req, res) {

    const {
        query: {url, search},
        method,
      } = req

    if (method === 'GET') {
        let response = await fetch(url, {
            headers: {
              'Authorization': '423583fb7dcb990fb44b9dfe79caf1bea689f321'
            }
        })

        let img_url = ''

       let blob = await response.blob()
       console.log()
       const arrbuffer = await blob.arrayBuffer()

       const buffer = Buffer.from(arrbuffer, 'binary')

       console.log(buffer)

        res.status(200).send(buffer)
    } else {
      // Handle any other HTTP method
    }
  }