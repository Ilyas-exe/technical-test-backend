import { z } from 'zod';

// Schéma pour la création d'un produit
export const createProductSchema = z.object({
  name: z.string(),
  price_cents: z.number().int().positive(),
  stock: z.number().int().min(0),
});

// Schéma pour la mise à jour d'un produit (tous les champs sont optionnels)
export const updateProductSchema = createProductSchema.partial();

// Schéma pour les paramètres de la requête GET /products
export const getProductsSchema = z.object({
  search: z.string().optional(),
  // On transforme les params en nombres, avec des valeurs par défaut
  page: z.coerce.number().int().min(1).default(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(10).optional(),
});

// Schéma pour la réponse de la liste des produits
export const productResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  price_cents: z.number(),
  stock: z.number(),
  active: z.boolean(),
  createdAt: z.date(),
});

export const productsResponseSchema = z.object({
  products: z.array(productResponseSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});

// Types TypeScript dérivés de nos schémas
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type GetProductsQuery = z.infer<typeof getProductsSchema>;