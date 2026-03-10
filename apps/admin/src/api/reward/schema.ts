import { z } from 'zod';

export const ProductTypeEnum = z.enum(['DATA', 'GIFTICON']);

export const ProductSchema = z.object({
  id: z.number().int().positive(),
  type: ProductTypeEnum,
  imgUrl: z.string().nullable(),
  productName: z.string().min(1, '상품명은 필수입니다.'),
  price: z.number().nonnegative(),
});

// TODO : API 연결 후 제거 예정
export interface Product {
  id: number;
  type: 'DATA' | 'GIFTICON';
  imgUrl: string | null;
  productName: string;
  price: number;
}

export const ProductListSchema = z.array(ProductSchema);

// export type Product = z.infer<typeof ProductSchema>;
