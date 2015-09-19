import { RegionMorph, EmptyInsertion } from "./region";
import { HelperParamsReference } from "../reference";
import { assert } from "htmlbars-util";
export class SimpleBlockMorph extends RegionMorph {
    init({ template }) {
        super.init();
        this._template = template;
        this._lastResult = null;
        this._yieldableBlock = null;
    }
    append() {
        this._lastResult = this._template.evaluate(this, this._frame);
    }
    update(strategy) {
        this._lastResult.revalidateWith(this._frame, strategy);
    }
}
export class ScopedBlockMorph extends RegionMorph {
    init({ template, self, blockArguments }) {
        super.init();
        this._template = template;
        this._self = self;
        this._blockArguments = blockArguments;
    }
    append() {
        this._lastResult = this._template.evaluate(this, this._frame);
    }
}
export class BlockHelperMorph extends RegionMorph {
    init({ path, params, templates }) {
        super.init();
        let _frame = this._frame;
        this._params = HelperParamsReference.fromStatements({ params, frame: _frame });
        this._group = new YieldableTemplates(templates, { morph: this, frame: _frame, blockKind: appendBlock });
        this._helper = _frame.lookupHelper(path);
    }
    _invokeHelper() {
        let { params, hash } = this._params.value();
        let _group = this._group;
        _group.begin();
        this._helper.call(undefined, params, hash, { template: _group.default, inverse: _group.inverse });
        _group.commit();
        return _group.rendered;
    }
    render() {
        let rendered = this._invokeHelper();
        if (!rendered)
            this._region.replace(new EmptyInsertion());
    }
}
class YieldableTemplates {
    constructor({ _default: defaultTemplate, _inverse: inverseTemplate }, { morph, frame, blockKind }) {
        this.default = blockKind({ morph, frame, template: defaultTemplate, group: this });
        this.inverse = blockKind({ morph, frame, template: inverseTemplate, group: this });
        this.rendered = false;
    }
    begin() {
        this.rendered = false;
    }
    commit() {
        this.blockKind = updateBlock;
    }
}
class YieldableTemplate {
    constructor(template, morph, frame, group) {
        this._template = template;
        this._morph = morph;
        this._frame = frame;
        this._group = group;
    }
    render() {
        this._group.rendered = true;
        this._morph.renderTemplate(this._template);
    }
}
class YieldableTemplateWithoutLocals extends YieldableTemplate {
    append(self, blockArguments) {
        assert(!blockArguments, "This template doesn't have locals, so you can't yield block arguments to it");
        if (self !== undefined) {
            this._frame.childScope().bindSelf(self);
        }
    }
    update(self, blockArguments) {
        assert(!blockArguments, "This template doesn't have locals, so you can't yield block arguments to it");
        if (self !== undefined) {
            this._frame.scope().updateSelf(self);
        }
    }
}
class YieldableTemplateWithLocals extends YieldableTemplate {
    append(self, blockArguments) {
        let scope = this._frame.childScope(this._template.locals);
        if (self !== undefined) {
            scope.bindSelf(self);
        }
        scope.bindLocals(blockArguments);
    }
    update(self, blockArguments) {
        let scope = this._frame.scope();
        if (self !== undefined) {
            scope.updateSelf(self);
        }
        scope.updateLocals(blockArguments);
    }
}
function appendBlock({ morph, frame, template, group }) {
    if (!template)
        return null; // TODO: specialize better
    let Type = template.arity ? YieldableTemplateWithLocals : YieldableTemplateWithoutLocals;
    let block = morph.yieldableBlock = new Type(template, morph, frame, group);
    return {
        arity: template.arity,
        yield(blockArguments, self) {
            block.append(self, blockArguments);
            block.render();
        }
    };
}
function updateBlock(template, morph) {
    if (!template)
        return null; // TODO: specialize better
    let block = morph.yieldableBlock;
    return {
        arity: template.arity,
        yield(blockArguments, self) {
            block.update(self, blockArguments);
            block.render();
        }
    };
}
export class ListBlockMorph {
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvaHRtbGJhcnMtcnVudGltZS9saWIvbW9ycGhzL2Jsb2NrLnRzIl0sIm5hbWVzIjpbIlNpbXBsZUJsb2NrTW9ycGgiLCJTaW1wbGVCbG9ja01vcnBoLmluaXQiLCJTaW1wbGVCbG9ja01vcnBoLmFwcGVuZCIsIlNpbXBsZUJsb2NrTW9ycGgudXBkYXRlIiwiU2NvcGVkQmxvY2tNb3JwaCIsIlNjb3BlZEJsb2NrTW9ycGguaW5pdCIsIlNjb3BlZEJsb2NrTW9ycGguYXBwZW5kIiwiQmxvY2tIZWxwZXJNb3JwaCIsIkJsb2NrSGVscGVyTW9ycGguaW5pdCIsIkJsb2NrSGVscGVyTW9ycGguX2ludm9rZUhlbHBlciIsIkJsb2NrSGVscGVyTW9ycGgucmVuZGVyIiwiWWllbGRhYmxlVGVtcGxhdGVzIiwiWWllbGRhYmxlVGVtcGxhdGVzLmNvbnN0cnVjdG9yIiwiWWllbGRhYmxlVGVtcGxhdGVzLmJlZ2luIiwiWWllbGRhYmxlVGVtcGxhdGVzLmNvbW1pdCIsIllpZWxkYWJsZVRlbXBsYXRlIiwiWWllbGRhYmxlVGVtcGxhdGUuY29uc3RydWN0b3IiLCJZaWVsZGFibGVUZW1wbGF0ZS5yZW5kZXIiLCJZaWVsZGFibGVUZW1wbGF0ZVdpdGhvdXRMb2NhbHMiLCJZaWVsZGFibGVUZW1wbGF0ZVdpdGhvdXRMb2NhbHMuYXBwZW5kIiwiWWllbGRhYmxlVGVtcGxhdGVXaXRob3V0TG9jYWxzLnVwZGF0ZSIsIllpZWxkYWJsZVRlbXBsYXRlV2l0aExvY2FscyIsIllpZWxkYWJsZVRlbXBsYXRlV2l0aExvY2Fscy5hcHBlbmQiLCJZaWVsZGFibGVUZW1wbGF0ZVdpdGhMb2NhbHMudXBkYXRlIiwiYXBwZW5kQmxvY2siLCJhcHBlbmRCbG9jay55aWVsZCIsInVwZGF0ZUJsb2NrIiwidXBkYXRlQmxvY2sueWllbGQiLCJMaXN0QmxvY2tNb3JwaCJdLCJtYXBwaW5ncyI6Ik9BQU8sRUFB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