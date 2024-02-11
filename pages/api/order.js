
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
              'Authorization': process.env.NEXT_PUBLIC_DADATA_API_KEY,
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
