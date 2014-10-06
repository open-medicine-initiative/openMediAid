(function (exports) {
    var
        toString = Object.prototype.toString;

    function jsonParse(str) {
        try {
            if (JSON && JSON.parse) {
                return JSON.parse(str);
            }
            return(new Function("return " + str))();
        } catch (e) {
            te("ijs", e.message);
        }
    }

    var errorCodes = {"bop": "binary operator expected", "ee": "expression expected", "epex": "closing paren expected ')'", "ijs": "invalid json string", "mcp": "missing closing paren", "mepf": "malformed expression in pseudo-function", "mexp": "multiple expressions not allowed", "mpc": "multiple pseudo classes (:xxx) not allowed", "nmi": "multiple ids not allowed", "pex": "opening paren expected '('", "se": "selector expected", "sex": "string expected", "sra": "string required after '.'", "uc": "unrecognized char", "ucp": "unexpected closing paren", "ujs": "unclosed json string", "upc": "unrecognized pseudo class"};

    function te(ec, context) {
        throw new Error(errorCodes[ec] + (context && " in '" + context + "'"));
    }

    var toks = {psc: 1, psf: 2, typ: 3, str: 4, ide: 5};
    var pat = new RegExp("^(?:" + "([\\r\\n\\t\\ ]+)|" + "([~*,>\\)\\(])|" + "(string|boolean|null|array|object|number)|" + "(:(?:root|first-child|last-child|only-child))|" + "(:(?:nth-child|nth-last-child|has|expr|val|contains))|" + "(:\\w+)|" + "(?:(\\.)?(\\\"(?:[^\\\\\\\"]|\\\\[^\\\"])*\\\"))|" + "(\\\")|" + "\\.((?:[_a-zA-Z]|[^\\0-\\0177]|\\\\[^\\r\\n\\f0-9a-fA-F])(?:[_a-zA-Z0-9\\-]|[^\\u0000-\\u0177]|(?:\\\\[^\\r\\n\\f0-9a-fA-F]))*)" + ")");
    var nthPat = /^\s*\(\s*(?:([+\-]?)([0-9]*)n\s*(?:([+\-])\s*([0-9]))?|(odd|even)|([+\-]?[0-9]+))\s*\)/;

    function lex(str, off) {
        if (!off)off = 0;
        var m = pat.exec(str.substr(off));
        if (!m)return undefined;
        off += m[0].length;
        var a;
        if (m[1])a = [off, " "]; else if (m[2])a = [off, m[0]]; else if (m[3])a = [off, toks.typ, m[0]]; else if (m[4])a = [off, toks.psc, m[0]]; else if (m[5])a = [off, toks.psf, m[0]]; else if (m[6])te("upc", str); else if (m[8])a = [off, m[7] ? toks.ide : toks.str, jsonParse(m[8])]; else if (m[9])te("ujs", str); else if (m[10])a = [off, toks.ide, m[10].replace(/\\([^\r\n\f0-9a-fA-F])/g, "$1")];
        return a;
    }

    var exprPat = new RegExp("^\\s*(?:" + "(true|false|null)|" + "(-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?)|" + "(\"(?:[^\\]|\\[^\"])*\")|" + "(x)|" + "(&&|\\|\\||[\\$\\^<>!\\*]=|[=+\\-*/%<>])|" + "([\\(\\)])" + ")");

    function is(o, t) {
        return typeof o === t;
    }

    var operators = {'*': [9, function (lhs, rhs) {
        return lhs * rhs;
    }], '/': [9, function (lhs, rhs) {
        return lhs / rhs;
    }], '%': [9, function (lhs, rhs) {
        return lhs % rhs;
    }], '+': [7, function (lhs, rhs) {
        return lhs + rhs;
    }], '-': [7, function (lhs, rhs) {
        return lhs - rhs;
    }], '<=': [5, function (lhs, rhs) {
        return is(lhs, 'number') && is(rhs, 'number') && lhs <= rhs;
    }], '>=': [5, function (lhs, rhs) {
        return is(lhs, 'number') && is(rhs, 'number') && lhs >= rhs;
    }], '$=': [5, function (lhs, rhs) {
        return is(lhs, 'string') && is(rhs, 'string') && lhs.lastIndexOf(rhs) === lhs.length - rhs.length;
    }], '^=': [5, function (lhs, rhs) {
        return is(lhs, 'string') && is(rhs, 'string') && lhs.indexOf(rhs) === 0;
    }], '*=': [5, function (lhs, rhs) {
        return is(lhs, 'string') && is(rhs, 'string') && lhs.indexOf(rhs) !== -1;
    }], '>': [5, function (lhs, rhs) {
        return is(lhs, 'number') && is(rhs, 'number') && lhs > rhs;
    }], '<': [5, function (lhs, rhs) {
        return is(lhs, 'number') && is(rhs, 'number') && lhs < rhs;
    }], '=': [3, function (lhs, rhs) {
        return lhs === rhs;
    }], '!=': [3, function (lhs, rhs) {
        return lhs !== rhs;
    }], '&&': [2, function (lhs, rhs) {
        return lhs && rhs;
    }], '||': [1, function (lhs, rhs) {
        return lhs || rhs;
    }]};

    function exprLex(str, off) {
        var v, m = exprPat.exec(str.substr(off));
        if (m) {
            off += m[0].length;
            v = m[1] || m[2] || m[3] || m[5] || m[6];
            if (m[1] || m[2] || m[3])return[off, 0, jsonParse(v)]; else if (m[4])return[off, 0, undefined];
            return[off, v];
        }
    }

    function exprParse2(str, off) {
        if (!off)off = 0;
        var l = exprLex(str, off), lhs;
        if (l && l[1] === '(') {
            lhs = exprParse2(str, l[0]);
            var p = exprLex(str, lhs[0]);
            if (!p || p[1] !== ')')te('epex', str);
            off = p[0];
            lhs = ['(', lhs[1]];
        } else if (!l || (l[1] && l[1] != 'x')) {
            te("ee", str + " - " + (l[1] && l[1]));
        } else {
            lhs = ((l[1] === 'x') ? undefined : l[2]);
            off = l[0];
        }
        var op = exprLex(str, off);
        if (!op || op[1] == ')')return[off, lhs]; else if (op[1] == 'x' || !op[1]) {
            te('bop', str + " - " + (op[1] && op[1]));
        }
        var rhs = exprParse2(str, op[0]);
        off = rhs[0];
        rhs = rhs[1];
        var v;
        if (typeof rhs !== 'object' || rhs[0] === '(' || operators[op[1]][0] < operators[rhs[1]][0]) {
            v = [lhs, op[1], rhs];
        }
        else {
            v = rhs;
            while (typeof rhs[0] === 'object' && rhs[0][0] != '(' && operators[op[1]][0] >= operators[rhs[0][1]][0]) {
                rhs = rhs[0];
            }
            rhs[0] = [lhs, op[1], rhs[0]];
        }
        return[off, v];
    }

    function exprParse(str, off) {
        function deparen(v) {
            if (typeof v !== 'object' || v === null)return v; else if (v[0] === '(')return deparen(v[1]); else return[deparen(v[0]), v[1], deparen(v[2])];
        }

        var e = exprParse2(str, off ? off : 0);
        return[e[0], deparen(e[1])];
    }

    function exprEval(expr, x) {
        if (expr === undefined)return x; else if (expr === null || typeof expr !== 'object') {
            return expr;
        }
        var lhs = exprEval(expr[0], x), rhs = exprEval(expr[2], x);
        return operators[expr[1]][1](lhs, rhs);
    }

    function parse(str, off, nested, hints) {
        if (!nested)hints = {};
        var a = [], am, readParen;
        if (!off)off = 0;
        while (true) {
            var s = parse_selector(str, off, hints);
            a.push(s[1]);
            s = lex(str, off = s[0]);
            if (s && s[1] === " ")s = lex(str, off = s[0]);
            if (!s)break;
            if (s[1] === ">" || s[1] === "~") {
                if (s[1] === "~")hints.usesSiblingOp = true;
                a.push(s[1]);
                off = s[0];
            } else if (s[1] === ",") {
                if (am === undefined)am = [",", a]; else am.push(a);
                a = [];
                off = s[0];
            } else if (s[1] === ")") {
                if (!nested)te("ucp", s[1]);
                readParen = 1;
                off = s[0];
                break;
            }
        }
        if (nested && !readParen)te("mcp", str);
        if (am)am.push(a);
        var rv;
        if (!nested && hints.usesSiblingOp) {
            rv = normalize(am ? am : a);
        } else {
            rv = am ? am : a;
        }
        return[off, rv];
    }

    function normalizeOne(sel) {
        var sels = [], s;
        for (var i = 0; i < sel.length; i++) {
            if (sel[i] === '~') {
                if (i < 2 || sel[i - 2] != '>') {
                    s = sel.slice(0, i - 1);
                    s = s.concat([
                        {has: [
                            [
                                {pc: ":root"},
                                ">",
                                sel[i - 1]
                            ]
                        ]},
                        ">"
                    ]);
                    s = s.concat(sel.slice(i + 1));
                    sels.push(s);
                }
                if (i > 1) {
                    var at = sel[i - 2] === '>' ? i - 3 : i - 2;
                    s = sel.slice(0, at);
                    var z = {};
                    for (var k in sel[at])if (sel[at].hasOwnProperty(k))z[k] = sel[at][k];
                    if (!z.has)z.has = [];
                    z.has.push([
                        {pc: ":root"},
                        ">",
                        sel[i - 1]
                    ]);
                    s = s.concat(z, '>', sel.slice(i + 1));
                    sels.push(s);
                }
                break;
            }
        }
        if (i == sel.length)return sel;
        return sels.length > 1 ? [','].concat(sels) : sels[0];
    }

    function normalize(sels) {
        if (sels[0] === ',') {
            var r = [","];
            for (var i = i; i < sels.length; i++) {
                var s = normalizeOne(s[i]);
                r = r.concat(s[0] === "," ? s.slice(1) : s);
            }
            return r;
        } else {
            return normalizeOne(sels);
        }
    }

    function parse_selector(str, off, hints) {
        var soff = off;
        var s = {};
        var l = lex(str, off);
        if (l && l[1] === " ") {
            soff = off = l[0];
            l = lex(str, off);
        }
        if (l && l[1] === toks.typ) {
            s.type = l[2];
            l = lex(str, (off = l[0]));
        } else if (l && l[1] === "*") {
            l = lex(str, (off = l[0]));
        }
        while (true) {
            if (l === undefined) {
                break;
            } else if (l[1] === toks.ide) {
                if (s.id)te("nmi", l[1]);
                s.id = l[2];
            } else if (l[1] === toks.psc) {
                if (s.pc || s.pf)te("mpc", l[1]);
                if (l[2] === ":first-child") {
                    s.pf = ":nth-child";
                    s.a = 0;
                    s.b = 1;
                } else if (l[2] === ":last-child") {
                    s.pf = ":nth-last-child";
                    s.a = 0;
                    s.b = 1;
                } else {
                    s.pc = l[2];
                }
            } else if (l[1] === toks.psf) {
                if (l[2] === ":val" || l[2] === ":contains") {
                    s.expr = [undefined, l[2] === ":val" ? "=" : "*=", undefined];
                    l = lex(str, (off = l[0]));
                    if (l && l[1] === " ")l = lex(str, off = l[0]);
                    if (!l || l[1] !== "(")te("pex", str);
                    l = lex(str, (off = l[0]));
                    if (l && l[1] === " ")l = lex(str, off = l[0]);
                    if (!l || l[1] !== toks.str)te("sex", str);
                    s.expr[2] = l[2];
                    l = lex(str, (off = l[0]));
                    if (l && l[1] === " ")l = lex(str, off = l[0]);
                    if (!l || l[1] !== ")")te("epex", str);
                } else if (l[2] === ":has") {
                    l = lex(str, (off = l[0]));
                    if (l && l[1] === " ")l = lex(str, off = l[0]);
                    if (!l || l[1] !== "(")te("pex", str);
                    var h = parse(str, l[0], true);
                    l[0] = h[0];
                    if (!s.has)s.has = [];
                    s.has.push(h[1]);
                } else if (l[2] === ":expr") {
                    if (s.expr)te("mexp", str);
                    var e = exprParse(str, l[0]);
                    l[0] = e[0];
                    s.expr = e[1];
                } else {
                    if (s.pc || s.pf)te("mpc", str);
                    s.pf = l[2];
                    var m = nthPat.exec(str.substr(l[0]));
                    if (!m)te("mepf", str);
                    if (m[5]) {
                        s.a = 2;
                        s.b = (m[5] === "odd") ? 1 : 0;
                    } else if (m[6]) {
                        s.a = 0;
                        s.b = parseInt(m[6], 10);
                    } else {
                        s.a = parseInt((m[1] ? m[1] : "+") + (m[2] ? m[2] : "1"), 10);
                        s.b = m[3] ? parseInt(m[3] + m[4], 10) : 0;
                    }
                    l[0] += m[0].length;
                }
            } else {
                break;
            }
            l = lex(str, (off = l[0]));
        }
        if (soff === off)te("se", str);
        return[off, s];
    }

    function isArray(o) {
        return Array.isArray ? Array.isArray(o) : toString.call(o) === "[object Array]";
    }

    function mytypeof(o) {
        if (o === null)return"null";
        var to = typeof o;
        if (to === "object" && isArray(o))to = "array";
        return to;
    }

    function mn(node, sel, id, num, tot) {
        var sels = [];
        var cs = (sel[0] === ">") ? sel[1] : sel[0];
        var m = true, mod;
        if (cs.type)m = m && (cs.type === mytypeof(node));
        if (cs.id)m = m && (cs.id === id);
        if (m && cs.pf) {
            if (cs.pf === ":nth-last-child")num = tot - num; else num++;
            if (cs.a === 0) {
                m = cs.b === num;
            } else {
                mod = ((num - cs.b) % cs.a);
                m = (!mod && ((num * cs.a + cs.b) >= 0));
            }
        }
        if (m && cs.has) {
            var bail = function () {
                throw 42;
            };
            for (var i = 0; i < cs.has.length; i++) {
                try {
                    forEach(cs.has[i], node, bail);
                } catch (e) {
                    if (e === 42)continue;
                }
                m = false;
                break;
            }
        }
        if (m && cs.expr) {
            m = exprEval(cs.expr, node);
        }
        if (sel[0] !== ">" && sel[0].pc !== ":root")sels.push(sel);
        if (m) {
            if (sel[0] === ">") {
                if (sel.length > 2) {
                    m = false;
                    sels.push(sel.slice(2));
                }
            }
            else if (sel.length > 1) {
                m = false;
                sels.push(sel.slice(1));
            }
        }
        return[m, sels];
    }

    function forEach(sel, obj, fun, id, num, tot, asPath, path) {
        if (path == undefined)path = "";
        var a = (sel[0] === ",") ? sel.slice(1) : [sel], a0 = [], call = false, i = 0, j = 0, k, x;
        for (i = 0; i < a.length; i++) {
            x = mn(obj, a[i], id, num, tot);
            if (x[0]) {
                call = true;
            }
            for (j = 0; j < x[1].length; j++) {
                a0.push(x[1][j]);
            }
        }
        if (a0.length && typeof obj === "object") {
            if (a0.length >= 1) {
                a0.unshift(",");
            }
            if (isArray(obj)) {
                for (i = 0; i < obj.length; i++) {
                    forEach(a0, obj[i], fun, undefined, i, obj.length, asPath, path.length > 0 ? path + '.' + i : i);
                }
            } else {
                for (k in obj) {
                    if (obj.hasOwnProperty(k)) {
                        forEach(a0, obj[k], fun, k, undefined, undefined, asPath, path.length > 0 ? path + '.' + k : k);
                    }
                }
            }
        }
        if (call && fun) {
            if (asPath)fun(path); else fun(obj);
        }
    }

    function match(sel, obj, asPath) {
        var a = [];
        forEach(sel, obj, function (x) {
            a.push(x);
        }, undefined, undefined, undefined, asPath);
        return a;
    }

    function compile(sel) {
        return{sel: parse(sel)[1], match: function (obj, asKeys) {
            return match(this.sel, obj, asKeys);
        }, forEach: function (obj, fun, asKeys) {
            return forEach(this.sel, obj, fun, undefined, undefined, undefined, asKeys);
        }};
    }

    exports._lex = lex;
    exports._parse = parse;
    exports.match = function (sel, obj, asPath) {
        return compile(sel).match(obj, asPath);
    };
    exports.forEach = function (sel, obj, fun, asPath) {
        return compile(sel).forEach(obj, fun, undefined, undefined, undefined, asPath);
    };
    exports.get = function (path, root) {
        var segments = path.split('.'), cursor = root, segment, i;
        for (i = 0; i < segments.length - 1; ++i) {
            segment = segments[i];
            cursor = cursor[segment] = cursor[segment] || {};
        }
        return cursor[segments[i]];
    };
    exports.set = function (path, value, root) {
        var segments = path.split('.'), cursor = root, segment, i;
        for (i = 0; i < segments.length - 1; ++i) {
            segment = segments[i];
            cursor = cursor[segment] = cursor[segment] || {};
        }
        return cursor[segments[i]] = value;
    };
    exports.del = function (path, root) {
        var segments = path.split('.'), cursor = root, segment, i;
        for (i = 0; i < segments.length - 1; ++i) {
            segment = segments[i];
            cursor = cursor[segment] = cursor[segment] || {};
        }
        delete cursor[segments[i]];
    };
    exports.compile = compile;
})(typeof exports === "undefined" ? (window.JSONSelect = {}) : exports);