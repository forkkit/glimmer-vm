import visitorKeys from '../types/visitor-keys';
import { cannotRemoveNode, cannotReplaceNode, cannotReplaceOrRemoveInKeyHandlerYet } from './errors';
function visitNode(visitor, node) {
    let handler = visitor[node.type] || visitor.All;
    let result;
    if (handler && handler.enter) {
        result = handler.enter.call(null, node);
    }
    if (result === undefined) {
        let keys = visitorKeys[node.type];
        for (let i = 0; i < keys.length; i++) {
            visitKey(visitor, handler, node, keys[i]);
        }
        if (handler && handler.exit) {
            result = handler.exit.call(null, node);
        }
    }
    return result;
}
function visitKey(visitor, handler, node, key) {
    let value = node[key];
    if (!value) {
        return;
    }
    let keyHandler = handler && (handler.keys[key] || handler.keys.All);
    let result;
    if (keyHandler && keyHandler.enter) {
        result = keyHandler.enter.call(null, node, key);
        if (result !== undefined) {
            throw cannotReplaceOrRemoveInKeyHandlerYet(node, key);
        }
    }
    if (Array.isArray(value)) {
        visitArray(visitor, value);
    }
    else {
        let result = visitNode(visitor, value);
        if (result !== undefined) {
            assignKey(node, key, result);
        }
    }
    if (keyHandler && keyHandler.exit) {
        result = keyHandler.exit.call(null, node, key);
        if (result !== undefined) {
            throw cannotReplaceOrRemoveInKeyHandlerYet(node, key);
        }
    }
}
function visitArray(visitor, array) {
    for (let i = 0; i < array.length; i++) {
        let result = visitNode(visitor, array[i]);
        if (result !== undefined) {
            i += spliceArray(array, i, result) - 1;
        }
    }
}
function assignKey(node, key, result) {
    if (result === null) {
        throw cannotRemoveNode(node[key], node, key);
    }
    else if (Array.isArray(result)) {
        if (result.length === 1) {
            node[key] = result[0];
        }
        else {
            if (result.length === 0) {
                throw cannotRemoveNode(node[key], node, key);
            }
            else {
                throw cannotReplaceNode(node[key], node, key);
            }
        }
    }
    else {
        node[key] = result;
    }
}
function spliceArray(array, index, result) {
    if (result === null) {
        array.splice(index, 1);
        return 0;
    }
    else if (Array.isArray(result)) {
        array.splice(index, 1, ...result);
        return result.length;
    }
    else {
        array.splice(index, 1, result);
        return 1;
    }
}
export default function traverse(node, visitor) {
    visitNode(normalizeVisitor(visitor), node);
}
export function normalizeVisitor(visitor) {
    let normalizedVisitor = {};
    for (let type in visitor) {
        let handler = visitor[type] || visitor.All;
        let normalizedKeys = {};
        if (typeof handler === 'object') {
            let keys = handler.keys;
            if (keys) {
                for (let key in keys) {
                    let keyHandler = keys[key];
                    if (typeof keyHandler === 'object') {
                        normalizedKeys[key] = {
                            enter: (typeof keyHandler.enter === 'function') ? keyHandler.enter : null,
                            exit: (typeof keyHandler.exit === 'function') ? keyHandler.exit : null
                        };
                    }
                    else if (typeof keyHandler === 'function') {
                        normalizedKeys[key] = {
                            enter: keyHandler,
                            exit: null
                        };
                    }
                }
            }
            normalizedVisitor[type] = {
                enter: (typeof handler.enter === 'function') ? handler.enter : null,
                exit: (typeof handler.exit === 'function') ? handler.exit : null,
                keys: normalizedKeys
            };
        }
        else if (typeof handler === 'function') {
            normalizedVisitor[type] = {
                enter: handler,
                exit: null,
                keys: normalizedKeys
            };
        }
    }
    return normalizedVisitor;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhdmVyc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvaHRtbGJhcnMtc3ludGF4L2xpYi90cmF2ZXJzYWwvdHJhdmVyc2UudHMiXSwibmFtZXMiOlsidmlzaXROb2RlIiwidmlzaXRLZXkiLCJ2aXNpdEFycmF5IiwiYXNzaWduS2V5Iiwic3BsaWNlQXJyYXkiLCJ0cmF2ZXJzZSIsIm5vcm1hbGl6ZVZpc2l0b3IiXSwibWFwcGluZ3MiOiJPQUFPLFdBQVcsTUFBTSx1QkFBdUI7T0FDeEMsRUFDTCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLG9DQUFvQyxFQUNyQyxNQUFNLFVBQVU7QUFFakIsbUJBQW1CLE9BQU8sRUFBRSxJQUFJO0lBQzlCQSxJQUFJQSxPQUFPQSxHQUFHQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQTtJQUNoREEsSUFBSUEsTUFBTUEsQ0FBQ0E7SUFFWEEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsSUFBSUEsT0FBT0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDN0JBLE1BQU1BLEdBQUdBLE9BQU9BLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO0lBQzFDQSxDQUFDQTtJQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxLQUFLQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUN6QkEsSUFBSUEsSUFBSUEsR0FBR0EsV0FBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFFbENBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO1lBQ3JDQSxRQUFRQSxDQUFDQSxP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