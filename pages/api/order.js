
export default async function handler(req, res) {

    const {
        body,
        method,
      } = req

    if (method === 'POST') {
        console.log(body)
        let order = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/entity/customerorder`, {
            method: 'POST',
            headers: {
              'Authorization': 'f57f5925ec35cc1d94f1aff9bb4c6cf25c261deb',
              'Content-Type': 'application/json'
            },
            body: body
          })
          order = await order.json()
        res.status(200).json(order)
    } else {
      // Handle any other HTTP method
    }
  }