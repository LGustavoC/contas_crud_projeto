CREATE TABLE conta_contabil (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    valor DOUBLE PRECISION NOT NULL,
    natureza VARCHAR(1) NOT NULL CHECK (natureza IN ('D', 'C'))
);
