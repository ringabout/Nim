/* Generated by the Nim Compiler v1.9.3 */
var framePtr = null;
var excHandler = 0;
var lastJSError = null;
var NTI134217749 = {size: 0, kind: 17, base: null, node: null, finalizer: null};
var NTI134217751 = {size: 0, kind: 17, base: null, node: null, finalizer: null};
var NTI134217741 = {size: 0, kind: 17, base: null, node: null, finalizer: null};
var NTI134217743 = {size: 0, kind: 17, base: null, node: null, finalizer: null};
var NTI33554435 = {size: 0,kind: 31,base: null,node: null,finalizer: null};
var NTI33555837 = {size: 0, kind: 18, base: null, node: null, finalizer: null};
var NTI33555181 = {size: 0, kind: 17, base: null, node: null, finalizer: null};
var NTI33555189 = {size: 0, kind: 22, base: null, node: null, finalizer: null};
var NTI33554450 = {size: 0,kind: 29,base: null,node: null,finalizer: null};
var NTI33555188 = {size: 0, kind: 22, base: null, node: null, finalizer: null};
var NTI33555185 = {size: 0, kind: 17, base: null, node: null, finalizer: null};
var NTI33555186 = {size: 0, kind: 17, base: null, node: null, finalizer: null};
var NTI134217745 = {size: 0, kind: 17, base: null, node: null, finalizer: null};
var NTI33554449 = {size: 0,kind: 28,base: null,node: null,finalizer: null};
var NNI134217745 = {kind: 2, len: 0, offset: 0, typ: null, name: null, sons: []};
NTI134217745.node = NNI134217745;
var NNI33555186 = {kind: 2, len: 0, offset: 0, typ: null, name: null, sons: []};
NTI33555186.node = NNI33555186;
NTI33555188.base = NTI33555185;
NTI33555189.base = NTI33555185;
var NNI33555185 = {kind: 2, len: 5, offset: 0, typ: null, name: null, sons: [{kind: 1, offset: "parent", len: 0, typ: NTI33555188, name: "parent", sons: null}, 
{kind: 1, offset: "name", len: 0, typ: NTI33554450, name: "name", sons: null}, 
{kind: 1, offset: "message", len: 0, typ: NTI33554449, name: "msg", sons: null}, 
{kind: 1, offset: "trace", len: 0, typ: NTI33554449, name: "trace", sons: null}, 
{kind: 1, offset: "up", len: 0, typ: NTI33555189, name: "up", sons: null}]};
NTI33555185.node = NNI33555185;
var NNI33555181 = {kind: 2, len: 0, offset: 0, typ: null, name: null, sons: []};
NTI33555181.node = NNI33555181;
NTI33555185.base = NTI33555181;
NTI33555186.base = NTI33555185;
NTI134217745.base = NTI33555186;
var NNI33555837 = {kind: 2, len: 3, offset: 0, typ: null, name: null, sons: [{kind: 1, offset: "Field0", len: 0, typ: NTI33554450, name: "Field0", sons: null}, 
{kind: 1, offset: "Field1", len: 0, typ: NTI33554435, name: "Field1", sons: null}, 
{kind: 1, offset: "Field2", len: 0, typ: NTI33554450, name: "Field2", sons: null}]};
NTI33555837.node = NNI33555837;
var NNI134217743 = {kind: 2, len: 0, offset: 0, typ: null, name: null, sons: []};
NTI134217743.node = NNI134217743;
var NNI134217741 = {kind: 2, len: 0, offset: 0, typ: null, name: null, sons: []};
NTI134217741.node = NNI134217741;
NTI134217741.base = NTI33555186;
NTI134217743.base = NTI134217741;
var NNI134217751 = {kind: 2, len: 0, offset: 0, typ: null, name: null, sons: []};
NTI134217751.node = NNI134217751;
NTI134217751.base = NTI33555186;
var NNI134217749 = {kind: 2, len: 0, offset: 0, typ: null, name: null, sons: []};
NTI134217749.node = NNI134217749;
NTI134217749.base = NTI33555186;

function setConstr() {
        var result = {};
    for (var i = 0; i < arguments.length; ++i) {
      var x = arguments[i];
      if (typeof(x) == "object") {
        for (var j = x[0]; j <= x[1]; ++j) {
          result[j] = true;
        }
      } else {
        result[x] = true;
      }
    }
    return result;
  

  
}
var ConstSet1 = setConstr(17, 16, 4, 18, 27, 19, 23, 22, 21);

