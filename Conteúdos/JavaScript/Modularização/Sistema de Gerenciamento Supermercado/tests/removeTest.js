import { remove as deletarProduto } from "../funcionalidades/remove.js";

function test(desc, fn) {
    try { fn(); console.log("✅", desc); }
    catch (e) { console.error("❌", desc, "-", e.message); }
}

function expect(val) {
    return {
        toBe(exp) {
            if (val !== exp) throw new Error(`${val} !== ${exp}`);
        }
    };
}

console.log("\n🧪 DELETE TESTS\n");

test("Remove produto existente", () => {
    const estoque = [{ id: 1 }, { id: 2 }];
    deletarProduto(estoque, 1);

    expect(estoque.length).toBe(1);
});

test("Remove produto correto", () => {
    const estoque = [{ id: 1 }, { id: 2 }];
    deletarProduto(estoque, 1);

    expect(estoque[0].id).toBe(2);
});

test("Não remove se ID não existe", () => {
    const estoque = [{ id: 1 }];
    deletarProduto(estoque, 99);

    expect(estoque.length).toBe(1);
});

test("Remove último elemento", () => {
    const estoque = [{ id: 1 }];
    deletarProduto(estoque, 1);

    expect(estoque.length).toBe(0);
});

test("Funciona com múltiplas remoções", () => {
    const estoque = [{ id: 1 }, { id: 2 }, { id: 3 }];
    deletarProduto(estoque, 2);

    expect(estoque.length).toBe(2);
});