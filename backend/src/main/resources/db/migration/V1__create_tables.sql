CREATE TABLE products (
                          id BIGSERIAL PRIMARY KEY,
                          code VARCHAR(100) UNIQUE NOT NULL,
                          name VARCHAR(255) NOT NULL,
                          price NUMERIC(10,2) NOT NULL
);

CREATE TABLE raw_materials (
                               id BIGSERIAL PRIMARY KEY,
                               name VARCHAR(255) UNIQUE NOT NULL,
                               stock_quantity INTEGER NOT NULL
);

CREATE TABLE product_materials (
                                   id BIGSERIAL PRIMARY KEY,

                                   product_id BIGINT NOT NULL,
                                   raw_material_id BIGINT NOT NULL,

                                   quantity INTEGER NOT NULL,

                                   CONSTRAINT fk_product
                                       FOREIGN KEY(product_id)
                                           REFERENCES products(id)
                                           ON DELETE CASCADE,

                                   CONSTRAINT fk_raw_material
                                       FOREIGN KEY(raw_material_id)
                                           REFERENCES raw_materials(id)
                                           ON DELETE CASCADE,

                                   CONSTRAINT unique_product_material
                                       UNIQUE(product_id, raw_material_id)
);
