import { updateStorage } from "../updateStorage.js";

function test(desc, fn) {
    try { fn(); console.log("✅", desc); }
    catch (e) { console.error("❌", desc, "-", e.message); }
}

function expect(val) {
    return {
        toBe(exp) {
            if (val !== exp) throw new Error(`${val} !== ${exp}`);
        },
        toContain(exp) {
            if (!val.includes(exp)) {
                throw new Error(`Valor não contém ${exp}`);
            }
        }
    };
}

// Mock localStorage
let storage = {};

global.localStorage = {
    setItem(key, value) {
        storage[key] = value;
    },
    getItem(key) {
        return storage[key];
    },
    clear() {
        storage = {};
    }
};

console.log("\n🧪 UPDATE STORAGE TESTS\n");

test("Salva dados no localStorage", () => {
    const dados = [{ id: 1 }];
    updateStorage(dados);

    expect(typeof storage["estoque"]).toBe("string");
});

test("Salva JSON corretamente", () => {
    const dados = [{ id: 1 }];
    updateStorage(dados);

    expect(storage["estoque"]).toContain('"id":1');
});

test("Sobrescreve dados anteriores", () => {
    updateStorage([{ id: 1 }]);
    updateStorage([{ id: 2 }]);

    expect(storage["estoque"]).toContain('"id":2');
});

test("Funciona com array vazio", () => {
    updateStorage([]);

    expect(storage["estoque"]).toBe("[]");
});

test("Não quebra com múltiplas chamadas", () => {
    updateStorage([{ id: 1 }]);
    updateStorage([{ id: 2 }]);
    updateStorage([{ id: 3 }]);

    expect(storage["estoque"]).toContain('"id":3');
});