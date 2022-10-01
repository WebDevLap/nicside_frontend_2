export default async function handler(req, res) {

    const {
        query: {url, search},
        method,
      } = req

    if (method === 'GET') {
        let response = await fetch(url, {
            headers: {
              'Authorization': 'f57f5925ec35cc1d94f1aff9bb4c6cf25c261deb'
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