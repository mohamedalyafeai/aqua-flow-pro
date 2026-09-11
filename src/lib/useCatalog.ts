import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listProducts } from "@/lib/products.functions";
import { productModels, type ProductModel } from "@/lib/catalog";
import type { PumpType } from "@/lib/site-data";

/**
 * Product models for the public pages.
 *
 * Reads the models the owner manages in the dashboard; until anything has been
 * saved there, the starter catalog that ships with the site is used so the
 * pages are never empty.
 */
export function useCatalog() {
  const fetchProducts = useServerFn(listProducts);
  const { data } = useQuery({
    queryKey: ["public-products"],
    queryFn: () => fetchProducts({}),
    staleTime: 60_000,
  });

  const dbModels = data?.models ?? [];
  const models: ProductModel[] = dbModels.length > 0 ? dbModels : productModels;

  return {
    models,
    isManaged: dbModels.length > 0,
    byCategory: (category: PumpType | string) => models.filter((m) => m.category === category),
    priceRange: (category: PumpType | string) => {
      const list = models.filter((m) => m.category === category);
      if (list.length === 0) return null;
      return {
        min: Math.min(...list.map((m) => m.priceMin)),
        max: Math.max(...list.map((m) => m.priceMax)),
      };
    },
  };
}
