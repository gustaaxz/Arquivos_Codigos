import { list } from "../list.js";

let output;
const original = console.table;

function mock() {
    console.table = (data) => output = data;
}

function restore() {
    console.table = original;
    output = null;
}

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

console.log("\n🧪 LIST TESTS\n");

test("Lista produtos corretamente", () => {
    global.estoque = [{ id: 1 }];
    mock();

    list();

    expect(output.length).toBe(1);
    restore();
});

test("Lista vazio corretamente", () => {
    global.estoque = [];
    mock();

    list();

    expect(output.length).toBe(0);
    restore();
});

test("Mantém estrutura dos dados", () => {
    global.estoque = [{ id: 1, nome: "A" }];
    mock();

    list();

    expect(output[0].nome).toBe("A");
    restore();
});

test("Não altera o estoque", () => {
    const estoque = [{ id: 1 }];
    global.estoque = estoque;
    mock();

    list();

    expect(estoque.length).toBe(1);
    restore();
});

test("Chama console.table", () => {
    global.estoque = [{ id: 1 }];
    let chamado = false;

    console.table = () => chamado = true;

    list();

    expect(chamado).toBe(true);

    console.table = original;
});