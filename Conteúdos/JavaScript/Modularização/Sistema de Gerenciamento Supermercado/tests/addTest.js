import { add as adicionarProduto } from "../funcionalidades/add.js";

function test(desc, fn) {
    try { fn(); console.log("✅", desc); }
    catch (e) { console.error("❌", desc, "-", e.message); }
}

function expect(val) {
    return {
        toBe(exp) {
            if (val !== exp) throw new Error(`${val} !== ${exp}`);
        },
        toEqual(exp) {
            if (JSON.stringify(val) !== JSON.stringify(exp)) {
                throw new Error(`Esperado ${JSON.stringify(exp)} mas recebeu ${JSON.stringify(val)}`);
            }
        }
    };
}

console.log("\n🧪 ADD TESTS\n");

test("Adiciona produto corretamente", () => {
    const estoque = [];
    const p = adicionarProduto(estoque, { nome: "Mouse", preco: 100, quantidade: 2 });

    expect(estoque.length).toBe(1);
    expect(p.id).toBe(1);
});

test("Incrementa ID automaticamente", () => {
    const estoque = [{ id: 1 }];
    const p = adicionarProduto(estoque, { nome: "Teclado", preco: 200, quantidade: 1 });

    expect(p.id).toBe(2);
});

test("Mantém produtos existentes", () => {
    const estoque = [{ id: 1, nome: "A" }];
    adicionarProduto(estoque, { nome: "B", preco: 10, quantidade: 1 });

    expect(estoque[0].nome).toBe("A");
    expect(estoque.length).toBe(2);
});

test("Retorna objeto criado corretamente", () => {
    const estoque = [];
    const p = adicionarProduto(estoque, { nome: "C", preco: 50, quantidade: 5 });

    expect(p.nome).toBe("C");
    expect(p.preco).toBe(50);
});

test("Aceita múltiplos produtos sequenciais", () => {
    const estoque = [];
    adicionarProduto(estoque, { nome: "A", preco: 1, quantidade: 1 });
    adicionarProduto(estoque, { nome: "B", preco: 2, quantidade: 2 });

    expect(estoque.length).toBe(2);
    expect(estoque[1].id).toBe(2);
});