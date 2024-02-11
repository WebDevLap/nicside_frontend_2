export default async function handler(req, res) {
  const {
    query: { category, search, offset },
    method,
  } = req;
  if (method === "GET") {
    let products = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_HOST
      }/entity/assortment?expand=product,product.images,images&limit=100&offset=${offset}&filter=${
        search ? "search=" + search + ";" : ""
      }stockMode=positiveOnly;stockStore=https://online.moysklad.ru/api/remap/1.2/entity/store/8179a7a1-c29d-11eb-0a80-048e00039ac0;quantityMode=positiveOnly${
        category ? ";pathname=" + category : ""
      }`,
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_DADATA_API_KEY,
        },
      }
    );
    products = await products.json();
    res.status(200).json(products);
  } else {
    // Handle any other HTTP method
  }
}
