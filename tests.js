var assert = require("assert");
var sexp = require("./sexp");


(function testEmpty() {
    var s = new sexp.sexp("()");
    assert.deepEqual(s.data, []);
})();

(function testSimple() {
    var s = new sexp.sexp("(a)");
    assert.deepEqual(s.data, ['a']);
})();

(function testDouble() {
    var s = new sexp.sexp("(a b)");
    assert.deepEqual(s.data, ['a', 'b']);
})();

(function testTrouble() {
    var s = new sexp.sexp("(a b ( c ))");
    assert.deepEqual(s.data, ['a', 'b', ['c']]);
})();

(function testYouNeedToGoDeeper() {
    var s = new sexp.sexp("(we (need (to (go) deeper ...)))");
    assert.deepEqual(s.data, ['we', ['need', ['to', ['go'], 'deeper', '...']]]);
})();

(function testWithStrings() {
    var s = new sexp.sexp('(we (need (to "go deeper")))');
    assert.deepEqual(s.data, ['we', ['need', ['to', 'go deeper']]]);
    
    var s = new sexp.sexp('(we (need "an empty string" "")))');
    assert.deepEqual(s.data, ['we', ['need', 'an empty string', '']]]);
})();