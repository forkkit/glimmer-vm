import { parse } from "../htmlbars-syntax";
QUnit.module("[htmlbars-syntax] Parser - Location Info");
function locEqual(node, startLine, startColumn, endLine, endColumn, message) {
    var expected = {
        source: null,
        start: { line: startLine, column: startColumn },
        end: { line: endLine, column: endColumn }
    };
    deepEqual(node.loc, expected, message);
}
test("programs", function () {
    var ast = parse(`
  {{#if foo}}
    {{bar}}
       {{/if}}
    `);
    locEqual(ast, 1, 0, 5, 4, 'outer program');
    // startColumn should be 13 not 2.
    // This should be fixed upstream in Handlebars.
    locEqual(ast.body[1].program, 2, 2, 4, 7, 'nested program');
});
test("blocks", function () {
    var ast = parse(`
  {{#if foo}}
    {{#if bar}}
        test
        {{else}}
      test
  {{/if    }}
       {{/if
      }}
    `);
    locEqual(ast.body[1], 2, 2, 9, 8, 'outer block');
    locEqual(ast.body[1].program.body[0], 3, 4, 7, 13, 'nested block');
});
test("mustache", function () {
    var ast = parse(`
    {{foo}}
    {{#if foo}}
      bar: {{bar
        }}
    {{/if}}
  `);
    locEqual(ast.body[1], 2, 4, 2, 11, 'outer mustache');
    locEqual(ast.body[3].program.body[1], 4, 11, 5, 10, 'inner mustache');
});
test("element modifier", function () {
    var ast = parse(`
    <div {{bind-attr
      foo
      bar=wat}}></div>
  `);
    locEqual(ast.body[1].modifiers[0], 2, 9, 4, 15, 'element modifier');
});
test("html elements", function () {
    var ast = parse(`
    <section>
      <br>
      <div>
        <hr />
      </div>
    </section>
  `);
    let [, section] = ast.body;
    let [, br, , div] = section.children;
    let [, hr] = div.children;
    locEqual(section, 2, 4, 7, 14, 'section element');
    locEqual(br, 3, 6, 3, 10, 'br element');
    locEqual(div, 4, 6, 6, 12, 'div element');
    locEqual(hr, 5, 8, 5, 14, 'hr element');
});
test("components", function () {
    var ast = parse(`
    <el-page>
      <el-header></el-header>
      <el-input />
      <el-footer>
          </el-footer>
    </el-page>
  `);
    let [, page] = ast.body;
    let [, header, , input, , footer] = page.program.body;
    locEqual(page, 2, 4, 7, 14, 'page component');
    locEqual(header, 3, 6, 3, 29, 'header component');
    locEqual(input, 4, 6, 4, 18, 'input component');
    locEqual(footer, 5, 6, 6, 22, 'footer component');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jLW5vZGUtdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9odG1sYmFycy1zeW50YXgvdGVzdHMvbG9jLW5vZGUtdGVzdC50cyJdLCJuYW1lcyI6WyJsb2NFcXVhbCJdLCJtYXBwaW5ncyI6Ik9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxvQkFBb0I7QUFFMUMsS0FBSyxDQUFDLE1BQU0sQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO0FBRXpELGtCQUFrQixJQUFJLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU87SUFFekVBLElBQUlBLFFBQVFBLEdBQUdBO1FBQ2JBLE1BQU1BLEVBQUVBLElBQUlBO1FBQ1pBLEtBQUtBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLFNBQVNBLEVBQUVBLE1BQU1BLEVBQUVBLFdBQVdBLEVBQUVBO1FBQy9DQSxHQUFHQSxFQUFFQSxFQUFFQSxJQUFJQSxFQUFFQSxPQUFPQSxFQUFFQSxNQUFNQSxFQUFFQSxTQUFTQSxFQUFFQTtLQUMxQ0EsQ0FBQ0E7SUFFRkEsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsRUFBRUEsUUFBUUEsRUFBRUEsT0FBT0EsQ0FBQ0EsQ0FBQ0E7QUFDekNBLENBQUNBO0FBRUQsSUFBSSxDQUFDLFVBQVUsRUFBRTtJQUNmLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQzs7OztLQUliLENBQUMsQ0FBQztJQUVMLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBRTNDLGtDQUFrQztJQUNsQywrQ0FBK0M7SUFDL0MsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzlELENBQUMsQ0FB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