function nimCopy(dest_33557218, src_33557219, ti_33557220) {
  var result_33557229 = null;

    switch (ti_33557220.kind) {
    case 21:
    case 22:
    case 23:
    case 5:
      if (!(isFatPointer_33557209(ti_33557220))) {
      result_33557229 = src_33557219;
      }
      else {
        result_33557229 = [src_33557219[0], src_33557219[1]];
      }
      
      break;
    case 19:
            if (dest_33557218 === null || dest_33557218 === undefined) {
        dest_33557218 = {};
      }
      else {
        for (var key in dest_33557218) { delete dest_33557218[key]; }
      }
      for (var key in src_33557219) { dest_33557218[key] = src_33557219[key]; }
      result_33557229 = dest_33557218;
    
      break;
    case 18:
    case 17:
      if (!((ti_33557220.base == null))) {
      result_33557229 = nimCopy(dest_33557218, src_33557219, ti_33557220.base);
      }
      else {
      if ((ti_33557220.kind == 17)) {
      result_33557229 = (dest_33557218 === null || dest_33557218 === undefined) ? {m_type: ti_33557220} : dest_33557218;
      }
      else {
        result_33557229 = (dest_33557218 === null || dest_33557218 === undefined) ? {} : dest_33557218;
      }
      }
      nimCopyAux(result_33557229, src_33557219, ti_33557220.node);
      break;
    case 4:
    case 16:
            if(ArrayBuffer.isView(src_33557219)) { 
        if(dest_33557218 === null || dest_33557218 === undefined || dest_33557218.length != src_33557219.length) {
          dest_33557218 = new src_33557219.constructor(src_33557219);
        } else {
          dest_33557218.set(src_33557219, 0);
        }
        result_33557229 = dest_33557218;
      } else {
        if (src_33557219 === null) {
          result_33557229 = null;
        }
        else {
          if (dest_33557218 === null || dest_33557218 === undefined || dest_33557218.length != src_33557219.length) {
            dest_33557218 = new Array(src_33557219.length);
          }
          result_33557229 = dest_33557218;
          for (var i = 0; i < src_33557219.length; ++i) {
            result_33557229[i] = nimCopy(result_33557229[i], src_33557219[i], ti_33557220.base);
          }
        }
      }
    
      break;
    case 24:
    case 27:
            if (src_33557219 === null) {
        result_33557229 = null;
      }
      else {
        if (dest_33557218 === null || dest_33557218 === undefined || dest_33557218.length != src_33557219.length) {
          dest_33557218 = new Array(src_33557219.length);
        }
        result_33557229 = dest_33557218;
        for (var i = 0; i < src_33557219.length; ++i) {
          result_33557229[i] = nimCopy(result_33557229[i], src_33557219[i], ti_33557220.base);
        }
      }
    
      break;
    case 28:
            if (src_33557219 !== null) {
        result_33557229 = src_33557219.slice(0);
      }
    
      break;
    default: 
      result_33557229 = src_33557219;
      break;
    }

  return result_33557229;

}

function arrayConstr(len_33557261, value_33557262, typ_33557263) {
        var result = new Array(len_33557261);
    for (var i = 0; i < len_33557261; ++i) result[i] = nimCopy(null, value_33557262, typ_33557263);
    return result;
  

  
}

function mnewString(len_33556959) {
        return new Array(len_33556959);
  

  
}

function addInt(a_33557006, b_33557007) {
        var result = a_33557006 + b_33557007;
    checkOverflowInt(result);
    return result;
  

  
}

function chckRange(i_33557271, a_33557272, b_33557273) {
  var result_33557274 = 0;

  BeforeRet: {
    if (((a_33557272 <= i_33557271) && (i_33557271 <= b_33557273))) {
    result_33557274 = i_33557271;
    break BeforeRet;
    }
    else {
    raiseRangeError();
    }
    
  };

  return result_33557274;

}

function chckIndx(i_33557266, a_33557267, b_33557268) {
  var result_33557269 = 0;

  BeforeRet: {
    if (((a_33557267 <= i_33557266) && (i_33557266 <= b_33557268))) {
    result_33557269 = i_33557266;
    break BeforeRet;
    }
    else {
    raiseIndexError(i_33557266, a_33557267, b_33557268);
    }
    
  };

  return result_33557269;

}

