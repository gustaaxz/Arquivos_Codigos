import { edit as editarProduto } from "../funcionalidades/edit.js";

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

console.log("\n🧪 EDIT TESTS\n");

test("Edita nome corretamente", () => {
    const estoque = [{ id: 1, nome: "A" }];
    const p = editarProduto(estoque, 1, { nome: "B" });

    expect(p.nome).toBe("B");
});

test("Edita múltiplos campos", () => {
    const estoque = [{ id: 1, nome: "A", preco: 10 }];
    const p = editarProduto(estoque, 1, { nome: "B", preco: 20 });

    expect(p.nome).toBe("B");
    expect(p.preco).toBe(20);
});

test("Mantém ID inalterado", () => {
    const estoque = [{ id: 1 }];
    const p = editarProduto(estoque, 1, { id: 999 });

    expect(p.id).toBe(1);
});

test("Não altera outros produtos", () => {
    const estoque = [{ id: 1 }, { id: 2 }];
    editarProduto(estoque, 1, { nome: "X" });

    expect(estoque[1].id).toBe(2);
});

test("Atualiza corretamente no array", () => {
    const estoque = [{ id: 1, nome: "Old" }];
    editarProduto(estoque, 1, { nome: "New" });

    expect(estoque[0].nome).toBe("New");
});