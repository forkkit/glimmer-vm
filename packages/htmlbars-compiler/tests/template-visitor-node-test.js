import { preprocess } from "../htmlbars-syntax/parser";
import TemplateVisitor from "../htmlbars-compiler/template-visitor";
function actionsEqual(input, expectedActions) {
    var ast = preprocess(input);
    var templateVisitor = new TemplateVisitor();
    templateVisitor.visit(ast);
    var actualActions = templateVisitor.actions;
    // Remove the AST node reference from the actions to keep tests leaner
    for (var i = 0; i < actualActions.length; i++) {
        actualActions[i][1].shift();
    }
    deepEqual(actualActions, expectedActions);
}
QUnit.module("TemplateVisitor");
test("empty", function () {
    var input = "";
    actionsEqual(input, [
        ['startProgram', [0, []]],
        ['endProgram', [0]]
    ]);
});
test("basic", function () {
    var input = "foo{{bar}}<div></div>";
    actionsEqual(input, [
        ['startProgram', [0, []]],
        ['text', [0, 3]],
        ['mustache', [1, 3]],
        ['openElement', [2, 3, 0, []]],
        ['closeElement', [2, 3]],
        ['endProgram', [0]]
    ]);
});
test("nested HTML", function () {
    var input = "<a></a><a><a><a></a></a></a>";
    actionsEqual(input, [
        ['startProgram', [0, []]],
        ['openElement', [0, 2, 0, []]],
        ['closeElement', [0, 2]],
        ['openElement', [1, 2, 0, []]],
        ['openElement', [0, 1, 0, []]],
        ['openElement', [0, 1, 0, []]],
        ['closeElement', [0, 1]],
        ['closeElement', [0, 1]],
        ['closeElement', [1, 2]],
        ['endProgram', [0]]
    ]);
});
test("mustaches are counted correctly", function () {
    var input = "<a><a>{{foo}}</a><a {{foo}}><a>{{foo}}</a><a>{{foo}}</a></a></a>";
    actionsEqual(input, [
        ['startProgram', [0, []]],
        ['openElement', [0, 1, 2, []]],
        ['openElement', [0, 2, 1, []]],
        ['mustache', [0, 1]],
        ['closeElement', [0, 2]],
        ['openElement', [1, 2, 3, []]],
        ['openElement', [0, 2, 1, []]],
        ['mustache', [0, 1]],
        ['closeElement', [0, 2]],
        ['openElement', [1, 2, 1, []]],
        ['mustache', [0, 1]],
        ['closeElement', [1, 2]],
        ['closeElement', [1, 2]],
        ['closeElement', [0, 1]],
        ['endProgram', [0]]
    ]);
});
test("empty block", function () {
    var input = "{{#a}}{{/a}}";
    actionsEqual(input, [
        ['startProgram', [0, []]],
        ['endProgram', [1]],
        ['startProgram', [1, []]],
        ['block', [0, 1]],
        ['endProgram', [0]]
    ]);
});
test("block with inverse", function () {
    var input = "{{#a}}b{{^}}{{/a}}";
    actionsEqual(input, [
        ['startProgram', [0, []]],
        ['endProgram', [1]],
        ['startProgram', [0, []]],
        ['text', [0, 1]],
        ['endProgram', [1]],
        ['startProgram', [2, []]],
        ['block', [0, 1]],
        ['endProgram', [0]]
    ]);
});
test("nested blocks", function () {
    var input = "{{#a}}{{#a}}<b></b>{{/a}}{{#a}}{{b}}{{/a}}{{/a}}{{#a}}b{{/a}}";
    actionsEqual(input, [
        ['startProgram', [0, []]],
        ['text', [0, 1]],
        ['endProgram', [1]],
        ['startProgram', [0, []]],
        ['mustache', [0, 1]],
        ['endProgram', [2]],
        ['startProgram', [0, []]],
        ['openElement', [0, 1, 0, []]],
        ['closeElement', [0, 1]],
        ['endProgram', [2]],
        ['startProgram', [2, []]],
        ['block', [0, 2]],
        ['block', [1, 2]],
        ['endProgram', [1]],
        ['startProgram', [2, []]],
        ['block', [0, 2]],
        ['block', [1, 2]],
        ['endProgram', [0]]
    ]);
});
test("component", function () {
    var input = "<x-foo>bar</x-foo>";
    actionsEqual(input, [
        ['startProgram', [0, []]],
        ['text', [0, 1]],
        ['endProgram', [1]],
        ['startProgram', [1, []]],
        ['component', [0, 1]],
        ['endProgram', [0]]
    ]);
});
test("comment", function () {
    var input = "<!-- some comment -->";
    actionsEqual(input, [
        ['startProgram', [0, []]],
        ['comment', [0, 1]],
        ['endProgram', [0]]
    ]);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtdmlzaXRvci1ub2RlLXRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaHRtbGJhcnMtY29tcGlsZXIvdGVzdHMvdGVtcGxhdGUtdmlzaXRvci1ub2RlLXRlc3QudHMiXSwibmFtZXMiOlsiYWN0aW9uc0VxdWFsIl0sIm1hcHBpbmdzIjoiT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDJCQUEyQjtPQUMvQyxlQUFlLE1BQU0sdUNBQXVDO0FBRW5FLHNCQUFzQixLQUFLLEVBQUUsZUFBZTtJQUMxQ0EsSUFBSUEsR0FBR0EsR0FBR0EsVUFBVUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7SUFFNUJBLElBQUlBLGVBQWVBLEdBQUdBLElBQUlBLGVBQWVBLEVBQUVBLENBQUNBO0lBQzVDQSxlQUFlQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtJQUMzQkEsSUFBSUEsYUFBYUEsR0FBR0EsZUFBZUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7SUFFNUNBLHNFQUFzRUE7SUFDdEVBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLGFBQWFBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO1FBQzlDQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtJQUM5QkEsQ0FBQ0E7SUFFREEsU0FBU0EsQ0FBQ0EsYUFBYUEsRUFBRUEsZUFBZUEsQ0FBQ0EsQ0FBQ0E7QUFDNUNBLENBQUNBO0FBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBRWhDLElBQUksQ0FBQyxPQUFPLEVBQUU7SUFDWixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDZixZQUFZLENBQUMsS0FBSyxFQUFFO1FBQ2xCLENBQUMsY0FBYyxFQUFFLENB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