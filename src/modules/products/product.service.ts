import { Prisma } from '@prisma/client';
import { prisma } from '../../prisma';
import { CreateProductInput, GetProductsQuery, UpdateProductInput } from './product.schema';

// Crée un nouveau produit
export async function createProduct(data: CreateProductInput) {
  return prisma.product.create({ data });
}

// Met à jour un produit par son ID
export async function updateProduct(id: string, data: UpdateProductInput) {
  return prisma.product.update({
    where: { id },
    data,
  });
}

// Récupère la liste des produits avec recherche et pagination
export async function getProducts(query: GetProductsQuery) {
  const { search, page = 1, limit = 10 } = query;

  // On donne un type explicite à notre variable 'where'
  const where: Prisma.ProductWhereInput = search
    ? {
        name: {
          contains: search,
          mode: 'insensitive', // TypeScript sait maintenant que c'est correct
        },
      }
    : {};

  const [products, total] = await prisma.$transaction([
    prisma.product.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);

  return { products, total, page, limit };
}