import { preprocess } from "htmlbars-syntax";
import { NewTemplateCompiler } from "./template-compiler";
import { Template } from "htmlbars-runtime";
/*
 * Compile a string into a template spec string. The template spec is a string
 * representation of a template. Usually, you would use compileSpec for
 * pre-compilation of a template on the server.
 *
 * Example usage:
 *
 *     var templateSpec = compileSpec("Howdy {{name}}");
 *     // This next step is basically what plain compile does
 *     var template = new Function("return " + templateSpec)();
 *
 * @method compileSpec
 * @param {String} string An HTMLBars template string
 * @return {TemplateSpec} A template spec string
 */
export function compileSpec(string, options) {
    var ast = preprocess(string, options);
    var program = NewTemplateCompiler.compile(options, ast);
    return JSON.stringify(program);
}
/*
 * @method template
 * @param {TemplateSpec} templateSpec A precompiled template
 * @return {Template} A template spec string
 */
export function template(templateSpec) {
    return new Function("return " + templateSpec)();
}
/*
 * Compile a string into a template rendering function
 *
 * Example usage:
 *
 *     // Template is the hydration portion of the compiled template
 *     var template = compile("Howdy {{name}}");
 *
 *     // Template accepts three arguments:
 *     //
 *     //   1. A context object
 *     //   2. An env object
 *     //   3. A contextualElement (optional, document.body is the default)
 *     //
 *     // The env object *must* have at least these two properties:
 *     //
 *     //   1. `hooks` - Basic hooks for rendering a template
 *     //   2. `dom` - An instance of DOMHelper
 *     //
 *     import {hooks} from 'htmlbars-runtime';
 *     import {DOMHelper} from 'morph';
 *     var context = {name: 'whatever'},
 *         env = {hooks: hooks, dom: new DOMHelper()},
 *         contextualElement = document.body;
 *     var domFragment = template(context, env, contextualElement);
 *
 * @method compile
 * @param {String} string An HTMLBars template string
 * @param {Object} options A set of options to provide to the compiler
 * @return {Template} A function for rendering the template
 */
export function compile(string, options) {
    let templateSpec = template(compileSpec(string, options));
    return Template.fromSpec(templateSpec);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaHRtbGJhcnMtY29tcGlsZXIvbGliL2NvbXBpbGVyLnRzIl0sIm5hbWVzIjpbImNvbXBpbGVTcGVjIiwidGVtcGxhdGUiLCJjb21waWxlIl0sIm1hcHBpbmdzIjoiT0FDTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQjtPQUNyQyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUJBQXFCO09BQ2xELEVBQUUsUUFBUSxFQUFFLE1BQU0sa0JBQWtCO0FBRTNDOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBQ0gsNEJBQTRCLE1BQU0sRUFBRSxPQUFPO0lBQ3pDQSxJQUFJQSxHQUFHQSxHQUFHQSxVQUFVQSxDQUFDQSxNQUFNQSxFQUFFQSxPQUFPQSxDQUFDQSxDQUFDQTtJQUN0Q0EsSUFBSUEsT0FBT0EsR0FBR0EsbUJBQW1CQSxDQUFDQSxPQUFPQSxDQUFDQSxPQUFPQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtJQUN4REEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7QUFDakNBLENBQUNBO0FBRUQ7Ozs7R0FJRztBQUNILHlCQUF5QixZQUFZO0lBQ25DQyxNQUFNQSxDQUFDQSxJQUFJQSxRQUFRQSxDQUFDQSxTQUFTQSxHQUFHQSxZQUFZQSxDQUFDQSxFQUFFQSxDQUFDQTtBQUNsREEsQ0FBQ0E7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBQ0gsd0JBQXdCLE1BQU0sRUFBRSxPQUFPO0lBQ3JDQyxJQUFJQSxZQUFZQSxHQUFHQSxRQUFRQSxDQUFDQSxXQUFXQSxDQUFDQSxNQUFNQSxFQUFFQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUMxREEsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0E7QUFDekNBLENBQUNBIn0=