function cstrToNimstr(c_33556860) {
      var ln = c_33556860.length;
  var result = new Array(ln);
  var r = 0;
  for (var i = 0; i < ln; ++i) {
    var ch = c_33556860.charCodeAt(i);

    if (ch < 128) {
      result[r] = ch;
    }
    else {
      if (ch < 2048) {
        result[r] = (ch >> 6) | 192;
      }
      else {
        if (ch < 55296 || ch >= 57344) {
          result[r] = (ch >> 12) | 224;
        }
        else {
            ++i;
            ch = 65536 + (((ch & 1023) << 10) | (c_33556860.charCodeAt(i) & 1023));
            result[r] = (ch >> 18) | 240;
            ++r;
            result[r] = ((ch >> 12) & 63) | 128;
        }
        ++r;
        result[r] = ((ch >> 6) & 63) | 128;
      }
      ++r;
      result[r] = (ch & 63) | 128;
    }
    ++r;
  }
  return result;
  

  
}

function toJSStr(s_33556863) {
  var result_33556864 = null;

    var res_33556902 = newSeq_33556881((s_33556863).length);
    var i_33556903 = 0;
    var j_33556904 = 0;
    Label1: {
        Label2: while (true) {
        if (!(i_33556903 < (s_33556863).length)) break Label2;
          var c_33556905 = s_33556863[i_33556903];
          if ((c_33556905 < 128)) {
          res_33556902[j_33556904] = String.fromCharCode(c_33556905);
          i_33556903 += 1;
          }
          else {
            var helper_33556918 = newSeq_33556881(0);
            Label3: {
                Label4: while (true) {
                if (!true) break Label4;
                  var code_33556919 = c_33556905.toString(16);
                  if ((((code_33556919) == null ? 0 : (code_33556919).length) == 1)) {
                  helper_33556918.push("%0");;
                  }
                  else {
                  helper_33556918.push("%");;
                  }
                  
                  helper_33556918.push(code_33556919);;
                  i_33556903 += 1;
                  if ((((s_33556863).length <= i_33556903) || (s_33556863[i_33556903] < 128))) {
                  break Label3;
                  }
                  
                  c_33556905 = s_33556863[i_33556903];
                }
            };
++excHandler;
            try {
            res_33556902[j_33556904] = decodeURIComponent(helper_33556918.join(""));
--excHandler;
} catch (EXCEPTION) {
 var prevJSError = lastJSError;
 lastJSError = EXCEPTION;
 --excHandler;
            res_33556902[j_33556904] = helper_33556918.join("");
            lastJSError = prevJSError;
            } finally {
            }
          }
          
          j_33556904 += 1;
        }
    };
    if (res_33556902.length < j_33556904) { for (var i = res_33556902.length ; i < j_33556904 ; ++i) res_33556902.push(null); }
               else { res_33556902.length = j_33556904; };
    result_33556864 = res_33556902.join("");

  return result_33556864;

}

function raiseException(e_33556651, ename_33556652) {
    e_33556651.name = ename_33556652;
    if ((excHandler == 0)) {
    unhandledException(e_33556651);
    }
    
    e_33556651.trace = nimCopy(null, rawWriteStackTrace_33556608(), NTI33554449);
    throw e_33556651;

  
}

