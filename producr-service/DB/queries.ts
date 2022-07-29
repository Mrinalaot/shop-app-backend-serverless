export const getProductListQuery = (productId: string = '') => `select 
    p.id,p.title,p.price,s.count  
    from products p 
    inner join store s 
    on (p.id = s.product_id) ${productId ? `where p.id = '${productId}'` : ""}`;

export const insertProductQuery = () => `INSERT INTO products (title, description, price) VALUES($1,$2, $3) RETURNING *`;
export const insertStoreQuery = () => `INSERT INTO store (product_id, count) VALUES($1,$2) RETURNING *`;

