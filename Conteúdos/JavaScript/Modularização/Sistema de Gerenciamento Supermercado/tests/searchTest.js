import { search } from "../search.js";

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

console.log("\n🧪 SEARCH TESTS\n");

test("Encontra produto por nome", () => {
    const estoque = [{ id: 1, nome: "Mouse" }];
    const res = search(estoque, "Mouse");

    expect(res.length).toBe(1);
});

test("Busca é case insensitive", () => {
    const estoque = [{ id: 1, nome: "Teclado" }];
    const res = search(estoque, "teclado");

    expect(res.length).toBe(1);
});

test("Retorna vazio se não encontrar", () => {
    const estoque = [{ id: 1, nome: "Monitor" }];
    const res = search(estoque, "Mouse");

    expect(res.length).toBe(0);
});

test("Encontra múltiplos resultados", () => {
    const estoque = [
        { id: 1, nome: "Mouse Gamer" },
        { id: 2, nome: "Mousepad" }
    ];

    const res = search(estoque, "Mouse");

    expect(res.length).toBe(2);
});

test("Não altera o array original", () => {
    const estoque = [{ id: 1, nome: "A" }];
    search(estoque, "A");

    expect(estoque.length).toBe(1);
});