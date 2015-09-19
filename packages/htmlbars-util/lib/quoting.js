function escapeString(str) {
    str = str.replace(/\\/g, "\\\\");
    str = str.replace(/"/g, '\\"');
    str = str.replace(/\n/g, "\\n");
    return str;
}
export { escapeString };
function string(str) {
    return '"' + escapeString(str) + '"';
}
export { string };
function array(a) {
    return "[" + a + "]";
}
export { array };
export function hash(pairs) {
    return "{" + pairs.join(", ") + "}";
}
export function repeat(chars, times) {
    var str = "";
    while (times--) {
        str += chars;
    }
    return str;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVvdGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9odG1sYmFycy11dGlsL2xpYi9xdW90aW5nLnRzIl0sIm5hbWVzIjpbImVzY2FwZVN0cmluZyIsInN0cmluZyIsImFycmF5IiwiaGFzaCIsInJlcGVhdCJdLCJtYXBwaW5ncyI6IkFBQUEsc0JBQXNCLEdBQUc7SUFDdkJBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLEtBQUtBLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBO0lBQ2pDQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQTtJQUMvQkEsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7SUFDaENBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBO0FBQ2JBLENBQUNBO0FBRUQsU0FBUyxZQUFZLEdBQUc7QUFFeEIsZ0JBQWdCLEdBQUc7SUFDakJDLE1BQU1BLENBQUNBLEdBQUdBLEdBQUdBLFlBQVlBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBO0FBQ3ZDQSxDQUFDQTtBQUVELFNBQVMsTUFBTSxHQUFHO0FBRWxCLGVBQWUsQ0FBQztJQUNkQyxNQUFNQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQTtBQUN2QkEsQ0FBQ0E7QUFFRCxTQUFTLEtBQUssR0FBRztBQUVqQixxQkFBcUIsS0FBSztJQUN4QkMsTUFBTUEsQ0FBQ0EsR0FBR0EsR0FBR0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0E7QUFDdENBLENBQUNBO0FBRUQsdUJBQXVCLEtBQUssRUFBRSxLQUFLO0lBQ2pDQyxJQUFJQSxHQUFHQSxHQUFHQSxFQUFFQSxDQUFDQTtJQUNiQSxPQUFPQSxLQUFLQSxFQUFFQSxFQUFFQSxDQUFDQTtRQUNmQSxHQUFHQSxJQUFJQSxLQUFLQSxDQUFDQTtJQUNmQSxDQUFDQTtJQUNEQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQTtBQUNiQSxDQUFDQSJ9