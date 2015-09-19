let alreadyWarned = false;
export function debugAssert(test, msg) {
    if (!alreadyWarned) {
        alreadyWarned = true;
        console.log("Don't leave debug assertions on in public builds");
    }
    if (!test) {
        throw new Error(msg || "assertion failure");
    }
}
export function prodAssert() { }
export default debugAssert;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2h0bWxiYXJzLXV0aWwvbGliL2Fzc2VydC50cyJdLCJuYW1lcyI6WyJkZWJ1Z0Fzc2VydCIsInByb2RBc3NlcnQiXSwibWFwcGluZ3MiOiJBQUFBLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztBQUMxQiw0QkFBNEIsSUFBSSxFQUFFLEdBQUc7SUFDbkNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBLENBQUNBO1FBQ25CQSxhQUFhQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUNyQkEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0Esa0RBQWtEQSxDQUFDQSxDQUFDQTtJQUNsRUEsQ0FBQ0E7SUFFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDVkEsTUFBTUEsSUFBSUEsS0FBS0EsQ0FBQ0EsR0FBR0EsSUFBSUEsbUJBQW1CQSxDQUFDQSxDQUFDQTtJQUM5Q0EsQ0FBQ0E7QUFDSEEsQ0FBQ0E7QUFFRCwrQkFBOEJDLENBQUNBO0FBRS9CLGVBQWUsV0FBVyxDQUFDIn0=