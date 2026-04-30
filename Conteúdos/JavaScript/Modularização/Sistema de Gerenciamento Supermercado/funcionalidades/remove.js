import { estoque } from '../estoque.js'
import { updateStorage } from './updateStorage.js';

export function remove(id){
    const index = estoque.findIndex(p => p.id === id);
    if (index !== -1) {
        estoque.splice(index, 1);
        updateStorage();
        return true;
    }
    return false;
}