function makeNimstrLit(c_33556857) {
      var result = [];
  for (var i = 0; i < c_33556857.length; ++i) {
    result[i] = c_33556857.charCodeAt(i);
  }
  return result;
  

  
}
var F = {procname: "module macros", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/core/macros.nim", line: 0};
framePtr = F;
framePtr = F.prev;
var F = {procname: "module macros", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/core/macros.nim", line: 0};
framePtr = F;
framePtr = F.prev;
var F = {procname: "module jsbigints", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/std/jsbigints.nim", line: 0};
framePtr = F;
framePtr = F.prev;
var F = {procname: "module jsbigints", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/std/jsbigints.nim", line: 0};
framePtr = F;
framePtr = F.prev;
var F = {procname: "module jsutils", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/std/private/jsutils.nim", line: 0};
framePtr = F;
framePtr = F.prev;
var F = {procname: "module jsutils", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/std/private/jsutils.nim", line: 0};
framePtr = F;
framePtr = F.prev;
var F = {procname: "module hashes", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/pure/hashes.nim", line: 0};
framePtr = F;
F.line = 218;
var objectID_721420459 = [0];
framePtr = F.prev;
var F = {procname: "module hashes", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/pure/hashes.nim", line: 0};
framePtr = F;
framePtr = F.prev;
var F = {procname: "module bitops_utils", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/std/private/bitops_utils.nim", line: 0};
framePtr = F;
framePtr = F.prev;
var F = {procname: "module bitops_utils", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/std/private/bitops_utils.nim", line: 0};
framePtr = F;
framePtr = F.prev;
var F = {procname: "module countbits_impl", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/system/countbits_impl.nim", line: 0};
framePtr = F;
framePtr = F.prev;
var F = {procname: "module countbits_impl", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/system/countbits_impl.nim", line: 0};
framePtr = F;
framePtr = F.prev;
var F = {procname: "module bitops", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/pure/bitops.nim", line: 0};
framePtr = F;
framePtr = F.prev;
var F = {procname: "module bitops", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/pure/bitops.nim", line: 0};
framePtr = F;
framePtr = F.prev;
var F = {procname: "module fenv", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/pure/fenv.nim", line: 0};
framePtr = F;
framePtr = F.prev;
var F = {procname: "module fenv", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/pure/fenv.nim", line: 0};
framePtr = F;
framePtr = F.prev;
var F = {procname: "module math", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/pure/math.nim", line: 0};
framePtr = F;
framePtr = F.prev;
var F = {procname: "module math", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/pure/math.nim", line: 0};
framePtr = F;
framePtr = F.prev;
var F = {procname: "module algorithm", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/pure/algorithm.nim", line: 0};
framePtr = F;
framePtr = F.prev;
var F = {procname: "module algorithm", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/pure/algorithm.nim", line: 0};
framePtr = F;
framePtr = F.prev;
var F = {procname: "module outparams", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/std/outparams.nim", line: 0};
framePtr = F;
framePtr = F.prev;
var F = {procname: "module outparams", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/std/outparams.nim", line: 0};
framePtr = F;
framePtr = F.prev;
var F = {procname: "module tables", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/pure/collections/tables.nim", line: 0};
framePtr = F;
framePtr = F.prev;
var F = {procname: "module tables", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/pure/collections/tables.nim", line: 0};
framePtr = F;
framePtr = F.prev;
var F = {procname: "module jsffi", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/js/jsffi.nim", line: 0};
framePtr = F;
F.line = 45;
F.line = 46;
framePtr = F.prev;
var F = {procname: "module jsffi", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/js/jsffi.nim", line: 0};
framePtr = F;
framePtr = F.prev;
var F = {procname: "module jsffi_examples_1", prev: framePtr, filename: "/home/runner/work/Nim/Nim/doc/html/nimcache/runnableExamples/jsffi_examples_1.nim", line: 0};
framePtr = F;
framePtr = F.prev;
var F = {procname: "module jsffi_examples_1", prev: framePtr, filename: "/home/runner/work/Nim/Nim/doc/html/nimcache/runnableExamples/jsffi_examples_1.nim", line: 0};
framePtr = F;
framePtr = F.prev;

function isFatPointer_33557209(ti_33557210) {
  var result_33557211 = false;

  BeforeRet: {
    result_33557211 = !((ConstSet1[ti_33557210.base.kind] != undefined));
    break BeforeRet;
  };

  return result_33557211;

}

function nimCopyAux(dest_33557222, src_33557223, n_33557224) {
    switch (n_33557224.kind) {
    case 0:
      break;
    case 1:
            dest_33557222[n_33557224.offset] = nimCopy(dest_33557222[n_33557224.offset], src_33557223[n_33557224.offset], n_33557224.typ);
    
      break;
    case 2:
          for (var i = 0; i < n_33557224.sons.length; i++) {
      nimCopyAux(dest_33557222, src_33557223, n_33557224.sons[i]);
    }
    
      break;
    case 3:
            dest_33557222[n_33557224.offset] = nimCopy(dest_33557222[n_33557224.offset], src_33557223[n_33557224.offset], n_33557224.typ);
      for (var i = 0; i < n_33557224.sons.length; ++i) {
        nimCopyAux(dest_33557222, src_33557223, n_33557224.sons[i][1]);
      }
    
      break;
    }

  
}

function add_33556395(x_33556396, x_33556396_Idx, y_33556397) {
          if (x_33556396[x_33556396_Idx] === null) { x_33556396[x_33556396_Idx] = []; }
      var off = x_33556396[x_33556396_Idx].length;
      x_33556396[x_33556396_Idx].length += y_33556397.length;
      for (var i = 0; i < y_33556397.length; ++i) {
        x_33556396[x_33556396_Idx][off+i] = y_33556397.charCodeAt(i);
      }
    

  
}

function raiseOverflow() {
    raiseException({message: [111,118,101,114,45,32,111,114,32,117,110,100,101,114,102,108,111,119], parent: null, m_type: NTI134217743, name: null, trace: [], up: null}, "OverflowDefect");

  
}

function checkOverflowInt(a_33557004) {
        if (a_33557004 > 2147483647 || a_33557004 < -2147483648) raiseOverflow();
  

  
}

function raiseRangeError() {
    raiseException({message: [118,97,108,117,101,32,111,117,116,32,111,102,32,114,97,110,103,101], parent: null, m_type: NTI134217751, name: null, trace: [], up: null}, "RangeDefect");

  
}

function raiseIndexError(i_33556786, a_33556787, b_33556788) {
    var Temporary1;

    if ((b_33556788 < a_33556787)) {
    Temporary1 = [105,110,100,101,120,32,111,117,116,32,111,102,32,98,111,117,110,100,115,44,32,116,104,101,32,99,111,110,116,97,105,110,101,114,32,105,115,32,101,109,112,116,121];
    }
    else {
    Temporary1 = ([105,110,100,101,120,32] || []).concat(HEX24_369098760(i_33556786) || [],[32,110,111,116,32,105,110,32] || [],HEX24_369098760(a_33556787) || [],[32,46,46,32] || [],HEX24_369098760(b_33556788) || []);
    }
    
    raiseException({message: nimCopy(null, Temporary1, NTI33554449), parent: null, m_type: NTI134217749, name: null, trace: [], up: null}, "IndexDefect");

  
}

function addChars_301990072(result_301990074, result_301990074_Idx, x_301990075, start_301990076, n_301990077) {
    var Temporary1;

  var F = {procname: "addChars.addChars", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/std/private/digitsutils.nim", line: 0};
  framePtr = F;
    F.line = 43;
    var old_301990078 = (result_301990074[result_301990074_Idx]).length;
    F.line = 44;
    if (result_301990074[result_301990074_Idx].length < (Temporary1 = chckRange(addInt(old_301990078, n_301990077), 0, 2147483647), Temporary1)) { for (var i = result_301990074[result_301990074_Idx].length; i < Temporary1; ++i) result_301990074[result_301990074_Idx].push(0); }
         else {result_301990074[result_301990074_Idx].length = Temporary1; };
    Label2: {
      F.line = 46;
      var iHEX60gensym4_301990092 = 0;
      F.line = 119;
      var i_922746919 = 0;
      Label3: {
        F.line = 120;
          Label4: while (true) {
          if (!(i_922746919 < n_301990077)) break Label4;
            F.line = 49;
            iHEX60gensym4_301990092 = i_922746919;
            F.line = 49;
            result_301990074[result_301990074_Idx][chckIndx(addInt(old_301990078, iHEX60gensym4_301990092), 0, (result_301990074[result_301990074_Idx]).length - 1)] = x_301990075.charCodeAt(chckIndx(addInt(start_301990076, iHEX60gensym4_301990092), 0, (x_301990075).length - 1));
            F.line = 122;
            i_922746919 = addInt(i_922746919, 1);
          }
      };
    };
  framePtr = F.prev;

  
}

function addChars_301990068(result_301990070, result_301990070_Idx, x_301990071) {
  var F = {procname: "addChars.addChars", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/std/private/digitsutils.nim", line: 0};
  framePtr = F;
    F.line = 55;
    addChars_301990072(result_301990070, result_301990070_Idx, x_301990071, 0, ((x_301990071) == null ? 0 : (x_301990071).length));
  framePtr = F.prev;

  
}

function addInt_301990093(result_301990094, result_301990094_Idx, x_301990095) {
  var F = {procname: "digitsutils.addInt", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/std/private/digitsutils.nim", line: 0};
  framePtr = F;
    F.line = 111;
    addChars_301990068(result_301990094, result_301990094_Idx, ((x_301990095) + ""));
  framePtr = F.prev;

  
}

function addInt_301990111(result_301990112, result_301990112_Idx, x_301990113) {
  var F = {procname: "digitsutils.addInt", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/std/private/digitsutils.nim", line: 0};
  framePtr = F;
    F.line = 115;
    addInt_301990093(result_301990112, result_301990112_Idx, BigInt(x_301990113));
  framePtr = F.prev;

  
}

function HEX24_369098760(x_369098761) {
  var result_369098762 = [[]];

  var F = {procname: "dollars.$", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/system/dollars.nim", line: 0};
  framePtr = F;
    F.line = 18;
    addInt_301990111(result_369098762, 0, x_369098761);
  framePtr = F.prev;

  return result_369098762[0];

}

function auxWriteStackTrace_33556521(f_33556522) {
  var result_33556523 = [[]];

    var it_33556531 = f_33556522;
    var i_33556532 = 0;
    var total_33556533 = 0;
    var tempFrames_33556534 = arrayConstr(64, {Field0: null, Field1: 0, Field2: null}, NTI33555837);
    Label1: {
        Label2: while (true) {
        if (!(!((it_33556531 == null)) && (i_33556532 <= 63))) break Label2;
          tempFrames_33556534[i_33556532].Field0 = it_33556531.procname;
          tempFrames_33556534[i_33556532].Field1 = it_33556531.line;
          tempFrames_33556534[i_33556532].Field2 = it_33556531.filename;
          i_33556532 += 1;
          total_33556533 += 1;
          it_33556531 = it_33556531.prev;
        }
    };
    Label3: {
        Label4: while (true) {
        if (!!((it_33556531 == null))) break Label4;
          total_33556533 += 1;
          it_33556531 = it_33556531.prev;
        }
    };
    result_33556523[0] = nimCopy(null, [], NTI33554449);
    if (!((total_33556533 == i_33556532))) {
    result_33556523[0].push.apply(result_33556523[0], [40]);;
    result_33556523[0].push.apply(result_33556523[0], HEX24_369098760((total_33556533 - i_33556532)));;
    result_33556523[0].push.apply(result_33556523[0], [32,99,97,108,108,115,32,111,109,105,116,116,101,100,41,32,46,46,46,10]);;
    }
    
    Label5: {
      var j_33556567 = 0;
      var colontmp__922746911 = 0;
      colontmp__922746911 = (i_33556532 - 1);
      var res_922746913 = colontmp__922746911;
      Label6: {
          Label7: while (true) {
          if (!(0 <= res_922746913)) break Label7;
            j_33556567 = res_922746913;
            result_33556523[0].push.apply(result_33556523[0], cstrToNimstr(tempFrames_33556534[j_33556567].Field2));;
            if ((0 < tempFrames_33556534[j_33556567].Field1)) {
            result_33556523[0].push.apply(result_33556523[0], [40]);;
            addInt_301990111(result_33556523, 0, tempFrames_33556534[j_33556567].Field1);
            if (false) {
            result_33556523[0].push.apply(result_33556523[0], [44,32]);;
            addInt_301990111(result_33556523, 0, 0);
            }
            
            result_33556523[0].push.apply(result_33556523[0], [41]);;
            }
            
            result_33556523[0].push.apply(result_33556523[0], [32,97,116,32]);;
            add_33556395(result_33556523, 0, tempFrames_33556534[j_33556567].Field0);
            result_33556523[0].push.apply(result_33556523[0], [10]);;
            res_922746913 -= 1;
          }
      };
    };

  return result_33556523[0];

}

function rawWriteStackTrace_33556608() {
  var result_33556609 = [];

    if (!((framePtr == null))) {
    result_33556609 = nimCopy(null, ([84,114,97,99,101,98,97,99,107,32,40,109,111,115,116,32,114,101,99,101,110,116,32,99,97,108,108,32,108,97,115,116,41,10] || []).concat(auxWriteStackTrace_33556521(framePtr) || []), NTI33554449);
    }
    else {
      result_33556609 = nimCopy(null, [78,111,32,115,116,97,99,107,32,116,114,97,99,101,98,97,99,107,32,97,118,97,105,108,97,98,108,101,10], NTI33554449);
    }
    

  return result_33556609;

}

function newSeq_33556881(len_33556883) {
  var result_33556884 = [];

  var F = {procname: "newSeq.newSeq", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/system.nim", line: 0};
  framePtr = F;
    F.line = 608;
    result_33556884 = new Array(len_33556883); for (var i = 0 ; i < len_33556883 ; ++i) { result_33556884[i] = null; }  framePtr = F.prev;

  return result_33556884;

}

function unhandledException(e_33556647) {
    var buf_33556648 = [[]];
    if (!(((e_33556647.message).length == 0))) {
    buf_33556648[0].push.apply(buf_33556648[0], [69,114,114,111,114,58,32,117,110,104,97,110,100,108,101,100,32,101,120,99,101,112,116,105,111,110,58,32]);;
    buf_33556648[0].push.apply(buf_33556648[0], e_33556647.message);;
    }
    else {
    buf_33556648[0].push.apply(buf_33556648[0], [69,114,114,111,114,58,32,117,110,104,97,110,100,108,101,100,32,101,120,99,101,112,116,105,111,110]);;
    }
    
    buf_33556648[0].push.apply(buf_33556648[0], [32,91]);;
    add_33556395(buf_33556648, 0, e_33556647.name);
    buf_33556648[0].push.apply(buf_33556648[0], [93,10]);;
    buf_33556648[0].push.apply(buf_33556648[0], rawWriteStackTrace_33556608());;
    var cbuf_33556649 = toJSStr(buf_33556648[0]);
    framePtr = null;
      if (typeof(Error) !== "undefined") {
    throw new Error(cbuf_33556649);
  }
  else {
    throw cbuf_33556649;
  }
  

  
}

function sysFatal_268435498(message_268435501) {
  var F = {procname: "sysFatal.sysFatal", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/system/fatal.nim", line: 0};
  framePtr = F;
    F.line = 53;
    raiseException({message: nimCopy(null, message_268435501, NTI33554449), m_type: NTI134217745, parent: null, name: null, trace: [], up: null}, "AssertionDefect");
  framePtr = F.prev;

  
}

function raiseAssert_268435496(msg_268435497) {
  var F = {procname: "assertions.raiseAssert", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/std/assertions.nim", line: 0};
  framePtr = F;
    F.line = 36;
    sysFatal_268435498(msg_268435497);
  framePtr = F.prev;

  
}

function failedAssertImpl_268435532(msg_268435533) {
  var F = {procname: "assertions.failedAssertImpl", prev: framePtr, filename: "/home/runner/work/Nim/Nim/lib/std/assertions.nim", line: 0};
  framePtr = F;
    F.line = 41;
    raiseAssert_268435496(msg_268435533);
  framePtr = F.prev;

  
}
var F = {procname: "module jsffi_examples_2", prev: framePtr, filename: "/home/runner/work/Nim/Nim/doc/html/nimcache/runnableExamples/jsffi_examples_2.nim", line: 0};
framePtr = F;
F.line = 224;
var obj_922746883 = {};
F.line = 224;
obj_922746883.a = 20;
if (!(((obj_922746883.a) == 20))) {
F.line = 224;
failedAssertImpl_268435532(makeNimstrLit("/home/runner/work/Nim/Nim/doc/html/nimcache/runnableExamples/jsffi_examples_2.nim(11, 3) `obj.a.to(int) == 20` "));
}

framePtr = F.prev;
var F = {procname: "module jsffi_examples_2", prev: framePtr, filename: "/home/runner/work/Nim/Nim/doc/html/nimcache/runnableExamples/jsffi_examples_2.nim", line: 0};
framePtr = F;
framePtr = F.prev;
var F = {procname: "module jsffi_group0_examples", prev: framePtr, filename: "/home/runner/work/Nim/Nim/doc/html/nimcache/runnableExamples/jsffi_group0_examples.nim", line: 0};
framePtr = F;
framePtr = F.prev;
var F = {procname: "module jsffi_group0_examples", prev: framePtr, filename: "/home/runner/work/Nim/Nim/doc/html/nimcache/runnableExamples/jsffi_group0_examples.nim", line: 0};
framePtr = F;
framePtr = F.prev;
