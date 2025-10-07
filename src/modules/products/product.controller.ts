import { FastifyReply, FastifyRequest } from 'fastify';
import { createProduct, getProducts, updateProduct } from './product.service';
// The input types are no longer needed here, but we'll keep them for clarity if needed later
import { CreateProductInput, GetProductsQuery, UpdateProductInput } from './product.schema';

const PRODUCTS_CACHE_KEY = 'products';

// Handler for creating a product
// Notice we removed the explicit type from 'request'
export async function createProductHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    // request.body is now automatically typed by the schema in the route!
    const product = await createProduct(request.body as CreateProductInput);
    await request.server.redis.del(PRODUCTS_CACHE_KEY);
    return reply.code(201).send(product);
  } catch (e) {
    return reply.code(500).send(e);
  }
}

// Handler for updating a product
export async function updateProductHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    // request.body and request.params are also automatically typed
    const product = await updateProduct(
      (request.params as { id: string }).id,
      request.body as UpdateProductInput
    );
    await request.server.redis.del(PRODUCTS_CACHE_KEY);
    return product;
  } catch (e) {
    return reply.code(500).send(e);
  }
}

// Handler for getting the list of products
export async function getProductsHandler(request: FastifyRequest) {
  const cachedProducts = await request.server.redis.get(PRODUCTS_CACHE_KEY);

  if (cachedProducts) {
    return JSON.parse(cachedProducts);
  }

  // request.query is automatically typed
  const products = await getProducts(request.query as GetProductsQuery);

  await request.server.redis.setex(
    PRODUCTS_CACHE_KEY,
    60,
    JSON.stringify(products)
  );

  return products;
}