CREATE TABLE lancamento_contabil (
    id SERIAL PRIMARY KEY,
    conta_id INTEGER NOT NULL REFERENCES conta_contabil(id),
    data_lancamento DATE NOT NULL,
    valor NUMERIC(12, 2) NOT NULL,
    observacao TEXT
);
