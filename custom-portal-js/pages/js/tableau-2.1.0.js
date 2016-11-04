/*! tableau-2.1.0 */
(function() {


/*! BEGIN MscorlibSlim */



////////////////////////////////////////////////////////////////////////////////
// Globals and assembly registration
////////////////////////////////////////////////////////////////////////////////

var global = {};

(function(global) {
"use strict";

var ss = { __assemblies: {} };

ss.initAssembly = function assembly(obj, name, res) {
  res = res || {};
  obj.name = name;
  obj.toString = function() { return this.name; };
  obj.__types = {};
  obj.getResourceNames = function() { return Object.keys(res); };
  obj.getResourceDataBase64 = function(name) { return res[name] || null; };
  obj.getResourceData = function(name) { var r = res[name]; return r ? ss.dec64(r) : null; };
  ss.__assemblies[name] = obj;
};
ss.initAssembly(ss, 'mscorlib');



////////////////////////////////////////////////////////////////////////////////
// Utility methods (generated via Script.IsNull, etc.)
////////////////////////////////////////////////////////////////////////////////


ss.getAssemblies = function ss$getAssemblies() {
  return Object.keys(ss.__assemblies).map(function(n) { return ss.__assemblies[n]; });
};

ss.isNullOrUndefined = function ss$isNullOrUndefined(o) {
  return (o === null) || (o === undefined);
};

ss.isValue = function ss$isValue(o) {
  return (o !== null) && (o !== undefined);
};

ss.referenceEquals = function ss$referenceEquals(a, b) {
  return ss.isValue(a) ? a === b : !ss.isValue(b);
};

ss.mkdict = function ss$mkdict() {
  var a = (arguments.length != 1 ? arguments : arguments[0]);
  var r = {};
  for (var i = 0; i < a.length; i += 2) {
    r[a[i]] = a[i + 1];
  }
  return r;
};

ss.clone = function ss$clone(t, o) {
  return o ? t.$clone(o) : o;
}

ss.coalesce = function ss$coalesce(a, b) {
  return ss.isValue(a) ? a : b;
};

ss.isDate = function ss$isDate(obj) {
  return Object.prototype.toString.call(obj) === '[object Date]';
};

ss.isArray = function ss$isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

ss.isTypedArrayType = function ss$isTypedArrayType(type) {
  return ['Float32Array', 'Float64Array', 'Int8Array', 'Int16Array', 'Int32Array', 'Uint8Array', 'Uint16Array', 'Uint32Array', 'Uint8ClampedArray'].indexOf(ss.getTypeFullName(type)) >= 0;
};

ss.isArrayOrTypedArray = function ss$isArray(obj) {
  return ss.isArray(obj) || ss.isTypedArrayType(ss.getInstanceType(obj));
};

ss.getHashCode = function ss$getHashCode(obj) {
  if (!ss.isValue(obj))
    throw new ss_NullReferenceException('Cannot get hash code of null');
  else if (typeof(obj.getHashCode) === 'function')
    return obj.getHashCode();
  else if (typeof(obj) === 'boolean') {
    return obj ? 1 : 0;
  }
  else if (typeof(obj) === 'number') {
    var s = obj.toExponential();
    s = s.substr(0, s.indexOf('e'));
    return parseInt(s.replace('.', ''), 10) & 0xffffffff;
  }
  else if (typeof(obj) === 'string') {
    var res = 0;
    for (var i = 0; i < obj.length; i++)
      res = (res * 31 + obj.charCodeAt(i)) & 0xffffffff;
    return res;
  }
  else if (ss.isDate(obj)) {
    return obj.valueOf() & 0xffffffff;
  }
  else {
    return ss.defaultHashCode(obj);
  }
};

ss.defaultHashCode = function ss$defaultHashCode(obj) {
  return obj.$__hashCode__ || (obj.$__hashCode__ = (Math.random() * 0x100000000) | 0);
};


ss.equals = function ss$equals(a, b) {
    if (!ss.isValue(a))
        throw new ss_NullReferenceException('Object is null');
    else if (a !== ss && typeof(a.equals) === 'function')
        return a.equals(b);
    if (ss.isDate(a) && ss.isDate(b))
        return a.valueOf() === b.valueOf();
    else if (typeof(a) === 'function' && typeof(b) === 'function')
        return ss.delegateEquals(a, b);
    else if (ss.isNullOrUndefined(a) && ss.isNullOrUndefined(b))
        return true;
    else
        return a === b;
};

ss.compare = function ss$compare(a, b) {
  if (!ss.isValue(a))
    throw new ss_NullReferenceException('Object is null');
  else if (typeof(a) === 'number' || typeof(a) === 'string' || typeof(a) === 'boolean')
    return a < b ? -1 : (a > b ? 1 : 0);
  else if (ss.isDate(a))
    return ss.compare(a.valueOf(), b.valueOf());
  else
    return a.compareTo(b);
};

ss.equalsT = function ss$equalsT(a, b) {
  if (!ss.isValue(a))
    throw new ss_NullReferenceException('Object is null');
  else if (typeof(a) === 'number' || typeof(a) === 'string' || typeof(a) === 'boolean')
    return a === b;
  else if (ss.isDate(a))
    return a.valueOf() === b.valueOf();
  else
    return a.equalsT(b);
};

ss.staticEquals = function ss$staticEquals(a, b) {
  if (!ss.isValue(a))
    return !ss.isValue(b);
  else
    return ss.isValue(b) ? ss.equals(a, b) : false;
};

ss.shallowCopy = function ss$shallowCopy(source, target) {
  var keys = Object.keys(source);
  for (var i = 0, l = keys.length; i < l; i++) {
    var k = keys[i];
    target[k] = source[k];
  }
};

ss.isLower = function ss$isLower(c) {
  var s = String.fromCharCode(c);
  return s === s.toLowerCase() && s !== s.toUpperCase();
};

ss.isUpper = function ss$isUpper(c) {
  var s = String.fromCharCode(c);
  return s !== s.toLowerCase() && s === s.toUpperCase();
};

if (typeof(window) == 'object') {
  // Browser-specific stuff that could go into the Web assembly, but that assembly does not have an associated JS file.
  if (!window.Element) {
    // IE does not have an Element constructor. This implementation should make casting to elements work.
    window.Element = function() {};
    window.Element.isInstanceOfType = function(instance) { return instance && typeof instance.constructor === 'undefined' && typeof instance.tagName === 'string'; };
  }
  window.Element.__typeName = 'Element';
}

///////////////////////////////////////////////////////////////////////////////
// Object Extensions

ss.clearKeys = function ss$clearKeys(d) {
  for (var n in d) {
    if (d.hasOwnProperty(n))
      delete d[n];
  }
};

ss.keyExists = function ss$keyExists(d, key) {
  return d[key] !== undefined;
};

if (!Object.keys) {
  Object.keys = (function() {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
      hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
      dontEnums = ['toString','toLocaleString','valueOf','hasOwnProperty','isPrototypeOf','propertyIsEnumerable','constructor'],
      dontEnumsLength = dontEnums.length;

    return function (obj) {
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [], prop, i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}

ss.getKeyCount = function ss$getKeyCount(d) {
  return Object.keys(d).length;
};

////////////////////////////////////////////////////////////////////////////////
// Type System Implementation
////////////////////////////////////////////////////////////////////////////////

// When FULL_TYPE_SYSTEM is not defined, then the code is not the full-blown
// type system. It's Just enough to allow us to call base class methods.

ss.__genericCache = {};

ss._makeGenericTypeName = function ss$_makeGenericTypeName(genericType, typeArguments) {
  var result = genericType.__typeName;
  for (var i = 0; i < typeArguments.length; i++)
    result += (i === 0 ? '[' : ',') + '[' + ss.getTypeQName(typeArguments[i]) + ']';
  result += ']';
  return result;
};

ss.makeGenericType = function ss$makeGenericType(genericType, typeArguments) {
  var name = ss._makeGenericTypeName(genericType, typeArguments);
  return ss.__genericCache[name] || genericType.apply(null, typeArguments);
};

ss.registerGenericClassInstance = function ss$registerGenericClassInstance(instance, genericType, typeArguments, members, baseType, interfaceTypes) {
  var name = ss._makeGenericTypeName(genericType, typeArguments);
  ss.__genericCache[name] = instance;
  instance.__typeName = name;
  instance.__genericTypeDefinition = genericType;
  instance.__typeArguments = typeArguments;
  ss.initClass(instance, genericType.__assembly, members, baseType(), interfaceTypes());
};

ss.registerGenericInterfaceInstance = function ss$registerGenericInterfaceInstance(instance, genericType, typeArguments, members, baseInterfaces) {
  var name = ss._makeGenericTypeName(genericType, typeArguments);
  ss.__genericCache[name] = instance;
  instance.__typeName = name;
  instance.__genericTypeDefinition = genericType;
  instance.__typeArguments = typeArguments;
  ss.initInterface(instance, genericType.__assembly, members, baseInterfaces());
};

ss.isGenericTypeDefinition = function ss$isGenericTypeDefinition(type) {
  return type.__isGenericTypeDefinition || false;
};

ss.getGenericTypeDefinition = function ss$getGenericTypeDefinition(type) {
  return type.__genericTypeDefinition || null;
};

ss.getGenericParameterCount = function ss$getGenericParameterCount(type) {
  return type.__typeArgumentCount || 0;
};

ss.getGenericArguments = function ss$getGenericArguments(type) {
  return type.__typeArguments || null;
};


ss.setMetadata = function ss$_setMetadata(type, metadata) {
  if (metadata.members) {
    for (var i = 0; i < metadata.members.length; i++) {
      var m = metadata.members[i];
      m.typeDef = type;
      if (m.adder) m.adder.typeDef = type;
      if (m.remover) m.remover.typeDef = type;
      if (m.getter) m.getter.typeDef = type;
      if (m.setter) m.setter.typeDef = type;
    }
  }
  type.__metadata = metadata;
  if (metadata.variance) {
    type.isAssignableFrom = function(source) {
      var check = function(target, type) {
        if (type.__genericTypeDefinition === target.__genericTypeDefinition && type.__typeArguments.length == target.__typeArguments.length) {
          for (var i = 0; i < target.__typeArguments.length; i++) {
            var v = target.__metadata.variance[i], t = target.__typeArguments[i], s = type.__typeArguments[i];
            switch (v) {
              case 1: if (!ss.isAssignableFrom(t, s)) return false; break;
              case 2: if (!ss.isAssignableFrom(s, t)) return false; break;
              default: if (s !== t) return false;
            }
          }
          return true;
        }
        return false;
      };

      if (source.__interface && check(this, source))
        return true;
      var ifs = ss.getInterfaces(source);
      for (var i = 0; i < ifs.length; i++) {
        if (ifs[i] === this || check(this, ifs[i]))
          return true;
      }
      return false;
    };
  }
}
ss.setMetadata = function ss$_setMetadata(type, metadata) {
};

ss.initClass = function ss$initClass(ctor, asm, members, baseType, interfaces) {
  ctor.__class = true;
  ctor.__assembly = asm;
  if (!ctor.__typeArguments)
    asm.__types[ctor.__typeName] = ctor;
  if (baseType && baseType !== Object) {
    var f = function(){};
    f.prototype = baseType.prototype;
    ctor.prototype = new f();
    ctor.prototype.constructor = ctor;
  }
  ss.shallowCopy(members, ctor.prototype);
  if (interfaces)
    ctor.__interfaces = interfaces;
};

ss.initGenericClass = function ss$initGenericClass(ctor, asm, typeArgumentCount) {
  ctor.__class = true;
  ctor.__assembly = asm;
  asm.__types[ctor.__typeName] = ctor;
  ctor.__typeArgumentCount = typeArgumentCount;
  ctor.__isGenericTypeDefinition = true;
};

ss.initInterface = function ss$initInterface(ctor, asm, members, baseInterfaces) {
  ctor.__interface = true;
  ctor.__assembly = asm;
  if (!ctor.__typeArguments)
    asm.__types[ctor.__typeName] = ctor;
  if (baseInterfaces)
    ctor.__interfaces = baseInterfaces;
  ss.shallowCopy(members, ctor.prototype);
  ctor.isAssignableFrom = function(type) { return ss.contains(ss.getInterfaces(type), this); };
};

ss.initGenericInterface = function ss$initGenericClass(ctor, asm, typeArgumentCount) {
  ctor.__interface = true;
  ctor.__assembly = asm;
  asm.__types[ctor.__typeName] = ctor;
  ctor.__typeArgumentCount = typeArgumentCount;
  ctor.__isGenericTypeDefinition = true;
};

ss.initEnum = function ss$initEnum(ctor, asm, members, namedValues) {
  ctor.__enum = true;
  ctor.__assembly = asm;
  asm.__types[ctor.__typeName] = ctor;
  ss.shallowCopy(members, ctor.prototype);
  ctor.getDefaultValue = ctor.createInstance = function() { return namedValues ? null : 0; };
  ctor.isInstanceOfType = function(instance) { return typeof(instance) == (namedValues ? 'string' : 'number'); };
};

ss.getBaseType = function ss$getBaseType(type) {
  if (type === Object || type.__interface) {
    return null;
  }
  else if (Object.getPrototypeOf) {
    return Object.getPrototypeOf(type.prototype).constructor;
  }
  else {
    var p = type.prototype;
    if (Object.prototype.hasOwnProperty.call(p, 'constructor')) {
      try {
        var ownValue = p.constructor;
        delete p.constructor;
        return p.constructor;
      }
      finally {
        p.constructor = ownValue;
      }
    }
    return p.constructor;
  }
};

ss.getTypeFullName = function ss$getTypeFullName(type) {
  return type.__typeName || type.name || (type.toString().match(/^\s*function\s*([^\s(]+)/) || [])[1] || 'Object';
};

ss.getTypeQName = function ss$getTypeFullName(type) {
  return ss.getTypeFullName(type) + (type.__assembly ? ', ' + type.__assembly.name : '');
};

ss.getTypeName = function ss$getTypeName(type) {
  var fullName = ss.getTypeFullName(type);
  var bIndex = fullName.indexOf('[');
  var nsIndex = fullName.lastIndexOf('.', bIndex >= 0 ? bIndex : fullName.length);
  return nsIndex > 0 ? fullName.substr(nsIndex + 1) : fullName;
};

ss.getTypeNamespace = function ss$getTypeNamespace(type) {
  var fullName = ss.getTypeFullName(type);
  var bIndex = fullName.indexOf('[');
  var nsIndex = fullName.lastIndexOf('.', bIndex >= 0 ? bIndex : fullName.length);
  return nsIndex > 0 ? fullName.substr(0, nsIndex) : '';
};

ss.getTypeAssembly = function ss$getTypeAssembly(type) {
  if (ss.contains([Date, Number, Boolean, String, Function, Array], type))
    return ss;
  else
    return type.__assembly || null;
};

ss._getAssemblyType = function ss$_getAssemblyType(asm, name) {
  var result = [];
  if (asm.__types) {
    return asm.__types[name] || null;
  }
  else {
    var a = name.split('.');
    for (var i = 0; i < a.length; i++) {
      asm = asm[a[i]];
      if (!ss.isValue(asm))
        return null;
    }
    if (typeof asm !== 'function')
      return null;
    return asm;
  }
};

ss.getAssemblyTypes = function ss$getAssemblyTypes(asm) {
  var result = [];
  if (asm.__types) {
    for (var t in asm.__types) {
      if (asm.__types.hasOwnProperty(t))
        result.push(asm.__types[t]);
    }
  }
  else {
    var traverse = function(s, n) {
      for (var c in s) {
        if (s.hasOwnProperty(c))
          traverse(s[c], c);
      }
      if (typeof(s) === 'function' && ss.isUpper(n.charCodeAt(0)))
        result.push(s);
    };
    traverse(asm, '');
  }
  return result;
};

ss.createAssemblyInstance = function ss$createAssemblyInstance(asm, typeName) {
  var t = ss.getType(typeName, asm);
  return t ? ss.createInstance(t) : null;
};

ss.getInterfaces = function ss$getInterfaces(type) {
  if (type.__interfaces)
    return type.__interfaces;
  else if (type === Date || type === Number)
    return [ ss_IEquatable, ss_IComparable, ss_IFormattable ];
  else if (type === Boolean || type === String)
    return [ ss_IEquatable, ss_IComparable ];
  else if (type === Array || ss.isTypedArrayType(type))
    return [ ss_IEnumerable, ss_ICollection, ss_IList ];
  else
    return [];
};

ss.isInstanceOfType = function ss$isInstanceOfType(instance, type) {
  if (ss.isNullOrUndefined(instance))
    return false;

  if (typeof(type.isInstanceOfType) === 'function')
    return type.isInstanceOfType(instance);

  return ss.isAssignableFrom(type, ss.getInstanceType(instance));
};

ss.isAssignableFrom = function ss$isAssignableFrom(target, type) {
  return target === type || (typeof(target.isAssignableFrom) === 'function' && target.isAssignableFrom(type)) || type.prototype instanceof target;
};

ss.isClass = function Type$isClass(type) {
  return (type.__class == true || type === Array || type === Function || type === RegExp || type === String || type === Error || type === Object);
};

ss.isEnum = function Type$isEnum(type) {
  return !!type.__enum;
};

ss.isFlags = function Type$isFlags(type) {
  return type.__metadata && type.__metadata.enumFlags || false;
};

ss.isInterface = function Type$isInterface(type) {
  return !!type.__interface;
};

ss.safeCast = function ss$safeCast(instance, type) {
  if (type === true)
    return instance;
  else if (type === false)
    return null;
  else
    return ss.isInstanceOfType(instance, type) ? instance : null;
};

ss.cast = function ss$cast(instance, type) {
  if (instance === null || typeof(instance) === 'undefined')
    return instance;
  else if (type === true || (type !== false && ss.isInstanceOfType(instance, type)))
    return instance;
  throw new ss_InvalidCastException('Cannot cast object to type ' + ss.getTypeFullName(type));
};

ss.getInstanceType = function ss$getInstanceType(instance) {
  if (!ss.isValue(instance))
    throw new ss_NullReferenceException('Cannot get type of null');

  // NOTE: We have to catch exceptions because the constructor
  //       cannot be looked up on native COM objects
  try {
    return instance.constructor;
  }
  catch (ex) {
    return Object;
  }
};

ss._getType = function (typeName, asm, re) {
  var outer = !re;
  re = re || /[[,\]]/g;
  var last = re.lastIndex, m = re.exec(typeName), tname, targs = [];
  if (m) {
    tname = typeName.substring(last, m.index);
    switch (m[0]) {
      case '[':
        if (typeName[m.index + 1] != '[')
          return null;
        for (;;) {
          re.exec(typeName);
          var t = ss._getType(typeName, global, re);
          if (!t)
            return null;
          targs.push(t);
          m = re.exec(typeName);
          if (m[0] === ']')
            break;
          else if (m[0] !== ',')
            return null;
        }
        m = re.exec(typeName);
        if (m && m[0] === ',') {
          re.exec(typeName);
          if (!(asm = ss.__assemblies[(re.lastIndex > 0 ? typeName.substring(m.index + 1, re.lastIndex - 1) : typeName.substring(m.index + 1)).trim()]))
            return null;
        }
        break;

      case ']':
        break;

      case ',':
        re.exec(typeName);
        if (!(asm = ss.__assemblies[(re.lastIndex > 0 ? typeName.substring(m.index + 1, re.lastIndex - 1) : typeName.substring(m.index + 1)).trim()]))
          return null;
        break;
    }
  }
  else {
    tname = typeName.substring(last);
  }

  if (outer && re.lastIndex)
    return null;

  var t = ss._getAssemblyType(asm, tname.trim());
  return targs.length ? ss.makeGenericType(t, targs) : t;
}

ss.getType = function ss$getType(typeName, asm) {
  return typeName ? ss._getType(typeName, asm || global) : null;
};

ss.getDefaultValue = function ss$getDefaultValue(type) {
  if (typeof(type.getDefaultValue) === 'function')
    return type.getDefaultValue();
  else if (type === Boolean)
    return false;
  else if (type === Date)
    return new Date(0);
  else if (type === Number)
    return 0;
  return null;
};

ss.createInstance = function ss$createInstance(type) {
  if (typeof(type.createInstance) === 'function')
    return type.createInstance();
  else if (type === Boolean)
    return false;
  else if (type === Date)
    return new Date(0);
  else if (type === Number)
    return 0;
  else if (type === String)
    return '';
  else
    return new type();
};


///////////////////////////////////////////////////////////////////////////////
// IFormattable

var ss_IFormattable = function IFormattable$() { };

ss_IFormattable.__typeName = 'ss.IFormattable';
ss.IFormattable = ss_IFormattable;
ss.initInterface(ss_IFormattable, ss, { format: null });


///////////////////////////////////////////////////////////////////////////////
// IComparable

var ss_IComparable = function IComparable$() { };

ss_IComparable.__typeName = 'ss.IComparable';
ss.IComparable = ss_IComparable;
ss.initInterface(ss_IComparable, ss, { compareTo: null });

///////////////////////////////////////////////////////////////////////////////
// IEquatable

var ss_IEquatable = function IEquatable$() { };

ss_IEquatable.__typeName = 'ss.IEquatable';
ss.IEquatable = ss_IEquatable;
ss.initInterface(ss_IEquatable, ss, { equalsT: null });

///////////////////////////////////////////////////////////////////////////////
// Number Extensions


///////////////////////////////////////////////////////////////////////////////
// String Extensions


ss.isNullOrEmptyString = function ss$isNullOrEmptyString(s) {
  return !s || !s.length;
};


if (!String.prototype.trim) {
  String.prototype.trim = function String$trim() {
    return ss.trimStartString(ss.trimEndString(this));
  };
}

ss.trimEndString = function ss$trimEndString(s, chars) {
  return s.replace(chars ? new RegExp('[' + String.fromCharCode.apply(null, chars) + ']+$') : /\s*$/, '');
};

ss.trimStartString = function ss$trimStartString(s, chars) {
  return s.replace(chars ? new RegExp('^[' + String.fromCharCode.apply(null, chars) + ']+') : /^\s*/, '');
};

ss.trimString = function ss$trimString(s, chars) {
  return ss.trimStartString(ss.trimEndString(s, chars), chars);
};


///////////////////////////////////////////////////////////////////////////////
// Math Extensions


///////////////////////////////////////////////////////////////////////////////
// IFormatProvider

///////////////////////////////////////////////////////////////////////////////
// NumberFormatInfo

///////////////////////////////////////////////////////////////////////////////
// DateTimeFormatInfo

///////////////////////////////////////////////////////////////////////////////
// Array Extensions


ss.arrayClone = function ss$arrayClone(arr) {
    if (arr.length === 1) {
        return [arr[0]];
    }
    else {
        return Array.apply(null, arr);
    }
};


if (!Array.prototype.map) {
  Array.prototype.map = function Array$map(callback, instance) {
    var length = this.length;
    var mapped = new Array(length);
    for (var i = 0; i < length; i++) {
      if (i in this) {
        mapped[i] = callback.call(instance, this[i], i, this);
      }
    }
    return mapped;
  };
}


if (!Array.prototype.some) {
  Array.prototype.some = function Array$some(callback, instance) {
    var length = this.length;
    for (var i = 0; i < length; i++) {
      if (i in this && callback.call(instance, this[i], i, this)) {
        return true;
      }
    }
    return false;
  };
}

// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
if (!Array.prototype.forEach) {

  Array.prototype.forEach = function(callback, thisArg) {

      var T, k;

      if (this == null) {
          throw new TypeError(' this is null or not defined');
      }

      // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
      var O = Object(this);

      // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
      // 3. Let len be ToUint32(lenValue).
      var len = O.length >>> 0;

      // 4. If IsCallable(callback) is false, throw a TypeError exception.
      // See: http://es5.github.com/#x9.11
      if (typeof callback !== "function") {
          throw new TypeError(callback + ' is not a function');
      }

      // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
      if (arguments.length > 1) {
          T = thisArg;
      }

      // 6. Let k be 0
      k = 0;

      // 7. Repeat, while k < len
      while (k < len) {

          var kValue;

          // a. Let Pk be ToString(k).
          //   This is implicit for LHS operands of the in operator
          // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
          //   This step can be combined with c
          // c. If kPresent is true, then
          if (k in O) {

              // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
              kValue = O[k];

              // ii. Call the Call internal method of callback with T as the this value and
              // argument list containing kValue, k, and O.
              callback.call(T, kValue, k, O);
          }
          // d. Increase k by 1.
          k++;
      }
      // 8. return undefined
  };
}

// Production steps of ECMA-262, Edition 5
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun/*, thisArg*/) {

        if (this === void 0 || this === null) {
            throw new TypeError();
        }

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== 'function') {
            throw new TypeError();
        }

        var res = [];
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
            if (i in t) {
                var val = t[i];

                // NOTE: Technically this should Object.defineProperty at
                //       the next index, as push can be affected by
                //       properties on Object.prototype and Array.prototype.
                //       But that method's new, and collisions should be
                //       rare, so use the more-compatible alternative.
                if (fun.call(thisArg, val, i, t)) {
                    res.push(val);
                }
            }
        }

        return res;
    };
}


///////////////////////////////////////////////////////////////////////////////
// Date Extensions


///////////////////////////////////////////////////////////////////////////////
// Function Extensions

ss._delegateContains = function ss$_delegateContains(targets, object, method) {
  for (var i = 0; i < targets.length; i += 2) {
    if (targets[i] === object && targets[i + 1] === method) {
      return true;
    }
  }
  return false;
};

ss._mkdel = function ss$_mkdel(targets) {
  var delegate = function() {
    if (targets.length == 2) {
      return targets[1].apply(targets[0], arguments);
    }
    else {
      var clone = ss.arrayClone(targets);
      for (var i = 0; i < clone.length; i += 2) {
        if (ss._delegateContains(targets, clone[i], clone[i + 1])) {
          clone[i + 1].apply(clone[i], arguments);
        }
      }
      return null;
    }
  };
  delegate._targets = targets;

  return delegate;
};

ss.mkdel = function ss$mkdel(object, method) {
  if (!object) {
    return method;
  }
  return ss._mkdel([object, method]);
};

ss.delegateCombine = function ss$delegateCombine(delegate1, delegate2) {
  if (!delegate1) {
    if (!delegate2._targets) {
      return ss.mkdel(null, delegate2);
    }
    return delegate2;
  }
  if (!delegate2) {
    if (!delegate1._targets) {
      return ss.mkdel(null, delegate1);
    }
    return delegate1;
  }

  var targets1 = delegate1._targets ? delegate1._targets : [null, delegate1];
  var targets2 = delegate2._targets ? delegate2._targets : [null, delegate2];

  return ss._mkdel(targets1.concat(targets2));
};

ss.delegateRemove = function ss$delegateRemove(delegate1, delegate2) {
  if (!delegate1 || (delegate1 === delegate2)) {
    return null;
  }
  if (!delegate2) {
    return delegate1;
  }

  var targets = delegate1._targets;
  var object = null;
  var method;
  if (delegate2._targets) {
    object = delegate2._targets[0];
    method = delegate2._targets[1];
  }
  else {
    method = delegate2;
  }

  for (var i = 0; i < targets.length; i += 2) {
    if ((targets[i] === object) && (targets[i + 1] === method)) {
      if (targets.length == 2) {
        return null;
      }
      var t = ss.arrayClone(targets);
      t.splice(i, 2);
      return ss._mkdel(t);
    }
  }

  return delegate1;
};

ss.delegateEquals = function ss$delegateEquals(a, b) {
    if (a === b)
        return true;
    if (!a._targets && !b._targets)
        return false;
    var ta = a._targets || [null, a], tb = b._targets || [null, b];
    if (ta.length != tb.length)
        return false;
    for (var i = 0; i < ta.length; i++) {
        if (ta[i] !== tb[i])
            return false;
    }
    return true;
};


///////////////////////////////////////////////////////////////////////////////
// RegExp Extensions


///////////////////////////////////////////////////////////////////////////////
// Debug Extensions


///////////////////////////////////////////////////////////////////////////////
// Enum

var ss_Enum = function Enum$() {
};
ss_Enum.__typeName = 'ss.Enum';
ss.Enum = ss_Enum;
ss.initClass(ss_Enum, ss, {});


ss_Enum.getValues = function Enum$getValues(enumType) {
  var parts = [];
  var values = enumType.prototype;
  for (var i in values) {
    if (values.hasOwnProperty(i))
      parts.push(values[i]);
  }
  return parts;
};

///////////////////////////////////////////////////////////////////////////////
// CultureInfo


///////////////////////////////////////////////////////////////////////////////
// IEnumerator

var ss_IEnumerator = function IEnumerator$() { };

ss_IEnumerator.__typeName = 'ss.IEnumerator';
ss.IEnumerator = ss_IEnumerator;
ss.initInterface(ss_IEnumerator, ss, { current: null, moveNext: null, reset: null }, [ss_IDisposable]);

///////////////////////////////////////////////////////////////////////////////
// IEnumerable

var ss_IEnumerable = function IEnumerable$() { };

ss_IEnumerable.__typeName = 'ss.IEnumerable';
ss.IEnumerable = ss_IEnumerable;
ss.initInterface(ss_IEnumerable, ss, { getEnumerator: null });

ss.getEnumerator = function ss$getEnumerator(obj) {
  return obj.getEnumerator ? obj.getEnumerator() : new ss_ArrayEnumerator(obj);
};

///////////////////////////////////////////////////////////////////////////////
// ICollection

var ss_ICollection = function ICollection$() { };

ss_ICollection.__typeName = 'ss.ICollection';
ss.ICollection = ss_ICollection;
ss.initInterface(ss_ICollection, ss, { get_count: null, add: null, clear: null, contains: null, remove: null });

ss.count = function ss$count(obj) {
  return obj.get_count ? obj.get_count() : obj.length;
};

ss.add = function ss$add(obj, item) {
  if (obj.add)
    obj.add(item);
  else if (ss.isArray(obj))
    obj.push(item);
  else
    throw new ss_NotSupportedException();
};

ss.clear = function ss$clear(obj) {
  if (obj.clear)
    obj.clear();
  else if (ss.isArray(obj))
    obj.length = 0;
  else
    throw new ss_NotSupportedException();
};

ss.remove = function ss$remove(obj, item) {
  if (obj.remove)
    return obj.remove(item);
  else if (ss.isArray(obj)) {
    var index = ss.indexOf(obj, item);
    if (index >= 0) {
      obj.splice(index, 1);
      return true;
    }
    return false;
  }
  else
    throw new ss_NotSupportedException();
};

ss.contains = function ss$contains(obj, item) {
  if (obj.contains)
    return obj.contains(item);
  else
    return ss.indexOf(obj, item) >= 0;
};

///////////////////////////////////////////////////////////////////////////////
// TimeSpan


///////////////////////////////////////////////////////////////////////////////
// IEqualityComparer

var ss_IEqualityComparer = function IEqualityComparer$() { };

ss_IEqualityComparer.__typeName = 'ss.IEqualityComparer';
ss.IEqualityComparer = ss_IEqualityComparer;
ss.initInterface(ss_IEqualityComparer, ss, { areEqual: null, getObjectHashCode: null });

///////////////////////////////////////////////////////////////////////////////
// IComparer

var ss_IComparer = function IComparer$() { };

ss_IComparer.__typeName = 'ss.IComparer';
ss.IComparer = ss_IComparer;
ss.initInterface(ss_IComparer, ss, { compare: null });

///////////////////////////////////////////////////////////////////////////////
// Nullable

ss.unbox = function ss$unbox(instance) {
  if (!ss.isValue(instance))
    throw new ss_InvalidOperationException('Nullable object must have a value.');
  return instance;
};

var ss_Nullable$1 = function Nullable$1$(T) {
  var $type = function() {
  };
  $type.isInstanceOfType = function(instance) {
    return ss.isInstanceOfType(instance, T);
  };
  ss.registerGenericClassInstance($type, ss_Nullable$1, [T], {}, function() { return null; }, function() { return []; });
  return $type;
};

ss_Nullable$1.__typeName = 'ss.Nullable$1';
ss.Nullable$1 = ss_Nullable$1;
ss.initGenericClass(ss_Nullable$1, ss, 1);

ss_Nullable$1.eq = function Nullable$eq(a, b) {
  return !ss.isValue(a) ? !ss.isValue(b) : (a === b);
};

ss_Nullable$1.ne = function Nullable$eq(a, b) {
  return !ss.isValue(a) ? ss.isValue(b) : (a !== b);
};

ss_Nullable$1.le = function Nullable$le(a, b) {
  return ss.isValue(a) && ss.isValue(b) && a <= b;
};

ss_Nullable$1.ge = function Nullable$ge(a, b) {
  return ss.isValue(a) && ss.isValue(b) && a >= b;
};

ss_Nullable$1.lt = function Nullable$lt(a, b) {
  return ss.isValue(a) && ss.isValue(b) && a < b;
};

ss_Nullable$1.gt = function Nullable$gt(a, b) {
  return ss.isValue(a) && ss.isValue(b) && a > b;
};

ss_Nullable$1.sub = function Nullable$sub(a, b) {
  return ss.isValue(a) && ss.isValue(b) ? a - b : null;
};

ss_Nullable$1.add = function Nullable$add(a, b) {
  return ss.isValue(a) && ss.isValue(b) ? a + b : null;
};

ss_Nullable$1.mod = function Nullable$mod(a, b) {
  return ss.isValue(a) && ss.isValue(b) ? a % b : null;
};

ss_Nullable$1.div = function Nullable$divf(a, b) {
  return ss.isValue(a) && ss.isValue(b) ? a / b : null;
};

ss_Nullable$1.mul = function Nullable$mul(a, b) {
  return ss.isValue(a) && ss.isValue(b) ? a * b : null;
};

ss_Nullable$1.band = function Nullable$band(a, b) {
  return ss.isValue(a) && ss.isValue(b) ? a & b : null;
};

ss_Nullable$1.bor = function Nullable$bor(a, b) {
  return ss.isValue(a) && ss.isValue(b) ? a | b : null;
};

ss_Nullable$1.xor = function Nullable$xor(a, b) {
  return ss.isValue(a) && ss.isValue(b) ? a ^ b : null;
};

ss_Nullable$1.shl = function Nullable$shl(a, b) {
  return ss.isValue(a) && ss.isValue(b) ? a << b : null;
};

ss_Nullable$1.srs = function Nullable$srs(a, b) {
  return ss.isValue(a) && ss.isValue(b) ? a >> b : null;
};

ss_Nullable$1.sru = function Nullable$sru(a, b) {
  return ss.isValue(a) && ss.isValue(b) ? a >>> b : null;
};

ss_Nullable$1.and = function Nullable$and(a, b) {
  if (a === true && b === true)
    return true;
  else if (a === false || b === false)
    return false;
  else
    return null;
};

ss_Nullable$1.or = function Nullable$or(a, b) {
  if (a === true || b === true)
    return true;
  else if (a === false && b === false)
    return false;
  else
    return null;
};

ss_Nullable$1.not = function Nullable$not(a) {
  return ss.isValue(a) ? !a : null;
};

ss_Nullable$1.neg = function Nullable$neg(a) {
  return ss.isValue(a) ? -a : null;
};

ss_Nullable$1.pos = function Nullable$pos(a) {
  return ss.isValue(a) ? +a : null;
};

ss_Nullable$1.cpl = function Nullable$cpl(a) {
  return ss.isValue(a) ? ~a : null;
};

ss_Nullable$1.lift = function Nullable$lift() {
  for (var i = 0; i < arguments.length; i++) {
    if (!ss.isValue(arguments[i]))
      return null;
  }
  return arguments[0].apply(null, Array.prototype.slice.call(arguments, 1));
};

///////////////////////////////////////////////////////////////////////////////
// IList

var ss_IList = function IList$() { };

ss_IList.__typeName = 'ss.IList';
ss.IList = ss_IList;
ss.initInterface(ss_IList, ss, { get_item: null, set_item: null, indexOf: null, insert: null, removeAt: null }, [ss_ICollection, ss_IEnumerable]);

ss.getItem = function ss$getItem(obj, index) {
  return obj.get_item ? obj.get_item(index) : obj[index];
}

ss.setItem = function ss$setItem(obj, index, value) {
  obj.set_item ? obj.set_item(index, value) : (obj[index] = value);
}

ss.indexOf = function ss$indexOf(obj, item) {
  var itemType = typeof(item);
  if ((!item || typeof(item.equals) !== 'function') && typeof(obj.indexOf) === 'function') {
    // use indexOf if item is null or if item does not implement an equals function
    return obj.indexOf(item);
  } else if (ss.isArrayOrTypedArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      if (ss.staticEquals(obj[i], item)) {
        return i;
      }
    }
    return -1;
  }
  else
    return obj.indexOf(item);
};

ss.insert = function ss$insert(obj, index, item) {
  if (obj.insert)
    obj.insert(index, item);
  else if (ss.isArray(obj))
    obj.splice(index, 0, item);
  else
    throw new ss_NotSupportedException();
};

ss.removeAt = function ss$removeAt(obj, index) {
  if (obj.removeAt)
    obj.removeAt(index);
  else if (ss.isArray(obj))
    obj.splice(index, 1);
  else
    throw new ss_NotSupportedException();
};

///////////////////////////////////////////////////////////////////////////////
// IDictionary

var ss_IDictionary = function IDictionary$() { };

ss_IDictionary.__typeName = 'ss.IDictionary';
ss.IDictionary = ss_IDictionary;
ss.initInterface(ss_IDictionary, ss, { get_item: null, set_item: null, get_keys: null, get_values: null, containsKey: null, add: null, remove: null, tryGetValue: null }, [ss_IEnumerable]);

///////////////////////////////////////////////////////////////////////////////
// Int32

var ss_Int32 = function Int32$() { };

ss_Int32.__typeName = 'ss.Int32';
ss.Int32 = ss_Int32;
ss.initClass(ss_Int32, ss, {}, Object, [ ss_IEquatable, ss_IComparable, ss_IFormattable ]);
ss_Int32.__class = false;

ss_Int32.isInstanceOfType = function Int32$isInstanceOfType(instance) {
  return typeof(instance) === 'number' && isFinite(instance) && Math.round(instance, 0) == instance;
};

ss_Int32.getDefaultValue = ss_Int32.createInstance = function Int32$getDefaultValue() {
  return 0;
};

ss_Int32.div = function Int32$div(a, b) {
  if (!ss.isValue(a) || !ss.isValue(b)) return null;
  if (b === 0) throw new ss_DivideByZeroException();
  return ss_Int32.trunc(a / b);
};

ss_Int32.trunc = function Int32$trunc(n) {
  return ss.isValue(n) ? (n > 0 ? Math.floor(n) : Math.ceil(n)) : null;
};

ss_Int32.tryParse = function Int32$tryParse(s, result, min, max) {
  result.$ = 0;
  if (!/^[+-]?[0-9]+$/.test(s))
    return 0;
  var n = parseInt(s, 10);
  if (n < min || n > max)
    return false;
  result.$ = n;
  return true;
};

///////////////////////////////////////////////////////////////////////////////
// MutableDateTime

var ss_JsDate = function JsDate$() { };

ss_JsDate.__typeName = 'ss.JsDate';
ss.JsDate = ss_JsDate;
ss.initClass(ss_JsDate, ss, {}, Object, [ ss_IEquatable, ss_IComparable ]);

ss_JsDate.createInstance = function JsDate$createInstance() {
    return new Date();
};

ss_JsDate.isInstanceOfType = function JsDate$isInstanceOfType(instance) {
   return instance instanceof Date;
};

///////////////////////////////////////////////////////////////////////////////
// ArrayEnumerator

var ss_ArrayEnumerator = function ArrayEnumerator$(array) {
  this._array = array;
  this._index = -1;
};
ss_ArrayEnumerator.__typeName = 'ss.ArrayEnumerator';
ss.ArrayEnumerator = ss_ArrayEnumerator;
ss.initClass(ss_ArrayEnumerator, ss, {
  moveNext: function ArrayEnumerator$moveNext() {
    this._index++;
    return (this._index < this._array.length);
  },
  reset: function ArrayEnumerator$reset() {
    this._index = -1;
  },
  current: function ArrayEnumerator$current() {
    if (this._index < 0 || this._index >= this._array.length)
      throw 'Invalid operation';
    return this._array[this._index];
  },
  dispose: function ArrayEnumerator$dispose() {
  }
}, null, [ss_IEnumerator, ss_IDisposable]);

///////////////////////////////////////////////////////////////////////////////
// ObjectEnumerator

var ss_ObjectEnumerator = function ObjectEnumerator$(o) {
  this._keys = Object.keys(o);
  this._index = -1;
  this._object = o;
};

ss_ObjectEnumerator.__typeName = 'ss.ObjectEnumerator';
ss.ObjectEnumerator = ss_ObjectEnumerator;
ss.initClass(ss_ObjectEnumerator, ss, {
  moveNext: function ObjectEnumerator$moveNext() {
    this._index++;
    return (this._index < this._keys.length);
  },
  reset: function ObjectEnumerator$reset() {
    this._index = -1;
  },
  current: function ObjectEnumerator$current() {
    if (this._index < 0 || this._index >= this._keys.length)
      throw new ss_InvalidOperationException('Invalid operation');
    var k = this._keys[this._index];
    return { key: k, value: this._object[k] };
  },
  dispose: function ObjectEnumerator$dispose() {
  }
}, null, [ss_IEnumerator, ss_IDisposable]);

///////////////////////////////////////////////////////////////////////////////
// EqualityComparer

var ss_EqualityComparer = function EqualityComparer$() {
};
ss_EqualityComparer.__typeName = 'ss.EqualityComparer';
ss.EqualityComparer = ss_EqualityComparer;
ss.initClass(ss_EqualityComparer, ss, {
  areEqual: function EqualityComparer$areEqual(x, y) {
    return ss.staticEquals(x, y);
  },
  getObjectHashCode: function EqualityComparer$getObjectHashCode(obj) {
    return ss.isValue(obj) ? ss.getHashCode(obj) : 0;
  }
}, null, [ss_IEqualityComparer]);
ss_EqualityComparer.def = new ss_EqualityComparer();


///////////////////////////////////////////////////////////////////////////////
// Comparer

var ss_Comparer = function Comparer$(f) {
  this.f = f;
};

ss_Comparer.__typeName = 'ss.Comparer';
ss.Comparer = ss_Comparer;
ss.initClass(ss_Comparer, ss, {
  compare: function Comparer$compare(x, y) {
    return this.f(x, y);
  }
}, null, [ss_IComparer]);
ss_Comparer.def = new ss_Comparer(function Comparer$defaultCompare(a, b) {
  if (!ss.isValue(a))
    return !ss.isValue(b)? 0 : -1;
  else if (!ss.isValue(b))
    return 1;
  else
    return ss.compare(a, b);
});


//#include "Dictionary.js"

///////////////////////////////////////////////////////////////////////////////
// IDisposable

var ss_IDisposable = function IDisposable$() { };
ss_IDisposable.__typeName = 'ss.IDisposable';
ss.IDisposable = ss_IDisposable;
ss.initInterface(ss_IDisposable, ss, { dispose: null });

///////////////////////////////////////////////////////////////////////////////
// StringBuilder

var ss_StringBuilder = function StringBuilder$(s) {
  this._parts = (ss.isValue(s) && s != '') ? [s] : [];
  this.length = ss.isValue(s) ? s.length : 0;
}

ss_StringBuilder.__typeName = 'ss.StringBuilder';
ss.StringBuilder = ss_StringBuilder;
ss.initClass(ss_StringBuilder, ss, {
  append: function StringBuilder$append(o) {
    if (ss.isValue(o)) {
      var s = o.toString();
      ss.add(this._parts, s);
      this.length += s.length;
    }
    return this;
  },

  appendChar: function StringBuilder$appendChar(c) {
    return this.append(String.fromCharCode(c));
  },

  appendLine: function StringBuilder$appendLine(s) {
    this.append(s);
    this.append('\r\n');
    return this;
  },

  appendLineChar: function StringBuilder$appendLineChar(c) {
    return this.appendLine(String.fromCharCode(c));
  },

  clear: function StringBuilder$clear() {
    this._parts = [];
    this.length = 0;
  },

  toString: function StringBuilder$toString() {
    return this._parts.join('');
  }
});

///////////////////////////////////////////////////////////////////////////////
// Random


///////////////////////////////////////////////////////////////////////////////
// EventArgs

var ss_EventArgs = function EventArgs$() {
}
ss_EventArgs.__typeName = 'ss.EventArgs';
ss.EventArgs = ss_EventArgs;
ss.initClass(ss_EventArgs, ss, {});

ss_EventArgs.Empty = new ss_EventArgs();

///////////////////////////////////////////////////////////////////////////////
// Exception

var ss_Exception = function Exception$(message, innerException) {
  this._message = message || 'An error occurred.';
  this._innerException = innerException || null;
  this._error = new Error();
}

ss_Exception.__typeName = 'ss.Exception';
ss.Exception = ss_Exception;
ss.initClass(ss_Exception, ss, {
  get_message: function Exception$get_message() {
    return this._message;
  },
  get_innerException: function Exception$get_innerException() {
    return this._innerException;
  },
  get_stack: function Exception$get_stack() {
    return this._error.stack;
  }
});

ss_Exception.wrap = function Exception$wrap(o) {
  if (ss.isInstanceOfType(o, ss_Exception)) {
    return o;
  }
  else if (o instanceof TypeError) {
    // TypeError can either be 'cannot read property blah of null/undefined' (proper NullReferenceException), or it can be eg. accessing a non-existent method of an object.
    // As long as all code is compiled, they should with a very high probability indicate the use of a null reference.
    return new ss_NullReferenceException(o.message, new ss_JsErrorException(o));
  }
  else if (o instanceof RangeError) {
    return new ss_ArgumentOutOfRangeException(null, o.message, new ss_JsErrorException(o));
  }
  else if (o instanceof Error) {
    return new ss_JsErrorException(o);
  }
  else {
    return new ss_Exception(o.toString());
  }
};

////////////////////////////////////////////////////////////////////////////////
// NotImplementedException

var ss_NotImplementedException = function NotImplementedException$(message, innerException) {
  ss_Exception.call(this, message || 'The method or operation is not implemented.', innerException);
};
ss_NotImplementedException.__typeName = 'ss.NotImplementedException';
ss.NotImplementedException = ss_NotImplementedException;
ss.initClass(ss_NotImplementedException, ss, {}, ss_Exception);

////////////////////////////////////////////////////////////////////////////////
// NotSupportedException

var ss_NotSupportedException = function NotSupportedException$(message, innerException) {
  ss_Exception.call(this, message || 'Specified method is not supported.', innerException);
};
ss_NotSupportedException.__typeName = 'ss.NotSupportedException';
ss.NotSupportedException = ss_NotSupportedException;
ss.initClass(ss_NotSupportedException, ss, {}, ss_Exception);

////////////////////////////////////////////////////////////////////////////////
// AggregateException

var ss_AggregateException = function AggregateException$(message, innerExceptions) {
  this.innerExceptions = ss.isValue(innerExceptions) ? ss.arrayFromEnumerable(innerExceptions) : [];
  ss_Exception.call(this, message || 'One or more errors occurred.', this.innerExceptions.length ? this.innerExceptions[0] : null);
};

ss_AggregateException.__typeName = 'ss.AggregateException';
ss.AggregateException = ss_AggregateException;
ss.initClass(ss_AggregateException, ss, {
  flatten: function  AggregateException$flatten() {
    var inner = [];
    for (var i = 0; i < this.innerExceptions.length; i++) {
      var e = this.innerExceptions[i];
      if (ss.isInstanceOfType(e, ss_AggregateException)) {
        inner.push.apply(inner, e.flatten().innerExceptions);
      }
      else {
        inner.push(e);
      }
    }
    return new ss_AggregateException(this._message, inner);
  }
}, ss_Exception);

////////////////////////////////////////////////////////////////////////////////
// PromiseException

var ss_PromiseException = function PromiseException(args, message, innerException) {
  ss_Exception.call(this, message || (args.length && args[0] ? args[0].toString() : 'An error occurred'), innerException);
  this.arguments = ss.arrayClone(args);
};

ss_PromiseException.__typeName = 'ss.PromiseException';
ss.PromiseException = ss_PromiseException;
ss.initClass(ss_PromiseException, ss, {
  get_arguments: function PromiseException$get_arguments() {
    return this._arguments;
  }
}, ss_Exception);

////////////////////////////////////////////////////////////////////////////////
// JsErrorException

var ss_JsErrorException = function JsErrorException$(error, message, innerException) {
  ss_Exception.call(this, message || error.message, innerException);
  this.error = error;
};
ss_JsErrorException.__typeName = 'ss.JsErrorException';
ss.JsErrorException = ss_JsErrorException;
ss.initClass(ss_JsErrorException, ss, {
  get_stack: function Exception$get_stack() {
    return this.error.stack;
  }
}, ss_Exception);

////////////////////////////////////////////////////////////////////////////////
// ArgumentException

var ss_ArgumentException = function ArgumentException$(message, paramName, innerException) {
  ss_Exception.call(this, message || 'Value does not fall within the expected range.', innerException);
  this.paramName = paramName || null;
};

ss_ArgumentException.__typeName = 'ss.ArgumentException';
ss.ArgumentException = ss_ArgumentException;
ss.initClass(ss_ArgumentException, ss, {}, ss_Exception);

////////////////////////////////////////////////////////////////////////////////
// ArgumentNullException

var ss_ArgumentNullException = function ArgumentNullException$(paramName, message, innerException) {
  if (!message) {
    message = 'Value cannot be null.';
    if (paramName)
      message += '\nParameter name: ' + paramName;
  }

  ss_ArgumentException.call(this, message, paramName, innerException);
};

ss_ArgumentNullException.__typeName = 'ss.ArgumentNullException';
ss.ArgumentNullException = ss_ArgumentNullException;
ss.initClass(ss_ArgumentNullException, ss, {}, ss_ArgumentException);

////////////////////////////////////////////////////////////////////////////////
// ArgumentNullException

var ss_ArgumentOutOfRangeException = function ArgumentOutOfRangeException$(paramName, message, innerException, actualValue) {
  if (!message) {
    message = 'Value is out of range.';
    if (paramName)
      message += '\nParameter name: ' + paramName;
  }

  ss_ArgumentException.call(this, message, paramName, innerException);
  this.actualValue = actualValue || null;
};

ss_ArgumentOutOfRangeException.__typeName = 'ss.ArgumentOutOfRangeException';
ss.ArgumentOutOfRangeException = ss_ArgumentOutOfRangeException;
ss.initClass(ss_ArgumentOutOfRangeException, ss, {}, ss_ArgumentException);

////////////////////////////////////////////////////////////////////////////////
// FormatException

var ss_FormatException = function FormatException$(message, innerException) {
  ss_Exception.call(this, message || 'Invalid format.', innerException);
};
ss_FormatException.__typeName = 'ss.FormatException';
ss.FormatException = ss_FormatException;
ss.initClass(ss_FormatException, ss, {}, ss_Exception);

////////////////////////////////////////////////////////////////////////////////
// DivideByZeroException

var ss_DivideByZeroException = function DivideByZeroException$(message, innerException) {
  ss_Exception.call(this, message || 'Division by 0.', innerException);
};
ss_DivideByZeroException.__typeName = 'ss.DivideByZeroException';
ss.DivideByZeroException = ss_DivideByZeroException;
ss.initClass(ss_DivideByZeroException, ss, {}, ss_Exception);

////////////////////////////////////////////////////////////////////////////////
// InvalidCastException

var ss_InvalidCastException = function InvalidCastException$(message, innerException) {
  ss_Exception.call(this, message || 'The cast is not valid.', innerException);
};
ss_InvalidCastException.__typeName = 'ss.InvalidCastException';
ss.InvalidCastException = ss_InvalidCastException;
ss.initClass(ss_InvalidCastException, ss, {}, ss_Exception);

////////////////////////////////////////////////////////////////////////////////
// InvalidOperationException

var ss_InvalidOperationException = function InvalidOperationException$(message, innerException) {
  ss_Exception.call(this, message || 'Operation is not valid due to the current state of the object.', innerException);
};
ss_InvalidOperationException.__typeName = 'ss.InvalidOperationException';
ss.InvalidOperationException = ss_InvalidOperationException;
ss.initClass(ss_InvalidOperationException, ss, {}, ss_Exception);

////////////////////////////////////////////////////////////////////////////////
// NullReferenceException

var ss_NullReferenceException = function NullReferenceException$(message, innerException) {
  ss_Exception.call(this, message || 'Object is null.', innerException);
};
ss_NullReferenceException.__typeName = 'ss.NullReferenceException';
ss.NullReferenceException = ss_NullReferenceException;
ss.initClass(ss_NullReferenceException, ss, {}, ss_Exception);

////////////////////////////////////////////////////////////////////////////////
// KeyNotFoundException

var ss_KeyNotFoundException = function KeyNotFoundException$(message, innerException) {
  ss_Exception.call(this, message || 'Key not found.', innerException);
};
ss_KeyNotFoundException.__typeName = 'ss.KeyNotFoundException';
ss.KeyNotFoundException = ss_KeyNotFoundException;
ss.initClass(ss_KeyNotFoundException, ss, {}, ss_Exception);

////////////////////////////////////////////////////////////////////////////////
// InvalidOperationException

var ss_AmbiguousMatchException = function AmbiguousMatchException$(message, innerException) {
  ss_Exception.call(this, message || 'Ambiguous match.', innerException);
};
ss_AmbiguousMatchException.__typeName = 'ss.AmbiguousMatchException';
ss.AmbiguousMatchException = ss_AmbiguousMatchException;
ss.initClass(ss_AmbiguousMatchException, ss, {}, ss_Exception);

///////////////////////////////////////////////////////////////////////////////
// IteratorBlockEnumerable

var ss_IteratorBlockEnumerable = function IteratorBlockEnumerable$(getEnumerator, $this) {
  this._getEnumerator = getEnumerator;
  this._this = $this;
};

ss_IteratorBlockEnumerable.__typeName = 'ss.IteratorBlockEnumerable';
ss.IteratorBlockEnumerable = ss_IteratorBlockEnumerable;
ss.initClass(ss_IteratorBlockEnumerable, ss, {
  getEnumerator: function IteratorBlockEnumerable$getEnumerator() {
    return this._getEnumerator.call(this._this);
  }
}, null, [ss_IEnumerable]);

///////////////////////////////////////////////////////////////////////////////
// IteratorBlockEnumerator

var ss_IteratorBlockEnumerator = function IteratorBlockEnumerator$(moveNext, getCurrent, dispose, $this) {
  this._moveNext = moveNext;
  this._getCurrent = getCurrent;
  this._dispose = dispose;
  this._this = $this;
};

ss_IteratorBlockEnumerator.__typeName = 'ss.IteratorBlockEnumerator';
ss.IteratorBlockEnumerator = ss_IteratorBlockEnumerator;
ss.initClass(ss_IteratorBlockEnumerator, ss, {
  moveNext: function IteratorBlockEnumerator$moveNext() {
    try {
      return this._moveNext.call(this._this);
    }
    catch (ex) {
      if (this._dispose)
        this._dispose.call(this._this);
      throw ex;
    }
  },
  current: function IteratorBlockEnumerator$current() {
    return this._getCurrent.call(this._this);
  },
  reset: function IteratorBlockEnumerator$reset() {
    throw new ss_NotSupportedException('Reset is not supported.');
  },
  dispose: function IteratorBlockEnumerator$dispose() {
    if (this._dispose)
      this._dispose.call(this._this);
  }
}, null, [ss_IEnumerator, ss_IDisposable]);


///////////////////////////////////////////////////////////////////////////////
// Lazy

var ss_Lazy = function Lazy$(valueFactory) {
  this._valueFactory = valueFactory;
  this.isValueCreated = false;
};
ss_Lazy.__typeName = 'ss.Lazy';
ss.Lazy = ss_Lazy;
ss.initClass(ss_Lazy, ss, {
  value: function Lazy$value() {
    if (!this.isValueCreated) {
      this._value = this._valueFactory();
      delete this._valueFactory;
      this.isValueCreated = true;
    }
    return this._value;
  }
});


///////////////////////////////////////////////////////////////////////////////
// Task


////////////////////////////////////////////////////////////////////////////////
// TaskStatus


///////////////////////////////////////////////////////////////////////////////
// TaskCompletionSource


///////////////////////////////////////////////////////////////////////////////
// CancelEventArgs


///////////////////////////////////////////////////////////////////////////////
// Guid


////////////////////////////////////////////////////////////////////////////////
// IE8 shims
////////////////////////////////////////////////////////////////////////////////

if (typeof(global.HTMLElement) === 'undefined') {
  global.HTMLElement = Element;
}

if (typeof(global.MessageEvent) === 'undefined') {
  global.MessageEvent = Event;
}

// polyfill for IE8 not having Date.now.
Date.now = Date.now || function() { return +new Date; };

////////////////////////////////////////////////////////////////////////////////
// Global Registration
////////////////////////////////////////////////////////////////////////////////

global.ss = ss;
})(global);

var ss = global.ss;
var HTMLElement = global.HTMLElement;
var MessageEvent = global.MessageEvent;

/*! BEGIN CoreSlim */


(function() {
	'dont use strict';
	var $asm = {};
	global.tab = global.tab || {};
	ss.initAssembly($asm, 'tabcoreslim');
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.CoreSlim.EscapingUtil
	var $tab_EscapingUtil = function() {
	};
	$tab_EscapingUtil.__typeName = 'tab.EscapingUtil';
	$tab_EscapingUtil.escapeHtml = function EscapingUtil$EscapeHtml(html) {
		var escaped = ss.coalesce(html, '');
		escaped = escaped.replace(new RegExp('&', 'g'), '&amp;');
		escaped = escaped.replace(new RegExp('<', 'g'), '&lt;');
		escaped = escaped.replace(new RegExp('>', 'g'), '&gt;');
		escaped = escaped.replace(new RegExp('"', 'g'), '&quot;');
		escaped = escaped.replace(new RegExp("'", 'g'), '&#39;');
		escaped = escaped.replace(new RegExp('/', 'g'), '&#47;');
		return escaped;
	};
	global.tab.EscapingUtil = $tab_EscapingUtil;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Core.ScriptEx
	var $tab_ScriptEx = function() {
	};
	$tab_ScriptEx.__typeName = 'tab.ScriptEx';
	global.tab.ScriptEx = $tab_ScriptEx;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.CoreSlim.WindowHelper
	var $tab_WindowHelper = function(window) {
		this.$window = null;
		this.$window = window;
	};
	$tab_WindowHelper.__typeName = 'tab.WindowHelper';
	$tab_WindowHelper.get_windowSelf = function WindowHelper$get_WindowSelf() {
		return window.self;
	};
	$tab_WindowHelper.get_selection = function WindowHelper$get_Selection() {
		if (typeof(window['getSelection']) === 'function') {
			return window.getSelection();
		}
		else if (typeof(document['getSelection']) === 'function') {
			return document.getSelection();
		}
		return null;
	};
	$tab_WindowHelper.close = function WindowHelper$Close(window) {
		window.close();
	};
	$tab_WindowHelper.getOpener = function WindowHelper$GetOpener(window) {
		return window.opener;
	};
	$tab_WindowHelper.getLocation = function WindowHelper$GetLocation(window) {
		return window.location;
	};
	$tab_WindowHelper.getPathAndSearch = function WindowHelper$GetPathAndSearch(window) {
		return window.location.pathname + window.location.search;
	};
	$tab_WindowHelper.setLocationHref = function WindowHelper$SetLocationHref(window, href) {
		window.location.href = href;
	};
	$tab_WindowHelper.locationReplace = function WindowHelper$LocationReplace(window, url) {
		window.location.replace(url);
	};
	$tab_WindowHelper.open = function WindowHelper$Open(href, target, options) {
		return window.open(href, target, options);
	};
	$tab_WindowHelper.reload = function WindowHelper$Reload(w, forceGet) {
		w.location.reload(forceGet);
	};
	$tab_WindowHelper.requestAnimationFrame = function WindowHelper$RequestAnimationFrame(action) {
		return $tab_WindowHelper.$requestAnimationFrameFunc(action);
	};
	$tab_WindowHelper.cancelAnimationFrame = function WindowHelper$CancelAnimationFrame(animationId) {
		if (ss.isValue(animationId)) {
			$tab_WindowHelper.$cancelAnimationFrameFunc(animationId);
		}
	};
	$tab_WindowHelper.setTimeout = function WindowHelper$SetTimeout(callback, milliseconds) {
		window.setTimeout(callback, milliseconds);
	};
	$tab_WindowHelper.addListener = function WindowHelper$AddListener(windowParam, eventName, messageListener) {
		if ('addEventListener' in windowParam) {
			windowParam.addEventListener(eventName, messageListener, false);
		}
		else {
			windowParam.attachEvent('on' + eventName, messageListener);
		}
	};
	$tab_WindowHelper.removeListener = function WindowHelper$RemoveListener(window, eventName, messageListener) {
		if ('removeEventListener' in window) {
			window.removeEventListener(eventName, messageListener, false);
		}
		else {
			window.detachEvent('on' + eventName, messageListener);
		}
	};
	$tab_WindowHelper.$setDefaultRequestAnimationFrameImpl = function WindowHelper$SetDefaultRequestAnimationFrameImpl() {
		var lastTime = 0;
		$tab_WindowHelper.$requestAnimationFrameFunc = function(callback) {
			var curTime = (new Date()).getTime();
			var timeToCall = Math.max(0, 16 - (curTime - lastTime));
			lastTime = curTime + timeToCall;
			var id = window.setTimeout(callback, timeToCall);
			return id;
		};
	};
	$tab_WindowHelper.clearSelection = function WindowHelper$ClearSelection() {
		var selection = $tab_WindowHelper.get_selection();
		if (ss.isValue(selection)) {
			if (typeof(selection['removeAllRanges']) === 'function') {
				selection.removeAllRanges();
			}
			else if (typeof(selection['empty']) === 'function') {
				selection['empty']();
			}
		}
	};
	global.tab.WindowHelper = $tab_WindowHelper;
	ss.initClass($tab_EscapingUtil, $asm, {});
	ss.initClass($tab_ScriptEx, $asm, {});
	ss.initClass($tab_WindowHelper, $asm, {
		get_pageXOffset: function WindowHelper$get_PageXOffset() {
			return $tab_WindowHelper.$pageXOffsetFunc(this.$window);
		},
		get_pageYOffset: function WindowHelper$get_PageYOffset() {
			return $tab_WindowHelper.$pageYOffsetFunc(this.$window);
		},
		get_clientWidth: function WindowHelper$get_ClientWidth() {
			return $tab_WindowHelper.$clientWidthFunc(this.$window);
		},
		get_clientHeight: function WindowHelper$get_ClientHeight() {
			return $tab_WindowHelper.$clientHeightFunc(this.$window);
		},
		get_innerWidth: function WindowHelper$get_InnerWidth() {
			return $tab_WindowHelper.$innerWidthFunc(this.$window);
		},
		get_outerWidth: function WindowHelper$get_OuterWidth() {
			return $tab_WindowHelper.$outerWidthFunc(this.$window);
		},
		get_innerHeight: function WindowHelper$get_InnerHeight() {
			return $tab_WindowHelper.$innerHeightFunc(this.$window);
		},
		get_outerHeight: function WindowHelper$get_OuterHeight() {
			return $tab_WindowHelper.$outerHeightFunc(this.$window);
		},
		get_screenLeft: function WindowHelper$get_ScreenLeft() {
			return $tab_WindowHelper.$screenLeftFunc(this.$window);
		},
		get_screenTop: function WindowHelper$get_ScreenTop() {
			return $tab_WindowHelper.$screenTopFunc(this.$window);
		}
	});
	(function() {
		$tab_WindowHelper.$innerWidthFunc = null;
		$tab_WindowHelper.$innerHeightFunc = null;
		$tab_WindowHelper.$clientWidthFunc = null;
		$tab_WindowHelper.$clientHeightFunc = null;
		$tab_WindowHelper.$pageXOffsetFunc = null;
		$tab_WindowHelper.$pageYOffsetFunc = null;
		$tab_WindowHelper.$screenLeftFunc = null;
		$tab_WindowHelper.$screenTopFunc = null;
		$tab_WindowHelper.$outerWidthFunc = null;
		$tab_WindowHelper.$outerHeightFunc = null;
		$tab_WindowHelper.$requestAnimationFrameFunc = null;
		$tab_WindowHelper.$cancelAnimationFrameFunc = null;
		if ('innerWidth' in window) {
			$tab_WindowHelper.$innerWidthFunc = function(w) {
				return w.innerWidth;
			};
		}
		else {
			$tab_WindowHelper.$innerWidthFunc = function(w1) {
				return w1.document.documentElement.offsetWidth;
			};
		}
		if ('outerWidth' in window) {
			$tab_WindowHelper.$outerWidthFunc = function(w2) {
				return w2.outerWidth;
			};
		}
		else {
			$tab_WindowHelper.$outerWidthFunc = $tab_WindowHelper.$innerWidthFunc;
		}
		if ('innerHeight' in window) {
			$tab_WindowHelper.$innerHeightFunc = function(w3) {
				return w3.innerHeight;
			};
		}
		else {
			$tab_WindowHelper.$innerHeightFunc = function(w4) {
				return w4.document.documentElement.offsetHeight;
			};
		}
		if ('outerHeight' in window) {
			$tab_WindowHelper.$outerHeightFunc = function(w5) {
				return w5.outerHeight;
			};
		}
		else {
			$tab_WindowHelper.$outerHeightFunc = $tab_WindowHelper.$innerHeightFunc;
		}
		if ('clientWidth' in window) {
			$tab_WindowHelper.$clientWidthFunc = function(w6) {
				return w6['clientWidth'];
			};
		}
		else {
			$tab_WindowHelper.$clientWidthFunc = function(w7) {
				return w7.document.documentElement.clientWidth;
			};
		}
		if ('clientHeight' in window) {
			$tab_WindowHelper.$clientHeightFunc = function(w8) {
				return w8['clientHeight'];
			};
		}
		else {
			$tab_WindowHelper.$clientHeightFunc = function(w9) {
				return w9.document.documentElement.clientHeight;
			};
		}
		if (ss.isValue(window.self.pageXOffset)) {
			$tab_WindowHelper.$pageXOffsetFunc = function(w10) {
				return w10.pageXOffset;
			};
		}
		else {
			$tab_WindowHelper.$pageXOffsetFunc = function(w11) {
				return w11.document.documentElement.scrollLeft;
			};
		}
		if (ss.isValue(window.self.pageYOffset)) {
			$tab_WindowHelper.$pageYOffsetFunc = function(w12) {
				return w12.pageYOffset;
			};
		}
		else {
			$tab_WindowHelper.$pageYOffsetFunc = function(w13) {
				return w13.document.documentElement.scrollTop;
			};
		}
		if ('screenLeft' in window) {
			$tab_WindowHelper.$screenLeftFunc = function(w14) {
				return ss.unbox(ss.cast(w14.screenLeft, ss.Int32));
			};
		}
		else {
			$tab_WindowHelper.$screenLeftFunc = function(w15) {
				return w15.screenX;
			};
		}
		if ('screenTop' in window) {
			$tab_WindowHelper.$screenTopFunc = function(w16) {
				return ss.unbox(ss.cast(w16.screenTop, ss.Int32));
			};
		}
		else {
			$tab_WindowHelper.$screenTopFunc = function(w17) {
				return w17.screenY;
			};
		}
		{
			var DefaultRequestName = 'requestAnimationFrame';
			var DefaultCancelName = 'cancelAnimationFrame';
			var vendors = ['ms', 'moz', 'webkit', 'o'];
			var requestFuncName = null;
			var cancelFuncName = null;
			if (DefaultRequestName in window) {
				requestFuncName = DefaultRequestName;
			}
			if (DefaultCancelName in window) {
				cancelFuncName = DefaultCancelName;
			}
			for (var ii = 0; ii < vendors.length && (ss.isNullOrUndefined(requestFuncName) || ss.isNullOrUndefined(cancelFuncName)); ++ii) {
				var vendor = vendors[ii];
				var funcName = vendor + 'RequestAnimationFrame';
				if (ss.isNullOrUndefined(requestFuncName) && funcName in window) {
					requestFuncName = funcName;
				}
				if (ss.isNullOrUndefined(cancelFuncName)) {
					funcName = vendor + 'CancelAnimationFrame';
					if (funcName in window) {
						cancelFuncName = funcName;
					}
					funcName = vendor + 'CancelRequestAnimationFrame';
					if (funcName in window) {
						cancelFuncName = funcName;
					}
				}
			}
			if (ss.isValue(requestFuncName)) {
				$tab_WindowHelper.$requestAnimationFrameFunc = function(callback) {
					return window[requestFuncName](callback);
				};
			}
			else {
				$tab_WindowHelper.$setDefaultRequestAnimationFrameImpl();
			}
			if (ss.isValue(cancelFuncName)) {
				$tab_WindowHelper.$cancelAnimationFrameFunc = function(animationId) {
					window[cancelFuncName](animationId);
				};
			}
			else {
				$tab_WindowHelper.$cancelAnimationFrameFunc = function(id) {
					window.clearTimeout(id);
				};
			}
		}
	})();
})();

// END CoreSlim

var tab = global.tab;


/*! API */
(function() {
	'dont use strict';
	var $asm = {};
	global.tab = global.tab || {};
	global.tableauSoftware = global.tableauSoftware || {};
	ss.initAssembly($asm, 'Tableau.JavaScript.Vql.Api');
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.CrossDomainMessageRouter
	var $tab_$CrossDomainMessageRouter = function() {
		this.$nextHandlerId = 0;
		this.$handlers = {};
		this.$commandCallbacks = {};
		this.$customViewLoadCallbacks = {};
		this.$commandReturnAfterStateReadyQueues = {};
		if ($tab__Utility.hasWindowAddEventListener()) {
			window.addEventListener('message', ss.mkdel(this, this.$handleCrossDomainMessage), false);
		}
		else if ($tab__Utility.hasDocumentAttachEvent()) {
			var handler = ss.mkdel(this, this.$handleCrossDomainMessage);
			document.attachEvent('onmessage', handler);
			window.attachEvent('onmessage', handler);
		}
		else {
			window.onmessage = ss.mkdel(this, this.$handleCrossDomainMessage);
		}
		this.$nextHandlerId = 0;
	};
	$tab_$CrossDomainMessageRouter.__typeName = 'tab.$CrossDomainMessageRouter';
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.CustomViewEventContext
	var $tab_$CustomViewEventContext = function(workbook, customViewImpl) {
		this.$customViewImpl = null;
		$tab_EventContext.call(this, workbook, null);
		this.$customViewImpl = customViewImpl;
	};
	$tab_$CustomViewEventContext.__typeName = 'tab.$CustomViewEventContext';
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.DashboardZoneInfo
	var $tab_$DashboardZoneInfo = function() {
	};
	$tab_$DashboardZoneInfo.__typeName = 'tab.$DashboardZoneInfo';
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.DeferredUtil
	var $tab_$DeferredUtil = function() {
	};
	$tab_$DeferredUtil.__typeName = 'tab.$DeferredUtil';
	$tab_$DeferredUtil.$coerceToTrustedPromise = function DeferredUtil$CoerceToTrustedPromise(promiseOrValue) {
		var promise;
		if (promiseOrValue instanceof tableauSoftware.Promise) {
			promise = ss.cast(promiseOrValue, $tab__PromiseImpl);
		}
		else {
			if (ss.isValue(promiseOrValue) && typeof(promiseOrValue['valueOf']) === 'function') {
				promiseOrValue = promiseOrValue['valueOf']();
			}
			if ($tab_$DeferredUtil.$isPromise(promiseOrValue)) {
				var deferred = new $tab__DeferredImpl();
				ss.cast(promiseOrValue, $tab__PromiseImpl).then(ss.mkdel(deferred, deferred.resolve), ss.mkdel(deferred, deferred.reject));
				promise = deferred.get_promise();
			}
			else {
				promise = $tab_$DeferredUtil.$resolved(promiseOrValue);
			}
		}
		return promise;
	};
	$tab_$DeferredUtil.$reject = function DeferredUtil$Reject(promiseOrValue) {
		return $tab_$DeferredUtil.$coerceToTrustedPromise(promiseOrValue).then(function(value) {
			return $tab_$DeferredUtil.$rejected(ss.cast(value, ss.Exception));
		}, null);
	};
	$tab_$DeferredUtil.$resolved = function DeferredUtil$Resolved(value) {
		var p = new $tab__PromiseImpl(function(callback, errback) {
			try {
				return $tab_$DeferredUtil.$coerceToTrustedPromise((ss.isValue(callback) ? callback(value) : value));
			}
			catch ($t1) {
				var e = ss.Exception.wrap($t1);
				return $tab_$DeferredUtil.$rejected(e);
			}
		});
		return p;
	};
	$tab_$DeferredUtil.$rejected = function DeferredUtil$Rejected(reason) {
		var p = new $tab__PromiseImpl(function(callback, errback) {
			try {
				return (ss.isValue(errback) ? $tab_$DeferredUtil.$coerceToTrustedPromise(errback(reason)) : $tab_$DeferredUtil.$rejected(reason));
			}
			catch ($t1) {
				var e = ss.Exception.wrap($t1);
				return $tab_$DeferredUtil.$rejected(e);
			}
		});
		return p;
	};
	$tab_$DeferredUtil.$isPromise = function DeferredUtil$IsPromise(promiseOrValue) {
		return ss.isValue(promiseOrValue) && typeof(promiseOrValue['then']) === 'function';
	};
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.DoNothingCrossDomainHandler
	var $tab_$DoNothingCrossDomainHandler = function() {
		this.$handlerId = null;
		this.$1$CustomViewsListLoadField = null;
		this.$1$StateReadyForQueryField = null;
	};
	$tab_$DoNothingCrossDomainHandler.__typeName = 'tab.$DoNothingCrossDomainHandler';
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.FilterEventContext
	var $tab_$FilterEventContext = function(workbookImpl, worksheetImpl, fieldFieldName, filterCaption) {
		this.$fieldFieldName = null;
		this.$filterCaption = null;
		$tab_EventContext.call(this, workbookImpl, worksheetImpl);
		this.$fieldFieldName = fieldFieldName;
		this.$filterCaption = filterCaption;
	};
	$tab_$FilterEventContext.__typeName = 'tab.$FilterEventContext';
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.MarkImpl
	var $tab_$MarkImpl = function(tupleIdOrPairs) {
		this.$clonedPairs = null;
		this.$collection = new tab._Collection();
		this.$tupleId = 0;
		if ($tab__jQueryShim.isArray(tupleIdOrPairs)) {
			var pairArr = tupleIdOrPairs;
			for (var i = 0; i < pairArr.length; i++) {
				var pair = pairArr[i];
				if (!ss.isValue(pair.fieldName)) {
					throw $tab__TableauException.createInvalidParameter('pair.fieldName');
				}
				if (!ss.isValue(pair.value)) {
					throw $tab__TableauException.createInvalidParameter('pair.value');
				}
				var p = new $tableauSoftware_Pair(pair.fieldName, pair.value);
				this.$collection._add(p.fieldName, p);
			}
		}
		else {
			this.$tupleId = tupleIdOrPairs;
		}
	};
	$tab_$MarkImpl.__typeName = 'tab.$MarkImpl';
	$tab_$MarkImpl.$processSelectedMarks = function MarkImpl$ProcessSelectedMarks(marksPresModel) {
		var marks = new tab._Collection();
		if (ss.isNullOrUndefined(marksPresModel) || $tab__Utility.isNullOrEmpty(marksPresModel.marks)) {
			return marks;
		}
		for (var $t1 = 0; $t1 < marksPresModel.marks.length; $t1++) {
			var markPresModel = marksPresModel.marks[$t1];
			var tupleId = markPresModel.tupleId;
			var mark = new $tableauSoftware_Mark(tupleId);
			marks._add(tupleId.toString(), mark);
			for (var $t2 = 0; $t2 < markPresModel.pairs.length; $t2++) {
				var pairPresModel = markPresModel.pairs[$t2];
				var value = $tab__Utility.convertRawValue(pairPresModel.value, pairPresModel.valueDataType);
				var pair = new $tableauSoftware_Pair(pairPresModel.fieldName, value);
				pair.formattedValue = pairPresModel.formattedValue;
				if (!mark.$impl.get_$pairs()._has(pair.fieldName)) {
					mark.$impl.$addPair(pair);
				}
			}
		}
		return marks;
	};
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.MarksEventContext
	var $tab_$MarksEventContext = function(workbookImpl, worksheetImpl) {
		$tab_EventContext.call(this, workbookImpl, worksheetImpl);
	};
	$tab_$MarksEventContext.__typeName = 'tab.$MarksEventContext';
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.ParameterEventContext
	var $tab_$ParameterEventContext = function(workbookImpl, parameterName) {
		this.$parameterName = null;
		$tab_EventContext.call(this, workbookImpl, null);
		this.$parameterName = parameterName;
	};
	$tab_$ParameterEventContext.__typeName = 'tab.$ParameterEventContext';
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.ParameterImpl
	var $tab_$ParameterImpl = function(pm) {
		this.$parameter = null;
		this.$name = null;
		this.$currentValue = null;
		this.$dataType = null;
		this.$allowableValuesType = null;
		this.$allowableValues = null;
		this.$minValue = null;
		this.$maxValue = null;
		this.$stepSize = null;
		this.$dateStepPeriod = null;
		this.$name = pm.name;
		this.$currentValue = $tab__Utility.getDataValue(pm.currentValue);
		this.$dataType = $tab_ApiEnumConverter.convertParameterDataType(pm.dataType);
		this.$allowableValuesType = $tab_ApiEnumConverter.convertParameterAllowableValuesType(pm.allowableValuesType);
		if (ss.isValue(pm.allowableValues) && this.$allowableValuesType === 'list') {
			this.$allowableValues = [];
			for (var $t1 = 0; $t1 < pm.allowableValues.length; $t1++) {
				var adv = pm.allowableValues[$t1];
				this.$allowableValues.push($tab__Utility.getDataValue(adv));
			}
		}
		if (this.$allowableValuesType === 'range') {
			this.$minValue = $tab__Utility.getDataValue(pm.minValue);
			this.$maxValue = $tab__Utility.getDataValue(pm.maxValue);
			this.$stepSize = pm.stepSize;
			if ((this.$dataType === 'date' || this.$dataType === 'datetime') && ss.isValue(this.$stepSize) && ss.isValue(pm.dateStepPeriod)) {
				this.$dateStepPeriod = $tab_ApiEnumConverter.convertPeriodType(pm.dateStepPeriod);
			}
		}
	};
	$tab_$ParameterImpl.__typeName = 'tab.$ParameterImpl';
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.PublicEnums
	var $tab_$PublicEnums = function() {
	};
	$tab_$PublicEnums.__typeName = 'tab.$PublicEnums';
	$tab_$PublicEnums.$tryNormalizeEnum = function(T) {
		return function PublicEnums$TryNormalizeEnum(rawValue, value) {
			if (ss.isValue(rawValue)) {
				var lookup = rawValue.toString().toUpperCase();
				var $t1 = ss.Enum.getValues(T);
				for (var $t2 = 0; $t2 < $t1.length; $t2++) {
					var name = $t1[$t2];
					var compareValue = name.toUpperCase();
					if (ss.referenceEquals(lookup, compareValue)) {
						value.$ = name;
						return true;
					}
				}
			}
			value.$ = ss.getDefaultValue(T);
			return false;
		};
	};
	$tab_$PublicEnums.$normalizeEnum = function(T) {
		return function PublicEnums$NormalizeEnum(rawValue, paramName) {
			var value = {};
			if (!$tab_$PublicEnums.$tryNormalizeEnum(T).call(null, rawValue, value)) {
				throw $tab__TableauException.createInvalidParameter(paramName);
			}
			return value.$;
		};
	};
	$tab_$PublicEnums.$isValidEnum = function(T) {
		return function PublicEnums$IsValidEnum(rawValue) {
			var value = {};
			var valid = $tab_$PublicEnums.$tryNormalizeEnum(T).call(null, rawValue, value);
			return valid;
		};
	};
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.ApiBootstrap
	var $tab__ApiBootstrap = function() {
	};
	$tab__ApiBootstrap.__typeName = 'tab._ApiBootstrap';
	$tab__ApiBootstrap.initialize = function ApiBootstrap$Initialize() {
		$tab__ApiObjectRegistry.registerCrossDomainMessageRouter(function() {
			return new $tab_$CrossDomainMessageRouter();
		});
	};
	global.tab._ApiBootstrap = $tab__ApiBootstrap;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.ApiCommand
	var $tab__ApiCommand = function(name, commandId, handlerId, parameters) {
		this.$name = null;
		this.$handlerId = null;
		this.$commandId = null;
		this.$parameters = null;
		this.$name = name;
		this.$commandId = commandId;
		this.$handlerId = handlerId;
		this.$parameters = parameters;
	};
	$tab__ApiCommand.__typeName = 'tab._ApiCommand';
	$tab__ApiCommand.generateNextCommandId = function ApiCommand$GenerateNextCommandId() {
		var commandId = 'cmd' + $tab__ApiCommand.$nextCommandId;
		$tab__ApiCommand.$nextCommandId++;
		return commandId;
	};
	$tab__ApiCommand.parse = function ApiCommand$Parse(serialized) {
		var name;
		var index = serialized.indexOf(String.fromCharCode(44));
		if (index < 0) {
			name = ss.cast(serialized, String);
			return new $tab__ApiCommand(name, null, null, null);
		}
		name = ss.cast(serialized.substr(0, index), String);
		var sourceId;
		var secondPart = serialized.substr(index + 1);
		index = secondPart.indexOf(String.fromCharCode(44));
		if (index < 0) {
			sourceId = secondPart;
			return new $tab__ApiCommand(name, sourceId, null, null);
		}
		sourceId = secondPart.substr(0, index);
		var handlerId;
		var thirdPart = secondPart.substr(index + 1);
		index = thirdPart.indexOf(String.fromCharCode(44));
		if (index < 0) {
			handlerId = thirdPart;
			return new $tab__ApiCommand(name, sourceId, handlerId, null);
		}
		handlerId = thirdPart.substr(0, index);
		var parameters = thirdPart.substr(index + 1);
		$tab__ApiCommand.lastResponseMessage = serialized;
		if (name === 'api.GetClientInfoCommand') {
			$tab__ApiCommand.lastClientInfoResponseMessage = serialized;
		}
		return new $tab__ApiCommand(name, sourceId, handlerId, parameters);
	};
	global.tab._ApiCommand = $tab__ApiCommand;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.ApiObjectRegistry
	var $tab__ApiObjectRegistry = function() {
	};
	$tab__ApiObjectRegistry.__typeName = 'tab._ApiObjectRegistry';
	$tab__ApiObjectRegistry.registerCrossDomainMessageRouter = function ApiObjectRegistry$RegisterCrossDomainMessageRouter(objectCreationFunc) {
		return $tab__ApiObjectRegistry.$registerType($tab_ICrossDomainMessageRouter).call(null, objectCreationFunc);
	};
	$tab__ApiObjectRegistry.getCrossDomainMessageRouter = function ApiObjectRegistry$GetCrossDomainMessageRouter() {
		return $tab__ApiObjectRegistry.$getSingleton($tab_ICrossDomainMessageRouter).call(null);
	};
	$tab__ApiObjectRegistry.disposeCrossDomainMessageRouter = function ApiObjectRegistry$DisposeCrossDomainMessageRouter() {
		$tab__ApiObjectRegistry.$clearSingletonInstance($tab_ICrossDomainMessageRouter).call(null);
	};
	$tab__ApiObjectRegistry.$registerType = function(T) {
		return function ApiObjectRegistry$RegisterType(objectCreationFunc) {
			if (ss.isNullOrUndefined($tab__ApiObjectRegistry.$creationRegistry)) {
				$tab__ApiObjectRegistry.$creationRegistry = {};
			}
			var interfaceTypeName = ss.getTypeFullName(T);
			var previousType = $tab__ApiObjectRegistry.$creationRegistry[interfaceTypeName];
			$tab__ApiObjectRegistry.$creationRegistry[interfaceTypeName] = objectCreationFunc;
			return previousType;
		};
	};
	$tab__ApiObjectRegistry.$createType = function(T) {
		return function ApiObjectRegistry$CreateType() {
			if (ss.isNullOrUndefined($tab__ApiObjectRegistry.$creationRegistry)) {
				throw $tab__TableauException.createInternalError('No types registered');
			}
			var interfaceTypeName = ss.getTypeFullName(T);
			var creationFunc = $tab__ApiObjectRegistry.$creationRegistry[interfaceTypeName];
			if (ss.isNullOrUndefined(creationFunc)) {
				throw $tab__TableauException.createInternalError("No creation function has been registered for interface type '" + interfaceTypeName + "'.");
			}
			var instance = creationFunc();
			return instance;
		};
	};
	$tab__ApiObjectRegistry.$getSingleton = function(T) {
		return function ApiObjectRegistry$GetSingleton() {
			if (ss.isNullOrUndefined($tab__ApiObjectRegistry.$singletonInstanceRegistry)) {
				$tab__ApiObjectRegistry.$singletonInstanceRegistry = {};
			}
			var interfaceTypeName = ss.getTypeFullName(T);
			var instance = ss.cast($tab__ApiObjectRegistry.$singletonInstanceRegistry[interfaceTypeName], T);
			if (ss.isNullOrUndefined(instance)) {
				instance = $tab__ApiObjectRegistry.$createType(T).call(null);
				$tab__ApiObjectRegistry.$singletonInstanceRegistry[interfaceTypeName] = instance;
			}
			return instance;
		};
	};
	$tab__ApiObjectRegistry.$clearSingletonInstance = function(T) {
		return function ApiObjectRegistry$ClearSingletonInstance() {
			if (ss.isNullOrUndefined($tab__ApiObjectRegistry.$singletonInstanceRegistry)) {
				return null;
			}
			var interfaceTypeName = ss.getTypeFullName(T);
			var instance = ss.cast($tab__ApiObjectRegistry.$singletonInstanceRegistry[interfaceTypeName], T);
			delete $tab__ApiObjectRegistry.$singletonInstanceRegistry[interfaceTypeName];
			return instance;
		};
	};
	global.tab._ApiObjectRegistry = $tab__ApiObjectRegistry;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.ApiServerNotification
	var $tab__ApiServerNotification = function(workbookName, worksheetName, data) {
		this.$workbookName = null;
		this.$worksheetName = null;
		this.$data = null;
		this.$workbookName = workbookName;
		this.$worksheetName = worksheetName;
		this.$data = data;
	};
	$tab__ApiServerNotification.__typeName = 'tab._ApiServerNotification';
	$tab__ApiServerNotification.deserialize = function ApiServerNotification$Deserialize(json) {
		var param = JSON.parse(json);
		var workbookName = ss.cast(param['api.workbookName'], String);
		var worksheetName = ss.cast(param['api.worksheetName'], String);
		var data = param['api.commandData'];
		return new $tab__ApiServerNotification(workbookName, worksheetName, data);
	};
	global.tab._ApiServerNotification = $tab__ApiServerNotification;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.ApiServerResultParser
	var $tab__ApiServerResultParser = function(serverResult) {
		this.$commandResult = null;
		this.$commandData = null;
		var param = JSON.parse(serverResult);
		this.$commandResult = ss.cast(param['api.commandResult'], String);
		this.$commandData = param['api.commandData'];
	};
	$tab__ApiServerResultParser.__typeName = 'tab._ApiServerResultParser';
	global.tab._ApiServerResultParser = $tab__ApiServerResultParser;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.DoNotUseCollection
	var $tab__CollectionImpl = function() {
		this.$items = [];
		this.$itemMap = {};
	};
	$tab__CollectionImpl.__typeName = 'tab._CollectionImpl';
	global.tab._CollectionImpl = $tab__CollectionImpl;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.ColumnImpl
	var $tab__ColumnImpl = function(fieldName, dataType, isReferenced, index) {
		this.$fieldName = null;
		this.$dataType = null;
		this.$isReferenced = false;
		this.$index = 0;
		$tab__Param.verifyString(fieldName, 'Column Field Name');
		this.$fieldName = fieldName;
		this.$dataType = dataType;
		this.$isReferenced = ss.coalesce(isReferenced, false);
		this.$index = index;
	};
	$tab__ColumnImpl.__typeName = 'tab._ColumnImpl';
	global.tab._ColumnImpl = $tab__ColumnImpl;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.CustomViewImpl
	var $tab__CustomViewImpl = function(workbookImpl, name, messagingOptions) {
		this.$customView = null;
		this.$presModel = null;
		this.$workbookImpl = null;
		this.$messagingOptions = null;
		this.$name = null;
		this.$ownerName = null;
		this.$url = null;
		this.$isPublic = false;
		this.$isDefault = false;
		this.$isStale = false;
		this.$workbookImpl = workbookImpl;
		this.$name = name;
		this.$messagingOptions = messagingOptions;
		this.$isPublic = false;
		this.$isDefault = false;
		this.$isStale = false;
	};
	$tab__CustomViewImpl.__typeName = 'tab._CustomViewImpl';
	$tab__CustomViewImpl._getAsync = function CustomViewImpl$GetAsync(eventContext) {
		var deferred = new tab._Deferred();
		deferred.resolve(eventContext.get__customViewImpl().get_$customView());
		return deferred.get_promise();
	};
	$tab__CustomViewImpl._createNew = function CustomViewImpl$CreateNew(workbookImpl, messagingOptions, apiPresModel, defaultId) {
		var cv = new $tab__CustomViewImpl(workbookImpl, apiPresModel.name, messagingOptions);
		cv.$isPublic = apiPresModel.isPublic;
		cv.$url = apiPresModel.url;
		cv.$ownerName = apiPresModel.owner.friendlyName;
		cv.$isDefault = ss.isValue(defaultId) && ss.unbox(defaultId) === apiPresModel.id;
		cv.$presModel = apiPresModel;
		return cv;
	};
	$tab__CustomViewImpl._saveNewAsync = function CustomViewImpl$SaveNewAsync(workbookImpl, messagingOptions, name) {
		var deferred = new tab._Deferred();
		var param = {};
		param['api.customViewName'] = name;
		var returnHandler = $tab__CustomViewImpl.$createCustomViewCommandReturnHandler('api.SaveNewCustomViewCommand', deferred, function(result) {
			$tab__CustomViewImpl._processCustomViewUpdate(workbookImpl, messagingOptions, result, true);
			var newView = null;
			if (ss.isValue(workbookImpl.get_$updatedCustomViews())) {
				newView = workbookImpl.get_$updatedCustomViews().get_item(0);
			}
			deferred.resolve(newView);
		});
		messagingOptions.sendCommand(Object).call(messagingOptions, param, returnHandler);
		return deferred.get_promise();
	};
	$tab__CustomViewImpl._showCustomViewAsync = function CustomViewImpl$ShowCustomViewAsync(workbookImpl, messagingOptions, serverCustomizedView) {
		var deferred = new tab._Deferred();
		var param = {};
		if (ss.isValue(serverCustomizedView)) {
			param['api.customViewParam'] = serverCustomizedView;
		}
		var returnHandler = $tab__CustomViewImpl.$createCustomViewCommandReturnHandler('api.ShowCustomViewCommand', deferred, function(result) {
			var cv = workbookImpl.get_activeCustomView();
			deferred.resolve(cv);
		});
		messagingOptions.sendCommand(Object).call(messagingOptions, param, returnHandler);
		return deferred.get_promise();
	};
	$tab__CustomViewImpl._makeCurrentCustomViewDefaultAsync = function CustomViewImpl$MakeCurrentCustomViewDefaultAsync(workbookImpl, messagingOptions) {
		var deferred = new tab._Deferred();
		var param = {};
		var returnHandler = $tab__CustomViewImpl.$createCustomViewCommandReturnHandler('api.MakeCurrentCustomViewDefaultCommand', deferred, function(result) {
			var cv = workbookImpl.get_activeCustomView();
			deferred.resolve(cv);
		});
		messagingOptions.sendCommand(Object).call(messagingOptions, param, returnHandler);
		return deferred.get_promise();
	};
	$tab__CustomViewImpl._getCustomViewsAsync = function CustomViewImpl$GetCustomViewsAsync(workbookImpl, messagingOptions) {
		var deferred = new tab._Deferred();
		var returnHandler = new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))('api.FetchCustomViewsCommand', 0, function(result) {
			$tab__CustomViewImpl._processCustomViews(workbookImpl, messagingOptions, result);
			deferred.resolve(workbookImpl.get_$customViews()._toApiCollection());
		}, function(remoteError, message) {
			deferred.reject($tab__TableauException.create('serverError', message));
		});
		messagingOptions.sendCommand(Object).call(messagingOptions, null, returnHandler);
		return deferred.get_promise();
	};
	$tab__CustomViewImpl._processCustomViews = function CustomViewImpl$ProcessCustomViews(workbookImpl, messagingOptions, info) {
		$tab__CustomViewImpl._processCustomViewUpdate(workbookImpl, messagingOptions, info, false);
	};
	$tab__CustomViewImpl._processCustomViewUpdate = function CustomViewImpl$ProcessCustomViewUpdate(workbookImpl, messagingOptions, info, doUpdateList) {
		if (doUpdateList) {
			workbookImpl.set_$updatedCustomViews(new tab._Collection());
		}
		workbookImpl.set_$currentCustomView(null);
		var currentViewName = null;
		if (ss.isValue(info.currentView)) {
			currentViewName = info.currentView.name;
		}
		var defaultId = info.defaultCustomViewId;
		if (doUpdateList && ss.isValue(info.newView)) {
			var newViewImpl = $tab__CustomViewImpl._createNew(workbookImpl, messagingOptions, info.newView, defaultId);
			workbookImpl.get_$updatedCustomViews()._add(newViewImpl.get_$name(), newViewImpl.get_$customView());
		}
		workbookImpl.set_$removedCustomViews(workbookImpl.get_$customViews());
		workbookImpl.set_$customViews(new tab._Collection());
		if (ss.isValue(info.customViews)) {
			var list = info.customViews;
			if (list.length > 0) {
				for (var i = 0; i < list.length; i++) {
					var customViewImpl = $tab__CustomViewImpl._createNew(workbookImpl, messagingOptions, list[i], defaultId);
					workbookImpl.get_$customViews()._add(customViewImpl.get_$name(), customViewImpl.get_$customView());
					if (workbookImpl.get_$removedCustomViews()._has(customViewImpl.get_$name())) {
						workbookImpl.get_$removedCustomViews()._remove(customViewImpl.get_$name());
					}
					else if (doUpdateList) {
						if (!workbookImpl.get_$updatedCustomViews()._has(customViewImpl.get_$name())) {
							workbookImpl.get_$updatedCustomViews()._add(customViewImpl.get_$name(), customViewImpl.get_$customView());
						}
					}
					if (ss.isValue(currentViewName) && ss.referenceEquals(customViewImpl.get_$name(), currentViewName)) {
						workbookImpl.set_$currentCustomView(customViewImpl.get_$customView());
					}
				}
			}
		}
	};
	$tab__CustomViewImpl.$createCustomViewCommandReturnHandler = function CustomViewImpl$CreateCustomViewCommandReturnHandler(commandName, deferred, successCallback) {
		var errorCallback = function(remoteError, message) {
			deferred.reject($tab__TableauException.create('serverError', message));
		};
		return new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))(commandName, 0, successCallback, errorCallback);
	};
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.DashboardImpl
	var $tab__DashboardImpl = function(sheetInfoImpl, workbookImpl, messagingOptions) {
		this.$dashboard = null;
		this.$worksheets = new tab._Collection();
		this.$dashboardObjects = new tab._Collection();
		$tab__SheetImpl.call(this, sheetInfoImpl, workbookImpl, messagingOptions);
	};
	$tab__DashboardImpl.__typeName = 'tab._DashboardImpl';
	global.tab._DashboardImpl = $tab__DashboardImpl;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.DataSourceImpl
	var $tab__DataSourceImpl = function(name, isPrimary) {
		this.$name = null;
		this.$fields = new tab._Collection();
		this.$isPrimary = false;
		this.$dataSource = null;
		$tab__Param.verifyString(name, 'name');
		this.$name = name;
		this.$isPrimary = isPrimary;
	};
	$tab__DataSourceImpl.__typeName = 'tab._DataSourceImpl';
	$tab__DataSourceImpl.processDataSource = function DataSourceImpl$ProcessDataSource(dataSourcePm) {
		var dataSourceImpl = new $tab__DataSourceImpl(dataSourcePm.name, dataSourcePm.isPrimary);
		var fields = ss.coalesce(dataSourcePm.fields, []);
		for (var $t1 = 0; $t1 < fields.length; $t1++) {
			var fieldPm = fields[$t1];
			var fieldRole = $tab_ApiEnumConverter.convertFieldRole(fieldPm.role);
			var fieldAggregation = $tab_ApiEnumConverter.convertFieldAggregation(fieldPm.aggregation);
			var field = new $tableauSoftware_Field(dataSourceImpl.get_dataSource(), fieldPm.name, fieldRole, fieldAggregation);
			dataSourceImpl.addField(field);
		}
		return dataSourceImpl;
	};
	$tab__DataSourceImpl.processDataSourcesForWorksheet = function DataSourceImpl$ProcessDataSourcesForWorksheet(pm) {
		var dataSources = new tab._Collection();
		var primaryDataSourceImpl = null;
		for (var $t1 = 0; $t1 < pm.dataSources.length; $t1++) {
			var dataSourcePm = pm.dataSources[$t1];
			var dataSourceImpl = $tab__DataSourceImpl.processDataSource(dataSourcePm);
			if (dataSourcePm.isPrimary) {
				primaryDataSourceImpl = dataSourceImpl;
			}
			else {
				dataSources._add(dataSourcePm.name, dataSourceImpl.get_dataSource());
			}
		}
		if (ss.isValue(primaryDataSourceImpl)) {
			dataSources._addToFirst(primaryDataSourceImpl.get_name(), primaryDataSourceImpl.get_dataSource());
		}
		return dataSources;
	};
	global.tab._DataSourceImpl = $tab__DataSourceImpl;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.DataTableImpl
	var $tab__DataTableImpl = function(rows, isSummaryData, totalRowCount, columns) {
		this.$name = null;
		this.$rows = null;
		this.$totalRowCount = 0;
		this.$columns = null;
		this.$isSummaryData = false;
		this.$rows = rows;
		this.$totalRowCount = totalRowCount;
		this.$columns = columns;
		this.$isSummaryData = isSummaryData;
		this.$name = (isSummaryData ? 'Summary Data Table' : 'Underlying Data Table');
	};
	$tab__DataTableImpl.__typeName = 'tab._DataTableImpl';
	$tab__DataTableImpl.processGetDataPresModel = function DataTableImpl$ProcessGetDataPresModel(model) {
		var clientTable = $tab__DataTableImpl.$processUnderlyingTable(model.dataTable);
		var clientColumns = $tab__DataTableImpl.$processUnderlyingColumns(model.headers);
		var clientDataTableImpl = new $tab__DataTableImpl(clientTable, model.isSummary, clientTable.length, clientColumns);
		return new $tableauSoftware_DataTable(clientDataTableImpl);
	};
	$tab__DataTableImpl.$processUnderlyingTable = function DataTableImpl$ProcessUnderlyingTable(apiTable) {
		var clientTable = [];
		for (var $t1 = 0; $t1 < apiTable.length; $t1++) {
			var row = apiTable[$t1];
			var clientRow = [];
			for (var $t2 = 0; $t2 < row.length; $t2++) {
				var apiValue = row[$t2];
				clientRow.push($tab__Utility.getDataValue(apiValue));
			}
			clientTable.push(clientRow);
		}
		return clientTable;
	};
	$tab__DataTableImpl.$processUnderlyingColumns = function DataTableImpl$ProcessUnderlyingColumns(apiColumns) {
		var clientColumns = [];
		for (var $t1 = 0; $t1 < apiColumns.length; $t1++) {
			var apiColumn = apiColumns[$t1];
			var clientColumn = new $tab__ColumnImpl(apiColumn.fieldName, $tab_ApiEnumConverter.convertDataType(apiColumn.dataType), apiColumn.isReferenced, apiColumn.index);
			clientColumns.push(new $tableauSoftware_Column(clientColumn));
		}
		return clientColumns;
	};
	global.tab._DataTableImpl = $tab__DataTableImpl;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.DoNotUseDeferred
	var $tab__DeferredImpl = function() {
		this.$promise = null;
		this.$thenFunc = null;
		this.$listeners = [];
		this.$resolveFunc = null;
		this.$promise = new $tab__PromiseImpl(ss.mkdel(this, this.then));
		this.$thenFunc = ss.mkdel(this, this.$preResolutionThen);
		this.$resolveFunc = ss.mkdel(this, this.$transitionToFulfilled);
	};
	$tab__DeferredImpl.__typeName = 'tab._DeferredImpl';
	global.tab._DeferredImpl = $tab__DeferredImpl;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Core.jQueryInterface
	var $tab__jQueryShim = function() {
	};
	$tab__jQueryShim.__typeName = 'tab._jQueryShim';
	$tab__jQueryShim.isFunction = function jQueryInterface$IsFunction(obj) {
		return ss.referenceEquals($tab__jQueryShim.type(obj), $tab__jQueryShim.$functionType);
	};
	$tab__jQueryShim.isArray = function jQueryInterface$IsArray(obj) {
		if (ss.isValue(Array['isArray'])) {
			return ss.unbox(ss.cast(Array['isArray'](obj), Boolean));
		}
		return ss.referenceEquals($tab__jQueryShim.type(obj), $tab__jQueryShim.$arrayType);
	};
	$tab__jQueryShim.type = function jQueryInterface$Type(obj) {
		return (ss.isNullOrUndefined(obj) ? String(obj) : ($tab__jQueryShim.$class2type[ss.cast($tab__jQueryShim.$toString.call(obj), String)] || $tab__jQueryShim.$objectType));
	};
	$tab__jQueryShim.trim = function jQueryInterface$Trim(text) {
		if (ss.isValue($tab__jQueryShim.$trim)) {
			return (ss.isNullOrUndefined(text) ? '' : ss.cast($tab__jQueryShim.$trim.call(text), String));
		}
		return (ss.isNullOrUndefined(text) ? '' : text.toString().replace($tab__jQueryShim.$trimLeft, '').replace($tab__jQueryShim.$trimRight, ''));
	};
	$tab__jQueryShim.parseJSON = function jQueryInterface$ParseJson(data) {
		if (typeof(data) !== 'string' || ss.isNullOrUndefined(data)) {
			return null;
		}
		data = $tab__jQueryShim.trim(data);
		if (ss.isValue(JSON) && ss.isValue(JSON['parse'])) {
			return JSON.parse(data);
		}
		if ($tab__jQueryShim.$rvalidchars.test(data.replace($tab__jQueryShim.$rvalidescape, '@').replace($tab__jQueryShim.$rvalidtokens, ']').replace($tab__jQueryShim.$rvalidbraces, ''))) {
			return (new Function('return ' + data))();
		}
		throw new ss.Exception('Invalid JSON: ' + data);
	};
	global.tab._jQueryShim = $tab__jQueryShim;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.Param
	var $tab__Param = function() {
	};
	$tab__Param.__typeName = 'tab._Param';
	$tab__Param.verifyString = function Param$VerifyString(argumentValue, argumentName) {
		if (ss.isNullOrUndefined(argumentValue) || argumentValue.length === 0) {
			throw $tab__TableauException.createInternalStringArgumentException(argumentName);
		}
	};
	$tab__Param.verifyValue = function Param$VerifyValue(argumentValue, argumentName) {
		if (ss.isNullOrUndefined(argumentValue)) {
			throw $tab__TableauException.createInternalNullArgumentException(argumentName);
		}
	};
	global.tab._Param = $tab__Param;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.DoNotUsePromise
	var $tab__PromiseImpl = function(thenFunc) {
		this.then = null;
		this.then = thenFunc;
	};
	$tab__PromiseImpl.__typeName = 'tab._PromiseImpl';
	global.tab._PromiseImpl = $tab__PromiseImpl;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.TabRect
	var $tab__Rect = function(left, top, width, height) {
		this.left = 0;
		this.top = 0;
		this.width = 0;
		this.height = 0;
		this.left = left;
		this.top = top;
		this.width = width;
		this.height = height;
	};
	$tab__Rect.__typeName = 'tab._Rect';
	global.tab._Rect = $tab__Rect;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.SheetImpl
	var $tab__SheetImpl = function(sheetInfoImpl, workbookImpl, messagingOptions) {
		this.$name = null;
		this.$index = 0;
		this.$isActive = false;
		this.$isHidden = false;
		this.$sheetType = null;
		this.$size = null;
		this.$url = null;
		this.$workbookImpl = null;
		this.$messagingOptions = null;
		this.$parentStoryPointImpl = null;
		this.$zoneId = 0;
		$tab__Param.verifyValue(sheetInfoImpl, 'sheetInfoImpl');
		$tab__Param.verifyValue(workbookImpl, 'workbookImpl');
		$tab__Param.verifyValue(messagingOptions, 'messagingOptions');
		this.$name = sheetInfoImpl.name;
		this.$index = sheetInfoImpl.index;
		this.$isActive = sheetInfoImpl.isActive;
		this.$isHidden = sheetInfoImpl.isHidden;
		this.$sheetType = sheetInfoImpl.sheetType;
		this.$size = sheetInfoImpl.size;
		this.$url = sheetInfoImpl.url;
		this.$workbookImpl = workbookImpl;
		this.$messagingOptions = messagingOptions;
		this.$zoneId = sheetInfoImpl.zoneId;
	};
	$tab__SheetImpl.__typeName = 'tab._SheetImpl';
	$tab__SheetImpl.$convertValueToIntIfValid = function SheetImpl$ConvertValueToIntIfValid(value) {
		if (ss.isValue(value)) {
			return $tab__Utility.toInt(value);
		}
		return value;
	};
	$tab__SheetImpl.$normalizeSheetSize = function SheetImpl$NormalizeSheetSize(size) {
		var behavior = $tab_$PublicEnums.$normalizeEnum($tab_ApiSheetSizeBehavior).call(null, size.behavior, 'size.behavior');
		var minSize = size.minSize;
		if (ss.isValue(minSize)) {
			minSize = $tab_Size.$ctor($tab__SheetImpl.$convertValueToIntIfValid(size.minSize.width), $tab__SheetImpl.$convertValueToIntIfValid(size.minSize.height));
		}
		var maxSize = size.maxSize;
		if (ss.isValue(maxSize)) {
			maxSize = $tab_Size.$ctor($tab__SheetImpl.$convertValueToIntIfValid(size.maxSize.width), $tab__SheetImpl.$convertValueToIntIfValid(size.maxSize.height));
		}
		return $tab_SheetSize.$ctor(behavior, minSize, maxSize);
	};
	global.tab._SheetImpl = $tab__SheetImpl;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.ApiSheetInfoImpl
	var $tab__SheetInfoImpl = function() {
	};
	$tab__SheetInfoImpl.__typeName = 'tab._SheetInfoImpl';
	$tab__SheetInfoImpl.$ctor = function(name, sheetType, index, size, workbook, url, isActive, isHidden, zoneId) {
		var $this = new Object();
		$this.name = null;
		$this.index = 0;
		$this.workbook = null;
		$this.url = null;
		$this.isHidden = false;
		$this.sheetType = null;
		$this.zoneId = 0;
		$this.size = null;
		$this.isActive = false;
		$this.name = name;
		$this.sheetType = sheetType;
		$this.index = index;
		$this.size = size;
		$this.workbook = workbook;
		$this.url = url;
		$this.isActive = isActive;
		$this.isHidden = isHidden;
		$this.zoneId = zoneId;
		return $this;
	};
	global.tab._SheetInfoImpl = $tab__SheetInfoImpl;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.StoryImpl
	var $tab__StoryImpl = function(sheetInfoImpl, workbookImpl, messagingOptions, storyPm, findSheetFunc) {
		this.$activeStoryPointImpl = null;
		this.$findSheetFunc = null;
		this.$story = null;
		this.$storyPointsInfo = null;
		this.$2$ActiveStoryPointChangeField = null;
		$tab__SheetImpl.call(this, sheetInfoImpl, workbookImpl, messagingOptions);
		$tab__Param.verifyValue(storyPm, 'storyPm');
		$tab__Param.verifyValue(findSheetFunc, 'findSheetFunc');
		this.$findSheetFunc = findSheetFunc;
		this.update(storyPm);
	};
	$tab__StoryImpl.__typeName = 'tab._StoryImpl';
	global.tab._StoryImpl = $tab__StoryImpl;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.StoryPointImpl
	var $tab__StoryPointImpl = function(storyPointInfoImpl, containedSheetImpl) {
		this.$caption = null;
		this.$index = 0;
		this.$isActive = false;
		this.$isUpdated = false;
		this.$containedSheetImpl = null;
		this.$parentStoryImpl = null;
		this.$storyPoint = null;
		this.$storyPointId = 0;
		this.$isActive = storyPointInfoImpl.isActive;
		this.$isUpdated = storyPointInfoImpl.isUpdated;
		this.$caption = storyPointInfoImpl.caption;
		this.$index = storyPointInfoImpl.index;
		this.$parentStoryImpl = storyPointInfoImpl.parentStoryImpl;
		this.$storyPointId = storyPointInfoImpl.storyPointId;
		this.$containedSheetImpl = containedSheetImpl;
		if (ss.isValue(containedSheetImpl)) {
			this.$containedSheetImpl.set_parentStoryPointImpl(this);
			if (containedSheetImpl.get_sheetType() === 'dashboard') {
				var containedDashboardImpl = ss.cast(this.$containedSheetImpl, $tab__DashboardImpl);
				for (var i = 0; i < containedDashboardImpl.get_worksheets().get__length(); i++) {
					var worksheet = containedDashboardImpl.get_worksheets().get_item(i);
					worksheet._impl.set_parentStoryPointImpl(this);
				}
			}
		}
	};
	$tab__StoryPointImpl.__typeName = 'tab._StoryPointImpl';
	$tab__StoryPointImpl.createContainedSheet = function StoryPointImpl$CreateContainedSheet(containedSheetInfo, workbookImpl, messagingOptions, findSheetFunc) {
		var containedSheetType = $tab_ApiEnumConverter.convertSheetType(containedSheetInfo.sheetType);
		var index = -1;
		var size = $tab_SheetSizeFactory.createAutomatic();
		var isActive = false;
		var publishedSheetInfo = findSheetFunc(containedSheetInfo.name);
		var isHidden = ss.isNullOrUndefined(publishedSheetInfo);
		var url = (isHidden ? '' : publishedSheetInfo.getUrl());
		var sheetInfoImpl = $tab__SheetInfoImpl.$ctor(containedSheetInfo.name, containedSheetType, index, size, workbookImpl.get_workbook(), url, isActive, isHidden, containedSheetInfo.zoneId);
		if (containedSheetInfo.sheetType === 'worksheet') {
			var parentDashboardImpl = null;
			var worksheetImpl = new $tab__WorksheetImpl(sheetInfoImpl, workbookImpl, messagingOptions, parentDashboardImpl);
			return worksheetImpl;
		}
		else if (containedSheetInfo.sheetType === 'dashboard') {
			var dashboardImpl = new $tab__DashboardImpl(sheetInfoImpl, workbookImpl, messagingOptions);
			var dashboardZones = $tab__WorkbookImpl.$createDashboardZones(containedSheetInfo.dashboardZones);
			dashboardImpl.$addObjects(dashboardZones, findSheetFunc);
			return dashboardImpl;
		}
		else if (containedSheetInfo.sheetType === 'story') {
			throw $tab__TableauException.createInternalError('Cannot have a story embedded within another story.');
		}
		else {
			throw $tab__TableauException.createInternalError("Unknown sheet type '" + containedSheetInfo.sheetType + "'");
		}
	};
	global.tab._StoryPointImpl = $tab__StoryPointImpl;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.StoryPointInfoImpl
	var $tab__StoryPointInfoImpl = function() {
	};
	$tab__StoryPointInfoImpl.__typeName = 'tab._StoryPointInfoImpl';
	$tab__StoryPointInfoImpl.$ctor = function(caption, index, storyPointId, isActive, isUpdated, parentStoryImpl) {
		var $this = new Object();
		$this.storyPointId = 0;
		$this.parentStoryImpl = null;
		$this.caption = null;
		$this.index = 0;
		$this.isActive = false;
		$this.isUpdated = false;
		$this.caption = caption;
		$this.index = index;
		$this.storyPointId = storyPointId;
		$this.isActive = isActive;
		$this.isUpdated = isUpdated;
		$this.parentStoryImpl = parentStoryImpl;
		return $this;
	};
	global.tab._StoryPointInfoImpl = $tab__StoryPointInfoImpl;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.TableauException
	var $tab__TableauException = function() {
	};
	$tab__TableauException.__typeName = 'tab._TableauException';
	$tab__TableauException.create = function TableauException$Create(id, message) {
		var x = new ss.Exception(message);
		x['tableauSoftwareErrorCode'] = id;
		return x;
	};
	$tab__TableauException.createInternalError = function TableauException$CreateInternalError(details) {
		if (ss.isValue(details)) {
			return $tab__TableauException.create('internalError', 'Internal error. Please contact Tableau support with the following information: ' + details);
		}
		else {
			return $tab__TableauException.create('internalError', 'Internal error. Please contact Tableau support');
		}
	};
	$tab__TableauException.createInternalNullArgumentException = function TableauException$CreateInternalNullArgumentException(argumentName) {
		return $tab__TableauException.createInternalError("Null/undefined argument '" + argumentName + "'.");
	};
	$tab__TableauException.createInternalStringArgumentException = function TableauException$CreateInternalStringArgumentException(argumentName) {
		return $tab__TableauException.createInternalError("Invalid string argument '" + argumentName + "'.");
	};
	$tab__TableauException.createServerError = function TableauException$CreateServerError(message) {
		return $tab__TableauException.create('serverError', message);
	};
	$tab__TableauException.createNotActiveSheet = function TableauException$CreateNotActiveSheet() {
		return $tab__TableauException.create('notActiveSheet', 'Operation not allowed on non-active sheet');
	};
	$tab__TableauException.createInvalidCustomViewName = function TableauException$CreateInvalidCustomViewName(customViewName) {
		return $tab__TableauException.create('invalidCustomViewName', 'Invalid custom view name: ' + customViewName);
	};
	$tab__TableauException.createInvalidParameter = function TableauException$CreateInvalidParameter(paramName) {
		return $tab__TableauException.create('invalidParameter', 'Invalid parameter: ' + paramName);
	};
	$tab__TableauException.createInvalidFilterFieldNameOrValue = function TableauException$CreateInvalidFilterFieldNameOrValue(fieldName) {
		return $tab__TableauException.create('invalidFilterFieldNameOrValue', 'Invalid filter field name or value: ' + fieldName);
	};
	$tab__TableauException.createInvalidDateParameter = function TableauException$CreateInvalidDateParameter(paramName) {
		return $tab__TableauException.create('invalidDateParameter', 'Invalid date parameter: ' + paramName);
	};
	$tab__TableauException.createNullOrEmptyParameter = function TableauException$CreateNullOrEmptyParameter(paramName) {
		return $tab__TableauException.create('nullOrEmptyParameter', 'Parameter cannot be null or empty: ' + paramName);
	};
	$tab__TableauException.createMissingMaxSize = function TableauException$CreateMissingMaxSize() {
		return $tab__TableauException.create('missingMaxSize', 'Missing maxSize for SheetSizeBehavior.ATMOST');
	};
	$tab__TableauException.createMissingMinSize = function TableauException$CreateMissingMinSize() {
		return $tab__TableauException.create('missingMinSize', 'Missing minSize for SheetSizeBehavior.ATLEAST');
	};
	$tab__TableauException.createMissingMinMaxSize = function TableauException$CreateMissingMinMaxSize() {
		return $tab__TableauException.create('missingMinMaxSize', 'Missing minSize or maxSize for SheetSizeBehavior.RANGE');
	};
	$tab__TableauException.createInvalidRangeSize = function TableauException$CreateInvalidRangeSize() {
		return $tab__TableauException.create('invalidSize', 'Missing minSize or maxSize for SheetSizeBehavior.RANGE');
	};
	$tab__TableauException.createInvalidSizeValue = function TableauException$CreateInvalidSizeValue() {
		return $tab__TableauException.create('invalidSize', 'Size value cannot be less than zero');
	};
	$tab__TableauException.createInvalidSheetSizeParam = function TableauException$CreateInvalidSheetSizeParam() {
		return $tab__TableauException.create('invalidSize', 'Invalid sheet size parameter');
	};
	$tab__TableauException.createSizeConflictForExactly = function TableauException$CreateSizeConflictForExactly() {
		return $tab__TableauException.create('invalidSize', 'Conflicting size values for SheetSizeBehavior.EXACTLY');
	};
	$tab__TableauException.createInvalidSizeBehaviorOnWorksheet = function TableauException$CreateInvalidSizeBehaviorOnWorksheet() {
		return $tab__TableauException.create('invalidSizeBehaviorOnWorksheet', 'Only SheetSizeBehavior.AUTOMATIC is allowed on Worksheets');
	};
	$tab__TableauException.createNoUrlForHiddenWorksheet = function TableauException$CreateNoUrlForHiddenWorksheet() {
		return $tab__TableauException.create('noUrlForHiddenWorksheet', 'Hidden worksheets do not have a URL.');
	};
	$tab__TableauException.$createInvalidAggregationFieldName = function TableauException$CreateInvalidAggregationFieldName(fieldName) {
		return $tab__TableauException.create('invalidAggregationFieldName', "Invalid aggregation type for field '" + fieldName + "'");
	};
	$tab__TableauException.createIndexOutOfRange = function TableauException$CreateIndexOutOfRange(index) {
		return $tab__TableauException.create('indexOutOfRange', "Index '" + index + "' is out of range.");
	};
	$tab__TableauException.createUnsupportedEventName = function TableauException$CreateUnsupportedEventName(eventName) {
		return $tab__TableauException.create('unsupportedEventName', "Unsupported event '" + eventName + "'.");
	};
	$tab__TableauException.createBrowserNotCapable = function TableauException$CreateBrowserNotCapable() {
		return $tab__TableauException.create('browserNotCapable', 'This browser is incapable of supporting the Tableau JavaScript API.');
	};
	global.tab._TableauException = $tab__TableauException;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.Utility
	var $tab__Utility = function() {
	};
	$tab__Utility.__typeName = 'tab._Utility';
	$tab__Utility.isNullOrEmpty = function Utility$IsNullOrEmpty(value) {
		return ss.isNullOrUndefined(value) || (value['length'] || 0) <= 0;
	};
	$tab__Utility.isString = function Utility$IsString(value) {
		return typeof(value) === 'string';
	};
	$tab__Utility.isNumber = function Utility$IsNumber(value) {
		return typeof(value) === 'number';
	};
	$tab__Utility.isDate = function Utility$IsDate(value) {
		if (typeof(value) === 'object' && ss.isInstanceOfType(value, ss.JsDate)) {
			return true;
		}
		else if (!!(Object.prototype.toString.call(value) !== '[object Date]')) {
			return false;
		}
		return !isNaN(ss.cast(value, ss.JsDate).getTime());
	};
	$tab__Utility.isDateValid = function Utility$IsDateValid(dt) {
		return !isNaN(dt.getTime());
	};
	$tab__Utility.indexOf = function Utility$IndexOf(array, searchElement, fromIndex) {
		if (ss.isValue(Array.prototype['indexOf'])) {
			return ss.unbox(ss.cast(array['indexOf'](searchElement, fromIndex), ss.Int32));
		}
		fromIndex = fromIndex || 0;
		var length = array.length;
		if (length > 0) {
			for (var index = fromIndex; index < length; index++) {
				if (ss.referenceEquals(array[index], searchElement)) {
					return index;
				}
			}
		}
		return -1;
	};
	$tab__Utility.contains = function Utility$Contains(array, searchElement, fromIndex) {
		var index = $tab__Utility.indexOf(array, searchElement, fromIndex);
		return index >= 0;
	};
	$tab__Utility.getTopmostWindow = function Utility$GetTopmostWindow() {
		var win = window.self;
		while (ss.isValue(win.parent) && !ss.referenceEquals(win.parent, win)) {
			win = win.parent;
		}
		return win;
	};
	$tab__Utility.toInt = function Utility$ToInt(value) {
		if ($tab__Utility.isNumber(value)) {
			return ss.Int32.trunc(value);
		}
		var number = parseInt(value.toString(), 10);
		if (isNaN(number)) {
			return 0;
		}
		return number;
	};
	$tab__Utility.hasClass = function Utility$HasClass(element, className) {
		var regexClass = new RegExp('[\\n\\t\\r]', 'g');
		return ss.isValue(element) && (' ' + element.className + ' ').replace(regexClass, ' ').indexOf(' ' + className + ' ') > -1;
	};
	$tab__Utility.findParentWithClassName = function Utility$FindParentWithClassName(element, className, stopAtElement) {
		var parent = (ss.isValue(element) ? ss.cast(element.parentNode, HTMLElement) : null);
		stopAtElement = stopAtElement || document.body;
		while (ss.isValue(parent)) {
			if ($tab__Utility.hasClass(parent, className)) {
				return parent;
			}
			if (ss.referenceEquals(parent, stopAtElement)) {
				parent = null;
			}
			else {
				parent = ss.cast(parent.parentNode, HTMLElement);
			}
		}
		return parent;
	};
	$tab__Utility.hasJsonParse = function Utility$HasJsonParse() {
		return !!(ss.isValue(JSON) && ss.isValue(JSON.parse));
	};
	$tab__Utility.hasWindowPostMessage = function Utility$HasWindowPostMessage() {
		return !!ss.isValue(window.postMessage);
	};
	$tab__Utility.isPostMessageSynchronous = function Utility$IsPostMessageSynchronous() {
		if ($tab__Utility.isIE()) {
			var msieRegEx = new RegExp('(msie) ([\\w.]+)');
			var matches = msieRegEx.exec(window.navigator.userAgent.toLowerCase());
			var versionStr = matches[2] || '0';
			var version = parseInt(versionStr, 10);
			return version <= 8;
		}
		return false;
	};
	$tab__Utility.hasDocumentAttachEvent = function Utility$HasDocumentAttachEvent() {
		return !!ss.isValue(document.attachEvent);
	};
	$tab__Utility.hasWindowAddEventListener = function Utility$HasWindowAddEventListener() {
		return !!ss.isValue(window.addEventListener);
	};
	$tab__Utility.isElementOfTag = function Utility$IsElementOfTag(element, tagName) {
		return ss.isValue(element) && element.nodeType === 1 && ss.referenceEquals(element.tagName.toLowerCase(), tagName.toLowerCase());
	};
	$tab__Utility.elementToString = function Utility$ElementToString(element) {
		var str = new ss.StringBuilder();
		str.append(element.tagName.toLowerCase());
		if (!$tab__Utility.isNullOrEmpty(element.id)) {
			str.append('#').append(element.id);
		}
		if (!$tab__Utility.isNullOrEmpty(element.className)) {
			var classes = element.className.split(' ');
			str.append('.').append(classes.join('.'));
		}
		return str.toString();
	};
	$tab__Utility.tableauGCS = function Utility$TableauGCS(e) {
		if (typeof(window['getComputedStyle']) === 'function') {
			return window.getComputedStyle(e);
		}
		else {
			return e['currentStyle'];
		}
	};
	$tab__Utility.isIE = function Utility$IsIE() {
		return !!(window.navigator.userAgent.indexOf('MSIE') > -1 && ss.isNullOrUndefined(window.opera));
	};
	$tab__Utility.isSafari = function Utility$IsSafari() {
		var ua = window.navigator.userAgent;
		var isChrome = ua.indexOf('Chrome') >= 0;
		return ua.indexOf('Safari') >= 0 && !isChrome;
	};
	$tab__Utility.mobileDetect = function Utility$MobileDetect() {
		var ua = window.navigator.userAgent;
		if (ua.indexOf('iPad') !== -1) {
			return true;
		}
		if (ua.indexOf('Android') !== -1) {
			return true;
		}
		if (ua.indexOf('AppleWebKit') !== -1 && ua.indexOf('Mobile') !== -1) {
			return true;
		}
		return false;
	};
	$tab__Utility.visibleContentRectInDocumentCoordinates = function Utility$VisibleContentRectInDocumentCoordinates(element) {
		var visibleRect = $tab__Utility.contentRectInDocumentCoordinates(element);
		for (var currentElement = element.parentElement; ss.isValue(currentElement) && ss.isValue(currentElement.parentElement); currentElement = currentElement.parentElement) {
			var overflow = $tab__Utility.$getComputedStyle(currentElement).overflow;
			if (overflow === 'auto' || overflow === 'scroll' || overflow === 'hidden') {
				visibleRect = visibleRect.intersect($tab__Utility.contentRectInDocumentCoordinates(currentElement));
			}
		}
		var viewportRect = $tab__Utility.contentRectInDocumentCoordinates(document.documentElement);
		var win = new tab.WindowHelper(window.self);
		viewportRect.left += win.get_pageXOffset();
		viewportRect.top += win.get_pageYOffset();
		return visibleRect.intersect(viewportRect);
	};
	$tab__Utility.contentRectInDocumentCoordinates = function Utility$ContentRectInDocumentCoordinates(element) {
		var boundingClientRect = $tab__Utility.getBoundingClientRect(element);
		var style = $tab__Utility.$getComputedStyle(element);
		var paddingLeft = $tab__Utility.toInt(style.paddingLeft);
		var paddingTop = $tab__Utility.toInt(style.paddingTop);
		var borderLeft = $tab__Utility.toInt(style.borderLeftWidth);
		var borderTop = $tab__Utility.toInt(style.borderTopWidth);
		var contentSize = $tab__Utility.computeContentSize(element);
		var win = new tab.WindowHelper(window.self);
		var left = boundingClientRect.left + paddingLeft + borderLeft + win.get_pageXOffset();
		var top = boundingClientRect.top + paddingTop + borderTop + win.get_pageYOffset();
		return new $tab__Rect(left, top, contentSize.width, contentSize.height);
	};
	$tab__Utility.getBoundingClientRect = function Utility$GetBoundingClientRect(element) {
		var rect = element.getBoundingClientRect();
		var top = ss.Int32.trunc(rect.top);
		var left = ss.Int32.trunc(rect.left);
		var right = ss.Int32.trunc(rect.right);
		var bottom = ss.Int32.trunc(rect.bottom);
		return new $tab__Rect(left, top, right - left, bottom - top);
	};
	$tab__Utility.convertRawValue = function Utility$ConvertRawValue(rawValue, dataType) {
		if (ss.isNullOrUndefined(rawValue)) {
			return null;
		}
		switch (dataType) {
			case 'bool': {
				return rawValue;
			}
			case 'date':
			case 'number': {
				if (ss.isNullOrUndefined(rawValue)) {
					return Number.NaN;
				}
				return rawValue;
			}
			default:
			case 'string': {
				return rawValue;
			}
		}
	};
	$tab__Utility.getDataValue = function Utility$GetDataValue(dv) {
		if (ss.isNullOrUndefined(dv)) {
			return $tab_DataValue.$ctor(null, null, null);
		}
		return $tab_DataValue.$ctor($tab__Utility.convertRawValue(dv.value, dv.type), dv.formattedValue, dv.aliasedValue);
	};
	$tab__Utility.serializeDateForServer = function Utility$SerializeDateForServer(date) {
		var serializedDate = '';
		if (ss.isValue(date) && $tab__Utility.isDate(date)) {
			var year = date.getUTCFullYear();
			var month = date.getUTCMonth() + 1;
			var day = date.getUTCDate();
			var hh = date.getUTCHours();
			var mm = date.getUTCMinutes();
			var sec = date.getUTCSeconds();
			serializedDate = year + '-' + month + '-' + day + ' ' + hh + ':' + mm + ':' + sec;
		}
		return serializedDate;
	};
	$tab__Utility.computeContentSize = function Utility$ComputeContentSize(element) {
		var style = $tab__Utility.$getComputedStyle(element);
		var paddingLeft = parseFloat(style.paddingLeft);
		var paddingTop = parseFloat(style.paddingTop);
		var paddingRight = parseFloat(style.paddingRight);
		var paddingBottom = parseFloat(style.paddingBottom);
		var width = element.clientWidth - Math.round(paddingLeft + paddingRight);
		var height = element.clientHeight - Math.round(paddingTop + paddingBottom);
		return $tab_Size.$ctor(width, height);
	};
	$tab__Utility.$getComputedStyle = function Utility$GetComputedStyle(element) {
		if (typeof(window['getComputedStyle']) === 'function') {
			if (ss.isValue(element.ownerDocument.defaultView.opener)) {
				return element.ownerDocument.defaultView.getComputedStyle(element);
			}
			return window.getComputedStyle(element);
		}
		else if (ss.isValue(element['currentStyle'])) {
			return element['currentStyle'];
		}
		return element.style;
	};
	global.tab._Utility = $tab__Utility;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.VizManagerImpl
	var $tab__VizManagerImpl = function() {
	};
	$tab__VizManagerImpl.__typeName = 'tab._VizManagerImpl';
	$tab__VizManagerImpl.get_$clonedVizs = function VizManagerImpl$get_ClonedVizs() {
		return $tab__VizManagerImpl.$vizs.concat();
	};
	$tab__VizManagerImpl.$registerViz = function VizManagerImpl$RegisterViz(viz) {
		$tab__VizManagerImpl.$verifyVizNotAlreadyParented(viz);
		$tab__VizManagerImpl.$vizs.push(viz);
	};
	$tab__VizManagerImpl.$unregisterViz = function VizManagerImpl$UnregisterViz(viz) {
		for (var i = 0, len = $tab__VizManagerImpl.$vizs.length; i < len; i++) {
			if (ss.referenceEquals($tab__VizManagerImpl.$vizs[i], viz)) {
				$tab__VizManagerImpl.$vizs.splice(i, 1);
				break;
			}
		}
	};
	$tab__VizManagerImpl.$sendVisibleRects = function VizManagerImpl$SendVisibleRects() {
		for (var i = 0, len = $tab__VizManagerImpl.$vizs.length; i < len; i++) {
			$tab__VizManagerImpl.$vizs[i]._impl.$sendVisibleRect();
		}
	};
	$tab__VizManagerImpl.$verifyVizNotAlreadyParented = function VizManagerImpl$VerifyVizNotAlreadyParented(viz) {
		var parent = viz.getParentElement();
		for (var i = 0, len = $tab__VizManagerImpl.$vizs.length; i < len; i++) {
			if (ss.referenceEquals($tab__VizManagerImpl.$vizs[i].getParentElement(), parent)) {
				var message = "Another viz is already present in element '" + $tab__Utility.elementToString(parent) + "'.";
				throw $tab__TableauException.create('vizAlreadyInManager', message);
			}
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.VizParameters
	var $tab__VizParameters = function(element, url, options) {
		this.name = '';
		this.host_url = null;
		this.tabs = false;
		this.toolbar = false;
		this.toolBarPosition = null;
		this.device = null;
		this.handlerId = null;
		this.width = null;
		this.height = null;
		this.parentElement = null;
		this.userSuppliedParameters = null;
		this.staticImageUrl = null;
		this.fixedSize = false;
		this.displayStaticImage = false;
		this.$urlFromApi = null;
		this.$createOptions = null;
		if (ss.isNullOrUndefined(element) || ss.isNullOrUndefined(url)) {
			throw $tab__TableauException.create('noUrlOrParentElementNotFound', 'URL is empty or Parent element not found');
		}
		if (ss.isNullOrUndefined(options)) {
			options = new Object();
			options.hideTabs = false;
			options.hideToolbar = false;
			options.onFirstInteractive = null;
		}
		if (ss.isValue(options.height) || ss.isValue(options.width)) {
			this.fixedSize = true;
			if ($tab__Utility.isNumber(options.height)) {
				options.height = options.height.toString() + 'px';
			}
			if ($tab__Utility.isNumber(options.width)) {
				options.width = options.width.toString() + 'px';
			}
			this.height = (ss.isValue(options.height) ? options.height.toString() : null);
			this.width = (ss.isValue(options.width) ? options.width.toString() : null);
		}
		else {
			this.fixedSize = false;
		}
		this.displayStaticImage = options.displayStaticImage || false;
		this.staticImageUrl = options.staticImageUrl || '';
		this.tabs = !(options.hideTabs || false);
		this.toolbar = !(options.hideToolbar || false);
		this.device = options.device;
		this.parentElement = element;
		this.$createOptions = options;
		this.toolBarPosition = options.toolbarPosition;
		var urlParts = url.split('?');
		this.$urlFromApi = urlParts[0];
		if (urlParts.length === 2) {
			this.userSuppliedParameters = urlParts[1];
		}
		else {
			this.userSuppliedParameters = '';
		}
		var r = (new RegExp('.*?[^/:]/', '')).exec(this.$urlFromApi);
		if (ss.isNullOrUndefined(r) || r[0].toLowerCase().indexOf('http://') === -1 && r[0].toLowerCase().indexOf('https://') === -1) {
			throw $tab__TableauException.create('invalidUrl', 'Invalid url');
		}
		this.host_url = r[0].toLowerCase();
		this.name = this.$urlFromApi.replace(r[0], '');
		this.name = this.name.replace('views/', '');
	};
	$tab__VizParameters.__typeName = 'tab._VizParameters';
	global.tab._VizParameters = $tab__VizParameters;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.WorkbookImpl
	var $tab__WorkbookImpl = function(vizImpl, messagingOptions, callback) {
		this.$workbook = null;
		this.$vizImpl = null;
		this.$name = null;
		this.$activeSheetImpl = null;
		this.$activatingHiddenSheetImpl = null;
		this.$publishedSheetsInfo = new tab._Collection();
		this.$isDownloadAllowed = false;
		this.$messagingOptions = null;
		this.$currentCustomView = null;
		this.$customViews = new tab._Collection();
		this.$updatedCustomViews = new tab._Collection();
		this.$removedCustomViews = new tab._Collection();
		this.$parameters = null;
		this.$lastChangedParameterImpl = null;
		this.$vizImpl = vizImpl;
		this.$messagingOptions = messagingOptions;
		this.$getClientInfo(callback);
	};
	$tab__WorkbookImpl.__typeName = 'tab._WorkbookImpl';
	$tab__WorkbookImpl.$createDashboardZones = function WorkbookImpl$CreateDashboardZones(zones) {
		zones = ss.coalesce(zones, []);
		var zonesInfo = [];
		for (var i = 0; i < zones.length; i++) {
			var zone = zones[i];
			var objectType = $tab_ApiEnumConverter.convertDashboardObjectType(zone.zoneType);
			var size = $tab_Size.$ctor(zone.width, zone.height);
			var position = $tab_Point.$ctor(zone.x, zone.y);
			var name = zone.name;
			var zoneInfo = { name: name, objectType: objectType, position: position, size: size, zoneId: zone.zoneId };
			zonesInfo.push(zoneInfo);
		}
		return zonesInfo;
	};
	$tab__WorkbookImpl.$extractSheetName = function WorkbookImpl$ExtractSheetName(sheetOrInfoOrName) {
		if (ss.isNullOrUndefined(sheetOrInfoOrName)) {
			return null;
		}
		if ($tab__Utility.isString(sheetOrInfoOrName)) {
			return sheetOrInfoOrName;
		}
		var sheet = ss.safeCast(sheetOrInfoOrName, $tableauSoftware_Sheet);
		if (ss.isValue(sheet)) {
			return sheet.getName();
		}
		var info = ss.safeCast(sheetOrInfoOrName, $tableauSoftware_SheetInfo);
		if (ss.isValue(info)) {
			return info.getName();
		}
		return null;
	};
	$tab__WorkbookImpl.$createSheetSize = function WorkbookImpl$CreateSheetSize(sheetInfo) {
		if (ss.isNullOrUndefined(sheetInfo)) {
			return $tab_SheetSizeFactory.createAutomatic();
		}
		return $tab_SheetSizeFactory.fromSizeConstraints(sheetInfo.sizeConstraints);
	};
	$tab__WorkbookImpl.$processParameters = function WorkbookImpl$ProcessParameters(paramList) {
		var parameters = new tab._Collection();
		for (var $t1 = 0; $t1 < paramList.parameters.length; $t1++) {
			var model = paramList.parameters[$t1];
			var paramImpl = new $tab_$ParameterImpl(model);
			parameters._add(paramImpl.get_$name(), paramImpl.get_$parameter());
		}
		return parameters;
	};
	$tab__WorkbookImpl.$findAndCreateParameterImpl = function WorkbookImpl$FindAndCreateParameterImpl(parameterName, paramList) {
		for (var $t1 = 0; $t1 < paramList.parameters.length; $t1++) {
			var model = paramList.parameters[$t1];
			if (ss.referenceEquals(model.name, parameterName)) {
				return new $tab_$ParameterImpl(model);
			}
		}
		return null;
	};
	global.tab._WorkbookImpl = $tab__WorkbookImpl;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.WorksheetImpl
	var $tab__WorksheetImpl = function(sheetInfoImpl, workbookImpl, messagingOptions, parentDashboardImpl) {
		this.$worksheet = null;
		this.$parentDashboardImpl = null;
		this.$filters = new tab._Collection();
		this.$selectedMarks = new tab._Collection();
		$tab__SheetImpl.call(this, sheetInfoImpl, workbookImpl, messagingOptions);
		this.$parentDashboardImpl = parentDashboardImpl;
	};
	$tab__WorksheetImpl.__typeName = 'tab._WorksheetImpl';
	$tab__WorksheetImpl.$filterCommandError = function WorksheetImpl$FilterCommandError(rawPm) {
		var commandError = rawPm;
		if (ss.isValue(commandError) && ss.isValue(commandError.errorCode)) {
			var additionalInfo = (ss.isValue(commandError.additionalInformation) ? commandError.additionalInformation.toString() : '');
			switch (commandError.errorCode) {
				case 'invalidFilterFieldName': {
					return $tab__TableauException.create('invalidFilterFieldName', additionalInfo);
				}
				case 'invalidFilterFieldValue': {
					return $tab__TableauException.create('invalidFilterFieldValue', additionalInfo);
				}
				case 'invalidAggregationFieldName': {
					return $tab__TableauException.$createInvalidAggregationFieldName(additionalInfo);
				}
				default: {
					return $tab__TableauException.createServerError(additionalInfo);
				}
			}
		}
		return null;
	};
	$tab__WorksheetImpl.$normalizeRangeFilterOption = function WorksheetImpl$NormalizeRangeFilterOption(filterOptions) {
		if (ss.isNullOrUndefined(filterOptions)) {
			throw $tab__TableauException.createNullOrEmptyParameter('filterOptions');
		}
		if (ss.isNullOrUndefined(filterOptions.min) && ss.isNullOrUndefined(filterOptions.max)) {
			throw $tab__TableauException.create('invalidParameter', 'At least one of filterOptions.min or filterOptions.max must be specified.');
		}
		var fixedUpFilterOptions = new Object();
		if (ss.isValue(filterOptions.min)) {
			fixedUpFilterOptions.min = filterOptions.min;
		}
		if (ss.isValue(filterOptions.max)) {
			fixedUpFilterOptions.max = filterOptions.max;
		}
		if (ss.isValue(filterOptions.nullOption)) {
			fixedUpFilterOptions.nullOption = $tab_$PublicEnums.$normalizeEnum($tab_ApiNullOption).call(null, filterOptions.nullOption, 'filterOptions.nullOption');
		}
		return fixedUpFilterOptions;
	};
	$tab__WorksheetImpl.$normalizeRelativeDateFilterOptions = function WorksheetImpl$NormalizeRelativeDateFilterOptions(filterOptions) {
		if (ss.isNullOrUndefined(filterOptions)) {
			throw $tab__TableauException.createNullOrEmptyParameter('filterOptions');
		}
		var fixedUpFilterOptions = new Object();
		fixedUpFilterOptions.rangeType = $tab_$PublicEnums.$normalizeEnum($tab_ApiDateRangeType).call(null, filterOptions.rangeType, 'filterOptions.rangeType');
		fixedUpFilterOptions.periodType = $tab_$PublicEnums.$normalizeEnum($tab_ApiPeriodType).call(null, filterOptions.periodType, 'filterOptions.periodType');
		if (fixedUpFilterOptions.rangeType === 'lastn' || fixedUpFilterOptions.rangeType === 'nextn') {
			if (ss.isNullOrUndefined(filterOptions.rangeN)) {
				throw $tab__TableauException.create('missingRangeNForRelativeDateFilters', 'Missing rangeN field for a relative date filter of LASTN or NEXTN.');
			}
			fixedUpFilterOptions.rangeN = $tab__Utility.toInt(filterOptions.rangeN);
		}
		if (ss.isValue(filterOptions.anchorDate)) {
			if (!$tab__Utility.isDate(filterOptions.anchorDate) || !$tab__Utility.isDateValid(filterOptions.anchorDate)) {
				throw $tab__TableauException.createInvalidDateParameter('filterOptions.anchorDate');
			}
			fixedUpFilterOptions.anchorDate = filterOptions.anchorDate;
		}
		return fixedUpFilterOptions;
	};
	$tab__WorksheetImpl.$createFilterCommandReturnHandler = function WorksheetImpl$CreateFilterCommandReturnHandler(commandName, fieldName, deferred) {
		return new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))(commandName, 1, function(result) {
			var error = $tab__WorksheetImpl.$filterCommandError(result);
			if (ss.isNullOrUndefined(error)) {
				deferred.resolve(fieldName);
			}
			else {
				deferred.reject(error);
			}
		}, function(remoteError, message) {
			if (remoteError) {
				deferred.reject($tab__TableauException.createInvalidFilterFieldNameOrValue(fieldName));
			}
			else {
				var error1 = $tab__TableauException.create('filterCannotBePerformed', message);
				deferred.reject(error1);
			}
		});
	};
	$tab__WorksheetImpl.$createSelectionCommandError = function WorksheetImpl$CreateSelectionCommandError(rawPm) {
		var commandError = rawPm;
		if (ss.isValue(commandError) && ss.isValue(commandError.errorCode)) {
			var additionalInfo = (ss.isValue(commandError.additionalInformation) ? commandError.additionalInformation.toString() : '');
			switch (commandError.errorCode) {
				case 'invalidSelectionFieldName': {
					return $tab__TableauException.create('invalidSelectionFieldName', additionalInfo);
				}
				case 'invalidSelectionValue': {
					return $tab__TableauException.create('invalidSelectionValue', additionalInfo);
				}
				case 'invalidSelectionDate': {
					return $tab__TableauException.create('invalidSelectionDate', additionalInfo);
				}
			}
		}
		return null;
	};
	global.tab._WorksheetImpl = $tab__WorksheetImpl;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.ApiDashboardObjectType
	var $tab_ApiDashboardObjectType = function() {
	};
	$tab_ApiDashboardObjectType.__typeName = 'tab.ApiDashboardObjectType';
	global.tab.ApiDashboardObjectType = $tab_ApiDashboardObjectType;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.ApiDateRangeType
	var $tab_ApiDateRangeType = function() {
	};
	$tab_ApiDateRangeType.__typeName = 'tab.ApiDateRangeType';
	global.tab.ApiDateRangeType = $tab_ApiDateRangeType;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.ApiDeviceType
	var $tab_ApiDeviceType = function() {
	};
	$tab_ApiDeviceType.__typeName = 'tab.ApiDeviceType';
	global.tab.ApiDeviceType = $tab_ApiDeviceType;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.ApiEnumConverter
	var $tab_ApiEnumConverter = function() {
	};
	$tab_ApiEnumConverter.__typeName = 'tab.ApiEnumConverter';
	$tab_ApiEnumConverter.convertDashboardObjectType = function ApiEnumConverter$ConvertDashboardObjectType(crossDomainType) {
		switch (crossDomainType) {
			case 'blank': {
				return 'blank';
			}
			case 'image': {
				return 'image';
			}
			case 'legend': {
				return 'legend';
			}
			case 'pageFilter': {
				return 'pageFilter';
			}
			case 'parameterControl': {
				return 'parameterControl';
			}
			case 'quickFilter': {
				return 'quickFilter';
			}
			case 'text': {
				return 'text';
			}
			case 'title': {
				return 'title';
			}
			case 'webPage': {
				return 'webPage';
			}
			case 'worksheet': {
				return 'worksheet';
			}
			default: {
				throw $tab__TableauException.createInternalError('Unknown ApiCrossDomainDashboardObjectType: ' + crossDomainType);
			}
		}
	};
	$tab_ApiEnumConverter.convertDateRange = function ApiEnumConverter$ConvertDateRange(crossDomainType) {
		switch (crossDomainType) {
			case 'curr': {
				return 'curr';
			}
			case 'last': {
				return 'last';
			}
			case 'lastn': {
				return 'lastn';
			}
			case 'next': {
				return 'next';
			}
			case 'nextn': {
				return 'nextn';
			}
			case 'todate': {
				return 'todate';
			}
			default: {
				throw $tab__TableauException.createInternalError('Unknown ApiCrossDomainDateRangeType: ' + crossDomainType);
			}
		}
	};
	$tab_ApiEnumConverter.convertFieldAggregation = function ApiEnumConverter$ConvertFieldAggregation(crossDomainType) {
		switch (crossDomainType) {
			case 'ATTR': {
				return 'ATTR';
			}
			case 'AVG': {
				return 'AVG';
			}
			case 'COUNT': {
				return 'COUNT';
			}
			case 'COUNTD': {
				return 'COUNTD';
			}
			case 'DAY': {
				return 'DAY';
			}
			case 'END': {
				return 'END';
			}
			case 'HOUR': {
				return 'HOUR';
			}
			case 'INOUT': {
				return 'INOUT';
			}
			case 'KURTOSIS': {
				return 'KURTOSIS';
			}
			case 'MAX': {
				return 'MAX';
			}
			case 'MDY': {
				return 'MDY';
			}
			case 'MEDIAN': {
				return 'MEDIAN';
			}
			case 'MIN': {
				return 'MIN';
			}
			case 'MINUTE': {
				return 'MINUTE';
			}
			case 'MONTH': {
				return 'MONTH';
			}
			case 'MONTHYEAR': {
				return 'MONTHYEAR';
			}
			case 'NONE': {
				return 'NONE';
			}
			case 'PERCENTILE': {
				return 'PERCENTILE';
			}
			case 'QUART1': {
				return 'QUART1';
			}
			case 'QUART3': {
				return 'QUART3';
			}
			case 'QTR': {
				return 'QTR';
			}
			case 'SECOND': {
				return 'SECOND';
			}
			case 'SKEWNESS': {
				return 'SKEWNESS';
			}
			case 'STDEV': {
				return 'STDEV';
			}
			case 'STDEVP': {
				return 'STDEVP';
			}
			case 'SUM': {
				return 'SUM';
			}
			case 'SUM_XSQR': {
				return 'SUM_XSQR';
			}
			case 'TRUNC_DAY': {
				return 'TRUNC_DAY';
			}
			case 'TRUNC_HOUR': {
				return 'TRUNC_HOUR';
			}
			case 'TRUNC_MINUTE': {
				return 'TRUNC_MINUTE';
			}
			case 'TRUNC_MONTH': {
				return 'TRUNC_MONTH';
			}
			case 'TRUNC_QTR': {
				return 'TRUNC_QTR';
			}
			case 'TRUNC_SECOND': {
				return 'TRUNC_SECOND';
			}
			case 'TRUNC_WEEK': {
				return 'TRUNC_WEEK';
			}
			case 'TRUNC_YEAR': {
				return 'TRUNC_YEAR';
			}
			case 'USER': {
				return 'USER';
			}
			case 'VAR': {
				return 'VAR';
			}
			case 'VARP': {
				return 'VARP';
			}
			case 'WEEK': {
				return 'WEEK';
			}
			case 'WEEKDAY': {
				return 'WEEKDAY';
			}
			case 'YEAR': {
				return 'YEAR';
			}
			default: {
				throw $tab__TableauException.createInternalError('Unknown ApiCrossDomainFieldAggregationType: ' + crossDomainType);
			}
		}
	};
	$tab_ApiEnumConverter.convertFieldRole = function ApiEnumConverter$ConvertFieldRole(crossDomainType) {
		switch (crossDomainType) {
			case 'dimension': {
				return 'dimension';
			}
			case 'measure': {
				return 'measure';
			}
			case 'unknown': {
				return 'unknown';
			}
			default: {
				throw $tab__TableauException.createInternalError('Unknown ApiCrossDomainFieldRoleType: ' + crossDomainType);
			}
		}
	};
	$tab_ApiEnumConverter.convertFilterType = function ApiEnumConverter$ConvertFilterType(crossDomainType) {
		switch (crossDomainType) {
			case 'categorical': {
				return 'categorical';
			}
			case 'hierarchical': {
				return 'hierarchical';
			}
			case 'quantitative': {
				return 'quantitative';
			}
			case 'relativedate': {
				return 'relativedate';
			}
			default: {
				throw $tab__TableauException.createInternalError('Unknown ApiCrossDomainFilterType: ' + crossDomainType);
			}
		}
	};
	$tab_ApiEnumConverter.convertParameterAllowableValuesType = function ApiEnumConverter$ConvertParameterAllowableValuesType(crossDomainType) {
		switch (crossDomainType) {
			case 'all': {
				return 'all';
			}
			case 'list': {
				return 'list';
			}
			case 'range': {
				return 'range';
			}
			default: {
				throw $tab__TableauException.createInternalError('Unknown ApiCrossDomainParameterAllowableValuesType: ' + crossDomainType);
			}
		}
	};
	$tab_ApiEnumConverter.convertParameterDataType = function ApiEnumConverter$ConvertParameterDataType(crossDomainType) {
		switch (crossDomainType) {
			case 'boolean': {
				return 'boolean';
			}
			case 'date': {
				return 'date';
			}
			case 'datetime': {
				return 'datetime';
			}
			case 'float': {
				return 'float';
			}
			case 'integer': {
				return 'integer';
			}
			case 'string': {
				return 'string';
			}
			default: {
				throw $tab__TableauException.createInternalError('Unknown ApiCrossDomainParameterDataType: ' + crossDomainType);
			}
		}
	};
	$tab_ApiEnumConverter.convertPeriodType = function ApiEnumConverter$ConvertPeriodType(crossDomainType) {
		switch (crossDomainType) {
			case 'year': {
				return 'year';
			}
			case 'quarter': {
				return 'quarter';
			}
			case 'month': {
				return 'month';
			}
			case 'week': {
				return 'week';
			}
			case 'day': {
				return 'day';
			}
			case 'hour': {
				return 'hour';
			}
			case 'minute': {
				return 'minute';
			}
			case 'second': {
				return 'second';
			}
			default: {
				throw $tab__TableauException.createInternalError('Unknown ApiCrossDomainPeriodType: ' + crossDomainType);
			}
		}
	};
	$tab_ApiEnumConverter.convertSheetType = function ApiEnumConverter$ConvertSheetType(crossDomainType) {
		switch (crossDomainType) {
			case 'worksheet': {
				return 'worksheet';
			}
			case 'dashboard': {
				return 'dashboard';
			}
			case 'story': {
				return 'story';
			}
			default: {
				throw $tab__TableauException.createInternalError('Unknown ApiCrossDomainSheetType: ' + crossDomainType);
			}
		}
	};
	$tab_ApiEnumConverter.convertDataType = function ApiEnumConverter$ConvertDataType(crossDomainType) {
		switch (crossDomainType) {
			case 'boolean': {
				return 'boolean';
			}
			case 'date': {
				return 'date';
			}
			case 'datetime': {
				return 'datetime';
			}
			case 'float': {
				return 'float';
			}
			case 'integer': {
				return 'integer';
			}
			case 'string': {
				return 'string';
			}
			default: {
				throw $tab__TableauException.createInternalError('Unknown ApiCrossDomainParameterDataType: ' + crossDomainType);
			}
		}
	};
	global.tab.ApiEnumConverter = $tab_ApiEnumConverter;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.ApiErrorCode
	var $tab_ApiErrorCode = function() {
	};
	$tab_ApiErrorCode.__typeName = 'tab.ApiErrorCode';
	global.tab.ApiErrorCode = $tab_ApiErrorCode;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.ApiFieldAggregationType
	var $tab_ApiFieldAggregationType = function() {
	};
	$tab_ApiFieldAggregationType.__typeName = 'tab.ApiFieldAggregationType';
	global.tab.ApiFieldAggregationType = $tab_ApiFieldAggregationType;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.ApiFieldRoleType
	var $tab_ApiFieldRoleType = function() {
	};
	$tab_ApiFieldRoleType.__typeName = 'tab.ApiFieldRoleType';
	global.tab.ApiFieldRoleType = $tab_ApiFieldRoleType;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.ApiFilterType
	var $tab_ApiFilterType = function() {
	};
	$tab_ApiFilterType.__typeName = 'tab.ApiFilterType';
	global.tab.ApiFilterType = $tab_ApiFilterType;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.ApiFilterUpdateType
	var $tab_ApiFilterUpdateType = function() {
	};
	$tab_ApiFilterUpdateType.__typeName = 'tab.ApiFilterUpdateType';
	global.tab.ApiFilterUpdateType = $tab_ApiFilterUpdateType;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.ApiNullOption
	var $tab_ApiNullOption = function() {
	};
	$tab_ApiNullOption.__typeName = 'tab.ApiNullOption';
	global.tab.ApiNullOption = $tab_ApiNullOption;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.ApiParameterAllowableValuesType
	var $tab_ApiParameterAllowableValuesType = function() {
	};
	$tab_ApiParameterAllowableValuesType.__typeName = 'tab.ApiParameterAllowableValuesType';
	global.tab.ApiParameterAllowableValuesType = $tab_ApiParameterAllowableValuesType;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.ApiParameterDataType
	var $tab_ApiParameterDataType = function() {
	};
	$tab_ApiParameterDataType.__typeName = 'tab.ApiParameterDataType';
	global.tab.ApiParameterDataType = $tab_ApiParameterDataType;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.ApiPeriodType
	var $tab_ApiPeriodType = function() {
	};
	$tab_ApiPeriodType.__typeName = 'tab.ApiPeriodType';
	global.tab.ApiPeriodType = $tab_ApiPeriodType;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.ApiSelectionUpdateType
	var $tab_ApiSelectionUpdateType = function() {
	};
	$tab_ApiSelectionUpdateType.__typeName = 'tab.ApiSelectionUpdateType';
	global.tab.ApiSelectionUpdateType = $tab_ApiSelectionUpdateType;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.ApiSheetSizeBehavior
	var $tab_ApiSheetSizeBehavior = function() {
	};
	$tab_ApiSheetSizeBehavior.__typeName = 'tab.ApiSheetSizeBehavior';
	global.tab.ApiSheetSizeBehavior = $tab_ApiSheetSizeBehavior;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.ApiSheetType
	var $tab_ApiSheetType = function() {
	};
	$tab_ApiSheetType.__typeName = 'tab.ApiSheetType';
	global.tab.ApiSheetType = $tab_ApiSheetType;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.ApiTableauEventName
	var $tab_ApiTableauEventName = function() {
	};
	$tab_ApiTableauEventName.__typeName = 'tab.ApiTableauEventName';
	global.tab.ApiTableauEventName = $tab_ApiTableauEventName;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.ApiToolbarPosition
	var $tab_ApiToolbarPosition = function() {
	};
	$tab_ApiToolbarPosition.__typeName = 'tab.ApiToolbarPosition';
	global.tab.ApiToolbarPosition = $tab_ApiToolbarPosition;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.CommandReturnHandler
	var $tab_CommandReturnHandler$1 = function(T) {
		var $type = function(commandName, successCallbackTiming, successCallback, errorCallback) {
			this.$commandName = null;
			this.$successCallbackTiming = 0;
			this.$successCallback = null;
			this.$errorCallback = null;
			this.$commandName = commandName;
			this.$successCallback = successCallback;
			this.$successCallbackTiming = successCallbackTiming;
			this.$errorCallback = errorCallback;
		};
		ss.registerGenericClassInstance($type, $tab_CommandReturnHandler$1, [T], {
			get_commandName: function CommandReturnHandler$get_CommandName() {
				return this.$commandName;
			},
			get_successCallback: function CommandReturnHandler$get_SuccessCallback() {
				return this.$successCallback;
			},
			get_successCallbackTiming: function CommandReturnHandler$get_SuccessCallbackTiming() {
				return this.$successCallbackTiming;
			},
			get_errorCallback: function CommandReturnHandler$get_ErrorCallback() {
				return this.$errorCallback;
			}
		}, function() {
			return null;
		}, function() {
			return [];
		});
		return $type;
	};
	$tab_CommandReturnHandler$1.__typeName = 'tab.CommandReturnHandler$1';
	ss.initGenericClass($tab_CommandReturnHandler$1, $asm, 1);
	global.tab.CommandReturnHandler$1 = $tab_CommandReturnHandler$1;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.CrossDomainMessagingOptions
	var $tab_CrossDomainMessagingOptions = function(router, handler) {
		this.$router = null;
		this.$handler = null;
		$tab__Param.verifyValue(router, 'router');
		$tab__Param.verifyValue(handler, 'handler');
		this.$router = router;
		this.$handler = handler;
	};
	$tab_CrossDomainMessagingOptions.__typeName = 'tab.CrossDomainMessagingOptions';
	global.tab.CrossDomainMessagingOptions = $tab_CrossDomainMessagingOptions;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.CustomViewEvent
	var $tab_CustomViewEvent = function(eventName, viz, customViewImpl) {
		this.$context = null;
		$tab_TableauEvent.call(this, eventName, viz);
		this.$context = new $tab_$CustomViewEventContext(viz._impl.get__workbookImpl(), customViewImpl);
	};
	$tab_CustomViewEvent.__typeName = 'tab.CustomViewEvent';
	global.tab.CustomViewEvent = $tab_CustomViewEvent;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.DataType
	var $tab_DataType = function() {
	};
	$tab_DataType.__typeName = 'tab.DataType';
	global.tab.DataType = $tab_DataType;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.DataValue
	var $tab_DataValue = function() {
	};
	$tab_DataValue.__typeName = 'tab.DataValue';
	$tab_DataValue.$ctor = function(value, formattedValue, aliasedValue) {
		var $this = new Object();
		$this.value = null;
		$this.formattedValue = null;
		$this.value = value;
		if ($tab__Utility.isNullOrEmpty(aliasedValue)) {
			$this.formattedValue = formattedValue;
		}
		else {
			$this.formattedValue = aliasedValue;
		}
		return $this;
	};
	global.tab.DataValue = $tab_DataValue;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.EventContext
	var $tab_EventContext = function(workbookImpl, worksheetImpl) {
		this.$workbookImpl = null;
		this.$worksheetImpl = null;
		this.$workbookImpl = workbookImpl;
		this.$worksheetImpl = worksheetImpl;
	};
	$tab_EventContext.__typeName = 'tab.EventContext';
	global.tab.EventContext = $tab_EventContext;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.FilterEvent
	var $tab_FilterEvent = function(eventName, viz, worksheetImpl, fieldName, filterCaption) {
		this.$filterCaption = null;
		this.$context = null;
		$tab_WorksheetEvent.call(this, eventName, viz, worksheetImpl);
		this.$filterCaption = filterCaption;
		this.$context = new $tab_$FilterEventContext(viz._impl.get__workbookImpl(), worksheetImpl, fieldName, filterCaption);
	};
	$tab_FilterEvent.__typeName = 'tab.FilterEvent';
	global.tab.FilterEvent = $tab_FilterEvent;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.FirstVizSizeKnownEvent
	var $tab_FirstVizSizeKnownEvent = function(eventName, viz, vizSize) {
		this.$vizSize = null;
		$tab_TableauEvent.call(this, eventName, viz);
		this.$vizSize = vizSize;
	};
	$tab_FirstVizSizeKnownEvent.__typeName = 'tab.FirstVizSizeKnownEvent';
	global.tab.FirstVizSizeKnownEvent = $tab_FirstVizSizeKnownEvent;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.ICrossDomainMessageHandler
	var $tab_ICrossDomainMessageHandler = function() {
	};
	$tab_ICrossDomainMessageHandler.__typeName = 'tab.ICrossDomainMessageHandler';
	global.tab.ICrossDomainMessageHandler = $tab_ICrossDomainMessageHandler;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.ICrossDomainMessageRouter
	var $tab_ICrossDomainMessageRouter = function() {
	};
	$tab_ICrossDomainMessageRouter.__typeName = 'tab.ICrossDomainMessageRouter';
	global.tab.ICrossDomainMessageRouter = $tab_ICrossDomainMessageRouter;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.MarksEvent
	var $tab_MarksEvent = function(eventName, viz, worksheetImpl) {
		this.$context = null;
		$tab_WorksheetEvent.call(this, eventName, viz, worksheetImpl);
		this.$context = new $tab_$MarksEventContext(viz._impl.get__workbookImpl(), worksheetImpl);
	};
	$tab_MarksEvent.__typeName = 'tab.MarksEvent';
	global.tab.MarksEvent = $tab_MarksEvent;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.ParameterEvent
	var $tab_ParameterEvent = function(eventName, viz, parameterName) {
		this.$context = null;
		$tab_TableauEvent.call(this, eventName, viz);
		this.$context = new $tab_$ParameterEventContext(viz._impl.get__workbookImpl(), parameterName);
	};
	$tab_ParameterEvent.__typeName = 'tab.ParameterEvent';
	global.tab.ParameterEvent = $tab_ParameterEvent;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.Point
	var $tab_Point = function() {
	};
	$tab_Point.__typeName = 'tab.Point';
	$tab_Point.$ctor = function(x, y) {
		var $this = new Object();
		$this.x = 0;
		$this.y = 0;
		$this.x = x;
		$this.y = y;
		return $this;
	};
	global.tab.Point = $tab_Point;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.SheetSize
	var $tab_SheetSize = function() {
	};
	$tab_SheetSize.__typeName = 'tab.SheetSize';
	$tab_SheetSize.$ctor = function(behavior, minSize, maxSize) {
		var $this = new Object();
		$this.behavior = null;
		$this.minSize = null;
		$this.maxSize = null;
		$this.behavior = ss.coalesce(behavior, 'automatic');
		if (ss.isValue(minSize)) {
			$this.minSize = minSize;
		}
		else {
			delete $this['minSize'];
		}
		if (ss.isValue(maxSize)) {
			$this.maxSize = maxSize;
		}
		else {
			delete $this['maxSize'];
		}
		return $this;
	};
	global.tab.SheetSize = $tab_SheetSize;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.SheetSizeFactory
	var $tab_SheetSizeFactory = function() {
	};
	$tab_SheetSizeFactory.__typeName = 'tab.SheetSizeFactory';
	$tab_SheetSizeFactory.createAutomatic = function SheetSizeFactory$CreateAutomatic() {
		var size = $tab_SheetSize.$ctor('automatic', null, null);
		return size;
	};
	$tab_SheetSizeFactory.fromSizeConstraints = function SheetSizeFactory$FromSizeConstraints(vizSizePresModel) {
		var minHeight = vizSizePresModel.minHeight;
		var minWidth = vizSizePresModel.minWidth;
		var maxHeight = vizSizePresModel.maxHeight;
		var maxWidth = vizSizePresModel.maxWidth;
		var behavior = 'automatic';
		var minSize = null;
		var maxSize = null;
		if (minHeight === 0 && minWidth === 0) {
			if (maxHeight === 0 && maxWidth === 0) {
			}
			else {
				behavior = 'atmost';
				maxSize = $tab_Size.$ctor(maxWidth, maxHeight);
			}
		}
		else if (maxHeight === 0 && maxWidth === 0) {
			behavior = 'atleast';
			minSize = $tab_Size.$ctor(minWidth, minHeight);
		}
		else if (maxHeight === minHeight && maxWidth === minWidth && minWidth > 0) {
			behavior = 'exactly';
			minSize = $tab_Size.$ctor(minWidth, minHeight);
			maxSize = $tab_Size.$ctor(minWidth, minHeight);
		}
		else {
			behavior = 'range';
			if (minWidth === 0 && maxWidth === 0) {
				maxWidth = 2147483647;
			}
			minSize = $tab_Size.$ctor(minWidth, minHeight);
			maxSize = $tab_Size.$ctor(maxWidth, maxHeight);
		}
		return $tab_SheetSize.$ctor(behavior, minSize, maxSize);
	};
	global.tab.SheetSizeFactory = $tab_SheetSizeFactory;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.Size
	var $tab_Size = function() {
	};
	$tab_Size.__typeName = 'tab.Size';
	$tab_Size.$ctor = function(width, height) {
		var $this = new Object();
		$this.width = 0;
		$this.height = 0;
		$this.width = width;
		$this.height = height;
		return $this;
	};
	global.tab.Size = $tab_Size;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.StoryPointInfoImplUtil
	var $tab_StoryPointInfoImplUtil = function() {
	};
	$tab_StoryPointInfoImplUtil.__typeName = 'tab.StoryPointInfoImplUtil';
	$tab_StoryPointInfoImplUtil.clone = function StoryPointInfoImplUtil$Clone(impl) {
		return $tab__StoryPointInfoImpl.$ctor(impl.caption, impl.index, impl.storyPointId, impl.isActive, impl.isUpdated, impl.parentStoryImpl);
	};
	global.tab.StoryPointInfoImplUtil = $tab_StoryPointInfoImplUtil;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.StoryPointSwitchEvent
	var $tab_StoryPointSwitchEvent = function(eventName, viz, oldStoryPointInfo, newStoryPoint) {
		this.$oldStoryPointInfo = null;
		this.$newStoryPoint = null;
		$tab_TableauEvent.call(this, eventName, viz);
		this.$oldStoryPointInfo = oldStoryPointInfo;
		this.$newStoryPoint = newStoryPoint;
	};
	$tab_StoryPointSwitchEvent.__typeName = 'tab.StoryPointSwitchEvent';
	global.tab.StoryPointSwitchEvent = $tab_StoryPointSwitchEvent;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.TableauEvent
	var $tab_TableauEvent = function(eventName, viz) {
		this.$viz = null;
		this.$eventName = null;
		this.$viz = viz;
		this.$eventName = eventName;
	};
	$tab_TableauEvent.__typeName = 'tab.TableauEvent';
	global.tab.TableauEvent = $tab_TableauEvent;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.TabSwitchEvent
	var $tab_TabSwitchEvent = function(eventName, viz, oldName, newName) {
		this.$oldName = null;
		this.$newName = null;
		$tab_TableauEvent.call(this, eventName, viz);
		this.$oldName = oldName;
		this.$newName = newName;
	};
	$tab_TabSwitchEvent.__typeName = 'tab.TabSwitchEvent';
	global.tab.TabSwitchEvent = $tab_TabSwitchEvent;
	////////////////////////////////////////////////////////////////////////////////
	// Tableau.JavaScript.Vql.Api.VizImpl
	var $tab_VizImpl = function(messageRouter, viz, parentElement, url, options) {
		this.$workbookTabSwitchHandler = null;
		this.$viz = null;
		this.$iframe = null;
		this.$staticImage = null;
		this.$parameters = null;
		this.$initialAvailableSize = null;
		this.$instanceId = null;
		this.$workbookImpl = null;
		this.$onFirstInteractiveCallback = null;
		this.$onFirstVizSizeKnownCallback = null;
		this.$onFirstInteractiveAlreadyCalled = false;
		this.$areTabsHidden = false;
		this.$isToolbarHidden = false;
		this.$areAutomaticUpdatesPaused = false;
		this.$messagingOptions = null;
		this.$vizSize = null;
		this.$windowResizeHandler = null;
		this.$initializingWorkbookImpl = false;
		this.$1$CustomViewsListLoadField = null;
		this.$1$StateReadyForQueryField = null;
		this.$1$MarksSelectionField = null;
		this.$1$FilterChangeField = null;
		this.$1$ParameterValueChangeField = null;
		this.$1$CustomViewLoadField = null;
		this.$1$CustomViewSaveField = null;
		this.$1$CustomViewRemoveField = null;
		this.$1$CustomViewSetDefaultField = null;
		this.$1$TabSwitchField = null;
		this.$1$StoryPointSwitchField = null;
		this.$1$VizResizeField = null;
		if (!$tab__Utility.hasWindowPostMessage() || !$tab__Utility.hasJsonParse()) {
			throw $tab__TableauException.createBrowserNotCapable();
		}
		this.$messagingOptions = new $tab_CrossDomainMessagingOptions(messageRouter, this);
		this.$viz = viz;
		if (ss.isNullOrUndefined(parentElement) || parentElement.nodeType !== 1) {
			parentElement = document.body;
		}
		this.$parameters = new $tab__VizParameters(parentElement, url, options);
		if (ss.isValue(options)) {
			this.$onFirstInteractiveCallback = options.onFirstInteractive;
			this.$onFirstVizSizeKnownCallback = options.onFirstVizSizeKnown;
		}
	};
	$tab_VizImpl.__typeName = 'tab.VizImpl';
	global.tab.VizImpl = $tab_VizImpl;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.VizResizeEvent
	var $tab_VizResizeEvent = function(eventName, viz, availableSize) {
		this.$availableSize = null;
		$tab_TableauEvent.call(this, eventName, viz);
		this.$availableSize = availableSize;
	};
	$tab_VizResizeEvent.__typeName = 'tab.VizResizeEvent';
	global.tab.VizResizeEvent = $tab_VizResizeEvent;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.VizSize
	var $tab_VizSize = function() {
	};
	$tab_VizSize.__typeName = 'tab.VizSize';
	$tab_VizSize.$ctor = function(sheetSize, chromeHeight) {
		var $this = new Object();
		$this.sheetSize = null;
		$this.chromeHeight = 0;
		$this.sheetSize = sheetSize;
		$this.chromeHeight = chromeHeight;
		return $this;
	};
	global.tab.VizSize = $tab_VizSize;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.WorksheetEvent
	var $tab_WorksheetEvent = function(eventName, viz, worksheetImpl) {
		this.$worksheetImpl = null;
		$tab_TableauEvent.call(this, eventName, viz);
		this.$worksheetImpl = worksheetImpl;
	};
	$tab_WorksheetEvent.__typeName = 'tab.WorksheetEvent';
	global.tab.WorksheetEvent = $tab_WorksheetEvent;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.CategoricalFilter
	var $tableauSoftware_CategoricalFilter = function(worksheetImpl, pm) {
		this.$isExclude = false;
		this.$appliedValues = null;
		$tableauSoftware_Filter.call(this, worksheetImpl, pm);
		this.$initializeFromJson$1(pm);
	};
	$tableauSoftware_CategoricalFilter.__typeName = 'tableauSoftware.CategoricalFilter';
	global.tableauSoftware.CategoricalFilter = $tableauSoftware_CategoricalFilter;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.Column
	var $tableauSoftware_Column = function(impl) {
		this.$impl = null;
		this.$impl = impl;
	};
	$tableauSoftware_Column.__typeName = 'tableauSoftware.Column';
	global.tableauSoftware.Column = $tableauSoftware_Column;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.CustomView
	var $tableauSoftware_CustomView = function(customViewImpl) {
		this._impl = null;
		this._impl = customViewImpl;
	};
	$tableauSoftware_CustomView.__typeName = 'tableauSoftware.CustomView';
	global.tableauSoftware.CustomView = $tableauSoftware_CustomView;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.Dashboard
	var $tableauSoftware_Dashboard = function(dashboardImpl) {
		this._impl = null;
		$tableauSoftware_Sheet.call(this, dashboardImpl);
	};
	$tableauSoftware_Dashboard.__typeName = 'tableauSoftware.Dashboard';
	global.tableauSoftware.Dashboard = $tableauSoftware_Dashboard;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.DashboardObject
	var $tableauSoftware_DashboardObject = function(frameInfo, dashboard, worksheet) {
		this.$zoneInfo = null;
		this.$dashboard = null;
		this.$worksheet = null;
		if (frameInfo.objectType === 'worksheet' && ss.isNullOrUndefined(worksheet)) {
			throw $tab__TableauException.createInternalError('worksheet parameter is required for WORKSHEET objects');
		}
		else if (frameInfo.objectType !== 'worksheet' && ss.isValue(worksheet)) {
			throw $tab__TableauException.createInternalError('worksheet parameter should be undefined for non-WORKSHEET objects');
		}
		this.$zoneInfo = frameInfo;
		this.$dashboard = dashboard;
		this.$worksheet = worksheet;
	};
	$tableauSoftware_DashboardObject.__typeName = 'tableauSoftware.DashboardObject';
	global.tableauSoftware.DashboardObject = $tableauSoftware_DashboardObject;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.DataSource
	var $tableauSoftware_DataSource = function(impl) {
		this.$impl = null;
		this.$impl = impl;
	};
	$tableauSoftware_DataSource.__typeName = 'tableauSoftware.DataSource';
	global.tableauSoftware.DataSource = $tableauSoftware_DataSource;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.DataTable
	var $tableauSoftware_DataTable = function(impl) {
		this.$impl = null;
		this.$impl = impl;
	};
	$tableauSoftware_DataTable.__typeName = 'tableauSoftware.DataTable';
	global.tableauSoftware.DataTable = $tableauSoftware_DataTable;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.Field
	var $tableauSoftware_Field = function(dataSource, name, fieldRoleType, fieldAggrType) {
		this.$dataSource = null;
		this.$name = null;
		this.$fieldRoleType = null;
		this.$fieldAggrType = null;
		this.$dataSource = dataSource;
		this.$name = name;
		this.$fieldRoleType = fieldRoleType;
		this.$fieldAggrType = fieldAggrType;
	};
	$tableauSoftware_Field.__typeName = 'tableauSoftware.Field';
	global.tableauSoftware.Field = $tableauSoftware_Field;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.Filter
	var $tableauSoftware_Filter = function(worksheetImpl, pm) {
		this.$worksheetImpl = null;
		this.$type = null;
		this.$caption = null;
		this.$field = null;
		this.$dataSourceName = null;
		this.$fieldRole = null;
		this.$fieldAggregation = null;
		this.$worksheetImpl = worksheetImpl;
		this.$initializeFromJson(pm);
	};
	$tableauSoftware_Filter.__typeName = 'tableauSoftware.Filter';
	$tableauSoftware_Filter.$createFilter = function Filter$CreateFilter(worksheetImpl, pm) {
		switch (pm.filterType) {
			case 'categorical': {
				return new $tableauSoftware_CategoricalFilter(worksheetImpl, pm);
			}
			case 'relativedate': {
				return new $tableauSoftware_RelativeDateFilter(worksheetImpl, pm);
			}
			case 'hierarchical': {
				return new $tableauSoftware_HierarchicalFilter(worksheetImpl, pm);
			}
			case 'quantitative': {
				return new $tableauSoftware_QuantitativeFilter(worksheetImpl, pm);
			}
		}
		return null;
	};
	$tableauSoftware_Filter.$processFiltersList = function Filter$ProcessFiltersList(worksheetImpl, filtersListDict) {
		var filters = new tab._Collection();
		for (var $t1 = 0; $t1 < filtersListDict.filters.length; $t1++) {
			var filterPm = filtersListDict.filters[$t1];
			var filter = $tableauSoftware_Filter.$createFilter(worksheetImpl, filterPm);
			filters._add(filterPm.caption, filter);
		}
		return filters;
	};
	global.tableauSoftware.Filter = $tableauSoftware_Filter;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.HierarchicalFilter
	var $tableauSoftware_HierarchicalFilter = function(worksheetImpl, pm) {
		this.$levels = 0;
		$tableauSoftware_Filter.call(this, worksheetImpl, pm);
		this.$initializeFromJson$1(pm);
	};
	$tableauSoftware_HierarchicalFilter.__typeName = 'tableauSoftware.HierarchicalFilter';
	global.tableauSoftware.HierarchicalFilter = $tableauSoftware_HierarchicalFilter;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.Mark
	var $tableauSoftware_Mark = function(tupleId) {
		this.$impl = null;
		this.$impl = new $tab_$MarkImpl(tupleId);
	};
	$tableauSoftware_Mark.__typeName = 'tableauSoftware.Mark';
	global.tableauSoftware.Mark = $tableauSoftware_Mark;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.Pair
	var $tableauSoftware_Pair = function(fieldName, value) {
		this.fieldName = null;
		this.value = null;
		this.formattedValue = null;
		this.fieldName = fieldName;
		this.value = value;
		this.formattedValue = (ss.isValue(value) ? value.toString() : '');
	};
	$tableauSoftware_Pair.__typeName = 'tableauSoftware.Pair';
	global.tableauSoftware.Pair = $tableauSoftware_Pair;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.Parameter
	var $tableauSoftware_Parameter = function(impl) {
		this._impl = null;
		this._impl = impl;
	};
	$tableauSoftware_Parameter.__typeName = 'tableauSoftware.Parameter';
	global.tableauSoftware.Parameter = $tableauSoftware_Parameter;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.QuantitativeFilter
	var $tableauSoftware_QuantitativeFilter = function(worksheetImpl, pm) {
		this.$domainMin = null;
		this.$domainMax = null;
		this.$min = null;
		this.$max = null;
		this.$includeNullValues = false;
		$tableauSoftware_Filter.call(this, worksheetImpl, pm);
		this.$initializeFromJson$1(pm);
	};
	$tableauSoftware_QuantitativeFilter.__typeName = 'tableauSoftware.QuantitativeFilter';
	global.tableauSoftware.QuantitativeFilter = $tableauSoftware_QuantitativeFilter;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.RelativeDateFilter
	var $tableauSoftware_RelativeDateFilter = function(worksheetImpl, pm) {
		this.$periodType = null;
		this.$rangeType = null;
		this.$rangeN = 0;
		$tableauSoftware_Filter.call(this, worksheetImpl, pm);
		this.$initializeFromJson$1(pm);
	};
	$tableauSoftware_RelativeDateFilter.__typeName = 'tableauSoftware.RelativeDateFilter';
	global.tableauSoftware.RelativeDateFilter = $tableauSoftware_RelativeDateFilter;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.Sheet
	var $tableauSoftware_Sheet = function(sheetImpl) {
		this._impl = null;
		$tab__Param.verifyValue(sheetImpl, 'sheetImpl');
		this._impl = sheetImpl;
	};
	$tableauSoftware_Sheet.__typeName = 'tableauSoftware.Sheet';
	global.tableauSoftware.Sheet = $tableauSoftware_Sheet;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.ApiSheetInfo
	var $tableauSoftware_SheetInfo = function(impl) {
		this.$impl = null;
		this.$impl = impl;
	};
	$tableauSoftware_SheetInfo.__typeName = 'tableauSoftware.SheetInfo';
	global.tableauSoftware.SheetInfo = $tableauSoftware_SheetInfo;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.Story
	var $tableauSoftware_Story = function(storyImpl) {
		this._impl = null;
		$tableauSoftware_Sheet.call(this, storyImpl);
	};
	$tableauSoftware_Story.__typeName = 'tableauSoftware.Story';
	global.tableauSoftware.Story = $tableauSoftware_Story;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.StoryPoint
	var $tableauSoftware_StoryPoint = function(impl) {
		this.$impl = null;
		this.$impl = impl;
	};
	$tableauSoftware_StoryPoint.__typeName = 'tableauSoftware.StoryPoint';
	global.tableauSoftware.StoryPoint = $tableauSoftware_StoryPoint;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.StoryPointInfo
	var $tableauSoftware_StoryPointInfo = function(impl) {
		this._impl = null;
		this._impl = impl;
	};
	$tableauSoftware_StoryPointInfo.__typeName = 'tableauSoftware.StoryPointInfo';
	global.tableauSoftware.StoryPointInfo = $tableauSoftware_StoryPointInfo;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.Version
	var $tableauSoftware_Version = function(major, minor, patch, metadata) {
		this.$major = 0;
		this.$minor = 0;
		this.$patch = 0;
		this.$metadata = null;
		this.$major = major;
		this.$minor = minor;
		this.$patch = patch;
		this.$metadata = ss.coalesce(metadata, null);
	};
	$tableauSoftware_Version.__typeName = 'tableauSoftware.Version';
	$tableauSoftware_Version.getCurrent = function Version$GetCurrent() {
		return $tableauSoftware_Version.$currentVersion;
	};
	global.tableauSoftware.Version = $tableauSoftware_Version;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.Viz
	var $tableauSoftware_Viz = function(parentElement, url, options) {
		this._impl = null;
		var messageRouter = $tab__ApiObjectRegistry.getCrossDomainMessageRouter();
		this._impl = new $tab_VizImpl(messageRouter, this, parentElement, url, options);
		this._impl.$create();
	};
	$tableauSoftware_Viz.__typeName = 'tableauSoftware.Viz';
	$tableauSoftware_Viz.getLastRequestMessage = function Viz$GetLastRequestMessage() {
		return $tab__ApiCommand.lastRequestMessage;
	};
	$tableauSoftware_Viz.getLastResponseMessage = function Viz$GetLastResponseMessage() {
		return $tab__ApiCommand.lastResponseMessage;
	};
	$tableauSoftware_Viz.getLastClientInfoResponseMessage = function Viz$GetLastClientInfoResponseMessage() {
		return $tab__ApiCommand.lastClientInfoResponseMessage;
	};
	global.tableauSoftware.Viz = $tableauSoftware_Viz;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.VizManager
	var $tableauSoftware_VizManager = function() {
	};
	$tableauSoftware_VizManager.__typeName = 'tableauSoftware.VizManager';
	$tableauSoftware_VizManager.getVizs = function VizManager$GetVizs() {
		return $tab__VizManagerImpl.get_$clonedVizs();
	};
	global.tableauSoftware.VizManager = $tableauSoftware_VizManager;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.Workbook
	var $tableauSoftware_Workbook = function(workbookImpl) {
		this.$workbookImpl = null;
		this.$workbookImpl = workbookImpl;
	};
	$tableauSoftware_Workbook.__typeName = 'tableauSoftware.Workbook';
	global.tableauSoftware.Workbook = $tableauSoftware_Workbook;
	////////////////////////////////////////////////////////////////////////////////
	// tableauSoftware.Worksheet
	var $tableauSoftware_Worksheet = function(impl) {
		this._impl = null;
		$tableauSoftware_Sheet.call(this, impl);
	};
	$tableauSoftware_Worksheet.__typeName = 'tableauSoftware.Worksheet';
	global.tableauSoftware.Worksheet = $tableauSoftware_Worksheet;
	ss.initInterface($tab_ICrossDomainMessageRouter, $asm, { registerHandler: null, unregisterHandler: null, sendCommand: null });
	ss.initClass($tab_$CrossDomainMessageRouter, $asm, {
		registerHandler: function CrossDomainMessageRouter$RegisterHandler(handler) {
			var uniqueId = 'handler' + this.$nextHandlerId;
			if (ss.isValue(handler.get_handlerId()) || ss.isValue(this.$handlers[handler.get_handlerId()])) {
				throw $tab__TableauException.createInternalError("Handler '" + handler.get_handlerId() + "' is already registered.");
			}
			this.$nextHandlerId++;
			handler.set_handlerId(uniqueId);
			this.$handlers[uniqueId] = handler;
			handler.add_customViewsListLoad(ss.mkdel(this, this.$handleCustomViewsListLoad));
			handler.add_stateReadyForQuery(ss.mkdel(this, this.$handleStateReadyForQuery));
		},
		unregisterHandler: function CrossDomainMessageRouter$UnregisterHandler(handler) {
			if (ss.isValue(handler.get_handlerId()) || ss.isValue(this.$handlers[handler.get_handlerId()])) {
				delete this.$handlers[handler.get_handlerId()];
				handler.remove_customViewsListLoad(ss.mkdel(this, this.$handleCustomViewsListLoad));
				handler.remove_stateReadyForQuery(ss.mkdel(this, this.$handleStateReadyForQuery));
			}
		},
		sendCommand: function(T) {
			return function CrossDomainMessageRouter$SendCommand(source, commandParameters, returnHandler) {
				var iframe = source.get_iframe();
				var handlerId = source.get_handlerId();
				if (!$tab__Utility.hasWindowPostMessage() || ss.isNullOrUndefined(iframe) || ss.isNullOrUndefined(iframe.contentWindow)) {
					return;
				}
				var commandId = $tab__ApiCommand.generateNextCommandId();
				var callbackMap = this.$commandCallbacks[handlerId];
				if (ss.isNullOrUndefined(callbackMap)) {
					callbackMap = {};
					this.$commandCallbacks[handlerId] = callbackMap;
				}
				callbackMap[commandId] = returnHandler;
				var commandName = returnHandler.get_commandName();
				if (commandName === 'api.ShowCustomViewCommand') {
					var customViewCallbacks = this.$customViewLoadCallbacks[handlerId];
					if (ss.isNullOrUndefined(customViewCallbacks)) {
						customViewCallbacks = [];
						this.$customViewLoadCallbacks[handlerId] = customViewCallbacks;
					}
					customViewCallbacks.push(returnHandler);
				}
				var serializedParams = null;
				if (ss.isValue(commandParameters)) {
					serializedParams = JSON.stringify(commandParameters);
				}
				var command = new $tab__ApiCommand(commandName, commandId, handlerId, serializedParams);
				var message = command.serialize();
				if ($tab__Utility.isPostMessageSynchronous()) {
					window.setTimeout(function() {
						iframe.contentWindow.postMessage(message, '*');
					}, 0);
				}
				else {
					iframe.contentWindow.postMessage(message, '*');
				}
			};
		},
		$handleCustomViewsListLoad: function CrossDomainMessageRouter$HandleCustomViewsListLoad(source) {
			var handlerId = source.get_handlerId();
			var customViewCallbacks = this.$customViewLoadCallbacks[handlerId];
			if (ss.isNullOrUndefined(customViewCallbacks)) {
				return;
			}
			for (var $t1 = 0; $t1 < customViewCallbacks.length; $t1++) {
				var returnHandler = customViewCallbacks[$t1];
				if (!ss.staticEquals(returnHandler.get_successCallback(), null)) {
					returnHandler.get_successCallback()(null);
				}
			}
			delete this.$customViewLoadCallbacks[handlerId];
		},
		$handleStateReadyForQuery: function CrossDomainMessageRouter$HandleStateReadyForQuery(source) {
			var queue = this.$commandReturnAfterStateReadyQueues[source.get_handlerId()];
			if ($tab__Utility.isNullOrEmpty(queue)) {
				return;
			}
			while (queue.length > 0) {
				var successCallback = queue.pop();
				if (ss.isValue(successCallback)) {
					successCallback();
				}
			}
		},
		$handleCrossDomainMessage: function CrossDomainMessageRouter$HandleCrossDomainMessage(e) {
			var messageEvent = ss.cast(e, MessageEvent);
			if (ss.isNullOrUndefined(messageEvent.data)) {
				return;
			}
			var command = $tab__ApiCommand.parse(messageEvent.data.toString());
			var rawName = command.get_rawName();
			var handlerId = command.get_handlerId();
			var handler = this.$handlers[handlerId];
			if (ss.isNullOrUndefined(handler) || !ss.referenceEquals(handler.get_handlerId(), command.get_handlerId())) {
				handler = new $tab_$DoNothingCrossDomainHandler();
			}
			if (command.get_isApiCommandName()) {
				if (ss.referenceEquals(command.get_commandId(), $tab__ApiCommand.crossDomainEventNotificationId)) {
					handler.handleEventNotification(command.get_name(), command.get_parameters());
					if (command.get_name() === 'api.FirstVizSizeKnownEvent') {
						messageEvent.source.postMessage('tableau.bootstrap', '*');
					}
				}
				else {
					this.$handleCrossDomainResponse(command);
				}
			}
			else {
				this.$handleLegacyNotifications(rawName, handler);
			}
		},
		$handleCrossDomainResponse: function CrossDomainMessageRouter$HandleCrossDomainResponse(command) {
			var commandCallbackMap = this.$commandCallbacks[command.get_handlerId()];
			var returnHandler = (ss.isValue(commandCallbackMap) ? commandCallbackMap[command.get_commandId()] : null);
			if (ss.isNullOrUndefined(returnHandler)) {
				return;
			}
			delete commandCallbackMap[command.get_commandId()];
			if (command.get_name() !== returnHandler.get_commandName()) {
				return;
			}
			var crossDomainResult = new $tab__ApiServerResultParser(command.get_parameters());
			var commandResult = crossDomainResult.get_data();
			if (crossDomainResult.get_result() === 'api.success') {
				switch (returnHandler.get_successCallbackTiming()) {
					case 0: {
						if (ss.isValue(returnHandler.get_successCallback())) {
							returnHandler.get_successCallback()(commandResult);
						}
						break;
					}
					case 1: {
						var postponedCallback = function() {
							if (ss.isValue(returnHandler.get_successCallback())) {
								returnHandler.get_successCallback()(commandResult);
							}
						};
						var queue = this.$commandReturnAfterStateReadyQueues[command.get_handlerId()];
						if (ss.isNullOrUndefined(queue)) {
							queue = [];
							this.$commandReturnAfterStateReadyQueues[command.get_handlerId()] = queue;
						}
						queue.push(postponedCallback);
						break;
					}
					default: {
						throw $tab__TableauException.createInternalError('Unknown timing value: ' + returnHandler.get_successCallbackTiming());
					}
				}
			}
			else if (ss.isValue(returnHandler.get_errorCallback())) {
				var remoteError = crossDomainResult.get_result() === 'api.remotefailed';
				var errorMessage = (ss.isValue(commandResult) ? commandResult.toString() : '');
				returnHandler.get_errorCallback()(remoteError, errorMessage);
			}
		},
		$handleLegacyNotifications: function CrossDomainMessageRouter$HandleLegacyNotifications(messageName, handler) {
			if (messageName === 'layoutInfoReq') {
				$tab__VizManagerImpl.$sendVisibleRects();
			}
			else if (messageName === 'tableau.completed' || messageName === 'completed') {
				handler.handleVizLoad();
			}
			else if (messageName === 'tableau.listening') {
				handler.handleVizListening();
			}
		}
	}, null, [$tab_ICrossDomainMessageRouter]);
	ss.initClass($tab_EventContext, $asm, {
		get__workbookImpl: function EventContext$get_WorkbookImpl() {
			return this.$workbookImpl;
		},
		get__worksheetImpl: function EventContext$get_WorksheetImpl() {
			return this.$worksheetImpl;
		}
	});
	ss.initClass($tab_$CustomViewEventContext, $asm, {
		get__customViewImpl: function CustomViewEventContext$get_CustomViewImpl() {
			return this.$customViewImpl;
		}
	}, $tab_EventContext);
	ss.initClass($tab_$DashboardZoneInfo, $asm, {});
	ss.initClass($tab_$DeferredUtil, $asm, {});
	ss.initInterface($tab_ICrossDomainMessageHandler, $asm, { add_customViewsListLoad: null, remove_customViewsListLoad: null, add_stateReadyForQuery: null, remove_stateReadyForQuery: null, get_iframe: null, get_handlerId: null, set_handlerId: null, handleVizLoad: null, handleVizListening: null, handleEventNotification: null });
	ss.initClass($tab_$DoNothingCrossDomainHandler, $asm, {
		add_customViewsListLoad: function DoNothingCrossDomainHandler$add_CustomViewsListLoad(value) {
			this.$1$CustomViewsListLoadField = ss.delegateCombine(this.$1$CustomViewsListLoadField, value);
		},
		remove_customViewsListLoad: function DoNothingCrossDomainHandler$remove_CustomViewsListLoad(value) {
			this.$1$CustomViewsListLoadField = ss.delegateRemove(this.$1$CustomViewsListLoadField, value);
		},
		add_stateReadyForQuery: function DoNothingCrossDomainHandler$add_StateReadyForQuery(value) {
			this.$1$StateReadyForQueryField = ss.delegateCombine(this.$1$StateReadyForQueryField, value);
		},
		remove_stateReadyForQuery: function DoNothingCrossDomainHandler$remove_StateReadyForQuery(value) {
			this.$1$StateReadyForQueryField = ss.delegateRemove(this.$1$StateReadyForQueryField, value);
		},
		get_iframe: function DoNothingCrossDomainHandler$get_Iframe() {
			return null;
		},
		get_handlerId: function DoNothingCrossDomainHandler$get_HandlerId() {
			return this.$handlerId;
		},
		set_handlerId: function DoNothingCrossDomainHandler$set_HandlerId(value) {
			this.$handlerId = value;
		},
		get_$serverRoot: function DoNothingCrossDomainHandler$get_ServerRoot() {
			return '*';
		},
		handleVizLoad: function DoNothingCrossDomainHandler$HandleVizLoad() {
		},
		handleVizListening: function DoNothingCrossDomainHandler$HandleVizListening() {
		},
		handleEventNotification: function DoNothingCrossDomainHandler$HandleEventNotification(eventName, parameters) {
		},
		$silenceTheCompilerWarning: function DoNothingCrossDomainHandler$SilenceTheCompilerWarning() {
			this.$1$CustomViewsListLoadField(null);
			this.$1$StateReadyForQueryField(null);
		}
	}, null, [$tab_ICrossDomainMessageHandler]);
	ss.initClass($tab_$FilterEventContext, $asm, {
		get__filterFieldName: function FilterEventContext$get_FilterFieldName() {
			return this.$fieldFieldName;
		},
		get_$filterCaption: function FilterEventContext$get_FilterCaption() {
			return this.$filterCaption;
		}
	}, $tab_EventContext);
	ss.initClass($tab_$MarkImpl, $asm, {
		get_$pairs: function MarkImpl$get_Pairs() {
			return this.$collection;
		},
		get_$tupleId: function MarkImpl$get_TupleId() {
			return this.$tupleId;
		},
		get_$clonedPairs: function MarkImpl$get_ClonedPairs() {
			if (ss.isNullOrUndefined(this.$clonedPairs)) {
				this.$clonedPairs = this.$collection._toApiCollection();
			}
			return this.$clonedPairs;
		},
		$addPair: function MarkImpl$AddPair(pair) {
			this.$collection._add(pair.fieldName, pair);
		}
	});
	ss.initClass($tab_$MarksEventContext, $asm, {}, $tab_EventContext);
	ss.initClass($tab_$ParameterEventContext, $asm, {
		get__parameterName: function ParameterEventContext$get_ParameterName() {
			return this.$parameterName;
		}
	}, $tab_EventContext);
	ss.initClass($tab_$ParameterImpl, $asm, {
		get_$parameter: function ParameterImpl$get_Parameter() {
			if (ss.isNullOrUndefined(this.$parameter)) {
				this.$parameter = new $tableauSoftware_Parameter(this);
			}
			return this.$parameter;
		},
		get_$name: function ParameterImpl$get_Name() {
			return this.$name;
		},
		get_$currentValue: function ParameterImpl$get_CurrentValue() {
			return this.$currentValue;
		},
		get_$dataType: function ParameterImpl$get_DataType() {
			return this.$dataType;
		},
		get_$allowableValuesType: function ParameterImpl$get_AllowableValuesType() {
			return this.$allowableValuesType;
		},
		get_$allowableValues: function ParameterImpl$get_AllowableValues() {
			return this.$allowableValues;
		},
		get_$minValue: function ParameterImpl$get_MinValue() {
			return this.$minValue;
		},
		get_$maxValue: function ParameterImpl$get_MaxValue() {
			return this.$maxValue;
		},
		get_$stepSize: function ParameterImpl$get_StepSize() {
			return this.$stepSize;
		},
		get_$dateStepPeriod: function ParameterImpl$get_DateStepPeriod() {
			return this.$dateStepPeriod;
		}
	});
	ss.initClass($tab_$PublicEnums, $asm, {});
	ss.initClass($tab__ApiBootstrap, $asm, {});
	ss.initClass($tab__ApiCommand, $asm, {
		get_name: function ApiCommand$get_Name() {
			return this.$name;
		},
		get_handlerId: function ApiCommand$get_HandlerId() {
			return this.$handlerId;
		},
		get_commandId: function ApiCommand$get_CommandId() {
			return this.$commandId;
		},
		get_parameters: function ApiCommand$get_Parameters() {
			return this.$parameters;
		},
		get_isApiCommandName: function ApiCommand$get_IsApiCommandName() {
			return this.get_rawName().indexOf('api.', 0) === 0;
		},
		get_rawName: function ApiCommand$get_RawName() {
			return this.$name.toString();
		},
		serialize: function ApiCommand$Serialize() {
			var message = [];
			message.push(this.$name);
			message.push(this.$commandId);
			message.push(this.$handlerId);
			if (ss.isValue(this.$parameters)) {
				message.push(this.$parameters);
			}
			var serializedMessage = message.join(',');
			$tab__ApiCommand.lastRequestMessage = serializedMessage;
			return serializedMessage;
		}
	});
	ss.initClass($tab__ApiObjectRegistry, $asm, {});
	ss.initClass($tab__ApiServerNotification, $asm, {
		get_workbookName: function ApiServerNotification$get_WorkbookName() {
			return this.$workbookName;
		},
		get_worksheetName: function ApiServerNotification$get_WorksheetName() {
			return this.$worksheetName;
		},
		get_data: function ApiServerNotification$get_Data() {
			return this.$data;
		},
		serialize: function ApiServerNotification$Serialize() {
			var serialized = {};
			serialized['api.workbookName'] = this.$workbookName;
			serialized['api.worksheetName'] = this.$worksheetName;
			serialized['api.commandData'] = this.$data;
			return JSON.stringify(serialized);
		}
	});
	ss.initClass($tab__ApiServerResultParser, $asm, {
		get_result: function ApiServerResultParser$get_Result() {
			return this.$commandResult;
		},
		get_data: function ApiServerResultParser$get_Data() {
			return this.$commandData;
		}
	});
	ss.initClass($tab__CollectionImpl, $asm, {
		get__length: function DoNotUseCollection$get_Length() {
			return this.$items.length;
		},
		get__rawArray: function DoNotUseCollection$get_RawArray() {
			return this.$items;
		},
		get_item: function DoNotUseCollection$get_Item(index) {
			return this.$items[index];
		},
		_get: function DoNotUseCollection$Get(key) {
			var validKey = this.$ensureValidKey(key);
			if (ss.isValue(this.$itemMap[validKey])) {
				return this.$itemMap[validKey];
			}
			return undefined;
		},
		_has: function DoNotUseCollection$Has(key) {
			return ss.isValue(this._get(key));
		},
		_add: function DoNotUseCollection$Add(key, item) {
			this.$verifyKeyAndItemParameters(key, item);
			var validKey = this.$ensureValidKey(key);
			this.$items.push(item);
			this.$itemMap[validKey] = item;
		},
		_addToFirst: function DoNotUseCollection$AddToFirst(key, item) {
			this.$verifyKeyAndItemParameters(key, item);
			var validKey = this.$ensureValidKey(key);
			this.$items.unshift(item);
			this.$itemMap[validKey] = item;
		},
		_remove: function DoNotUseCollection$Remove(key) {
			var validKey = this.$ensureValidKey(key);
			if (ss.isValue(this.$itemMap[validKey])) {
				var item = this.$itemMap[validKey];
				delete this.$itemMap[validKey];
				for (var index = 0; index < this.$items.length; index++) {
					if (ss.referenceEquals(this.$items[index], item)) {
						this.$items.splice(index, 1);
						break;
					}
				}
			}
		},
		_toApiCollection: function DoNotUseCollection$ToApiCollection() {
			var clone = this.$items.concat();
			clone.get = ss.mkdel(this, function(key) {
				return this._get(key);
			});
			clone.has = ss.mkdel(this, function(key1) {
				return this._has(key1);
			});
			return clone;
		},
		$verifyUniqueKeyParameter: function DoNotUseCollection$VerifyUniqueKeyParameter(key) {
			if ($tab__Utility.isNullOrEmpty(key)) {
				throw new ss.Exception('Null key');
			}
			if (this._has(key)) {
				throw new ss.Exception("Duplicate key '" + key + "'");
			}
		},
		$verifyKeyAndItemParameters: function DoNotUseCollection$VerifyKeyAndItemParameters(key, item) {
			this.$verifyUniqueKeyParameter(key);
			if (ss.isNullOrUndefined(item)) {
				throw new ss.Exception('Null item');
			}
		},
		$ensureValidKey: function DoNotUseCollection$EnsureValidKey(key) {
			return '_' + key;
		}
	});
	ss.initClass($tab__ColumnImpl, $asm, {
		get_fieldName: function ColumnImpl$get_FieldName() {
			return this.$fieldName;
		},
		get_dataType: function ColumnImpl$get_DataType() {
			return this.$dataType;
		},
		get_isReferenced: function ColumnImpl$get_IsReferenced() {
			return this.$isReferenced;
		},
		get_index: function ColumnImpl$get_Index() {
			return this.$index;
		}
	});
	ss.initClass($tab__CustomViewImpl, $asm, {
		get_$customView: function CustomViewImpl$get_CustomView() {
			if (ss.isNullOrUndefined(this.$customView)) {
				this.$customView = new $tableauSoftware_CustomView(this);
			}
			return this.$customView;
		},
		get_$workbook: function CustomViewImpl$get_Workbook() {
			return this.$workbookImpl.get_workbook();
		},
		get_$url: function CustomViewImpl$get_Url() {
			return this.$url;
		},
		get_$name: function CustomViewImpl$get_Name() {
			return this.$name;
		},
		set_$name: function CustomViewImpl$set_Name(value) {
			if (this.$isStale) {
				throw $tab__TableauException.create('staleDataReference', 'Stale data');
			}
			this.$name = value;
		},
		get_$ownerName: function CustomViewImpl$get_OwnerName() {
			return this.$ownerName;
		},
		get_$advertised: function CustomViewImpl$get_Advertised() {
			return this.$isPublic;
		},
		set_$advertised: function CustomViewImpl$set_Advertised(value) {
			if (this.$isStale) {
				throw $tab__TableauException.create('staleDataReference', 'Stale data');
			}
			this.$isPublic = value;
		},
		get_$isDefault: function CustomViewImpl$get_IsDefault() {
			return this.$isDefault;
		},
		$saveAsync: function CustomViewImpl$SaveAsync() {
			if (this.$isStale || ss.isNullOrUndefined(this.$presModel)) {
				throw $tab__TableauException.create('staleDataReference', 'Stale data');
			}
			this.$presModel.isPublic = this.$isPublic;
			this.$presModel.name = this.$name;
			var deferred = new tab._Deferred();
			var param = {};
			param['api.customViewParam'] = this.$presModel;
			var returnHandler = $tab__CustomViewImpl.$createCustomViewCommandReturnHandler('api.UpdateCustomViewCommand', deferred, ss.mkdel(this, function(result) {
				$tab__CustomViewImpl._processCustomViewUpdate(this.$workbookImpl, this.$messagingOptions, result, true);
				deferred.resolve(this.get_$customView());
			}));
			this.$messagingOptions.sendCommand(Object).call(this.$messagingOptions, param, returnHandler);
			return deferred.get_promise();
		},
		$removeAsync: function CustomViewImpl$RemoveAsync() {
			var deferred = new tab._Deferred();
			var param = {};
			param['api.customViewParam'] = this.$presModel;
			var returnHandler = $tab__CustomViewImpl.$createCustomViewCommandReturnHandler('api.RemoveCustomViewCommand', deferred, ss.mkdel(this, function(result) {
				this.$isStale = true;
				$tab__CustomViewImpl._processCustomViews(this.$workbookImpl, this.$messagingOptions, result);
				deferred.resolve(this.get_$customView());
			}));
			this.$messagingOptions.sendCommand(Object).call(this.$messagingOptions, param, returnHandler);
			return deferred.get_promise();
		},
		_showAsync: function CustomViewImpl$ShowAsync() {
			if (this.$isStale || ss.isNullOrUndefined(this.$presModel)) {
				throw $tab__TableauException.create('staleDataReference', 'Stale data');
			}
			return $tab__CustomViewImpl._showCustomViewAsync(this.$workbookImpl, this.$messagingOptions, this.$presModel);
		},
		$isDifferent: function CustomViewImpl$IsDifferent(other) {
			return !ss.referenceEquals(this.$ownerName, other.$ownerName) || !ss.referenceEquals(this.$url, other.$url) || this.$isPublic !== other.$isPublic || this.$isDefault !== other.$isDefault;
		}
	});
	ss.initClass($tab__SheetImpl, $asm, {
		get_sheet: null,
		get_name: function SheetImpl$get_Name() {
			return this.$name;
		},
		get_index: function SheetImpl$get_Index() {
			return this.$index;
		},
		get_workbookImpl: function SheetImpl$get_WorkbookImpl() {
			return this.$workbookImpl;
		},
		get_workbook: function SheetImpl$get_Workbook() {
			return this.$workbookImpl.get_workbook();
		},
		get_url: function SheetImpl$get_Url() {
			if (this.$isHidden) {
				throw $tab__TableauException.createNoUrlForHiddenWorksheet();
			}
			return this.$url;
		},
		get_size: function SheetImpl$get_Size() {
			return this.$size;
		},
		get_isHidden: function SheetImpl$get_IsHidden() {
			return this.$isHidden;
		},
		get_isActive: function SheetImpl$get_IsActive() {
			return this.$isActive;
		},
		set_isActive: function SheetImpl$set_IsActive(value) {
			this.$isActive = value;
		},
		get_isDashboard: function SheetImpl$get_IsDashboard() {
			return this.$sheetType === 'dashboard';
		},
		get_isStory: function SheetImpl$get_IsStory() {
			return this.$sheetType === 'story';
		},
		get_sheetType: function SheetImpl$get_SheetType() {
			return this.$sheetType;
		},
		get_parentStoryPoint: function SheetImpl$get_ParentStoryPoint() {
			if (ss.isValue(this.$parentStoryPointImpl)) {
				return this.$parentStoryPointImpl.get_storyPoint();
			}
			return null;
		},
		get_parentStoryPointImpl: function SheetImpl$get_ParentStoryPointImpl() {
			return this.$parentStoryPointImpl;
		},
		set_parentStoryPointImpl: function SheetImpl$set_ParentStoryPointImpl(value) {
			if (this.$sheetType === 'story') {
				throw $tab__TableauException.createInternalError('A story cannot be a child of another story.');
			}
			this.$parentStoryPointImpl = value;
		},
		get_zoneId: function SheetImpl$get_ZoneId() {
			return this.$zoneId;
		},
		get_messagingOptions: function SheetImpl$get_MessagingOptions() {
			return this.$messagingOptions;
		},
		changeSizeAsync: function SheetImpl$ChangeSizeAsync(newSize) {
			newSize = $tab__SheetImpl.$normalizeSheetSize(newSize);
			if (this.$sheetType === 'worksheet' && newSize.behavior !== 'automatic') {
				throw $tab__TableauException.createInvalidSizeBehaviorOnWorksheet();
			}
			var deferred = new tab._Deferred();
			if (this.$size.behavior === newSize.behavior && newSize.behavior === 'automatic') {
				deferred.resolve(newSize);
				return deferred.get_promise();
			}
			var dict = this.$processSheetSize(newSize);
			var param = {};
			param['api.setSheetSizeName'] = this.$name;
			param['api.minWidth'] = dict['api.minWidth'];
			param['api.minHeight'] = dict['api.minHeight'];
			param['api.maxWidth'] = dict['api.maxWidth'];
			param['api.maxHeight'] = dict['api.maxHeight'];
			var returnHandler = new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))('api.SetSheetSizeCommand', 1, ss.mkdel(this, function(result) {
				this.get_workbookImpl()._update(ss.mkdel(this, function() {
					var updatedSize = this.get_workbookImpl().get_publishedSheets()._get(this.get_name()).getSize();
					deferred.resolve(updatedSize);
				}));
			}), function(remoteError, message) {
				deferred.reject($tab__TableauException.createServerError(message));
			});
			this.sendCommand(Object).call(this, param, returnHandler);
			return deferred.get_promise();
		},
		sendCommand: function(T) {
			return function SheetImpl$SendCommand(commandParameters, returnHandler) {
				this.$messagingOptions.sendCommand(T).call(this.$messagingOptions, commandParameters, returnHandler);
			};
		},
		$processSheetSize: function SheetImpl$ProcessSheetSize(newSize) {
			var fixedSheetSize = null;
			if (ss.isNullOrUndefined(newSize) || ss.isNullOrUndefined(newSize.behavior) || newSize.behavior !== 'automatic' && ss.isNullOrUndefined(newSize.minSize) && ss.isNullOrUndefined(newSize.maxSize)) {
				throw $tab__TableauException.createInvalidSheetSizeParam();
			}
			var minWidth = 0;
			var minHeight = 0;
			var maxWidth = 0;
			var maxHeight = 0;
			var dict = {};
			dict['api.minWidth'] = 0;
			dict['api.minHeight'] = 0;
			dict['api.maxWidth'] = 0;
			dict['api.maxHeight'] = 0;
			if (newSize.behavior === 'automatic') {
				fixedSheetSize = $tab_SheetSize.$ctor('automatic', undefined, undefined);
			}
			else if (newSize.behavior === 'atmost') {
				if (ss.isNullOrUndefined(newSize.maxSize) || ss.isNullOrUndefined(newSize.maxSize.width) || ss.isNullOrUndefined(newSize.maxSize.height)) {
					throw $tab__TableauException.createMissingMaxSize();
				}
				if (newSize.maxSize.width < 0 || newSize.maxSize.height < 0) {
					throw $tab__TableauException.createInvalidSizeValue();
				}
				dict['api.maxWidth'] = newSize.maxSize.width;
				dict['api.maxHeight'] = newSize.maxSize.height;
				fixedSheetSize = $tab_SheetSize.$ctor('atmost', undefined, newSize.maxSize);
			}
			else if (newSize.behavior === 'atleast') {
				if (ss.isNullOrUndefined(newSize.minSize) || ss.isNullOrUndefined(newSize.minSize.width) || ss.isNullOrUndefined(newSize.minSize.height)) {
					throw $tab__TableauException.createMissingMinSize();
				}
				if (newSize.minSize.width < 0 || newSize.minSize.height < 0) {
					throw $tab__TableauException.createInvalidSizeValue();
				}
				dict['api.minWidth'] = newSize.minSize.width;
				dict['api.minHeight'] = newSize.minSize.height;
				fixedSheetSize = $tab_SheetSize.$ctor('atleast', newSize.minSize, undefined);
			}
			else if (newSize.behavior === 'range') {
				if (ss.isNullOrUndefined(newSize.minSize) || ss.isNullOrUndefined(newSize.maxSize) || ss.isNullOrUndefined(newSize.minSize.width) || ss.isNullOrUndefined(newSize.maxSize.width) || ss.isNullOrUndefined(newSize.minSize.height) || ss.isNullOrUndefined(newSize.maxSize.height)) {
					throw $tab__TableauException.createMissingMinMaxSize();
				}
				if (newSize.minSize.width < 0 || newSize.minSize.height < 0 || newSize.maxSize.width < 0 || newSize.maxSize.height < 0 || newSize.minSize.width > newSize.maxSize.width || newSize.minSize.height > newSize.maxSize.height) {
					throw $tab__TableauException.createInvalidRangeSize();
				}
				dict['api.minWidth'] = newSize.minSize.width;
				dict['api.minHeight'] = newSize.minSize.height;
				dict['api.maxWidth'] = newSize.maxSize.width;
				dict['api.maxHeight'] = newSize.maxSize.height;
				fixedSheetSize = $tab_SheetSize.$ctor('range', newSize.minSize, newSize.maxSize);
			}
			else if (newSize.behavior === 'exactly') {
				if (ss.isValue(newSize.minSize) && ss.isValue(newSize.maxSize) && ss.isValue(newSize.minSize.width) && ss.isValue(newSize.maxSize.width) && ss.isValue(newSize.minSize.height) && ss.isValue(newSize.maxSize.height)) {
					minWidth = newSize.minSize.width;
					minHeight = newSize.minSize.height;
					maxWidth = newSize.maxSize.width;
					maxHeight = newSize.maxSize.height;
					if (minWidth !== maxWidth || minHeight !== maxHeight) {
						throw $tab__TableauException.createSizeConflictForExactly();
					}
				}
				else if (ss.isValue(newSize.minSize) && ss.isValue(newSize.minSize.width) && ss.isValue(newSize.minSize.height)) {
					minWidth = newSize.minSize.width;
					minHeight = newSize.minSize.height;
					maxWidth = minWidth;
					maxHeight = minHeight;
				}
				else if (ss.isValue(newSize.maxSize) && ss.isValue(newSize.maxSize.width) && ss.isValue(newSize.maxSize.height)) {
					maxWidth = newSize.maxSize.width;
					maxHeight = newSize.maxSize.height;
					minWidth = maxWidth;
					minHeight = maxHeight;
				}
				dict['api.minWidth'] = minWidth;
				dict['api.minHeight'] = minHeight;
				dict['api.maxWidth'] = maxWidth;
				dict['api.maxHeight'] = maxHeight;
				fixedSheetSize = $tab_SheetSize.$ctor('exactly', $tab_Size.$ctor(minWidth, minHeight), $tab_Size.$ctor(maxWidth, maxHeight));
			}
			this.$size = fixedSheetSize;
			return dict;
		}
	});
	ss.initClass($tab__DashboardImpl, $asm, {
		get_sheet: function DashboardImpl$get_Sheet() {
			return this.get_dashboard();
		},
		get_dashboard: function DashboardImpl$get_Dashboard() {
			if (ss.isNullOrUndefined(this.$dashboard)) {
				this.$dashboard = new $tableauSoftware_Dashboard(this);
			}
			return this.$dashboard;
		},
		get_worksheets: function DashboardImpl$get_Worksheets() {
			return this.$worksheets;
		},
		get_objects: function DashboardImpl$get_Objects() {
			return this.$dashboardObjects;
		},
		$addObjects: function DashboardImpl$AddObjects(zones, findSheetFunc) {
			this.$dashboardObjects = new tab._Collection();
			this.$worksheets = new tab._Collection();
			for (var i = 0; i < zones.length; i++) {
				var zone = zones[i];
				var worksheet = null;
				if (zones[i].objectType === 'worksheet') {
					var name = zone.name;
					if (ss.isNullOrUndefined(name)) {
						continue;
					}
					var index = this.$worksheets.get__length();
					var size = $tab_SheetSizeFactory.createAutomatic();
					var isActive = false;
					var publishedSheetInfo = findSheetFunc(name);
					var isHidden = ss.isNullOrUndefined(publishedSheetInfo);
					var url = (isHidden ? '' : publishedSheetInfo.getUrl());
					var sheetInfoImpl = $tab__SheetInfoImpl.$ctor(name, 'worksheet', index, size, this.get_workbook(), url, isActive, isHidden, zone.zoneId);
					var worksheetImpl = new $tab__WorksheetImpl(sheetInfoImpl, this.get_workbookImpl(), this.get_messagingOptions(), this);
					worksheet = worksheetImpl.get_worksheet();
					this.$worksheets._add(name, worksheetImpl.get_worksheet());
				}
				var obj = new $tableauSoftware_DashboardObject(zone, this.get_dashboard(), worksheet);
				this.$dashboardObjects._add(i.toString(), obj);
			}
		}
	}, $tab__SheetImpl);
	ss.initClass($tab__DataSourceImpl, $asm, {
		get_dataSource: function DataSourceImpl$get_DataSource() {
			if (ss.isNullOrUndefined(this.$dataSource)) {
				this.$dataSource = new $tableauSoftware_DataSource(this);
			}
			return this.$dataSource;
		},
		get_name: function DataSourceImpl$get_Name() {
			return this.$name;
		},
		get_fields: function DataSourceImpl$get_Fields() {
			return this.$fields;
		},
		get_isPrimary: function DataSourceImpl$get_IsPrimary() {
			return this.$isPrimary;
		},
		addField: function DataSourceImpl$AddField(field) {
			this.$fields._add(field.getName(), field);
		}
	});
	ss.initClass($tab__DataTableImpl, $asm, {
		get_name: function DataTableImpl$get_Name() {
			return this.$name;
		},
		get_rows: function DataTableImpl$get_Rows() {
			return this.$rows;
		},
		get_columns: function DataTableImpl$get_Columns() {
			return this.$columns;
		},
		get_totalRowCount: function DataTableImpl$get_TotalRowCount() {
			return this.$totalRowCount;
		},
		get_isSummaryData: function DataTableImpl$get_IsSummaryData() {
			return this.$isSummaryData;
		}
	});
	ss.initClass($tab__DeferredImpl, $asm, {
		get_promise: function DoNotUseDeferred$get_Promise() {
			return this.$promise;
		},
		all: function DoNotUseDeferred$All(promisesOrValues) {
			var allDone = new $tab__DeferredImpl();
			var length = promisesOrValues.length;
			var toResolve = length;
			var results = [];
			if (length === 0) {
				allDone.resolve(results);
				return allDone.get_promise();
			}
			var resolveOne = function(promiseOrValue, index) {
				var promise = $tab_$DeferredUtil.$coerceToTrustedPromise(promiseOrValue);
				promise.then(function(returnValue) {
					results[index] = returnValue;
					toResolve--;
					if (toResolve === 0) {
						allDone.resolve(results);
					}
					return null;
				}, function(e) {
					allDone.reject(e);
					return null;
				});
			};
			for (var i = 0; i < length; i++) {
				resolveOne(promisesOrValues[i], i);
			}
			return allDone.get_promise();
		},
		then: function DoNotUseDeferred$Then(callback, errback) {
			return this.$thenFunc(callback, errback);
		},
		resolve: function DoNotUseDeferred$Resolve(promiseOrValue) {
			return this.$resolveFunc(promiseOrValue);
		},
		reject: function DoNotUseDeferred$Reject(e) {
			return this.$resolveFunc($tab_$DeferredUtil.$rejected(e));
		},
		$preResolutionThen: function DoNotUseDeferred$PreResolutionThen(callback, errback) {
			var deferred = new $tab__DeferredImpl();
			this.$listeners.push(function(promise) {
				promise.then(callback, errback).then(ss.mkdel(deferred, deferred.resolve), ss.mkdel(deferred, deferred.reject));
			});
			return deferred.get_promise();
		},
		$transitionToFulfilled: function DoNotUseDeferred$TransitionToFulfilled(completed) {
			var completedPromise = $tab_$DeferredUtil.$coerceToTrustedPromise(completed);
			this.$thenFunc = completedPromise.then;
			this.$resolveFunc = $tab_$DeferredUtil.$coerceToTrustedPromise;
			for (var i = 0; i < this.$listeners.length; i++) {
				var listener = this.$listeners[i];
				listener(completedPromise);
			}
			this.$listeners = null;
			return completedPromise;
		}
	});
	ss.initClass($tab__jQueryShim, $asm, {});
	ss.initClass($tab__Param, $asm, {});
	ss.initClass($tab__PromiseImpl, $asm, {
		always: function DoNotUsePromise$Always(callback) {
			return ss.cast(this.then(callback, ss.cast(callback, Function)), $tab__PromiseImpl);
		},
		otherwise: function DoNotUsePromise$Otherwise(errback) {
			return ss.cast(this.then(null, errback), $tab__PromiseImpl);
		}
	});
	ss.initClass($tab__Rect, $asm, {
		intersect: function TabRect$Intersect(other) {
			var left = Math.max(this.left, other.left);
			var top = Math.max(this.top, other.top);
			var right = Math.min(this.left + this.width, other.left + other.width);
			var bottom = Math.min(this.top + this.height, other.top + other.height);
			if (right <= left || bottom <= top) {
				return new $tab__Rect(0, 0, 0, 0);
			}
			return new $tab__Rect(left, top, right - left, bottom - top);
		}
	});
	ss.initClass($tab__SheetInfoImpl, $asm, {}, Object);
	ss.initClass($tab__StoryImpl, $asm, {
		add_activeStoryPointChange: function StoryImpl$add_ActiveStoryPointChange(value) {
			this.$2$ActiveStoryPointChangeField = ss.delegateCombine(this.$2$ActiveStoryPointChangeField, value);
		},
		remove_activeStoryPointChange: function StoryImpl$remove_ActiveStoryPointChange(value) {
			this.$2$ActiveStoryPointChangeField = ss.delegateRemove(this.$2$ActiveStoryPointChangeField, value);
		},
		get_activeStoryPointImpl: function StoryImpl$get_ActiveStoryPointImpl() {
			return this.$activeStoryPointImpl;
		},
		get_sheet: function StoryImpl$get_Sheet() {
			return this.get_story();
		},
		get_story: function StoryImpl$get_Story() {
			if (ss.isNullOrUndefined(this.$story)) {
				this.$story = new $tableauSoftware_Story(this);
			}
			return this.$story;
		},
		get_storyPointsInfo: function StoryImpl$get_StoryPointsInfo() {
			return this.$storyPointsInfo;
		},
		update: function StoryImpl$Update(storyPm) {
			var activeStoryPointContainedSheetInfo = null;
			var newActiveStoryPointInfoImpl = null;
			this.$storyPointsInfo = this.$storyPointsInfo || new Array(storyPm.storyPoints.length);
			for (var i = 0; i < storyPm.storyPoints.length; i++) {
				var storyPointPm = storyPm.storyPoints[i];
				var caption = storyPointPm.caption;
				var isActive = i === storyPm.activeStoryPointIndex;
				var storyPointInfoImpl = $tab__StoryPointInfoImpl.$ctor(caption, i, storyPointPm.storyPointId, isActive, storyPointPm.isUpdated, this);
				if (ss.isNullOrUndefined(this.$storyPointsInfo[i])) {
					this.$storyPointsInfo[i] = new $tableauSoftware_StoryPointInfo(storyPointInfoImpl);
				}
				else if (this.$storyPointsInfo[i]._impl.storyPointId === storyPointInfoImpl.storyPointId) {
					var existing = this.$storyPointsInfo[i]._impl;
					existing.caption = storyPointInfoImpl.caption;
					existing.index = storyPointInfoImpl.index;
					existing.isActive = isActive;
					existing.isUpdated = storyPointInfoImpl.isUpdated;
				}
				else {
					this.$storyPointsInfo[i] = new $tableauSoftware_StoryPointInfo(storyPointInfoImpl);
				}
				if (isActive) {
					activeStoryPointContainedSheetInfo = storyPointPm.containedSheetInfo;
					newActiveStoryPointInfoImpl = storyPointInfoImpl;
				}
			}
			var deleteCount = this.$storyPointsInfo.length - storyPm.storyPoints.length;
			this.$storyPointsInfo.splice(storyPm.storyPoints.length, deleteCount);
			var activeStoryPointChanged = ss.isNullOrUndefined(this.$activeStoryPointImpl) || this.$activeStoryPointImpl.get_storyPointId() !== newActiveStoryPointInfoImpl.storyPointId;
			if (ss.isValue(this.$activeStoryPointImpl) && activeStoryPointChanged) {
				this.$activeStoryPointImpl.set_isActive(false);
			}
			var previouslyActiveStoryPoint = this.$activeStoryPointImpl;
			if (activeStoryPointChanged) {
				var containedSheetImpl = $tab__StoryPointImpl.createContainedSheet(activeStoryPointContainedSheetInfo, this.get_workbookImpl(), this.get_messagingOptions(), this.$findSheetFunc);
				this.$activeStoryPointImpl = new $tab__StoryPointImpl(newActiveStoryPointInfoImpl, containedSheetImpl);
			}
			else {
				this.$activeStoryPointImpl.set_isActive(newActiveStoryPointInfoImpl.isActive);
				this.$activeStoryPointImpl.set_isUpdated(newActiveStoryPointInfoImpl.isUpdated);
			}
			if (activeStoryPointChanged && ss.isValue(previouslyActiveStoryPoint)) {
				this.$raiseActiveStoryPointChange(this.$storyPointsInfo[previouslyActiveStoryPoint.get_index()], this.$activeStoryPointImpl.get_storyPoint());
			}
		},
		activatePreviousStoryPointAsync: function StoryImpl$ActivatePreviousStoryPointAsync() {
			return this.$activatePreviousNextStoryPointAsync('api.ActivatePreviousStoryPoint');
		},
		activateNextStoryPointAsync: function StoryImpl$ActivateNextStoryPointAsync() {
			return this.$activatePreviousNextStoryPointAsync('api.ActivateNextStoryPoint');
		},
		activateStoryPointAsync: function StoryImpl$ActivateStoryPointAsync(index) {
			var deferred = new tab._Deferred();
			if (index < 0 || index >= this.$storyPointsInfo.length) {
				throw $tab__TableauException.createIndexOutOfRange(index);
			}
			var previouslyActiveStoryPointImpl = this.get_activeStoryPointImpl();
			var commandParameters = {};
			commandParameters['api.storyPointIndex'] = index;
			var returnHandler = new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))('api.ActivateStoryPoint', 0, ss.mkdel(this, function(result) {
				this.$updateActiveState(previouslyActiveStoryPointImpl, result);
				deferred.resolve(this.$activeStoryPointImpl.get_storyPoint());
			}), function(remoteError, errorMessage) {
				deferred.reject($tab__TableauException.createServerError(errorMessage));
			});
			this.sendCommand(Object).call(this, commandParameters, returnHandler);
			return deferred.get_promise();
		},
		revertStoryPointAsync: function StoryImpl$RevertStoryPointAsync(index) {
			index = index || this.$activeStoryPointImpl.get_index();
			if (index < 0 || index >= this.$storyPointsInfo.length) {
				throw $tab__TableauException.createIndexOutOfRange(index);
			}
			var deferred = new tab._Deferred();
			var commandParameters = {};
			commandParameters['api.storyPointIndex'] = index;
			var returnHandler = new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))('api.RevertStoryPoint', 0, ss.mkdel(this, function(result) {
				this.$updateStoryPointInfo(index, result);
				deferred.resolve(this.$storyPointsInfo[index]);
			}), function(remoteError, errorMessage) {
				deferred.reject($tab__TableauException.createServerError(errorMessage));
			});
			this.sendCommand(Object).call(this, commandParameters, returnHandler);
			return deferred.get_promise();
		},
		$activatePreviousNextStoryPointAsync: function StoryImpl$ActivatePreviousNextStoryPointAsync(commandName) {
			if (commandName !== 'api.ActivatePreviousStoryPoint' && commandName !== 'api.ActivateNextStoryPoint') {
				throw $tab__TableauException.createInternalError("commandName '" + commandName + "' is invalid.");
			}
			var deferred = new tab._Deferred();
			var previouslyActiveStoryPointImpl = this.get_activeStoryPointImpl();
			var commandParameters = {};
			var returnHandler = new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))(commandName, 0, ss.mkdel(this, function(result) {
				this.$updateActiveState(previouslyActiveStoryPointImpl, result);
				deferred.resolve(this.$activeStoryPointImpl.get_storyPoint());
			}), function(remoteError, errorMessage) {
				deferred.reject($tab__TableauException.createServerError(errorMessage));
			});
			this.sendCommand(Object).call(this, commandParameters, returnHandler);
			return deferred.get_promise();
		},
		$updateStoryPointInfo: function StoryImpl$UpdateStoryPointInfo(index, newStoryPointPm) {
			var existingImpl = this.$storyPointsInfo[index]._impl;
			if (existingImpl.storyPointId !== newStoryPointPm.storyPointId) {
				throw $tab__TableauException.createInternalError("We should not be updating a story point where the IDs don't match. Existing storyPointID=" + existingImpl.storyPointId + ', newStoryPointID=' + newStoryPointPm.storyPointId);
			}
			existingImpl.caption = newStoryPointPm.caption;
			existingImpl.isUpdated = newStoryPointPm.isUpdated;
			if (newStoryPointPm.storyPointId === this.$activeStoryPointImpl.get_storyPointId()) {
				this.$activeStoryPointImpl.set_isUpdated(newStoryPointPm.isUpdated);
			}
		},
		$updateActiveState: function StoryImpl$UpdateActiveState(previouslyActiveStoryPointImpl, newActiveStoryPointPm) {
			var newActiveIndex = newActiveStoryPointPm.index;
			if (previouslyActiveStoryPointImpl.get_index() === newActiveIndex) {
				return;
			}
			var oldStoryPointInfo = this.$storyPointsInfo[previouslyActiveStoryPointImpl.get_index()];
			var newStoryPointInfoImpl = this.$storyPointsInfo[newActiveIndex]._impl;
			var containedSheetImpl = $tab__StoryPointImpl.createContainedSheet(newActiveStoryPointPm.containedSheetInfo, this.get_workbookImpl(), this.get_messagingOptions(), this.$findSheetFunc);
			newStoryPointInfoImpl.isActive = true;
			this.$activeStoryPointImpl = new $tab__StoryPointImpl(newStoryPointInfoImpl, containedSheetImpl);
			previouslyActiveStoryPointImpl.set_isActive(false);
			oldStoryPointInfo._impl.isActive = false;
			this.$raiseActiveStoryPointChange(oldStoryPointInfo, this.$activeStoryPointImpl.get_storyPoint());
		},
		$raiseActiveStoryPointChange: function StoryImpl$RaiseActiveStoryPointChange(oldStoryPointInfo, newStoryPoint) {
			if (!ss.staticEquals(this.$2$ActiveStoryPointChangeField, null)) {
				this.$2$ActiveStoryPointChangeField(oldStoryPointInfo, newStoryPoint);
			}
		}
	}, $tab__SheetImpl);
	ss.initClass($tab__StoryPointImpl, $asm, {
		get_caption: function StoryPointImpl$get_Caption() {
			return this.$caption;
		},
		get_containedSheetImpl: function StoryPointImpl$get_ContainedSheetImpl() {
			return this.$containedSheetImpl;
		},
		get_index: function StoryPointImpl$get_Index() {
			return this.$index;
		},
		get_isActive: function StoryPointImpl$get_IsActive() {
			return this.$isActive;
		},
		set_isActive: function StoryPointImpl$set_IsActive(value) {
			this.$isActive = value;
		},
		get_isUpdated: function StoryPointImpl$get_IsUpdated() {
			return this.$isUpdated;
		},
		set_isUpdated: function StoryPointImpl$set_IsUpdated(value) {
			this.$isUpdated = value;
		},
		get_parentStoryImpl: function StoryPointImpl$get_ParentStoryImpl() {
			return this.$parentStoryImpl;
		},
		get_storyPoint: function StoryPointImpl$get_StoryPoint() {
			if (ss.isNullOrUndefined(this.$storyPoint)) {
				this.$storyPoint = new $tableauSoftware_StoryPoint(this);
			}
			return this.$storyPoint;
		},
		get_storyPointId: function StoryPointImpl$get_StoryPointId() {
			return this.$storyPointId;
		},
		$toInfoImpl: function StoryPointImpl$ToInfoImpl() {
			return $tab__StoryPointInfoImpl.$ctor(this.$caption, this.$index, this.$storyPointId, this.$isActive, this.$isUpdated, this.$parentStoryImpl);
		}
	});
	ss.initClass($tab__StoryPointInfoImpl, $asm, {}, Object);
	ss.initClass($tab__TableauException, $asm, {});
	ss.initClass($tab__Utility, $asm, {});
	ss.initClass($tab__VizManagerImpl, $asm, {});
	ss.initClass($tab__VizParameters, $asm, {
		get_url: function VizParameters$get_Url() {
			return this.$constructUrl();
		},
		get_baseUrl: function VizParameters$get_BaseUrl() {
			return this.$urlFromApi;
		},
		$constructUrl: function VizParameters$ConstructUrl() {
			var url = [];
			url.push(this.get_baseUrl());
			url.push('?');
			if (this.userSuppliedParameters.length > 0) {
				url.push(this.userSuppliedParameters);
				url.push('&');
			}
			var addClientDimensionForDsd = !this.fixedSize && !(this.userSuppliedParameters.indexOf(':size=') !== -1) && this.parentElement.clientWidth * this.parentElement.clientHeight > 0;
			if (addClientDimensionForDsd) {
				url.push(':size=');
				url.push(this.parentElement.clientWidth + ',' + this.parentElement.clientHeight);
				url.push('&');
			}
			url.push(':embed=y');
			url.push('&:showVizHome=n');
			url.push('&:jsdebug=y');
			if (!this.fixedSize) {
				url.push('&:bootstrapWhenNotified=y');
			}
			if (!this.tabs) {
				url.push('&:tabs=n');
			}
			if (this.displayStaticImage) {
				url.push('&:display_static_image=y');
			}
			if (!this.toolbar) {
				url.push('&:toolbar=n');
			}
			else if (!ss.isNullOrUndefined(this.toolBarPosition)) {
				url.push('&:toolbar=');
				url.push(this.toolBarPosition.toString());
			}
			if (ss.isValue(this.device)) {
				url.push('&:device=');
				url.push(this.device.toString());
			}
			var userOptions = this.$createOptions;
			var $t1 = new ss.ObjectEnumerator(userOptions);
			try {
				while ($t1.moveNext()) {
					var entry = $t1.current();
					if (entry.key !== 'embed' && entry.key !== 'height' && entry.key !== 'width' && entry.key !== 'device' && entry.key !== 'autoSize' && entry.key !== 'hideTabs' && entry.key !== 'hideToolbar' && entry.key !== 'onFirstInteractive' && entry.key !== 'onFirstVizSizeKnown' && entry.key !== 'toolbarPosition' && entry.key !== 'instanceIdToClone' && entry.key !== 'display_static_image') {
						url.push('&');
						url.push(encodeURIComponent(entry.key));
						url.push('=');
						url.push(encodeURIComponent(entry.value.toString()));
					}
				}
			}
			finally {
				$t1.dispose();
			}
			url.push('&:apiID=' + this.handlerId);
			if (ss.isValue(this.$createOptions.instanceIdToClone)) {
				url.push('#' + this.$createOptions.instanceIdToClone);
			}
			return url.join('');
		}
	});
	ss.initClass($tab__WorkbookImpl, $asm, {
		get_workbook: function WorkbookImpl$get_Workbook() {
			if (ss.isNullOrUndefined(this.$workbook)) {
				this.$workbook = new $tableauSoftware_Workbook(this);
			}
			return this.$workbook;
		},
		get_viz: function WorkbookImpl$get_Viz() {
			return this.$vizImpl.get_$viz();
		},
		get_publishedSheets: function WorkbookImpl$get_PublishedSheets() {
			return this.$publishedSheetsInfo;
		},
		get_name: function WorkbookImpl$get_Name() {
			return this.$name;
		},
		get_activeSheetImpl: function WorkbookImpl$get_ActiveSheetImpl() {
			return this.$activeSheetImpl;
		},
		get_activeCustomView: function WorkbookImpl$get_ActiveCustomView() {
			return this.$currentCustomView;
		},
		get_isDownloadAllowed: function WorkbookImpl$get_IsDownloadAllowed() {
			return this.$isDownloadAllowed;
		},
		$findActiveSheetOrSheetWithinActiveDashboard: function WorkbookImpl$FindActiveSheetOrSheetWithinActiveDashboard(sheetOrInfoOrName) {
			if (ss.isNullOrUndefined(this.$activeSheetImpl)) {
				return null;
			}
			var sheetName = $tab__WorkbookImpl.$extractSheetName(sheetOrInfoOrName);
			if (ss.isNullOrUndefined(sheetName)) {
				return null;
			}
			if (ss.referenceEquals(sheetName, this.$activeSheetImpl.get_name())) {
				return this.$activeSheetImpl;
			}
			if (this.$activeSheetImpl.get_isDashboard()) {
				var dashboardImpl = ss.cast(this.$activeSheetImpl, $tab__DashboardImpl);
				var sheet = dashboardImpl.get_worksheets()._get(sheetName);
				if (ss.isValue(sheet)) {
					return sheet._impl;
				}
			}
			return null;
		},
		_setActiveSheetAsync: function WorkbookImpl$ActivateSheetAsync(sheetNameOrInfoOrIndex) {
			if ($tab__Utility.isNumber(sheetNameOrInfoOrIndex)) {
				var index = sheetNameOrInfoOrIndex;
				if (index < this.$publishedSheetsInfo.get__length() && index >= 0) {
					return this.$activateSheetWithInfoAsync(this.$publishedSheetsInfo.get_item(index).$impl);
				}
				else {
					throw $tab__TableauException.createIndexOutOfRange(index);
				}
			}
			var sheetName = $tab__WorkbookImpl.$extractSheetName(sheetNameOrInfoOrIndex);
			var sheetInfo = this.$publishedSheetsInfo._get(sheetName);
			if (ss.isValue(sheetInfo)) {
				return this.$activateSheetWithInfoAsync(sheetInfo.$impl);
			}
			else if (this.$activeSheetImpl.get_isDashboard()) {
				var d = ss.cast(this.$activeSheetImpl, $tab__DashboardImpl);
				var sheet = d.get_worksheets()._get(sheetName);
				if (ss.isValue(sheet)) {
					this.$activatingHiddenSheetImpl = null;
					var sheetUrl = '';
					if (sheet.getIsHidden()) {
						this.$activatingHiddenSheetImpl = sheet._impl;
					}
					else {
						sheetUrl = sheet._impl.get_url();
					}
					return this.$activateSheetInternalAsync(sheet._impl.get_name(), sheetUrl);
				}
			}
			throw $tab__TableauException.create('sheetNotInWorkbook', 'Sheet is not found in Workbook');
		},
		_revertAllAsync: function WorkbookImpl$RevertAllAsync() {
			var deferred = new tab._Deferred();
			var returnHandler = new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))('api.RevertAllCommand', 1, function(result) {
				deferred.resolve();
			}, function(remoteError, message) {
				deferred.reject($tab__TableauException.createServerError(message));
			});
			this.$sendCommand(Object).call(this, null, returnHandler);
			return deferred.get_promise();
		},
		_update: function WorkbookImpl$Update(callback) {
			this.$getClientInfo(callback);
		},
		$activateSheetWithInfoAsync: function WorkbookImpl$ActivateSheetWithInfoAsync(sheetInfoImpl) {
			return this.$activateSheetInternalAsync(sheetInfoImpl.name, sheetInfoImpl.url);
		},
		$activateSheetInternalAsync: function WorkbookImpl$ActivateSheetInternalAsync(sheetName, sheetUrl) {
			var deferred = new tab._Deferred();
			if (ss.isValue(this.$activeSheetImpl) && ss.referenceEquals(sheetName, this.$activeSheetImpl.get_name())) {
				deferred.resolve(this.$activeSheetImpl.get_sheet());
				return deferred.get_promise();
			}
			var param = {};
			param['api.switchToSheetName'] = sheetName;
			param['api.switchToRepositoryUrl'] = sheetUrl;
			param['api.oldRepositoryUrl'] = this.$activeSheetImpl.get_url();
			var returnHandler = new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))('api.SwitchActiveSheetCommand', 0, ss.mkdel(this, function(result) {
				this.$vizImpl.$workbookTabSwitchHandler = ss.mkdel(this, function() {
					this.$vizImpl.$workbookTabSwitchHandler = null;
					deferred.resolve(this.$activeSheetImpl.get_sheet());
				});
			}), function(remoteError, message) {
				deferred.reject($tab__TableauException.createServerError(message));
			});
			this.$sendCommand(Object).call(this, param, returnHandler);
			return deferred.get_promise();
		},
		_updateActiveSheetAsync: function WorkbookImpl$UpdateActiveSheetAsync() {
			var deferred = new tab._Deferred();
			var param = {};
			param['api.switchToSheetName'] = this.$activeSheetImpl.get_name();
			param['api.switchToRepositoryUrl'] = this.$activeSheetImpl.get_url();
			param['api.oldRepositoryUrl'] = this.$activeSheetImpl.get_url();
			var returnHandler = new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))('api.UpdateActiveSheetCommand', 0, ss.mkdel(this, function(result) {
				deferred.resolve(this.$activeSheetImpl.get_sheet());
			}), function(remoteError, message) {
				deferred.reject($tab__TableauException.createServerError(message));
			});
			this.$sendCommand(Object).call(this, param, returnHandler);
			return deferred.get_promise();
		},
		$sendCommand: function(T) {
			return function WorkbookImpl$SendCommand(commandParameters, returnHandler) {
				this.$messagingOptions.sendCommand(T).call(this.$messagingOptions, commandParameters, returnHandler);
			};
		},
		$getClientInfo: function WorkbookImpl$GetClientInfo(callback) {
			var returnHandler = new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))('api.GetClientInfoCommand', 0, ss.mkdel(this, function(result) {
				this.$processInfo(result);
				if (ss.isValue(callback)) {
					callback();
				}
			}), null);
			this.$sendCommand(Object).call(this, null, returnHandler);
		},
		$processInfo: function WorkbookImpl$ProcessInfo(clientInfo) {
			this.$name = clientInfo.workbookName;
			this.$isDownloadAllowed = clientInfo.isDownloadAllowed;
			this.$vizImpl.$setAreAutomaticUpdatesPaused(!clientInfo.isAutoUpdate);
			this.$vizImpl.set_instanceId(clientInfo.instanceId);
			this.$createSheetsInfo(clientInfo);
			this.$initializeActiveSheet(clientInfo);
		},
		$initializeActiveSheet: function WorkbookImpl$InitializeActiveSheet(clientInfo) {
			var currentSheetName = clientInfo.currentSheetName;
			var newActiveSheetInfo = this.$publishedSheetsInfo._get(currentSheetName);
			if (ss.isNullOrUndefined(newActiveSheetInfo) && ss.isNullOrUndefined(this.$activatingHiddenSheetImpl)) {
				throw $tab__TableauException.createInternalError('The active sheet was not specified in baseSheets');
			}
			if (ss.isValue(this.$activeSheetImpl) && ss.referenceEquals(this.$activeSheetImpl.get_name(), currentSheetName)) {
				return;
			}
			if (ss.isValue(this.$activeSheetImpl)) {
				this.$activeSheetImpl.set_isActive(false);
				var oldActiveSheetInfo = this.$publishedSheetsInfo._get(this.$activeSheetImpl.get_name());
				if (ss.isValue(oldActiveSheetInfo)) {
					oldActiveSheetInfo.$impl.isActive = false;
				}
				if (this.$activeSheetImpl.get_sheetType() === 'story') {
					var storyImpl = ss.cast(this.$activeSheetImpl, $tab__StoryImpl);
					storyImpl.remove_activeStoryPointChange(ss.mkdel(this.$vizImpl, this.$vizImpl.raiseStoryPointSwitch));
				}
			}
			if (ss.isValue(this.$activatingHiddenSheetImpl)) {
				var infoImpl = $tab__SheetInfoImpl.$ctor(this.$activatingHiddenSheetImpl.get_name(), 'worksheet', -1, this.$activatingHiddenSheetImpl.get_size(), this.get_workbook(), '', true, true, $tab__SheetImpl.noZoneId);
				this.$activatingHiddenSheetImpl = null;
				this.$activeSheetImpl = new $tab__WorksheetImpl(infoImpl, this, this.$messagingOptions, null);
			}
			else {
				var baseSheet = null;
				for (var i = 0, len = clientInfo.publishedSheets.length; i < len; i++) {
					if (ss.referenceEquals(clientInfo.publishedSheets[i].name, currentSheetName)) {
						baseSheet = clientInfo.publishedSheets[i];
						break;
					}
				}
				if (ss.isNullOrUndefined(baseSheet)) {
					throw $tab__TableauException.createInternalError('No base sheet was found corresponding to the active sheet.');
				}
				var findSheetFunc = ss.mkdel(this, function(sheetName) {
					return this.$publishedSheetsInfo._get(sheetName);
				});
				if (baseSheet.sheetType === 'dashboard') {
					var dashboardImpl = new $tab__DashboardImpl(newActiveSheetInfo.$impl, this, this.$messagingOptions);
					this.$activeSheetImpl = dashboardImpl;
					var dashboardFrames = $tab__WorkbookImpl.$createDashboardZones(clientInfo.dashboardZones);
					dashboardImpl.$addObjects(dashboardFrames, findSheetFunc);
				}
				else if (baseSheet.sheetType === 'story') {
					var storyImpl1 = new $tab__StoryImpl(newActiveSheetInfo.$impl, this, this.$messagingOptions, clientInfo.story, findSheetFunc);
					this.$activeSheetImpl = storyImpl1;
					storyImpl1.add_activeStoryPointChange(ss.mkdel(this.$vizImpl, this.$vizImpl.raiseStoryPointSwitch));
				}
				else {
					this.$activeSheetImpl = new $tab__WorksheetImpl(newActiveSheetInfo.$impl, this, this.$messagingOptions, null);
				}
				newActiveSheetInfo.$impl.isActive = true;
			}
			this.$activeSheetImpl.set_isActive(true);
		},
		$createSheetsInfo: function WorkbookImpl$CreateSheetsInfo(clientInfo) {
			var baseSheets = clientInfo.publishedSheets;
			if (ss.isNullOrUndefined(baseSheets)) {
				return;
			}
			for (var index = 0; index < baseSheets.length; index++) {
				var baseSheet = baseSheets[index];
				var sheetName = baseSheet.name;
				var sheetInfo = this.$publishedSheetsInfo._get(sheetName);
				var size = $tab__WorkbookImpl.$createSheetSize(baseSheet);
				if (ss.isNullOrUndefined(sheetInfo)) {
					var isActive = ss.referenceEquals(sheetName, clientInfo.currentSheetName);
					var sheetType = $tab_ApiEnumConverter.convertSheetType(baseSheet.sheetType);
					var sheetInfoImpl = $tab__SheetInfoImpl.$ctor(sheetName, sheetType, index, size, this.get_workbook(), baseSheet.repositoryUrl, isActive, false, $tab__SheetImpl.noZoneId);
					sheetInfo = new $tableauSoftware_SheetInfo(sheetInfoImpl);
					this.$publishedSheetsInfo._add(sheetName, sheetInfo);
				}
				else {
					sheetInfo.$impl.size = size;
				}
			}
		},
		get_$customViews: function WorkbookImpl$get_CustomViews() {
			return this.$customViews;
		},
		set_$customViews: function WorkbookImpl$set_CustomViews(value) {
			this.$customViews = value;
		},
		get_$updatedCustomViews: function WorkbookImpl$get_UpdatedCustomViews() {
			return this.$updatedCustomViews;
		},
		set_$updatedCustomViews: function WorkbookImpl$set_UpdatedCustomViews(value) {
			this.$updatedCustomViews = value;
		},
		get_$removedCustomViews: function WorkbookImpl$get_RemovedCustomViews() {
			return this.$removedCustomViews;
		},
		set_$removedCustomViews: function WorkbookImpl$set_RemovedCustomViews(value) {
			this.$removedCustomViews = value;
		},
		get_$currentCustomView: function WorkbookImpl$get_CurrentCustomView() {
			return this.$currentCustomView;
		},
		set_$currentCustomView: function WorkbookImpl$set_CurrentCustomView(value) {
			this.$currentCustomView = value;
		},
		$getCustomViewsAsync: function WorkbookImpl$GetCustomViewsAsync() {
			return $tab__CustomViewImpl._getCustomViewsAsync(this, this.$messagingOptions);
		},
		$showCustomViewAsync: function WorkbookImpl$ShowCustomViewAsync(customViewName) {
			if (ss.isNullOrUndefined(customViewName) || $tab__Utility.isNullOrEmpty(customViewName)) {
				return $tab__CustomViewImpl._showCustomViewAsync(this, this.$messagingOptions, null);
			}
			else {
				var cv = this.$customViews._get(customViewName);
				if (ss.isNullOrUndefined(cv)) {
					var deferred = new tab._Deferred();
					deferred.reject($tab__TableauException.createInvalidCustomViewName(customViewName));
					return deferred.get_promise();
				}
				return cv._impl._showAsync();
			}
		},
		$removeCustomViewAsync: function WorkbookImpl$RemoveCustomViewAsync(customViewName) {
			if ($tab__Utility.isNullOrEmpty(customViewName)) {
				throw $tab__TableauException.createNullOrEmptyParameter('customViewName');
			}
			var cv = this.$customViews._get(customViewName);
			if (ss.isNullOrUndefined(cv)) {
				var deferred = new tab._Deferred();
				deferred.reject($tab__TableauException.createInvalidCustomViewName(customViewName));
				return deferred.get_promise();
			}
			return cv._impl.$removeAsync();
		},
		$rememberCustomViewAsync: function WorkbookImpl$RememberCustomViewAsync(customViewName) {
			if ($tab__Utility.isNullOrEmpty(customViewName)) {
				throw $tab__TableauException.createInvalidParameter('customViewName');
			}
			return $tab__CustomViewImpl._saveNewAsync(this, this.$messagingOptions, customViewName);
		},
		$setActiveCustomViewAsDefaultAsync: function WorkbookImpl$SetActiveCustomViewAsDefaultAsync() {
			return $tab__CustomViewImpl._makeCurrentCustomViewDefaultAsync(this, this.$messagingOptions);
		},
		get_$lastChangedParameterImpl: function WorkbookImpl$get_LastChangedParameterImpl() {
			return this.$lastChangedParameterImpl;
		},
		set_$lastChangedParameterImpl: function WorkbookImpl$set_LastChangedParameterImpl(value) {
			this.$lastChangedParameterImpl = value;
		},
		get_$parameters: function WorkbookImpl$get_Parameters() {
			return this.$parameters;
		},
		$getSingleParameterAsync: function WorkbookImpl$GetSingleParameterAsync(parameterName) {
			var deferred = new tab._Deferred();
			if (ss.isValue(this.$lastChangedParameterImpl)) {
				deferred.resolve(this.$lastChangedParameterImpl.get_$parameter());
				return deferred.get_promise();
			}
			var commandParameters = {};
			var returnHandler = new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))('api.FetchParametersCommand', 0, ss.mkdel(this, function(result) {
				var parameterImpl = $tab__WorkbookImpl.$findAndCreateParameterImpl(parameterName, result);
				this.$lastChangedParameterImpl = parameterImpl;
				deferred.resolve(parameterImpl.get_$parameter());
			}), function(remoteError, message) {
				deferred.reject($tab__TableauException.createServerError(message));
			});
			this.$sendCommand(Object).call(this, commandParameters, returnHandler);
			return deferred.get_promise();
		},
		$getParametersAsync: function WorkbookImpl$GetParametersAsync() {
			var deferred = new tab._Deferred();
			var commandParameters = {};
			var returnHandler = new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))('api.FetchParametersCommand', 0, ss.mkdel(this, function(result) {
				this.$parameters = $tab__WorkbookImpl.$processParameters(result);
				deferred.resolve(this.get_$parameters()._toApiCollection());
			}), function(remoteError, message) {
				deferred.reject($tab__TableauException.createServerError(message));
			});
			this.$sendCommand(Object).call(this, commandParameters, returnHandler);
			return deferred.get_promise();
		},
		$changeParameterValueAsync: function WorkbookImpl$ChangeParameterValueAsync(parameterName, value) {
			var deferred = new tab._Deferred();
			var parameterImpl = null;
			if (ss.isValue(this.$parameters)) {
				if (ss.isNullOrUndefined(this.$parameters._get(parameterName))) {
					deferred.reject($tab__TableauException.createInvalidParameter(parameterName));
					return deferred.get_promise();
				}
				parameterImpl = this.$parameters._get(parameterName)._impl;
				if (ss.isNullOrUndefined(parameterImpl)) {
					deferred.reject($tab__TableauException.createInvalidParameter(parameterName));
					return deferred.get_promise();
				}
			}
			var param = {};
			param['api.setParameterName'] = (ss.isValue(this.$parameters) ? parameterImpl.get_$name() : parameterName);
			if (ss.isValue(value) && $tab__Utility.isDate(value)) {
				var date = ss.cast(value, ss.JsDate);
				var dateStr = $tab__Utility.serializeDateForServer(date);
				param['api.setParameterValue'] = dateStr;
			}
			else {
				param['api.setParameterValue'] = (ss.isValue(value) ? value.toString() : null);
			}
			this.$lastChangedParameterImpl = null;
			var returnHandler = new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))('api.SetParameterValueCommand', 0, ss.mkdel(this, function(result) {
				if (ss.isNullOrUndefined(result)) {
					deferred.reject($tab__TableauException.create('serverError', 'server error'));
					return;
				}
				if (!result.isValidPresModel) {
					deferred.reject($tab__TableauException.createInvalidParameter(parameterName));
					return;
				}
				var paramUpdated = new $tab_$ParameterImpl(result);
				this.$lastChangedParameterImpl = paramUpdated;
				deferred.resolve(paramUpdated.get_$parameter());
			}), function(remoteError, message) {
				deferred.reject($tab__TableauException.createInvalidParameter(parameterName));
			});
			this.$sendCommand(Object).call(this, param, returnHandler);
			return deferred.get_promise();
		}
	});
	ss.initClass($tab__WorksheetImpl, $asm, {
		get_sheet: function WorksheetImpl$get_Sheet() {
			return this.get_worksheet();
		},
		get_worksheet: function WorksheetImpl$get_Worksheet() {
			if (ss.isNullOrUndefined(this.$worksheet)) {
				this.$worksheet = new $tableauSoftware_Worksheet(this);
			}
			return this.$worksheet;
		},
		get_parentDashboardImpl: function WorksheetImpl$get_ParentDashboardImpl() {
			return this.$parentDashboardImpl;
		},
		get_parentDashboard: function WorksheetImpl$get_ParentDashboard() {
			if (ss.isValue(this.$parentDashboardImpl)) {
				return this.$parentDashboardImpl.get_dashboard();
			}
			return null;
		},
		$getDataSourcesAsync: function WorksheetImpl$GetDataSourcesAsync() {
			this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
			var deferred = new tab._Deferred();
			var commandParameters = {};
			commandParameters['api.worksheetName'] = this.get_name();
			var returnHandler = new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))('api.GetDataSourcesCommand', 0, function(result) {
				var dataSources = $tab__DataSourceImpl.processDataSourcesForWorksheet(result);
				deferred.resolve(dataSources._toApiCollection());
			}, function(remoteError, message) {
				deferred.reject($tab__TableauException.createServerError(message));
			});
			this.sendCommand(Object).call(this, commandParameters, returnHandler);
			return deferred.get_promise();
		},
		$getDataSourceAsync: function WorksheetImpl$GetDataSourceAsync(dataSourceName) {
			this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
			var deferred = new tab._Deferred();
			var commandParameters = {};
			commandParameters['api.dataSourceName'] = dataSourceName;
			commandParameters['api.worksheetName'] = this.get_name();
			var returnHandler = new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))('api.GetDataSourceCommand', 0, function(result) {
				var dataSourceImpl = $tab__DataSourceImpl.processDataSource(result);
				if (ss.isValue(dataSourceImpl)) {
					deferred.resolve(dataSourceImpl.get_dataSource());
				}
				else {
					deferred.reject($tab__TableauException.createServerError("Data source '" + dataSourceName + "' not found"));
				}
			}, function(remoteError, message) {
				deferred.reject($tab__TableauException.createServerError(message));
			});
			this.sendCommand(Object).call(this, commandParameters, returnHandler);
			return deferred.get_promise();
		},
		$verifyActiveSheetOrEmbeddedInActiveDashboard: function WorksheetImpl$VerifyActiveSheetOrEmbeddedInActiveDashboard() {
			var isRootAndActiveWorksheet = this.get_isActive();
			var isWithinActiveDashboard = ss.isValue(this.$parentDashboardImpl) && this.$parentDashboardImpl.get_isActive();
			var isWithinActiveStoryPoint = ss.isValue(this.get_parentStoryPointImpl()) && this.get_parentStoryPointImpl().get_parentStoryImpl().get_isActive();
			if (!isRootAndActiveWorksheet && !isWithinActiveDashboard && !isWithinActiveStoryPoint) {
				throw $tab__TableauException.createNotActiveSheet();
			}
		},
		$addVisualIdToCommand: function WorksheetImpl$AddVisualIdToCommand(commandParameters) {
			if (ss.isValue(this.get_parentStoryPointImpl())) {
				var visualId = {};
				visualId.worksheet = this.get_name();
				visualId.dashboard = (ss.isValue(this.get_parentDashboardImpl()) ? this.$parentDashboardImpl.get_name() : this.get_name());
				visualId.flipboardZoneId = this.get_parentStoryPointImpl().get_containedSheetImpl().get_zoneId();
				visualId.storyboard = this.get_parentStoryPointImpl().get_parentStoryImpl().get_name();
				visualId.storyPointId = this.get_parentStoryPointImpl().get_storyPointId();
				commandParameters['api.visualId'] = visualId;
			}
			else {
				commandParameters['api.worksheetName'] = this.get_name();
				if (ss.isValue(this.get_parentDashboardImpl())) {
					commandParameters['api.dashboardName'] = this.get_parentDashboardImpl().get_name();
				}
			}
		},
		get__filters: function WorksheetImpl$get_Filters() {
			return this.$filters;
		},
		set__filters: function WorksheetImpl$set_Filters(value) {
			this.$filters = value;
		},
		$getFilterAsync: function WorksheetImpl$GetFilterAsync(fieldName, fieldCaption, options) {
			if (!$tab__Utility.isNullOrEmpty(fieldName) && !$tab__Utility.isNullOrEmpty(fieldCaption)) {
				throw $tab__TableauException.createInternalError('Only fieldName OR fieldCaption is allowed, not both.');
			}
			options = options || new Object();
			var deferred = new tab._Deferred();
			var commandParameters = {};
			this.$addVisualIdToCommand(commandParameters);
			if (!$tab__Utility.isNullOrEmpty(fieldCaption) && $tab__Utility.isNullOrEmpty(fieldName)) {
				commandParameters['api.fieldCaption'] = fieldCaption;
			}
			if (!$tab__Utility.isNullOrEmpty(fieldName)) {
				commandParameters['api.fieldName'] = fieldName;
			}
			commandParameters['api.filterHierarchicalLevels'] = 0;
			commandParameters['api.ignoreDomain'] = options.ignoreDomain || false;
			var returnHandler = new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))('api.GetOneFilterInfoCommand', 0, ss.mkdel(this, function(result) {
				var error = $tab__WorksheetImpl.$filterCommandError(result);
				if (ss.isNullOrUndefined(error)) {
					var filterJson = result;
					var filter = $tableauSoftware_Filter.$createFilter(this, filterJson);
					deferred.resolve(filter);
				}
				else {
					deferred.reject(error);
				}
			}), function(remoteError, message) {
				deferred.reject($tab__TableauException.createServerError(message));
			});
			this.sendCommand(Object).call(this, commandParameters, returnHandler);
			return deferred.get_promise();
		},
		$getFiltersAsync: function WorksheetImpl$GetFiltersAsync(options) {
			this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
			options = options || new Object();
			var deferred = new tab._Deferred();
			var commandParameters = {};
			this.$addVisualIdToCommand(commandParameters);
			commandParameters['api.ignoreDomain'] = options.ignoreDomain || false;
			var returnHandler = new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))('api.GetFiltersListCommand', 0, ss.mkdel(this, function(result) {
				this.set__filters($tableauSoftware_Filter.$processFiltersList(this, result));
				deferred.resolve(this.get__filters()._toApiCollection());
			}), function(remoteError, message) {
				deferred.reject($tab__TableauException.createServerError(message));
			});
			this.sendCommand(Object).call(this, commandParameters, returnHandler);
			return deferred.get_promise();
		},
		$applyFilterAsync: function WorksheetImpl$ApplyFilterAsync(fieldName, values, updateType, options) {
			return this.$applyFilterWithValuesInternalAsync(fieldName, values, updateType, options);
		},
		$clearFilterAsync: function WorksheetImpl$ClearFilterAsync(fieldName) {
			return this.$clearFilterInternalAsync(fieldName);
		},
		$applyRangeFilterAsync: function WorksheetImpl$ApplyRangeFilterAsync(fieldName, options) {
			var fixedUpFilterOptions = $tab__WorksheetImpl.$normalizeRangeFilterOption(options);
			return this.$applyRangeFilterInternalAsync(fieldName, fixedUpFilterOptions);
		},
		$applyRelativeDateFilterAsync: function WorksheetImpl$ApplyRelativeDateFilterAsync(fieldName, options) {
			var fixedUpFilterOptions = $tab__WorksheetImpl.$normalizeRelativeDateFilterOptions(options);
			return this.$applyRelativeDateFilterInternalAsync(fieldName, fixedUpFilterOptions);
		},
		$applyHierarchicalFilterAsync: function WorksheetImpl$ApplyHierarchicalFilterAsync(fieldName, values, updateType, options) {
			if (ss.isNullOrUndefined(values) && updateType !== 'all') {
				throw $tab__TableauException.createInvalidParameter('values');
			}
			return this.$applyHierarchicalFilterInternalAsync(fieldName, values, updateType, options);
		},
		$clearFilterInternalAsync: function WorksheetImpl$ClearFilterInternalAsync(fieldName) {
			this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
			if ($tab__Utility.isNullOrEmpty(fieldName)) {
				throw $tab__TableauException.createNullOrEmptyParameter('fieldName');
			}
			var deferred = new tab._Deferred();
			var commandParameters = {};
			commandParameters['api.fieldCaption'] = fieldName;
			this.$addVisualIdToCommand(commandParameters);
			var returnHandler = $tab__WorksheetImpl.$createFilterCommandReturnHandler('api.ClearFilterCommand', fieldName, deferred);
			this.sendCommand(Object).call(this, commandParameters, returnHandler);
			return deferred.get_promise();
		},
		$applyFilterWithValuesInternalAsync: function WorksheetImpl$ApplyFilterWithValuesInternalAsync(fieldName, values, updateType, options) {
			this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
			if ($tab__Utility.isNullOrEmpty(fieldName)) {
				throw $tab__TableauException.createNullOrEmptyParameter('fieldName');
			}
			updateType = $tab_$PublicEnums.$normalizeEnum($tab_ApiFilterUpdateType).call(null, updateType, 'updateType');
			var fieldValues = [];
			if ($tab__jQueryShim.isArray(values)) {
				for (var i = 0; i < values.length; i++) {
					fieldValues.push(values[i].toString());
				}
			}
			else if (ss.isValue(values)) {
				fieldValues.push(values.toString());
			}
			var deferred = new tab._Deferred();
			var commandParameters = {};
			commandParameters['api.fieldCaption'] = fieldName;
			commandParameters['api.filterUpdateType'] = updateType;
			commandParameters['api.exclude'] = ((ss.isValue(options) && options.isExcludeMode) ? true : false);
			if (updateType !== 'all') {
				commandParameters['api.filterCategoricalValues'] = fieldValues;
			}
			this.$addVisualIdToCommand(commandParameters);
			var returnHandler = $tab__WorksheetImpl.$createFilterCommandReturnHandler('api.ApplyCategoricalFilterCommand', fieldName, deferred);
			this.sendCommand(Object).call(this, commandParameters, returnHandler);
			return deferred.get_promise();
		},
		$applyRangeFilterInternalAsync: function WorksheetImpl$ApplyRangeFilterInternalAsync(fieldName, filterOptions) {
			this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
			if ($tab__Utility.isNullOrEmpty(fieldName)) {
				throw $tab__TableauException.createNullOrEmptyParameter('fieldName');
			}
			if (ss.isNullOrUndefined(filterOptions)) {
				throw $tab__TableauException.createNullOrEmptyParameter('filterOptions');
			}
			var commandParameters = {};
			commandParameters['api.fieldCaption'] = fieldName;
			if (ss.isValue(filterOptions.min)) {
				if ($tab__Utility.isDate(filterOptions.min)) {
					var dt = ss.cast(filterOptions.min, ss.JsDate);
					if ($tab__Utility.isDateValid(dt)) {
						commandParameters['api.filterRangeMin'] = $tab__Utility.serializeDateForServer(dt);
					}
					else {
						throw $tab__TableauException.createInvalidDateParameter('filterOptions.min');
					}
				}
				else {
					commandParameters['api.filterRangeMin'] = filterOptions.min;
				}
			}
			if (ss.isValue(filterOptions.max)) {
				if ($tab__Utility.isDate(filterOptions.max)) {
					var dt1 = ss.cast(filterOptions.max, ss.JsDate);
					if ($tab__Utility.isDateValid(dt1)) {
						commandParameters['api.filterRangeMax'] = $tab__Utility.serializeDateForServer(dt1);
					}
					else {
						throw $tab__TableauException.createInvalidDateParameter('filterOptions.max');
					}
				}
				else {
					commandParameters['api.filterRangeMax'] = filterOptions.max;
				}
			}
			if (ss.isValue(filterOptions.nullOption)) {
				commandParameters['api.filterRangeNullOption'] = filterOptions.nullOption;
			}
			this.$addVisualIdToCommand(commandParameters);
			var deferred = new tab._Deferred();
			var returnHandler = $tab__WorksheetImpl.$createFilterCommandReturnHandler('api.ApplyRangeFilterCommand', fieldName, deferred);
			this.sendCommand(Object).call(this, commandParameters, returnHandler);
			return deferred.get_promise();
		},
		$applyRelativeDateFilterInternalAsync: function WorksheetImpl$ApplyRelativeDateFilterInternalAsync(fieldName, filterOptions) {
			this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
			if ($tab__Utility.isNullOrEmpty(fieldName)) {
				throw $tab__TableauException.createInvalidParameter('fieldName');
			}
			else if (ss.isNullOrUndefined(filterOptions)) {
				throw $tab__TableauException.createInvalidParameter('filterOptions');
			}
			var commandParameters = {};
			commandParameters['api.fieldCaption'] = fieldName;
			if (ss.isValue(filterOptions)) {
				commandParameters['api.filterPeriodType'] = filterOptions.periodType;
				commandParameters['api.filterDateRangeType'] = filterOptions.rangeType;
				if (filterOptions.rangeType === 'lastn' || filterOptions.rangeType === 'nextn') {
					if (ss.isNullOrUndefined(filterOptions.rangeN)) {
						throw $tab__TableauException.create('missingRangeNForRelativeDateFilters', 'Missing rangeN field for a relative date filter of LASTN or NEXTN.');
					}
					commandParameters['api.filterDateRange'] = filterOptions.rangeN;
				}
				if (ss.isValue(filterOptions.anchorDate)) {
					commandParameters['api.filterDateArchorValue'] = $tab__Utility.serializeDateForServer(filterOptions.anchorDate);
				}
			}
			this.$addVisualIdToCommand(commandParameters);
			var deferred = new tab._Deferred();
			var returnHandler = $tab__WorksheetImpl.$createFilterCommandReturnHandler('api.ApplyRelativeDateFilterCommand', fieldName, deferred);
			this.sendCommand(Object).call(this, commandParameters, returnHandler);
			return deferred.get_promise();
		},
		$applyHierarchicalFilterInternalAsync: function WorksheetImpl$ApplyHierarchicalFilterInternalAsync(fieldName, values, updateType, options) {
			this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
			if ($tab__Utility.isNullOrEmpty(fieldName)) {
				throw $tab__TableauException.createNullOrEmptyParameter('fieldName');
			}
			updateType = $tab_$PublicEnums.$normalizeEnum($tab_ApiFilterUpdateType).call(null, updateType, 'updateType');
			var fieldValues = null;
			var levelValues = null;
			if ($tab__jQueryShim.isArray(values)) {
				fieldValues = [];
				var arr = values;
				for (var i = 0; i < arr.length; i++) {
					fieldValues.push(arr[i].toString());
				}
			}
			else if ($tab__Utility.isString(values)) {
				fieldValues = [];
				fieldValues.push(values.toString());
			}
			else if (ss.isValue(values) && ss.isValue(values['levels'])) {
				var levelValue = values['levels'];
				levelValues = [];
				if ($tab__jQueryShim.isArray(levelValue)) {
					var levels = levelValue;
					for (var i1 = 0; i1 < levels.length; i1++) {
						levelValues.push(levels[i1].toString());
					}
				}
				else {
					levelValues.push(levelValue.toString());
				}
			}
			else if (ss.isValue(values)) {
				throw $tab__TableauException.createInvalidParameter('values');
			}
			var commandParameters = {};
			commandParameters['api.fieldCaption'] = fieldName;
			commandParameters['api.filterUpdateType'] = updateType;
			commandParameters['api.exclude'] = ((ss.isValue(options) && options.isExcludeMode) ? true : false);
			if (ss.isValue(fieldValues)) {
				commandParameters['api.filterHierarchicalValues'] = JSON.stringify(fieldValues);
			}
			if (ss.isValue(levelValues)) {
				commandParameters['api.filterHierarchicalLevels'] = JSON.stringify(levelValues);
			}
			this.$addVisualIdToCommand(commandParameters);
			var deferred = new tab._Deferred();
			var returnHandler = $tab__WorksheetImpl.$createFilterCommandReturnHandler('api.ApplyHierarchicalFilterCommand', fieldName, deferred);
			this.sendCommand(Object).call(this, commandParameters, returnHandler);
			return deferred.get_promise();
		},
		get_selectedMarks: function WorksheetImpl$get_SelectedMarks() {
			return this.$selectedMarks;
		},
		set_selectedMarks: function WorksheetImpl$set_SelectedMarks(value) {
			this.$selectedMarks = value;
		},
		$clearSelectedMarksAsync: function WorksheetImpl$ClearSelectedMarksAsync() {
			this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
			var deferred = new tab._Deferred();
			var commandParameters = {};
			this.$addVisualIdToCommand(commandParameters);
			var returnHandler = new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))('api.ClearSelectedMarksCommand', 1, function(result) {
				deferred.resolve();
			}, function(remoteError, message) {
				deferred.reject($tab__TableauException.createServerError(message));
			});
			this.sendCommand(Object).call(this, commandParameters, returnHandler);
			return deferred.get_promise();
		},
		$selectMarksAsync: function WorksheetImpl$SelectMarksAsync(fieldNameOrFieldValuesMap, valueOrUpdateType, updateType) {
			this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
			if (ss.isNullOrUndefined(fieldNameOrFieldValuesMap) && ss.isNullOrUndefined(valueOrUpdateType)) {
				return this.$clearSelectedMarksAsync();
			}
			if ($tab__Utility.isString(fieldNameOrFieldValuesMap) && ($tab__jQueryShim.isArray(valueOrUpdateType) || $tab__Utility.isString(valueOrUpdateType) || !$tab_$PublicEnums.$isValidEnum($tab_ApiSelectionUpdateType).call(null, valueOrUpdateType))) {
				return this.$selectMarksWithFieldNameAndValueAsync(ss.cast(fieldNameOrFieldValuesMap, String), valueOrUpdateType, updateType);
			}
			else if ($tab__jQueryShim.isArray(fieldNameOrFieldValuesMap)) {
				return this.$selectMarksWithMarksArrayAsync(fieldNameOrFieldValuesMap, ss.cast(valueOrUpdateType, String));
			}
			else {
				return this.$selectMarksWithMultiDimOptionAsync(fieldNameOrFieldValuesMap, ss.cast(valueOrUpdateType, String));
			}
		},
		$getSelectedMarksAsync: function WorksheetImpl$GetSelectedMarksAsync() {
			this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
			var deferred = new tab._Deferred();
			var commandParameters = {};
			this.$addVisualIdToCommand(commandParameters);
			var returnHandler = new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))('api.FetchSelectedMarksCommand', 0, ss.mkdel(this, function(result) {
				this.$selectedMarks = $tab_$MarkImpl.$processSelectedMarks(result);
				deferred.resolve(this.$selectedMarks._toApiCollection());
			}), function(remoteError, message) {
				deferred.reject($tab__TableauException.createServerError(message));
			});
			this.sendCommand(Object).call(this, commandParameters, returnHandler);
			return deferred.get_promise();
		},
		$selectMarksWithFieldNameAndValueAsync: function WorksheetImpl$SelectMarksWithFieldNameAndValueAsync(fieldName, value, updateType) {
			var catNameList = [];
			var catValueList = [];
			var hierNameList = [];
			var hierValueList = [];
			var rangeNameList = [];
			var rangeValueList = [];
			this.$parseMarksParam(catNameList, catValueList, hierNameList, hierValueList, rangeNameList, rangeValueList, fieldName, value);
			return this.$selectMarksWithValuesAsync(null, catNameList, catValueList, hierNameList, hierValueList, rangeNameList, rangeValueList, updateType);
		},
		$selectMarksWithMultiDimOptionAsync: function WorksheetImpl$SelectMarksWithMultiDimOptionAsync(fieldValuesMap, updateType) {
			var dict = fieldValuesMap;
			var catNameList = [];
			var catValueList = [];
			var hierNameList = [];
			var hierValueList = [];
			var rangeNameList = [];
			var rangeValueList = [];
			var $t1 = new ss.ObjectEnumerator(dict);
			try {
				while ($t1.moveNext()) {
					var ent = $t1.current();
					if (fieldValuesMap.hasOwnProperty(ent.key)) {
						if (!$tab__jQueryShim.isFunction(dict[ent.key])) {
							this.$parseMarksParam(catNameList, catValueList, hierNameList, hierValueList, rangeNameList, rangeValueList, ent.key, ent.value);
						}
					}
				}
			}
			finally {
				$t1.dispose();
			}
			return this.$selectMarksWithValuesAsync(null, catNameList, catValueList, hierNameList, hierValueList, rangeNameList, rangeValueList, updateType);
		},
		$selectMarksWithMarksArrayAsync: function WorksheetImpl$SelectMarksWithMarksArrayAsync(marksArray, updateType) {
			var catNameList = [];
			var catValueList = [];
			var hierNameList = [];
			var hierValueList = [];
			var rangeNameList = [];
			var rangeValueList = [];
			var tupleIdList = [];
			for (var i = 0; i < marksArray.length; i++) {
				var mark = marksArray[i];
				if (ss.isValue(mark.$impl.get_$tupleId()) && mark.$impl.get_$tupleId() > 0) {
					tupleIdList.push(mark.$impl.get_$tupleId());
				}
				else {
					var pairs = mark.$impl.get_$pairs();
					for (var j = 0; j < pairs.get__length(); j++) {
						var pair = pairs.get_item(j);
						if (pair.hasOwnProperty('fieldName') && pair.hasOwnProperty('value') && !$tab__jQueryShim.isFunction(pair.fieldName) && !$tab__jQueryShim.isFunction(pair.value)) {
							this.$parseMarksParam(catNameList, catValueList, hierNameList, hierValueList, rangeNameList, rangeValueList, pair.fieldName, pair.value);
						}
					}
				}
			}
			return this.$selectMarksWithValuesAsync(tupleIdList, catNameList, catValueList, hierNameList, hierValueList, rangeNameList, rangeValueList, updateType);
		},
		$parseMarksParam: function WorksheetImpl$ParseMarksParam(catNameList, catValueList, hierNameList, hierValueList, rangeNameList, rangeValueList, fieldName, value) {
			var sourceOptions = value;
			if ($tab__WorksheetImpl.$regexHierarchicalFieldName.test(fieldName)) {
				this.$addToParamLists(hierNameList, hierValueList, fieldName, value);
			}
			else if (ss.isValue(sourceOptions.min) || ss.isValue(sourceOptions.max)) {
				var range = new Object();
				if (ss.isValue(sourceOptions.min)) {
					if ($tab__Utility.isDate(sourceOptions.min)) {
						var dt = ss.cast(sourceOptions.min, ss.JsDate);
						if ($tab__Utility.isDateValid(dt)) {
							range.min = $tab__Utility.serializeDateForServer(dt);
						}
						else {
							throw $tab__TableauException.createInvalidDateParameter('options.min');
						}
					}
					else {
						range.min = sourceOptions.min;
					}
				}
				if (ss.isValue(sourceOptions.max)) {
					if ($tab__Utility.isDate(sourceOptions.max)) {
						var dt1 = ss.cast(sourceOptions.max, ss.JsDate);
						if ($tab__Utility.isDateValid(dt1)) {
							range.max = $tab__Utility.serializeDateForServer(dt1);
						}
						else {
							throw $tab__TableauException.createInvalidDateParameter('options.max');
						}
					}
					else {
						range.max = sourceOptions.max;
					}
				}
				if (ss.isValue(sourceOptions.nullOption)) {
					var nullOption = $tab_$PublicEnums.$normalizeEnum($tab_ApiNullOption).call(null, sourceOptions.nullOption, 'options.nullOption');
					range.nullOption = nullOption;
				}
				else {
					range.nullOption = 'allValues';
				}
				var jsonValue = JSON.stringify(range);
				this.$addToParamLists(rangeNameList, rangeValueList, fieldName, jsonValue);
			}
			else {
				this.$addToParamLists(catNameList, catValueList, fieldName, value);
			}
		},
		$addToParamLists: function WorksheetImpl$AddToParamLists(paramNameList, paramValueList, paramName, paramValue) {
			var markValues = [];
			if ($tab__jQueryShim.isArray(paramValue)) {
				var values = ss.cast(paramValue, Array);
				for (var i = 0; i < values.length; i++) {
					markValues.push(values[i].toString());
				}
			}
			else {
				markValues.push(paramValue.toString());
			}
			paramValueList.push(markValues);
			paramNameList.push(paramName);
		},
		$selectMarksWithValuesAsync: function WorksheetImpl$SelectMarksWithValuesAsync(tupleIdList, catNameList, catValueList, hierNameList, hierValueList, rangeNameList, rangeValueList, updateType) {
			var commandParameters = {};
			this.$addVisualIdToCommand(commandParameters);
			updateType = $tab_$PublicEnums.$normalizeEnum($tab_ApiSelectionUpdateType).call(null, updateType, 'updateType');
			commandParameters['api.filterUpdateType'] = updateType;
			if (!$tab__Utility.isNullOrEmpty(tupleIdList)) {
				commandParameters['api.tupleIds'] = JSON.stringify(tupleIdList);
			}
			if (!$tab__Utility.isNullOrEmpty(catNameList) && !$tab__Utility.isNullOrEmpty(catValueList)) {
				commandParameters['api.categoricalFieldCaption'] = JSON.stringify(catNameList);
				var markValues = [];
				for (var i = 0; i < catValueList.length; i++) {
					var values = JSON.stringify(catValueList[i]);
					markValues.push(values);
				}
				commandParameters['api.categoricalMarkValues'] = JSON.stringify(markValues);
			}
			if (!$tab__Utility.isNullOrEmpty(hierNameList) && !$tab__Utility.isNullOrEmpty(hierValueList)) {
				commandParameters['api.hierarchicalFieldCaption'] = JSON.stringify(hierNameList);
				var markValues1 = [];
				for (var i1 = 0; i1 < hierValueList.length; i1++) {
					var values1 = JSON.stringify(hierValueList[i1]);
					markValues1.push(values1);
				}
				commandParameters['api.hierarchicalMarkValues'] = JSON.stringify(markValues1);
			}
			if (!$tab__Utility.isNullOrEmpty(rangeNameList) && !$tab__Utility.isNullOrEmpty(rangeValueList)) {
				commandParameters['api.rangeFieldCaption'] = JSON.stringify(rangeNameList);
				var markValues2 = [];
				for (var i2 = 0; i2 < rangeValueList.length; i2++) {
					var values2 = JSON.stringify(rangeValueList[i2]);
					markValues2.push(values2);
				}
				commandParameters['api.rangeMarkValues'] = JSON.stringify(markValues2);
			}
			if ($tab__Utility.isNullOrEmpty(commandParameters['api.tupleIds']) && $tab__Utility.isNullOrEmpty(commandParameters['api.categoricalFieldCaption']) && $tab__Utility.isNullOrEmpty(commandParameters['api.hierarchicalFieldCaption']) && $tab__Utility.isNullOrEmpty(commandParameters['api.rangeFieldCaption'])) {
				throw $tab__TableauException.createInvalidParameter('fieldNameOrFieldValuesMap');
			}
			var deferred = new tab._Deferred();
			var returnHandler = new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))('api.SelectMarksCommand', 1, function(result) {
				var error = $tab__WorksheetImpl.$createSelectionCommandError(result);
				if (ss.isNullOrUndefined(error)) {
					deferred.resolve();
				}
				else {
					deferred.reject(error);
				}
			}, function(remoteError, message) {
				deferred.reject($tab__TableauException.createServerError(message));
			});
			this.sendCommand(Object).call(this, commandParameters, returnHandler);
			return deferred.get_promise();
		},
		$getSummaryDataAsync: function WorksheetImpl$GetSummaryDataAsync(options) {
			this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
			var deferred = new tab._Deferred();
			var commandParameters = {};
			this.$addVisualIdToCommand(commandParameters);
			options = options || new Object();
			commandParameters['api.ignoreAliases'] = ss.coalesce(options.ignoreAliases, false);
			commandParameters['api.ignoreSelection'] = ss.coalesce(options.ignoreSelection, false);
			commandParameters['api.maxRows'] = ss.coalesce(options.maxRows, 0);
			var returnHandler = new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))('api.GetSummaryTableCommand', 0, function(result) {
				var dataResult = result;
				var dt = $tab__DataTableImpl.processGetDataPresModel(dataResult);
				deferred.resolve(dt);
			}, function(remoteError, message) {
				deferred.reject($tab__TableauException.createServerError(message));
			});
			this.sendCommand(Object).call(this, commandParameters, returnHandler);
			return deferred.get_promise();
		},
		$getUnderlyingDataAsync: function WorksheetImpl$GetUnderlyingDataAsync(options) {
			this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
			var deferred = new tab._Deferred();
			var commandParameters = {};
			this.$addVisualIdToCommand(commandParameters);
			options = options || new Object();
			commandParameters['api.ignoreAliases'] = ss.coalesce(options.ignoreAliases, false);
			commandParameters['api.ignoreSelection'] = ss.coalesce(options.ignoreSelection, false);
			commandParameters['api.includeAllColumns'] = ss.coalesce(options.includeAllColumns, false);
			commandParameters['api.maxRows'] = ss.coalesce(options.maxRows, 0);
			var returnHandler = new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))('api.GetUnderlyingTableCommand', 0, function(result) {
				var dataResult = result;
				var dt = $tab__DataTableImpl.processGetDataPresModel(dataResult);
				deferred.resolve(dt);
			}, function(remoteError, message) {
				deferred.reject($tab__TableauException.createServerError(message));
			});
			this.sendCommand(Object).call(this, commandParameters, returnHandler);
			return deferred.get_promise();
		},
		$clearHighlightedMarksAsync: function WorksheetImpl$ClearHighlightedMarksAsync() {
			this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
			var deferred = new tab._Deferred();
			var commandParameters = {};
			this.$addVisualIdToCommand(commandParameters);
			var returnHandler = new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))('api.ClearHighlightedMarksCommand', 1, function(result) {
				deferred.resolve();
			}, function(remoteError, message) {
				deferred.reject($tab__TableauException.createServerError(message));
			});
			this.sendCommand(Object).call(this, commandParameters, returnHandler);
			return deferred.get_promise();
		},
		$highlightMarksAsync: function WorksheetImpl$HighlightMarksAsync(fieldName, values) {
			$tab__Param.verifyString(fieldName, 'fieldName');
			this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
			var deferred = new tab._Deferred();
			var commandParameters = {};
			commandParameters['api.fieldCaption'] = fieldName;
			commandParameters['api.ObjectTextIDs'] = values;
			this.$addVisualIdToCommand(commandParameters);
			var returnHandler = new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))('api.HighlightMarksCommand', 0, function(result) {
				deferred.resolve();
			}, function(remoteError, message) {
				deferred.reject($tab__TableauException.createServerError(message));
			});
			this.sendCommand(Object).call(this, commandParameters, returnHandler);
			return deferred.get_promise();
		},
		$highlightMarksByPatternMatchAsync: function WorksheetImpl$HighlightMarksByPatternMatchAsync(fieldName, patternMatch) {
			$tab__Param.verifyString(fieldName, 'fieldName');
			$tab__Param.verifyString(patternMatch, 'patternMatch');
			this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
			var deferred = new tab._Deferred();
			var commandParameters = {};
			commandParameters['api.filterUpdateType'] = 'replace';
			commandParameters['api.fieldCaption'] = fieldName;
			commandParameters['api.Pattern'] = patternMatch;
			this.$addVisualIdToCommand(commandParameters);
			var returnHandler = new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))('api.HighlightMarksByPatternMatch', 0, function(result) {
				deferred.resolve();
			}, function(remoteError, message) {
				deferred.reject($tab__TableauException.createServerError(message));
			});
			this.sendCommand(Object).call(this, commandParameters, returnHandler);
			return deferred.get_promise();
		}
	}, $tab__SheetImpl);
	ss.initEnum($tab_ApiDashboardObjectType, $asm, { blank: 'blank', worksheet: 'worksheet', quickFilter: 'quickFilter', parameterControl: 'parameterControl', pageFilter: 'pageFilter', legend: 'legend', title: 'title', text: 'text', image: 'image', webPage: 'webPage' }, true);
	ss.initEnum($tab_ApiDateRangeType, $asm, { last: 'last', lastn: 'lastn', next: 'next', nextn: 'nextn', curr: 'curr', todate: 'todate' }, true);
	ss.initEnum($tab_ApiDeviceType, $asm, { default: 'default', desktop: 'desktop', tablet: 'tablet', phone: 'phone' }, true);
	ss.initClass($tab_ApiEnumConverter, $asm, {});
	ss.initEnum($tab_ApiErrorCode, $asm, { internalError: 'internalError', serverError: 'serverError', invalidAggregationFieldName: 'invalidAggregationFieldName', invalidParameter: 'invalidParameter', invalidUrl: 'invalidUrl', staleDataReference: 'staleDataReference', vizAlreadyInManager: 'vizAlreadyInManager', noUrlOrParentElementNotFound: 'noUrlOrParentElementNotFound', invalidFilterFieldName: 'invalidFilterFieldName', invalidFilterFieldValue: 'invalidFilterFieldValue', invalidFilterFieldNameOrValue: 'invalidFilterFieldNameOrValue', filterCannotBePerformed: 'filterCannotBePerformed', notActiveSheet: 'notActiveSheet', invalidCustomViewName: 'invalidCustomViewName', missingRangeNForRelativeDateFilters: 'missingRangeNForRelativeDateFilters', missingMaxSize: 'missingMaxSize', missingMinSize: 'missingMinSize', missingMinMaxSize: 'missingMinMaxSize', invalidSize: 'invalidSize', invalidSizeBehaviorOnWorksheet: 'invalidSizeBehaviorOnWorksheet', sheetNotInWorkbook: 'sheetNotInWorkbook', indexOutOfRange: 'indexOutOfRange', downloadWorkbookNotAllowed: 'downloadWorkbookNotAllowed', nullOrEmptyParameter: 'nullOrEmptyParameter', browserNotCapable: 'browserNotCapable', unsupportedEventName: 'unsupportedEventName', invalidDateParameter: 'invalidDateParameter', invalidSelectionFieldName: 'invalidSelectionFieldName', invalidSelectionValue: 'invalidSelectionValue', invalidSelectionDate: 'invalidSelectionDate', noUrlForHiddenWorksheet: 'noUrlForHiddenWorksheet', maxVizResizeAttempts: 'maxVizResizeAttempts' }, true);
	ss.initEnum($tab_ApiFieldAggregationType, $asm, { SUM: 'SUM', AVG: 'AVG', MIN: 'MIN', MAX: 'MAX', STDEV: 'STDEV', STDEVP: 'STDEVP', VAR: 'VAR', VARP: 'VARP', COUNT: 'COUNT', COUNTD: 'COUNTD', MEDIAN: 'MEDIAN', ATTR: 'ATTR', NONE: 'NONE', PERCENTILE: 'PERCENTILE', YEAR: 'YEAR', QTR: 'QTR', MONTH: 'MONTH', DAY: 'DAY', HOUR: 'HOUR', MINUTE: 'MINUTE', SECOND: 'SECOND', WEEK: 'WEEK', WEEKDAY: 'WEEKDAY', MONTHYEAR: 'MONTHYEAR', MDY: 'MDY', END: 'END', TRUNC_YEAR: 'TRUNC_YEAR', TRUNC_QTR: 'TRUNC_QTR', TRUNC_MONTH: 'TRUNC_MONTH', TRUNC_WEEK: 'TRUNC_WEEK', TRUNC_DAY: 'TRUNC_DAY', TRUNC_HOUR: 'TRUNC_HOUR', TRUNC_MINUTE: 'TRUNC_MINUTE', TRUNC_SECOND: 'TRUNC_SECOND', QUART1: 'QUART1', QUART3: 'QUART3', SKEWNESS: 'SKEWNESS', KURTOSIS: 'KURTOSIS', INOUT: 'INOUT', SUM_XSQR: 'SUM_XSQR', USER: 'USER' }, true);
	ss.initEnum($tab_ApiFieldRoleType, $asm, { dimension: 'dimension', measure: 'measure', unknown: 'unknown' }, true);
	ss.initEnum($tab_ApiFilterType, $asm, { categorical: 'categorical', quantitative: 'quantitative', hierarchical: 'hierarchical', relativedate: 'relativedate' }, true);
	ss.initEnum($tab_ApiFilterUpdateType, $asm, { all: 'all', replace: 'replace', add: 'add', remove: 'remove' }, true);
	ss.initEnum($tab_ApiNullOption, $asm, { nullValues: 'nullValues', nonNullValues: 'nonNullValues', allValues: 'allValues' }, true);
	ss.initEnum($tab_ApiParameterAllowableValuesType, $asm, { all: 'all', list: 'list', range: 'range' }, true);
	ss.initEnum($tab_ApiParameterDataType, $asm, { float: 'float', integer: 'integer', string: 'string', boolean: 'boolean', date: 'date', datetime: 'datetime' }, true);
	ss.initEnum($tab_ApiPeriodType, $asm, { year: 'year', quarter: 'quarter', month: 'month', week: 'week', day: 'day', hour: 'hour', minute: 'minute', second: 'second' }, true);
	ss.initEnum($tab_ApiSelectionUpdateType, $asm, { replace: 'replace', add: 'add', remove: 'remove' }, true);
	ss.initEnum($tab_ApiSheetSizeBehavior, $asm, { automatic: 'automatic', exactly: 'exactly', range: 'range', atleast: 'atleast', atmost: 'atmost' }, true);
	ss.initEnum($tab_ApiSheetType, $asm, { worksheet: 'worksheet', dashboard: 'dashboard', story: 'story' }, true);
	ss.initEnum($tab_ApiTableauEventName, $asm, { customviewload: 'customviewload', customviewremove: 'customviewremove', customviewsave: 'customviewsave', customviewsetdefault: 'customviewsetdefault', filterchange: 'filterchange', firstinteractive: 'firstinteractive', firstvizsizeknown: 'firstvizsizeknown', marksselection: 'marksselection', parametervaluechange: 'parametervaluechange', storypointswitch: 'storypointswitch', tabswitch: 'tabswitch', vizresize: 'vizresize' }, true);
	ss.initEnum($tab_ApiToolbarPosition, $asm, { top: 'top', bottom: 'bottom' }, true);
	ss.initClass($tab_CrossDomainMessagingOptions, $asm, {
		get_router: function CrossDomainMessagingOptions$get_Router() {
			return this.$router;
		},
		get_handler: function CrossDomainMessagingOptions$get_Handler() {
			return this.$handler;
		},
		sendCommand: function(T) {
			return function CrossDomainMessagingOptions$SendCommand(commandParameters, returnHandler) {
				this.$router.sendCommand(T).call(this.$router, this.$handler, commandParameters, returnHandler);
			};
		}
	});
	ss.initClass($tab_TableauEvent, $asm, {
		getViz: function TableauEvent$GetViz() {
			return this.$viz;
		},
		getEventName: function TableauEvent$GetEventName() {
			return this.$eventName;
		}
	});
	ss.initClass($tab_CustomViewEvent, $asm, {
		getCustomViewAsync: function CustomViewEvent$GetCustomViewAsync() {
			var deferred = new tab._Deferred();
			var customView = null;
			if (ss.isValue(this.$context.get__customViewImpl())) {
				customView = this.$context.get__customViewImpl().get_$customView();
			}
			deferred.resolve(customView);
			return deferred.get_promise();
		}
	}, $tab_TableauEvent);
	ss.initEnum($tab_DataType, $asm, { float: 'float', integer: 'integer', string: 'string', boolean: 'boolean', date: 'date', datetime: 'datetime' }, true);
	ss.initClass($tab_DataValue, $asm, {}, Object);
	ss.initClass($tab_WorksheetEvent, $asm, {
		getWorksheet: function WorksheetEvent$GetWorksheet() {
			return this.$worksheetImpl.get_worksheet();
		}
	}, $tab_TableauEvent);
	ss.initClass($tab_FilterEvent, $asm, {
		getFieldName: function FilterEvent$GetFieldName() {
			return this.$filterCaption;
		},
		getFilterAsync: function FilterEvent$GetFilterAsync() {
			return this.$context.get__worksheetImpl().$getFilterAsync(this.$context.get__filterFieldName(), null, null);
		}
	}, $tab_WorksheetEvent);
	ss.initClass($tab_FirstVizSizeKnownEvent, $asm, {
		getVizSize: function FirstVizSizeKnownEvent$GetVizSize() {
			return this.$vizSize;
		}
	}, $tab_TableauEvent);
	ss.initClass($tab_MarksEvent, $asm, {
		getMarksAsync: function MarksEvent$GetMarksAsync() {
			var worksheetImpl = this.$context.get__worksheetImpl();
			if (ss.isValue(worksheetImpl.get_selectedMarks())) {
				var deferred = new tab._Deferred();
				return deferred.resolve(worksheetImpl.get_selectedMarks()._toApiCollection());
			}
			return worksheetImpl.$getSelectedMarksAsync();
		}
	}, $tab_WorksheetEvent);
	ss.initClass($tab_ParameterEvent, $asm, {
		getParameterName: function ParameterEvent$GetParameterName() {
			return this.$context.get__parameterName();
		},
		getParameterAsync: function ParameterEvent$GetParameterAsync() {
			return this.$context.get__workbookImpl().$getSingleParameterAsync(this.$context.get__parameterName());
		}
	}, $tab_TableauEvent);
	ss.initClass($tab_Point, $asm, {}, Object);
	ss.initClass($tab_SheetSize, $asm, {}, Object);
	ss.initClass($tab_SheetSizeFactory, $asm, {});
	ss.initClass($tab_Size, $asm, {}, Object);
	ss.initClass($tab_StoryPointInfoImplUtil, $asm, {});
	ss.initClass($tab_StoryPointSwitchEvent, $asm, {
		getOldStoryPointInfo: function StoryPointSwitchEvent$GetOldStoryPointInfo() {
			return this.$oldStoryPointInfo;
		},
		getNewStoryPoint: function StoryPointSwitchEvent$GetNewStoryPoint() {
			return this.$newStoryPoint;
		}
	}, $tab_TableauEvent);
	ss.initClass($tab_TabSwitchEvent, $asm, {
		getOldSheetName: function TabSwitchEvent$GetOldSheetName() {
			return this.$oldName;
		},
		getNewSheetName: function TabSwitchEvent$GetNewSheetName() {
			return this.$newName;
		}
	}, $tab_TableauEvent);
	ss.initClass($tab_VizImpl, $asm, {
		add_customViewsListLoad: function VizImpl$add_CustomViewsListLoad(value) {
			this.$1$CustomViewsListLoadField = ss.delegateCombine(this.$1$CustomViewsListLoadField, value);
		},
		remove_customViewsListLoad: function VizImpl$remove_CustomViewsListLoad(value) {
			this.$1$CustomViewsListLoadField = ss.delegateRemove(this.$1$CustomViewsListLoadField, value);
		},
		add_stateReadyForQuery: function VizImpl$add_StateReadyForQuery(value) {
			this.$1$StateReadyForQueryField = ss.delegateCombine(this.$1$StateReadyForQueryField, value);
		},
		remove_stateReadyForQuery: function VizImpl$remove_StateReadyForQuery(value) {
			this.$1$StateReadyForQueryField = ss.delegateRemove(this.$1$StateReadyForQueryField, value);
		},
		add_$marksSelection: function VizImpl$add_MarksSelection(value) {
			this.$1$MarksSelectionField = ss.delegateCombine(this.$1$MarksSelectionField, value);
		},
		remove_$marksSelection: function VizImpl$remove_MarksSelection(value) {
			this.$1$MarksSelectionField = ss.delegateRemove(this.$1$MarksSelectionField, value);
		},
		add_$filterChange: function VizImpl$add_FilterChange(value) {
			this.$1$FilterChangeField = ss.delegateCombine(this.$1$FilterChangeField, value);
		},
		remove_$filterChange: function VizImpl$remove_FilterChange(value) {
			this.$1$FilterChangeField = ss.delegateRemove(this.$1$FilterChangeField, value);
		},
		add_$parameterValueChange: function VizImpl$add_ParameterValueChange(value) {
			this.$1$ParameterValueChangeField = ss.delegateCombine(this.$1$ParameterValueChangeField, value);
		},
		remove_$parameterValueChange: function VizImpl$remove_ParameterValueChange(value) {
			this.$1$ParameterValueChangeField = ss.delegateRemove(this.$1$ParameterValueChangeField, value);
		},
		add_$customViewLoad: function VizImpl$add_CustomViewLoad(value) {
			this.$1$CustomViewLoadField = ss.delegateCombine(this.$1$CustomViewLoadField, value);
		},
		remove_$customViewLoad: function VizImpl$remove_CustomViewLoad(value) {
			this.$1$CustomViewLoadField = ss.delegateRemove(this.$1$CustomViewLoadField, value);
		},
		add_$customViewSave: function VizImpl$add_CustomViewSave(value) {
			this.$1$CustomViewSaveField = ss.delegateCombine(this.$1$CustomViewSaveField, value);
		},
		remove_$customViewSave: function VizImpl$remove_CustomViewSave(value) {
			this.$1$CustomViewSaveField = ss.delegateRemove(this.$1$CustomViewSaveField, value);
		},
		add_$customViewRemove: function VizImpl$add_CustomViewRemove(value) {
			this.$1$CustomViewRemoveField = ss.delegateCombine(this.$1$CustomViewRemoveField, value);
		},
		remove_$customViewRemove: function VizImpl$remove_CustomViewRemove(value) {
			this.$1$CustomViewRemoveField = ss.delegateRemove(this.$1$CustomViewRemoveField, value);
		},
		add_$customViewSetDefault: function VizImpl$add_CustomViewSetDefault(value) {
			this.$1$CustomViewSetDefaultField = ss.delegateCombine(this.$1$CustomViewSetDefaultField, value);
		},
		remove_$customViewSetDefault: function VizImpl$remove_CustomViewSetDefault(value) {
			this.$1$CustomViewSetDefaultField = ss.delegateRemove(this.$1$CustomViewSetDefaultField, value);
		},
		add_$tabSwitch: function VizImpl$add_TabSwitch(value) {
			this.$1$TabSwitchField = ss.delegateCombine(this.$1$TabSwitchField, value);
		},
		remove_$tabSwitch: function VizImpl$remove_TabSwitch(value) {
			this.$1$TabSwitchField = ss.delegateRemove(this.$1$TabSwitchField, value);
		},
		add_$storyPointSwitch: function VizImpl$add_StoryPointSwitch(value) {
			this.$1$StoryPointSwitchField = ss.delegateCombine(this.$1$StoryPointSwitchField, value);
		},
		remove_$storyPointSwitch: function VizImpl$remove_StoryPointSwitch(value) {
			this.$1$StoryPointSwitchField = ss.delegateRemove(this.$1$StoryPointSwitchField, value);
		},
		add_$vizResize: function VizImpl$add_VizResize(value) {
			this.$1$VizResizeField = ss.delegateCombine(this.$1$VizResizeField, value);
		},
		remove_$vizResize: function VizImpl$remove_VizResize(value) {
			this.$1$VizResizeField = ss.delegateRemove(this.$1$VizResizeField, value);
		},
		get_handlerId: function VizImpl$get_HandlerId() {
			return this.$parameters.handlerId;
		},
		set_handlerId: function VizImpl$set_HandlerId(value) {
			this.$parameters.handlerId = value;
		},
		get_iframe: function VizImpl$get_Iframe() {
			return this.$iframe;
		},
		get_instanceId: function VizImpl$get_InstanceId() {
			return this.$instanceId;
		},
		set_instanceId: function VizImpl$set_InstanceId(value) {
			this.$instanceId = value;
		},
		get_$viz: function VizImpl$get_Viz() {
			return this.$viz;
		},
		get_$areTabsHidden: function VizImpl$get_AreTabsHidden() {
			return this.$areTabsHidden;
		},
		get_$isToolbarHidden: function VizImpl$get_IsToolbarHidden() {
			return this.$isToolbarHidden;
		},
		get_$isHidden: function VizImpl$get_IsHidden() {
			return this.$iframe.style.display === 'none';
		},
		get_$parentElement: function VizImpl$get_ParentElement() {
			return this.$parameters.parentElement;
		},
		get_$url: function VizImpl$get_Url() {
			return this.$parameters.get_baseUrl();
		},
		get_$workbook: function VizImpl$get_Workbook() {
			return this.$workbookImpl.get_workbook();
		},
		get__workbookImpl: function VizImpl$get_WorkbookImpl() {
			return this.$workbookImpl;
		},
		get_$areAutomaticUpdatesPaused: function VizImpl$get_AreAutomaticUpdatesPaused() {
			return this.$areAutomaticUpdatesPaused;
		},
		get_$vizSize: function VizImpl$get_VizSize() {
			return this.$vizSize;
		},
		getCurrentUrlAsync: function VizImpl$GetCurrentUrlAsync() {
			var deferred = new tab._Deferred();
			var returnHandler = new (ss.makeGenericType($tab_CommandReturnHandler$1, [String]))('api.GetCurrentUrlCommand', 0, function(result) {
				deferred.resolve(result);
			}, function(remoteError, message) {
				deferred.reject($tab__TableauException.createInternalError(message));
			});
			this._sendCommand(String).call(this, null, returnHandler);
			return deferred.get_promise();
		},
		handleVizListening: function VizImpl$HandleVizListening() {
			this.$enableVisibleRectCommunication();
		},
		handleVizLoad: function VizImpl$HandleVizLoad() {
			if (ss.isValue(this.$staticImage)) {
				this.$staticImage.style.display = 'none';
			}
			if (ss.isNullOrUndefined(this.$workbookImpl)) {
				this.$workbookImpl = new $tab__WorkbookImpl(this, this.$messagingOptions, ss.mkdel(this, function() {
					this.$onWorkbookInteractive(null);
				}));
			}
			else if (!this.$initializingWorkbookImpl) {
				this.$workbookImpl._update(ss.mkdel(this, function() {
					this.$onWorkbookInteractive(null);
				}));
			}
		},
		$calculateFrameSize: function VizImpl$CalculateFrameSize(availableSize) {
			var chromeHeight = this.$vizSize.chromeHeight;
			var sheetSize = this.$vizSize.sheetSize;
			var width = 0;
			var height = 0;
			if (sheetSize.behavior === 'exactly') {
				width = sheetSize.maxSize.width;
				height = sheetSize.maxSize.height + chromeHeight;
			}
			else {
				var minWidth;
				var maxWidth;
				var minHeight;
				var maxHeight;
				switch (sheetSize.behavior) {
					case 'range': {
						minWidth = sheetSize.minSize.width;
						maxWidth = sheetSize.maxSize.width;
						minHeight = sheetSize.minSize.height + chromeHeight;
						maxHeight = sheetSize.maxSize.height + chromeHeight;
						width = Math.max(minWidth, Math.min(maxWidth, availableSize.width));
						height = Math.max(minHeight, Math.min(maxHeight, availableSize.height));
						break;
					}
					case 'atleast': {
						minWidth = sheetSize.minSize.width;
						minHeight = sheetSize.minSize.height + chromeHeight;
						width = Math.max(minWidth, availableSize.width);
						height = Math.max(minHeight, availableSize.height);
						break;
					}
					case 'atmost': {
						maxWidth = sheetSize.maxSize.width;
						maxHeight = sheetSize.maxSize.height + chromeHeight;
						width = Math.min(maxWidth, availableSize.width);
						height = Math.min(maxHeight, availableSize.height);
						break;
					}
					case 'automatic': {
						width = availableSize.width;
						height = Math.max(availableSize.height, chromeHeight);
						break;
					}
					default: {
						throw $tab__TableauException.createInternalError('Unknown SheetSizeBehavior for viz: ' + sheetSize.behavior.toString());
					}
				}
			}
			return $tab_Size.$ctor(width, height);
		},
		$getNewFrameSize: function VizImpl$GetNewFrameSize() {
			var availableSize;
			if (ss.isValue(this.$initialAvailableSize)) {
				availableSize = this.$initialAvailableSize;
				this.$initialAvailableSize = null;
			}
			else {
				availableSize = $tab__Utility.computeContentSize(this.get_$parentElement());
			}
			this.$raiseVizResizeEvent(availableSize);
			return this.$calculateFrameSize(availableSize);
		},
		$refreshSize: function VizImpl$RefreshSize() {
			if (!ss.isValue(this.$vizSize)) {
				return;
			}
			var frameSize = this.$getNewFrameSize();
			this.$setFrameSize(frameSize.width + 'px', frameSize.height + 'px');
			var resizeAttempts = 10;
			for (var i = 0; i < resizeAttempts; i++) {
				var newFrameSize = this.$getNewFrameSize();
				if (ss.referenceEquals(JSON.stringify(frameSize), JSON.stringify(newFrameSize))) {
					return;
				}
				frameSize = newFrameSize;
				this.$setFrameSize(frameSize.width + 'px', frameSize.height + 'px');
			}
			throw $tab__TableauException.create('maxVizResizeAttempts', 'Viz resize limit hit. The calculated iframe size did not stabilize after ' + resizeAttempts + ' resizes.');
		},
		handleEventNotification: function VizImpl$HandleEventNotification(eventName, eventParameters) {
			var notification = $tab__ApiServerNotification.deserialize(eventParameters);
			switch (eventName) {
				case 'api.FirstVizSizeKnownEvent': {
					this.$handleFirstVizSizeKnownEvent(notification);
					break;
				}
				case 'api.VizInteractiveEvent': {
					this.$handleVizInteractiveEvent(notification);
					break;
				}
				case 'api.MarksSelectionChangedEvent': {
					this.$handleMarksSelectionChangedEvent(notification);
					break;
				}
				case 'api.FilterChangedEvent': {
					this.$handleFilterChangedEvent(notification);
					break;
				}
				case 'api.ParameterChangedEvent': {
					this.$handleParameterChangedEvent(notification);
					break;
				}
				case 'api.CustomViewsListLoadedEvent': {
					this.$handleCustomViewsListLoadedEvent(notification);
					break;
				}
				case 'api.CustomViewUpdatedEvent': {
					this.$handleCustomViewUpdatedEvent(notification);
					break;
				}
				case 'api.CustomViewRemovedEvent': {
					this.$handleCustomViewRemovedEvent();
					break;
				}
				case 'api.CustomViewSetDefaultEvent': {
					this.$handleCustomViewSetDefaultEvent(notification);
					break;
				}
				case 'api.TabSwitchEvent': {
					this.$handleTabSwitchEvent(notification);
					break;
				}
				case 'api.StorytellingStateChangedEvent': {
					this.$handleStorytellingStateChangedEvent(notification);
					break;
				}
			}
		},
		addEventListener: function VizImpl$AddEventListener(eventName, handler) {
			var normalizedEventName = {};
			if (!$tab_$PublicEnums.$tryNormalizeEnum($tab_ApiTableauEventName).call(null, eventName, normalizedEventName)) {
				throw $tab__TableauException.createUnsupportedEventName(eventName.toString());
			}
			switch (normalizedEventName.$) {
				case 'marksselection': {
					this.add_$marksSelection(ss.cast(handler, Function));
					break;
				}
				case 'parametervaluechange': {
					this.add_$parameterValueChange(ss.cast(handler, Function));
					break;
				}
				case 'filterchange': {
					this.add_$filterChange(ss.cast(handler, Function));
					break;
				}
				case 'customviewload': {
					this.add_$customViewLoad(ss.cast(handler, Function));
					break;
				}
				case 'customviewsave': {
					this.add_$customViewSave(ss.cast(handler, Function));
					break;
				}
				case 'customviewremove': {
					this.add_$customViewRemove(ss.cast(handler, Function));
					break;
				}
				case 'customviewsetdefault': {
					this.add_$customViewSetDefault(ss.cast(handler, Function));
					break;
				}
				case 'tabswitch': {
					this.add_$tabSwitch(ss.cast(handler, Function));
					break;
				}
				case 'storypointswitch': {
					this.add_$storyPointSwitch(ss.cast(handler, Function));
					break;
				}
				case 'vizresize': {
					this.add_$vizResize(ss.cast(handler, Function));
					break;
				}
			}
		},
		removeEventListener: function VizImpl$RemoveEventListener(eventName, handler) {
			var normalizedEventName = {};
			if (!$tab_$PublicEnums.$tryNormalizeEnum($tab_ApiTableauEventName).call(null, eventName, normalizedEventName)) {
				throw $tab__TableauException.createUnsupportedEventName(eventName.toString());
			}
			switch (normalizedEventName.$) {
				case 'marksselection': {
					this.remove_$marksSelection(ss.cast(handler, Function));
					break;
				}
				case 'parametervaluechange': {
					this.remove_$parameterValueChange(ss.cast(handler, Function));
					break;
				}
				case 'filterchange': {
					this.remove_$filterChange(ss.cast(handler, Function));
					break;
				}
				case 'customviewload': {
					this.remove_$customViewLoad(ss.cast(handler, Function));
					break;
				}
				case 'customviewsave': {
					this.remove_$customViewSave(ss.cast(handler, Function));
					break;
				}
				case 'customviewremove': {
					this.remove_$customViewRemove(ss.cast(handler, Function));
					break;
				}
				case 'customviewsetdefault': {
					this.remove_$customViewSetDefault(ss.cast(handler, Function));
					break;
				}
				case 'tabswitch': {
					this.remove_$tabSwitch(ss.cast(handler, Function));
					break;
				}
				case 'storypointswitch': {
					this.remove_$storyPointSwitch(ss.cast(handler, Function));
					break;
				}
				case 'vizresize': {
					this.remove_$vizResize(ss.cast(handler, Function));
					break;
				}
			}
		},
		$dispose: function VizImpl$Dispose() {
			if (ss.isValue(this.$iframe)) {
				this.$iframe.parentNode.removeChild(this.$iframe);
				this.$iframe = null;
			}
			$tab__VizManagerImpl.$unregisterViz(this.$viz);
			this.$messagingOptions.get_router().unregisterHandler(this);
			this.$removeWindowResizeHandler();
		},
		$show: function VizImpl$Show() {
			this.$iframe.style.display = 'block';
			this.$iframe.style.visibility = 'visible';
		},
		$hide: function VizImpl$Hide() {
			this.$iframe.style.display = 'none';
		},
		$makeInvisible: function VizImpl$MakeInvisible() {
			this.$iframe.style.visibility = 'hidden';
		},
		$showExportImageDialog: function VizImpl$ShowExportImageDialog() {
			this.$invokeCommand('showExportImageDialog');
		},
		$showExportDataDialog: function VizImpl$ShowExportDataDialog(sheetOrInfoOrName) {
			var sheetName = this.$verifyOperationAllowedOnActiveSheetOrSheetWithinActiveDashboard(sheetOrInfoOrName);
			this.$invokeCommand('showExportDataDialog', sheetName);
		},
		$showExportCrossTabDialog: function VizImpl$ShowExportCrossTabDialog(sheetOrInfoOrName) {
			var sheetName = this.$verifyOperationAllowedOnActiveSheetOrSheetWithinActiveDashboard(sheetOrInfoOrName);
			this.$invokeCommand('showExportCrosstabDialog', sheetName);
		},
		$showExportPDFDialog: function VizImpl$ShowExportPDFDialog() {
			this.$invokeCommand('showExportPDFDialog');
		},
		$revertAllAsync: function VizImpl$RevertAllAsync() {
			var deferred = new tab._Deferred();
			var returnHandler = new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))('api.RevertAllCommand', 1, function(result) {
				deferred.resolve();
			}, function(remoteError, message) {
				deferred.reject($tab__TableauException.createServerError(message));
			});
			this._sendCommand(Object).call(this, null, returnHandler);
			return deferred.get_promise();
		},
		$refreshDataAsync: function VizImpl$RefreshDataAsync() {
			var deferred = new tab._Deferred();
			var returnHandler = new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))('api.RefreshDataCommand', 1, function(result) {
				deferred.resolve();
			}, function(remoteError, message) {
				deferred.reject($tab__TableauException.createServerError(message));
			});
			this._sendCommand(Object).call(this, null, returnHandler);
			return deferred.get_promise();
		},
		$showShareDialog: function VizImpl$ShowShareDialog() {
			this.$invokeCommand('showShareDialog');
		},
		$showDownloadWorkbookDialog: function VizImpl$ShowDownloadWorkbookDialog() {
			if (this.get__workbookImpl().get_isDownloadAllowed()) {
				this.$invokeCommand('showDownloadWorkbookDialog');
			}
			else {
				throw $tab__TableauException.create('downloadWorkbookNotAllowed', 'Download workbook is not allowed');
			}
		},
		$pauseAutomaticUpdatesAsync: function VizImpl$PauseAutomaticUpdatesAsync() {
			return this.$invokeAutomaticUpdatesCommandAsync('pauseAutomaticUpdates');
		},
		$resumeAutomaticUpdatesAsync: function VizImpl$ResumeAutomaticUpdatesAsync() {
			return this.$invokeAutomaticUpdatesCommandAsync('resumeAutomaticUpdates');
		},
		$toggleAutomaticUpdatesAsync: function VizImpl$ToggleAutomaticUpdatesAsync() {
			return this.$invokeAutomaticUpdatesCommandAsync('toggleAutomaticUpdates');
		},
		$setFrameSizeAndUpdate: function VizImpl$SetFrameSizeAndUpdate(width, height) {
			this.$raiseVizResizeEvent($tab_Size.$ctor(-1, -1));
			this.$setFrameSize(width, height);
			this.$workbookImpl._updateActiveSheetAsync();
		},
		$setAreAutomaticUpdatesPaused: function VizImpl$SetAreAutomaticUpdatesPaused(value) {
			this.$areAutomaticUpdatesPaused = value;
		},
		$contentRootElement: function VizImpl$ContentRootElement() {
			return this.$parameters.parentElement;
		},
		$create: function VizImpl$Create() {
			try {
				$tab__VizManagerImpl.$registerViz(this.$viz);
			}
			catch ($t1) {
				var e = ss.Exception.wrap($t1);
				this.$dispose();
				throw e;
			}
			if (!this.$parameters.fixedSize) {
				this.$initialAvailableSize = $tab__Utility.computeContentSize(this.get_$parentElement());
				if (this.$initialAvailableSize.width === 0 || this.$initialAvailableSize.height === 0) {
					this.$initialAvailableSize = $tab_Size.$ctor(800, 600);
				}
				this.$iframe = this.$createIframe();
				this.$makeInvisible();
				if (this.$parameters.displayStaticImage) {
					this.$staticImage = this.$createStaticImageElement(this.$initialAvailableSize);
					this.$staticImage.style.display = 'block';
				}
			}
			else {
				if (this.$parameters.displayStaticImage) {
					this.$staticImage = this.$createStaticImageElement($tab_Size.$ctor(parseInt(this.$parameters.width), parseInt(this.$parameters.height)));
					this.$staticImage.style.display = 'block';
				}
				this.$iframe = this.$createIframe();
				this.$show();
			}
			if (!$tab__Utility.hasWindowPostMessage()) {
				if ($tab__Utility.isIE()) {
					this.$iframe['onreadystatechange'] = this.$getOnCheckForDoneDelegate();
				}
				else {
					this.$iframe.onload = this.$getOnCheckForDoneDelegate();
				}
			}
			this.$isToolbarHidden = !this.$parameters.toolbar;
			this.$areTabsHidden = !this.$parameters.tabs;
			this.$messagingOptions.get_router().registerHandler(this);
			this.$iframe.src = this.$parameters.get_url();
		},
		$sendVisibleRect: function VizImpl$SendVisibleRect() {
			try {
				if (!$tab__Utility.hasWindowPostMessage() || ss.isNullOrUndefined(this.$iframe) || !ss.isValue(this.$iframe.contentWindow)) {
					return;
				}
			}
			catch ($t1) {
				return;
			}
			var visibleRect = $tab__Utility.visibleContentRectInDocumentCoordinates(this.get_iframe());
			var iframeContentRect = $tab__Utility.contentRectInDocumentCoordinates(this.get_iframe());
			var param = [];
			param.push('layoutInfoResp'.toString());
			param.push(visibleRect.left - iframeContentRect.left);
			param.push(visibleRect.top - iframeContentRect.top);
			param.push(visibleRect.width);
			param.push(visibleRect.height);
			this.$iframe.contentWindow.postMessage(param.join(','), '*');
		},
		$enableVisibleRectCommunication: function VizImpl$EnableVisibleRectCommunication() {
			if (!$tab__Utility.hasWindowPostMessage() || ss.isNullOrUndefined(this.$iframe) || !ss.isValue(this.$iframe.contentWindow)) {
				return;
			}
			this.$iframe.contentWindow.postMessage('tableau.enableVisibleRectCommunication'.toString(), '*');
		},
		_sendCommand: function(T) {
			return function VizImpl$SendCommand(commandParameters, returnHandler) {
				this.$messagingOptions.sendCommand(T).call(this.$messagingOptions, commandParameters, returnHandler);
			};
		},
		$raiseParameterValueChange: function VizImpl$RaiseParameterValueChange(parameterName) {
			if (!ss.staticEquals(this.$1$ParameterValueChangeField, null)) {
				this.$1$ParameterValueChangeField(new $tab_ParameterEvent('parametervaluechange', this.$viz, parameterName));
			}
		},
		$raiseCustomViewLoad: function VizImpl$RaiseCustomViewLoad(customView) {
			this.get__workbookImpl()._update(ss.mkdel(this, function() {
				if (!ss.staticEquals(this.$1$CustomViewLoadField, null)) {
					this.$1$CustomViewLoadField(new $tab_CustomViewEvent('customviewload', this.$viz, (ss.isValue(customView) ? customView._impl : null)));
				}
			}));
		},
		$raiseCustomViewSave: function VizImpl$RaiseCustomViewSave(customView) {
			this.get__workbookImpl()._update(ss.mkdel(this, function() {
				if (!ss.staticEquals(this.$1$CustomViewSaveField, null)) {
					this.$1$CustomViewSaveField(new $tab_CustomViewEvent('customviewsave', this.$viz, customView._impl));
				}
			}));
		},
		$raiseCustomViewRemove: function VizImpl$RaiseCustomViewRemove(customView) {
			if (!ss.staticEquals(this.$1$CustomViewRemoveField, null)) {
				this.$1$CustomViewRemoveField(new $tab_CustomViewEvent('customviewremove', this.$viz, customView._impl));
			}
		},
		$raiseCustomViewSetDefault: function VizImpl$RaiseCustomViewSetDefault(customView) {
			if (!ss.staticEquals(this.$1$CustomViewSetDefaultField, null)) {
				this.$1$CustomViewSetDefaultField(new $tab_CustomViewEvent('customviewsetdefault', this.$viz, customView._impl));
			}
		},
		$raiseTabSwitch: function VizImpl$RaiseTabSwitch(oldSheetName, newSheetName) {
			if (!ss.staticEquals(this.$1$TabSwitchField, null)) {
				this.$1$TabSwitchField(new $tab_TabSwitchEvent('tabswitch', this.$viz, oldSheetName, newSheetName));
			}
		},
		raiseStoryPointSwitch: function VizImpl$RaiseStoryPointSwitch(oldStoryPointInfo, newStoryPoint) {
			if (!ss.staticEquals(this.$1$StoryPointSwitchField, null)) {
				this.$1$StoryPointSwitchField(new $tab_StoryPointSwitchEvent('storypointswitch', this.$viz, oldStoryPointInfo, newStoryPoint));
			}
		},
		$raiseStateReadyForQuery: function VizImpl$RaiseStateReadyForQuery() {
			if (!ss.staticEquals(this.$1$StateReadyForQueryField, null)) {
				this.$1$StateReadyForQueryField(this);
			}
		},
		$raiseCustomViewsListLoad: function VizImpl$RaiseCustomViewsListLoad() {
			if (!ss.staticEquals(this.$1$CustomViewsListLoadField, null)) {
				this.$1$CustomViewsListLoadField(this);
			}
		},
		$raiseVizResizeEvent: function VizImpl$RaiseVizResizeEvent(availableSize) {
			if (!ss.staticEquals(this.$1$VizResizeField, null)) {
				this.$1$VizResizeField(new $tab_VizResizeEvent('vizresize', this.$viz, availableSize));
			}
		},
		$setFrameSize: function VizImpl$SetFrameSize(width, height) {
			this.$parameters.width = width;
			this.$parameters.height = height;
			this.$iframe.style.width = this.$parameters.width;
			this.$iframe.style.height = this.$parameters.height;
		},
		$verifyOperationAllowedOnActiveSheetOrSheetWithinActiveDashboard: function VizImpl$VerifyOperationAllowedOnActiveSheetOrSheetWithinActiveDashboard(sheetOrInfoOrName) {
			if (ss.isNullOrUndefined(sheetOrInfoOrName)) {
				return null;
			}
			var sheetImpl = this.$workbookImpl.$findActiveSheetOrSheetWithinActiveDashboard(sheetOrInfoOrName);
			if (ss.isNullOrUndefined(sheetImpl)) {
				throw $tab__TableauException.createNotActiveSheet();
			}
			return sheetImpl.get_name();
		},
		$invokeAutomaticUpdatesCommandAsync: function VizImpl$InvokeAutomaticUpdatesCommandAsync(command) {
			if (command !== 'pauseAutomaticUpdates' && command !== 'resumeAutomaticUpdates' && command !== 'toggleAutomaticUpdates') {
				throw $tab__TableauException.createInternalError(null);
			}
			var param = {};
			param['api.invokeCommandName'] = command;
			var deferred = new tab._Deferred();
			var returnHandler = new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))('api.InvokeCommandCommand', 0, ss.mkdel(this, function(result) {
				if (ss.isValue(result) && ss.isValue(result.isAutoUpdate)) {
					this.$areAutomaticUpdatesPaused = !result.isAutoUpdate;
				}
				deferred.resolve(this.$areAutomaticUpdatesPaused);
			}), function(remoteError, message) {
				deferred.reject($tab__TableauException.createServerError(message));
			});
			this._sendCommand(Object).call(this, param, returnHandler);
			return deferred.get_promise();
		},
		$invokeCommand: function VizImpl$InvokeCommand(command, sheetName) {
			if (command !== 'showExportImageDialog' && command !== 'showExportDataDialog' && command !== 'showExportCrosstabDialog' && command !== 'showExportPDFDialog' && command !== 'showShareDialog' && command !== 'showDownloadWorkbookDialog') {
				throw $tab__TableauException.createInternalError(null);
			}
			var param = {};
			param['api.invokeCommandName'] = command;
			if (ss.isValue(sheetName)) {
				param['api.invokeCommandParam'] = sheetName;
			}
			var returnHandler = new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))('api.InvokeCommandCommand', 0, null, null);
			this._sendCommand(Object).call(this, param, returnHandler);
		},
		$handleFirstVizSizeKnownEvent: function VizImpl$HandleFirstVizSizeKnownEvent(notification) {
			var size = JSON.parse(ss.cast(notification.get_data(), String));
			this.$handleInitialVizSize(size);
		},
		$handleVizInteractiveEvent: function VizImpl$HandleVizInteractiveEvent(notification) {
			if (ss.isValue(this.$workbookImpl) && ss.referenceEquals(this.$workbookImpl.get_name(), notification.get_workbookName())) {
				this.$onWorkbookInteractive(null);
			}
			else {
				this.$raiseStateReadyForQuery();
			}
		},
		$handleMarksSelectionChangedEvent: function VizImpl$HandleMarksSelectionChangedEvent(notification) {
			if (ss.staticEquals(this.$1$MarksSelectionField, null) || !ss.referenceEquals(this.$workbookImpl.get_name(), notification.get_workbookName())) {
				return;
			}
			var worksheetImpl = null;
			var activeSheetImpl = this.$workbookImpl.get_activeSheetImpl();
			if (activeSheetImpl.get_isStory()) {
				activeSheetImpl = ss.cast(activeSheetImpl, $tab__StoryImpl).get_activeStoryPointImpl().get_containedSheetImpl();
			}
			if (ss.referenceEquals(activeSheetImpl.get_name(), notification.get_worksheetName())) {
				worksheetImpl = ss.cast(activeSheetImpl, $tab__WorksheetImpl);
			}
			else if (activeSheetImpl.get_isDashboard()) {
				var dashboardImpl = ss.cast(activeSheetImpl, $tab__DashboardImpl);
				worksheetImpl = dashboardImpl.get_worksheets()._get(notification.get_worksheetName())._impl;
			}
			if (ss.isValue(worksheetImpl)) {
				worksheetImpl.set_selectedMarks(null);
				this.$1$MarksSelectionField(new $tab_MarksEvent('marksselection', this.$viz, worksheetImpl));
			}
		},
		$handleFilterChangedEvent: function VizImpl$HandleFilterChangedEvent(notification) {
			if (!ss.staticEquals(this.$1$FilterChangeField, null)) {
				if (ss.referenceEquals(this.$workbookImpl.get_name(), notification.get_workbookName())) {
					var worksheetImpl = null;
					var activeSheetImpl = this.$workbookImpl.get_activeSheetImpl();
					if (ss.referenceEquals(activeSheetImpl.get_name(), notification.get_worksheetName())) {
						worksheetImpl = ss.cast(activeSheetImpl, $tab__WorksheetImpl);
					}
					else if (activeSheetImpl.get_isDashboard()) {
						var db = ss.cast(activeSheetImpl, $tab__DashboardImpl);
						worksheetImpl = db.get_worksheets()._get(notification.get_worksheetName())._impl;
					}
					if (ss.isValue(worksheetImpl)) {
						var results = ss.cast(JSON.parse(ss.cast(notification.get_data(), String)), Array);
						var filterFieldName = results[0];
						var filterCaption = results[1];
						this.$1$FilterChangeField(new $tab_FilterEvent('filterchange', this.$viz, worksheetImpl, filterFieldName, filterCaption));
					}
				}
			}
		},
		$handleParameterChangedEvent: function VizImpl$HandleParameterChangedEvent(notification) {
			if (!ss.staticEquals(this.$1$ParameterValueChangeField, null)) {
				if (ss.referenceEquals(this.$workbookImpl.get_name(), notification.get_workbookName())) {
					this.$workbookImpl.set_$lastChangedParameterImpl(null);
					var parameterName = ss.cast(notification.get_data(), String);
					this.$raiseParameterValueChange(parameterName);
				}
			}
		},
		$handleCustomViewsListLoadedEvent: function VizImpl$HandleCustomViewsListLoadedEvent(notification) {
			var info = JSON.parse(ss.cast(notification.get_data(), String));
			var process = ss.mkdel(this, function() {
				$tab__CustomViewImpl._processCustomViews(this.$workbookImpl, this.$messagingOptions, info);
			});
			var raiseEvents = ss.mkdel(this, function() {
				this.$raiseCustomViewsListLoad();
				if (!ss.staticEquals(this.$1$CustomViewLoadField, null) && !info.customViewLoaded) {
					this.$raiseCustomViewLoad(this.$workbookImpl.get_activeCustomView());
				}
			});
			if (ss.isNullOrUndefined(this.$workbookImpl)) {
				this.$initializingWorkbookImpl = true;
				this.$workbookImpl = new $tab__WorkbookImpl(this, this.$messagingOptions, ss.mkdel(this, function() {
					process();
					this.$onWorkbookInteractive(raiseEvents);
					this.$initializingWorkbookImpl = false;
				}));
			}
			else {
				process();
				this.$ensureCalledAfterFirstInteractive(raiseEvents);
			}
		},
		$handleCustomViewUpdatedEvent: function VizImpl$HandleCustomViewUpdatedEvent(notification) {
			var info = JSON.parse(ss.cast(notification.get_data(), String));
			if (ss.isNullOrUndefined(this.$workbookImpl)) {
				this.$workbookImpl = new $tab__WorkbookImpl(this, this.$messagingOptions, null);
			}
			if (ss.isValue(this.$workbookImpl)) {
				$tab__CustomViewImpl._processCustomViewUpdate(this.$workbookImpl, this.$messagingOptions, info, true);
			}
			if (!ss.staticEquals(this.$1$CustomViewSaveField, null)) {
				var updated = this.$workbookImpl.get_$updatedCustomViews()._toApiCollection();
				for (var i = 0, len = updated.length; i < len; i++) {
					this.$raiseCustomViewSave(updated[i]);
				}
			}
		},
		$handleCustomViewRemovedEvent: function VizImpl$HandleCustomViewRemovedEvent() {
			if (!ss.staticEquals(this.$1$CustomViewRemoveField, null)) {
				var removed = this.$workbookImpl.get_$removedCustomViews()._toApiCollection();
				for (var i = 0, len = removed.length; i < len; i++) {
					this.$raiseCustomViewRemove(removed[i]);
				}
			}
		},
		$handleCustomViewSetDefaultEvent: function VizImpl$HandleCustomViewSetDefaultEvent(notification) {
			var info = JSON.parse(ss.cast(notification.get_data(), String));
			if (ss.isValue(this.$workbookImpl)) {
				$tab__CustomViewImpl._processCustomViews(this.$workbookImpl, this.$messagingOptions, info);
			}
			if (!ss.staticEquals(this.$1$CustomViewSetDefaultField, null) && ss.isValue(info.defaultCustomViewId)) {
				var views = this.$workbookImpl.get_$customViews();
				for (var i = 0; i < views.get__length(); i++) {
					var view = views.get_item(i);
					if (view.getDefault()) {
						this.$raiseCustomViewSetDefault(view);
						break;
					}
				}
			}
		},
		$handleTabSwitchEvent: function VizImpl$HandleTabSwitchEvent(notification) {
			this.$workbookImpl._update(ss.mkdel(this, function() {
				if (ss.isValue(this.$workbookTabSwitchHandler)) {
					this.$workbookTabSwitchHandler();
				}
				if (ss.referenceEquals(this.$workbookImpl.get_name(), notification.get_workbookName())) {
					var oldSheetName = notification.get_worksheetName();
					var currSheetName = ss.cast(notification.get_data(), String);
					this.$raiseTabSwitch(oldSheetName, currSheetName);
				}
				this.$onWorkbookInteractive(null);
			}));
		},
		$handleStorytellingStateChangedEvent: function VizImpl$HandleStorytellingStateChangedEvent(notification) {
			var storyImpl = ss.cast(this.$workbookImpl.get_activeSheetImpl(), $tab__StoryImpl);
			if (storyImpl.get_sheetType() === 'story') {
				storyImpl.update(JSON.parse(ss.cast(notification.get_data(), String)));
			}
		},
		$onWorkbookInteractive: function VizImpl$OnWorkbookInteractive(actionAfterFirstInteractive) {
			if (!this.$onFirstInteractiveAlreadyCalled) {
				var callback = this.$onFirstInteractiveCallback;
				window.setTimeout(ss.mkdel(this, function() {
					if (!ss.staticEquals(callback, null)) {
						callback(new $tab_TableauEvent('firstinteractive', this.$viz));
					}
					if (!ss.staticEquals(actionAfterFirstInteractive, null)) {
						actionAfterFirstInteractive();
					}
				}), 0);
				this.$onFirstInteractiveAlreadyCalled = true;
			}
			this.$raiseStateReadyForQuery();
		},
		$ensureCalledAfterFirstInteractive: function VizImpl$EnsureCalledAfterFirstInteractive(action) {
			var start = new Date();
			var poll = null;
			poll = ss.mkdel(this, function() {
				var now = new Date();
				if (this.$onFirstInteractiveAlreadyCalled) {
					action();
				}
				else if (now - start > 300000) {
					throw $tab__TableauException.createInternalError('Timed out while waiting for the viz to become interactive');
				}
				else {
					window.setTimeout(poll, 10);
				}
			});
			poll();
		},
		$checkForDone: function VizImpl$CheckForDone() {
			if ($tab__Utility.isIE()) {
				if (this.$iframe['readyState'] === 'complete') {
					this.handleVizLoad();
				}
			}
			else {
				this.handleVizLoad();
			}
		},
		$onCheckForDone: function VizImpl$OnCheckForDone() {
			window.setTimeout(ss.mkdel(this, this.$checkForDone), 3000);
		},
		$createStaticImageElement: function VizImpl$CreateStaticImageElement(initialSize) {
			var $t1 = document.createElement('div');
			var img = ss.cast($t1, ss.isValue($t1) && (ss.isInstanceOfType($t1, Element) && $t1.tagName === 'DIV'));
			img.style.background = "transparent url('" + this.$parameters.staticImageUrl + "') no-repeat scroll 0 0";
			img.style.left = '8px';
			img.style.top = (this.$parameters.tabs ? '31px' : '9px');
			img.style.position = 'absolute';
			img.style.width = initialSize.width + 'px';
			img.style.height = initialSize.height + 'px';
			this.$contentRootElement().appendChild(img);
			return img;
		},
		$createIframe: function VizImpl$CreateIframe() {
			if (ss.isNullOrUndefined(this.$contentRootElement())) {
				return null;
			}
			var $t1 = document.createElement('IFrame');
			var ifr = ss.cast($t1, ss.isValue($t1) && (ss.isInstanceOfType($t1, Element) && $t1.tagName === 'IFRAME'));
			ifr.frameBorder = '0';
			ifr.setAttribute('allowTransparency', 'true');
			ifr.setAttribute('allowFullScreen', 'true');
			ifr.marginHeight = '0';
			ifr.marginWidth = '0';
			ifr.style.display = 'block';
			if (this.$parameters.fixedSize) {
				ifr.style.width = this.$parameters.width;
				ifr.style.height = this.$parameters.height;
			}
			else {
				ifr.style.width = '1px';
				ifr.style.height = '1px';
				ifr.setAttribute('scrolling', 'no');
			}
			if ($tab__Utility.isSafari()) {
				ifr.addEventListener('mousewheel', ss.mkdel(this, this.$onIframeMouseWheel), false);
			}
			this.$contentRootElement().appendChild(ifr);
			return ifr;
		},
		$onIframeMouseWheel: function VizImpl$OnIframeMouseWheel(e) {
		},
		$getOnCheckForDoneDelegate: function VizImpl$GetOnCheckForDoneDelegate() {
			return ss.mkdel(this, function(e) {
				this.$onCheckForDone();
			});
		},
		$handleInitialVizSize: function VizImpl$HandleInitialVizSize(vizAndChromeSize) {
			var sheetSize = $tab_SheetSizeFactory.fromSizeConstraints(vizAndChromeSize.sizeConstraints);
			this.$vizSize = $tab_VizSize.$ctor(sheetSize, vizAndChromeSize.chromeHeight);
			if (ss.isValue(this.$onFirstVizSizeKnownCallback)) {
				this.$onFirstVizSizeKnownCallback(new $tab_FirstVizSizeKnownEvent('firstvizsizeknown', this.$viz, this.$vizSize));
			}
			if (this.$parameters.fixedSize) {
				return;
			}
			this.$refreshSize();
			this.$addWindowResizeHandler();
			this.$show();
		},
		$removeWindowResizeHandler: function VizImpl$RemoveWindowResizeHandler() {
			if (ss.isNullOrUndefined(this.$windowResizeHandler)) {
				return;
			}
			if ($tab__Utility.hasWindowAddEventListener()) {
				window.removeEventListener('resize', this.$windowResizeHandler, false);
			}
			else {
				window.self.detachEvent('onresize', this.$windowResizeHandler);
			}
			this.$windowResizeHandler = null;
		},
		$addWindowResizeHandler: function VizImpl$AddWindowResizeHandler() {
			if (ss.isValue(this.$windowResizeHandler)) {
				return;
			}
			this.$windowResizeHandler = ss.mkdel(this, function() {
				this.$refreshSize();
			});
			if ($tab__Utility.hasWindowAddEventListener()) {
				window.addEventListener('resize', this.$windowResizeHandler, false);
			}
			else {
				window.self.attachEvent('onresize', this.$windowResizeHandler);
			}
		}
	}, null, [$tab_ICrossDomainMessageHandler]);
	ss.initClass($tab_VizResizeEvent, $asm, {
		getAvailableSize: function VizResizeEvent$GetAvailableSize() {
			return this.$availableSize;
		}
	}, $tab_TableauEvent);
	ss.initClass($tab_VizSize, $asm, {}, Object);
	ss.initClass($tableauSoftware_Filter, $asm, {
		getFilterType: function Filter$GetFilterType() {
			return this.$type;
		},
		getFieldName: function Filter$GetFieldName() {
			return this.$caption;
		},
		getWorksheet: function Filter$GetWorksheet() {
			return this.$worksheetImpl.get_worksheet();
		},
		getFieldAsync: function Filter$GetFieldAsync() {
			var deferred = new tab._Deferred();
			if (ss.isNullOrUndefined(this.$field)) {
				var rejected = function(e) {
					deferred.reject(e);
					return null;
				};
				var fulfilled = ss.mkdel(this, function(value) {
					this.$field = new $tableauSoftware_Field(value, this.$caption, this.$fieldRole, this.$fieldAggregation);
					deferred.resolve(this.$field);
					return null;
				});
				this.$worksheetImpl.$getDataSourceAsync(this.$dataSourceName).then(fulfilled, rejected);
			}
			else {
				window.setTimeout(ss.mkdel(this, function() {
					deferred.resolve(this.$field);
				}), 0);
			}
			return deferred.get_promise();
		},
		_update: function Filter$Update(pm) {
			this.$initializeFromJson(pm);
			this._updateFromJson(pm);
		},
		_addFieldParams: function Filter$AddFieldParams(param) {
		},
		_updateFromJson: null,
		$initializeFromJson: function Filter$InitializeFromJson(pm) {
			this.$caption = pm.caption;
			this.$type = $tab_ApiEnumConverter.convertFilterType(pm.filterType);
			this.$field = null;
			this.$dataSourceName = pm.dataSourceName;
			this.$fieldRole = $tab_ApiEnumConverter.convertFieldRole(ss.coalesce(pm.fieldRole, 'unknown'));
			this.$fieldAggregation = $tab_ApiEnumConverter.convertFieldAggregation(ss.coalesce(pm.fieldAggregation, 'NONE'));
		}
	});
	ss.initClass($tableauSoftware_CategoricalFilter, $asm, {
		getIsExcludeMode: function CategoricalFilter$GetIsExcludeMode() {
			return this.$isExclude;
		},
		getAppliedValues: function CategoricalFilter$GetAppliedValues() {
			return this.$appliedValues;
		},
		_updateFromJson: function CategoricalFilter$UpdateFromJson(pm) {
			this.$initializeFromJson$1(pm);
		},
		$initializeFromJson$1: function CategoricalFilter$InitializeFromJson(pm) {
			this.$isExclude = pm.isExclude;
			if (ss.isValue(pm.appliedValues)) {
				this.$appliedValues = [];
				for (var $t1 = 0; $t1 < pm.appliedValues.length; $t1++) {
					var v = pm.appliedValues[$t1];
					this.$appliedValues.push($tab__Utility.getDataValue(v));
				}
			}
		}
	}, $tableauSoftware_Filter);
	ss.initClass($tableauSoftware_Column, $asm, {
		getFieldName: function Column$GetFieldName() {
			return this.$impl.get_fieldName();
		},
		getDataType: function Column$GetDataType() {
			return this.$impl.get_dataType();
		},
		getIsReferenced: function Column$GetIsReferenced() {
			return this.$impl.get_isReferenced();
		},
		getIndex: function Column$GetIndex() {
			return this.$impl.get_index();
		}
	});
	ss.initClass($tableauSoftware_CustomView, $asm, {
		getWorkbook: function CustomView$GetWorkbook() {
			return this._impl.get_$workbook();
		},
		getUrl: function CustomView$GetUrl() {
			return this._impl.get_$url();
		},
		getName: function CustomView$GetName() {
			return this._impl.get_$name();
		},
		setName: function CustomView$SetName(value) {
			this._impl.set_$name(value);
		},
		getOwnerName: function CustomView$GetOwnerName() {
			return this._impl.get_$ownerName();
		},
		getAdvertised: function CustomView$GetAdvertised() {
			return this._impl.get_$advertised();
		},
		setAdvertised: function CustomView$SetAdvertised(value) {
			this._impl.set_$advertised(value);
		},
		getDefault: function CustomView$GetDefault() {
			return this._impl.get_$isDefault();
		},
		saveAsync: function CustomView$SaveAsync() {
			return this._impl.$saveAsync();
		}
	});
	ss.initClass($tableauSoftware_Sheet, $asm, {
		getName: function Sheet$GetName() {
			return this._impl.get_name();
		},
		getIndex: function Sheet$GetIndex() {
			return this._impl.get_index();
		},
		getWorkbook: function Sheet$GetWorkbook() {
			return this._impl.get_workbookImpl().get_workbook();
		},
		getSize: function Sheet$GetSize() {
			return this._impl.get_size();
		},
		getIsHidden: function Sheet$GetIsHidden() {
			return this._impl.get_isHidden();
		},
		getIsActive: function Sheet$GetIsActive() {
			return this._impl.get_isActive();
		},
		getSheetType: function Sheet$GetSheetType() {
			return this._impl.get_sheetType();
		},
		getUrl: function Sheet$GetUrl() {
			return this._impl.get_url();
		},
		changeSizeAsync: function Sheet$ChangeSizeAsync(size) {
			return this._impl.changeSizeAsync(size);
		}
	});
	ss.initClass($tableauSoftware_Dashboard, $asm, {
		getParentStoryPoint: function Dashboard$GetParentStoryPoint() {
			return this._impl.get_parentStoryPoint();
		},
		getObjects: function Dashboard$GetObjects() {
			return this._impl.get_objects()._toApiCollection();
		},
		getWorksheets: function Dashboard$GetWorksheets() {
			return this._impl.get_worksheets()._toApiCollection();
		}
	}, $tableauSoftware_Sheet);
	ss.initClass($tableauSoftware_DashboardObject, $asm, {
		getObjectType: function DashboardObject$GetObjectType() {
			return this.$zoneInfo.objectType;
		},
		getDashboard: function DashboardObject$GetDashboard() {
			return this.$dashboard;
		},
		getWorksheet: function DashboardObject$GetWorksheet() {
			return this.$worksheet;
		},
		getPosition: function DashboardObject$GetPosition() {
			return this.$zoneInfo.position;
		},
		getSize: function DashboardObject$GetSize() {
			return this.$zoneInfo.size;
		}
	});
	ss.initClass($tableauSoftware_DataSource, $asm, {
		getName: function DataSource$GetName() {
			return this.$impl.get_name();
		},
		getFields: function DataSource$GetFields() {
			return this.$impl.get_fields()._toApiCollection();
		},
		getIsPrimary: function DataSource$GetIsPrimary() {
			return this.$impl.get_isPrimary();
		}
	});
	ss.initClass($tableauSoftware_DataTable, $asm, {
		getName: function DataTable$GetName() {
			return this.$impl.get_name();
		},
		getData: function DataTable$GetData() {
			return this.$impl.get_rows();
		},
		getColumns: function DataTable$GetColumns() {
			return this.$impl.get_columns();
		},
		getTotalRowCount: function DataTable$GetTotalRowCount() {
			return this.$impl.get_totalRowCount();
		},
		getIsSummaryData: function DataTable$GetIsSummaryData() {
			return this.$impl.get_isSummaryData();
		}
	});
	ss.initClass($tableauSoftware_Field, $asm, {
		getDataSource: function Field$GetDataSource() {
			return this.$dataSource;
		},
		getName: function Field$GetName() {
			return this.$name;
		},
		getRole: function Field$GetRole() {
			return this.$fieldRoleType;
		},
		getAggregation: function Field$GetAggregation() {
			return this.$fieldAggrType;
		}
	});
	ss.initClass($tableauSoftware_HierarchicalFilter, $asm, {
		_addFieldParams: function HierarchicalFilter$AddFieldParams(param) {
			param['api.filterHierarchicalLevels'] = this.$levels;
		},
		_updateFromJson: function HierarchicalFilter$UpdateFromJson(pm) {
			this.$initializeFromJson$1(pm);
		},
		$initializeFromJson$1: function HierarchicalFilter$InitializeFromJson(pm) {
			this.$levels = pm.levels;
		}
	}, $tableauSoftware_Filter);
	ss.initClass($tableauSoftware_Mark, $asm, {
		getPairs: function Mark$GetPairs() {
			return this.$impl.get_$clonedPairs();
		}
	});
	ss.initClass($tableauSoftware_Pair, $asm, {});
	ss.initClass($tableauSoftware_Parameter, $asm, {
		getName: function Parameter$GetName() {
			return this._impl.get_$name();
		},
		getCurrentValue: function Parameter$GetCurrentValue() {
			return this._impl.get_$currentValue();
		},
		getDataType: function Parameter$GetDataType() {
			return this._impl.get_$dataType();
		},
		getAllowableValuesType: function Parameter$GetAllowableValuesType() {
			return this._impl.get_$allowableValuesType();
		},
		getAllowableValues: function Parameter$GetAllowableValues() {
			return this._impl.get_$allowableValues();
		},
		getMinValue: function Parameter$GetMinValue() {
			return this._impl.get_$minValue();
		},
		getMaxValue: function Parameter$GetMaxValue() {
			return this._impl.get_$maxValue();
		},
		getStepSize: function Parameter$GetStepSize() {
			return this._impl.get_$stepSize();
		},
		getDateStepPeriod: function Parameter$GetDateStepPeriod() {
			return this._impl.get_$dateStepPeriod();
		}
	});
	ss.initClass($tableauSoftware_QuantitativeFilter, $asm, {
		getMin: function QuantitativeFilter$GetMin() {
			return this.$min;
		},
		getMax: function QuantitativeFilter$GetMax() {
			return this.$max;
		},
		getIncludeNullValues: function QuantitativeFilter$GetIncludeNullValues() {
			return this.$includeNullValues;
		},
		getDomainMin: function QuantitativeFilter$GetDomainMin() {
			return this.$domainMin;
		},
		getDomainMax: function QuantitativeFilter$GetDomainMax() {
			return this.$domainMax;
		},
		_updateFromJson: function QuantitativeFilter$UpdateFromJson(pm) {
			this.$initializeFromJson$1(pm);
		},
		$initializeFromJson$1: function QuantitativeFilter$InitializeFromJson(pm) {
			this.$domainMin = $tab__Utility.getDataValue(pm.domainMinValue);
			this.$domainMax = $tab__Utility.getDataValue(pm.domainMaxValue);
			this.$min = $tab__Utility.getDataValue(pm.minValue);
			this.$max = $tab__Utility.getDataValue(pm.maxValue);
			this.$includeNullValues = pm.includeNullValues;
		}
	}, $tableauSoftware_Filter);
	ss.initClass($tableauSoftware_RelativeDateFilter, $asm, {
		getPeriod: function RelativeDateFilter$GetPeriod() {
			return this.$periodType;
		},
		getRange: function RelativeDateFilter$GetRange() {
			return this.$rangeType;
		},
		getRangeN: function RelativeDateFilter$GetRangeN() {
			return this.$rangeN;
		},
		_updateFromJson: function RelativeDateFilter$UpdateFromJson(pm) {
			this.$initializeFromJson$1(pm);
		},
		$initializeFromJson$1: function RelativeDateFilter$InitializeFromJson(pm) {
			if (ss.isValue(pm.periodType)) {
				this.$periodType = $tab_ApiEnumConverter.convertPeriodType(ss.unbox(pm.periodType));
			}
			if (ss.isValue(pm.rangeType)) {
				this.$rangeType = $tab_ApiEnumConverter.convertDateRange(ss.unbox(pm.rangeType));
			}
			if (ss.isValue(pm.rangeN)) {
				this.$rangeN = ss.unbox(pm.rangeN);
			}
		}
	}, $tableauSoftware_Filter);
	ss.initClass($tableauSoftware_SheetInfo, $asm, {
		getName: function ApiSheetInfo$GetName() {
			return this.$impl.name;
		},
		getSheetType: function ApiSheetInfo$GetSheetType() {
			return this.$impl.sheetType;
		},
		getSize: function ApiSheetInfo$GetSize() {
			return this.$impl.size;
		},
		getIndex: function ApiSheetInfo$GetIndex() {
			return this.$impl.index;
		},
		getUrl: function ApiSheetInfo$GetUrl() {
			return this.$impl.url;
		},
		getIsActive: function ApiSheetInfo$GetIsActive() {
			return this.$impl.isActive;
		},
		getIsHidden: function ApiSheetInfo$GetIsHidden() {
			return this.$impl.isHidden;
		},
		getWorkbook: function ApiSheetInfo$GetWorkbook() {
			return this.$impl.workbook;
		}
	});
	ss.initClass($tableauSoftware_Story, $asm, {
		getActiveStoryPoint: function Story$GetActiveStoryPoint() {
			return this._impl.get_activeStoryPointImpl().get_storyPoint();
		},
		getStoryPointsInfo: function Story$GetStoryPointsInfo() {
			return this._impl.get_storyPointsInfo();
		},
		activatePreviousStoryPointAsync: function Story$ActivatePreviousStoryPointAsync() {
			return this._impl.activatePreviousStoryPointAsync();
		},
		activateNextStoryPointAsync: function Story$ActivateNextStoryPointAsync() {
			return this._impl.activateNextStoryPointAsync();
		},
		activateStoryPointAsync: function Story$ActivateStoryPointAsync(index) {
			return this._impl.activateStoryPointAsync(index);
		},
		revertStoryPointAsync: function Story$RevertStoryPointAsync(index) {
			return this._impl.revertStoryPointAsync(index);
		}
	}, $tableauSoftware_Sheet);
	ss.initClass($tableauSoftware_StoryPoint, $asm, {
		getCaption: function StoryPoint$GetCaption() {
			return this.$impl.get_caption();
		},
		getContainedSheet: function StoryPoint$GetContainedSheet() {
			return (ss.isValue(this.$impl.get_containedSheetImpl()) ? this.$impl.get_containedSheetImpl().get_sheet() : null);
		},
		getIndex: function StoryPoint$GetIndex() {
			return this.$impl.get_index();
		},
		getIsActive: function StoryPoint$GetIsActive() {
			return this.$impl.get_isActive();
		},
		getIsUpdated: function StoryPoint$GetIsUpdated() {
			return this.$impl.get_isUpdated();
		},
		getParentStory: function StoryPoint$GetParentStory() {
			return this.$impl.get_parentStoryImpl().get_story();
		}
	});
	ss.initClass($tableauSoftware_StoryPointInfo, $asm, {
		getCaption: function StoryPointInfo$GetCaption() {
			return this._impl.caption;
		},
		getIndex: function StoryPointInfo$GetIndex() {
			return this._impl.index;
		},
		getIsActive: function StoryPointInfo$GetIsActive() {
			return this._impl.isActive;
		},
		getIsUpdated: function StoryPointInfo$GetIsUpdated() {
			return this._impl.isUpdated;
		},
		getParentStory: function StoryPointInfo$GetParentStory() {
			return this._impl.parentStoryImpl.get_story();
		}
	});
	ss.initClass($tableauSoftware_Version, $asm, {
		getMajor: function Version$GetMajor() {
			return this.$major;
		},
		getMinor: function Version$GetMinor() {
			return this.$minor;
		},
		getPatch: function Version$GetPatch() {
			return this.$patch;
		},
		getMetadata: function Version$GetMetadata() {
			return this.$metadata;
		},
		toString: function Version$ToString() {
			var version = this.$major + '.' + this.$minor + '.' + this.$patch;
			if (ss.isValue(this.$metadata) && this.$metadata.length > 0) {
				version += '-' + this.$metadata;
			}
			return version;
		}
	});
	ss.initClass($tableauSoftware_Viz, $asm, {
		getAreTabsHidden: function Viz$GetAreTabsHidden() {
			return this._impl.get_$areTabsHidden();
		},
		getIsToolbarHidden: function Viz$GetIsToolbarHidden() {
			return this._impl.get_$isToolbarHidden();
		},
		getIsHidden: function Viz$GetIsHidden() {
			return this._impl.get_$isHidden();
		},
		getInstanceId: function Viz$GetInstanceId() {
			return this._impl.get_instanceId();
		},
		getParentElement: function Viz$GetParentElement() {
			return this._impl.get_$parentElement();
		},
		getUrl: function Viz$GetUrl() {
			return this._impl.get_$url();
		},
		getVizSize: function Viz$GetVizSize() {
			return this._impl.get_$vizSize();
		},
		getWorkbook: function Viz$GetWorkbook() {
			return this._impl.get_$workbook();
		},
		getAreAutomaticUpdatesPaused: function Viz$GetAreAutomaticUpdatesPaused() {
			return this._impl.get_$areAutomaticUpdatesPaused();
		},
		getCurrentUrlAsync: function Viz$GetCurrentUrlAsync() {
			return this._impl.getCurrentUrlAsync();
		},
		addEventListener: function Viz$AddEventListener(eventName, handler) {
			this._impl.addEventListener(eventName, handler);
		},
		removeEventListener: function Viz$RemoveEventListener(eventName, handler) {
			this._impl.removeEventListener(eventName, handler);
		},
		dispose: function Viz$Dispose() {
			this._impl.$dispose();
		},
		show: function Viz$Show() {
			this._impl.$show();
		},
		hide: function Viz$Hide() {
			this._impl.$hide();
		},
		showExportDataDialog: function Viz$ShowExportDataDialog(worksheetWithinDashboard) {
			this._impl.$showExportDataDialog(worksheetWithinDashboard);
		},
		showExportCrossTabDialog: function Viz$ShowExportCrossTabDialog(worksheetWithinDashboard) {
			this._impl.$showExportCrossTabDialog(worksheetWithinDashboard);
		},
		showExportImageDialog: function Viz$ShowExportImageDialog() {
			this._impl.$showExportImageDialog();
		},
		showExportPDFDialog: function Viz$ShowExportPDFDialog() {
			this._impl.$showExportPDFDialog();
		},
		revertAllAsync: function Viz$RevertAllAsync() {
			return this._impl.$revertAllAsync();
		},
		refreshDataAsync: function Viz$RefreshDataAsync() {
			return this._impl.$refreshDataAsync();
		},
		showShareDialog: function Viz$ShowShareDialog() {
			this._impl.$showShareDialog();
		},
		showDownloadWorkbookDialog: function Viz$ShowDownloadWorkbookDialog() {
			this._impl.$showDownloadWorkbookDialog();
		},
		pauseAutomaticUpdatesAsync: function Viz$PauseAutomaticUpdatesAsync() {
			return this._impl.$pauseAutomaticUpdatesAsync();
		},
		resumeAutomaticUpdatesAsync: function Viz$ResumeAutomaticUpdatesAsync() {
			return this._impl.$resumeAutomaticUpdatesAsync();
		},
		toggleAutomaticUpdatesAsync: function Viz$ToggleAutomaticUpdatesAsync() {
			return this._impl.$toggleAutomaticUpdatesAsync();
		},
		refreshSize: function Viz$RefreshSize() {
			this._impl.$refreshSize();
		},
		setFrameSize: function Viz$SetFrameSize(width, height) {
			var widthString = width;
			var heightString = height;
			if ($tab__Utility.isNumber(width)) {
				widthString = width.toString() + 'px';
			}
			if ($tab__Utility.isNumber(height)) {
				heightString = height.toString() + 'px';
			}
			this._impl.$setFrameSizeAndUpdate(widthString, heightString);
		}
	});
	ss.initClass($tableauSoftware_VizManager, $asm, {});
	ss.initClass($tableauSoftware_Workbook, $asm, {
		getViz: function Workbook$GetViz() {
			return this.$workbookImpl.get_viz();
		},
		getPublishedSheetsInfo: function Workbook$GetPublishedSheetsInfo() {
			return this.$workbookImpl.get_publishedSheets()._toApiCollection();
		},
		getName: function Workbook$GetName() {
			return this.$workbookImpl.get_name();
		},
		getActiveSheet: function Workbook$GetActiveSheet() {
			return this.$workbookImpl.get_activeSheetImpl().get_sheet();
		},
		getActiveCustomView: function Workbook$GetActiveCustomView() {
			return this.$workbookImpl.get_activeCustomView();
		},
		activateSheetAsync: function Workbook$ActivateSheetAsync(sheetNameOrIndex) {
			return this.$workbookImpl._setActiveSheetAsync(sheetNameOrIndex);
		},
		revertAllAsync: function Workbook$RevertAllAsync() {
			return this.$workbookImpl._revertAllAsync();
		},
		getCustomViewsAsync: function Workbook$GetCustomViewsAsync() {
			return this.$workbookImpl.$getCustomViewsAsync();
		},
		showCustomViewAsync: function Workbook$ShowCustomViewAsync(customViewName) {
			return this.$workbookImpl.$showCustomViewAsync(customViewName);
		},
		removeCustomViewAsync: function Workbook$RemoveCustomViewAsync(customViewName) {
			return this.$workbookImpl.$removeCustomViewAsync(customViewName);
		},
		rememberCustomViewAsync: function Workbook$RememberCustomViewAsync(customViewName) {
			return this.$workbookImpl.$rememberCustomViewAsync(customViewName);
		},
		setActiveCustomViewAsDefaultAsync: function Workbook$SetActiveCustomViewAsDefaultAsync() {
			return this.$workbookImpl.$setActiveCustomViewAsDefaultAsync();
		},
		getParametersAsync: function Workbook$GetParametersAsync() {
			return this.$workbookImpl.$getParametersAsync();
		},
		changeParameterValueAsync: function Workbook$ChangeParameterValueAsync(parameterName, value) {
			return this.$workbookImpl.$changeParameterValueAsync(parameterName, value);
		}
	});
	ss.initClass($tableauSoftware_Worksheet, $asm, {
		getParentDashboard: function Worksheet$GetParentDashboard() {
			return this._impl.get_parentDashboard();
		},
		getParentStoryPoint: function Worksheet$GetParentStoryPoint() {
			return this._impl.get_parentStoryPoint();
		},
		getDataSourcesAsync: function Worksheet$GetDataSourcesAsync() {
			return this._impl.$getDataSourcesAsync();
		},
		getFilterAsync: function Worksheet$GetFilterAsync(fieldName, options) {
			return this._impl.$getFilterAsync(null, fieldName, options);
		},
		getFiltersAsync: function Worksheet$GetFiltersAsync(options) {
			return this._impl.$getFiltersAsync(options);
		},
		applyFilterAsync: function Worksheet$ApplyFilterAsync(fieldName, values, updateType, options) {
			return this._impl.$applyFilterAsync(fieldName, values, updateType, options);
		},
		clearFilterAsync: function Worksheet$ClearFilterAsync(fieldName) {
			return this._impl.$clearFilterAsync(fieldName);
		},
		applyRangeFilterAsync: function Worksheet$ApplyRangeFilterAsync(fieldName, options) {
			return this._impl.$applyRangeFilterAsync(fieldName, options);
		},
		applyRelativeDateFilterAsync: function Worksheet$ApplyRelativeDateFilterAsync(fieldName, options) {
			return this._impl.$applyRelativeDateFilterAsync(fieldName, options);
		},
		applyHierarchicalFilterAsync: function Worksheet$ApplyHierarchicalFilterAsync(fieldName, values, updateType, options) {
			return this._impl.$applyHierarchicalFilterAsync(fieldName, values, updateType, options);
		},
		clearSelectedMarksAsync: function Worksheet$ClearSelectedMarksAsync() {
			return this._impl.$clearSelectedMarksAsync();
		},
		selectMarksAsync: function Worksheet$SelectMarksAsync(fieldNameOrFieldValuesMap, valueOrUpdateType, updateType) {
			return this._impl.$selectMarksAsync(fieldNameOrFieldValuesMap, valueOrUpdateType, updateType);
		},
		getSelectedMarksAsync: function Worksheet$GetSelectedMarksAsync() {
			return this._impl.$getSelectedMarksAsync();
		},
		getSummaryDataAsync: function Worksheet$GetSummaryDataAsync(options) {
			return this._impl.$getSummaryDataAsync(options);
		},
		getUnderlyingDataAsync: function Worksheet$GetUnderlyingDataAsync(options) {
			return this._impl.$getUnderlyingDataAsync(options);
		},
		clearHighlightedMarksAsync: function Worksheet$ClearHighlightedMarksAsync() {
			return this._impl.$clearHighlightedMarksAsync();
		},
		highlightMarksAsync: function Worksheet$HighlightMarksAsync(fieldName, values) {
			return this._impl.$highlightMarksAsync(fieldName, values);
		},
		highlightMarksByPatternMatchAsync: function Worksheet$HighlightMarksByPatternMatchAsync(fieldName, patternMatch) {
			return this._impl.$highlightMarksByPatternMatchAsync(fieldName, patternMatch);
		}
	}, $tableauSoftware_Sheet);
	(function() {
		$tab__ApiCommand.crossDomainEventNotificationId = 'xdomainSourceId';
		$tab__ApiCommand.lastRequestMessage = null;
		$tab__ApiCommand.lastResponseMessage = null;
		$tab__ApiCommand.lastClientInfoResponseMessage = null;
		$tab__ApiCommand.$nextCommandId = 0;
	})();
	(function() {
		$tab__VizManagerImpl.$vizs = [];
	})();
	(function() {
		$tab__jQueryShim.$arrayType = 'array';
		$tab__jQueryShim.$booleanType = 'boolean';
		$tab__jQueryShim.$dateType = 'date';
		$tab__jQueryShim.$functionType = 'function';
		$tab__jQueryShim.$numberType = 'number';
		$tab__jQueryShim.$objectType = 'object';
		$tab__jQueryShim.$regExpType = 'regexp';
		$tab__jQueryShim.$stringType = 'string';
		$tab__jQueryShim.$class2type = ss.mkdict(['[object Boolean]', $tab__jQueryShim.$booleanType, '[object Number]', $tab__jQueryShim.$numberType, '[object String]', $tab__jQueryShim.$stringType, '[object Function]', $tab__jQueryShim.$functionType, '[object Array]', $tab__jQueryShim.$arrayType, '[object Date]', $tab__jQueryShim.$dateType, '[object RegExp]', $tab__jQueryShim.$regExpType, '[object Object]', $tab__jQueryShim.$objectType]);
		$tab__jQueryShim.$trim = ss.cast(String.prototype['trim'], Function);
		$tab__jQueryShim.$toString = ss.cast(Object.prototype['toString'], Function);
		$tab__jQueryShim.$trimLeft = new RegExp('^[\\s\\xA0]+');
		$tab__jQueryShim.$trimRight = new RegExp('[\\s\\xA0]+$');
		$tab__jQueryShim.$rvalidchars = new RegExp('^[\\],:{}\\s]*$');
		$tab__jQueryShim.$rvalidescape = new RegExp('\\\\(?:["\\\\\\/bfnrt]|u[0-9a-fA-F]{4})', 'g');
		$tab__jQueryShim.$rvalidtokens = new RegExp('"[^"\\\\\\n\\r]*"|true|false|null|-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?', 'g');
		$tab__jQueryShim.$rvalidbraces = new RegExp('(?:^|:|,)(?:\\s*\\[)+', 'g');
	})();
	(function() {
		var ns = global.tableauSoftware;
		ns.DeviceType = { DEFAULT: 'default', DESKTOP: 'desktop', TABLET: 'tablet', PHONE: 'phone' };
		ns.DashboardObjectType = { BLANK: 'blank', WORKSHEET: 'worksheet', QUICK_FILTER: 'quickFilter', PARAMETER_CONTROL: 'parameterControl', PAGE_FILTER: 'pageFilter', LEGEND: 'legend', TITLE: 'title', TEXT: 'text', IMAGE: 'image', WEB_PAGE: 'webPage' };
		ns.DataType = { FLOAT: 'float', INTEGER: 'integer', STRING: 'string', BOOLEAN: 'boolean', DATE: 'date', DATETIME: 'datetime' };
		ns.DateRangeType = { LAST: 'last', LASTN: 'lastn', NEXT: 'next', NEXTN: 'nextn', CURR: 'curr', TODATE: 'todate' };
		ns.ErrorCode = { INTERNAL_ERROR: 'internalError', SERVER_ERROR: 'serverError', INVALID_AGGREGATION_FIELD_NAME: 'invalidAggregationFieldName', INVALID_PARAMETER: 'invalidParameter', INVALID_URL: 'invalidUrl', STALE_DATA_REFERENCE: 'staleDataReference', VIZ_ALREADY_IN_MANAGER: 'vizAlreadyInManager', NO_URL_OR_PARENT_ELEMENT_NOT_FOUND: 'noUrlOrParentElementNotFound', INVALID_FILTER_FIELDNAME: 'invalidFilterFieldName', INVALID_FILTER_FIELDVALUE: 'invalidFilterFieldValue', INVALID_FILTER_FIELDNAME_OR_VALUE: 'invalidFilterFieldNameOrValue', FILTER_CANNOT_BE_PERFORMED: 'filterCannotBePerformed', NOT_ACTIVE_SHEET: 'notActiveSheet', INVALID_CUSTOM_VIEW_NAME: 'invalidCustomViewName', MISSING_RANGEN_FOR_RELATIVE_DATE_FILTERS: 'missingRangeNForRelativeDateFilters', MISSING_MAX_SIZE: 'missingMaxSize', MISSING_MIN_SIZE: 'missingMinSize', MISSING_MINMAX_SIZE: 'missingMinMaxSize', INVALID_SIZE: 'invalidSize', INVALID_SIZE_BEHAVIOR_ON_WORKSHEET: 'invalidSizeBehaviorOnWorksheet', SHEET_NOT_IN_WORKBOOK: 'sheetNotInWorkbook', INDEX_OUT_OF_RANGE: 'indexOutOfRange', DOWNLOAD_WORKBOOK_NOT_ALLOWED: 'downloadWorkbookNotAllowed', NULL_OR_EMPTY_PARAMETER: 'nullOrEmptyParameter', BROWSER_NOT_CAPABLE: 'browserNotCapable', UNSUPPORTED_EVENT_NAME: 'unsupportedEventName', INVALID_DATE_PARAMETER: 'invalidDateParameter', INVALID_SELECTION_FIELDNAME: 'invalidSelectionFieldName', INVALID_SELECTION_VALUE: 'invalidSelectionValue', INVALID_SELECTION_DATE: 'invalidSelectionDate', NO_URL_FOR_HIDDEN_WORKSHEET: 'noUrlForHiddenWorksheet', MAX_VIZ_RESIZE_ATTEMPTS: 'maxVizResizeAttempts' };
		ns.FieldAggregationType = { SUM: 'SUM', AVG: 'AVG', MIN: 'MIN', MAX: 'MAX', STDEV: 'STDEV', STDEVP: 'STDEVP', VAR: 'VAR', VARP: 'VARP', COUNT: 'COUNT', COUNTD: 'COUNTD', MEDIAN: 'MEDIAN', ATTR: 'ATTR', NONE: 'NONE', PERCENTILE: 'PERCENTILE', YEAR: 'YEAR', QTR: 'QTR', MONTH: 'MONTH', DAY: 'DAY', HOUR: 'HOUR', MINUTE: 'MINUTE', SECOND: 'SECOND', WEEK: 'WEEK', WEEKDAY: 'WEEKDAY', MONTHYEAR: 'MONTHYEAR', MDY: 'MDY', END: 'END', TRUNC_YEAR: 'TRUNC_YEAR', TRUNC_QTR: 'TRUNC_QTR', TRUNC_MONTH: 'TRUNC_MONTH', TRUNC_WEEK: 'TRUNC_WEEK', TRUNC_DAY: 'TRUNC_DAY', TRUNC_HOUR: 'TRUNC_HOUR', TRUNC_MINUTE: 'TRUNC_MINUTE', TRUNC_SECOND: 'TRUNC_SECOND', QUART1: 'QUART1', QUART3: 'QUART3', SKEWNESS: 'SKEWNESS', KURTOSIS: 'KURTOSIS', INOUT: 'INOUT', SUM_XSQR: 'SUM_XSQR', USER: 'USER' };
		ns.FieldRoleType = { DIMENSION: 'dimension', MEASURE: 'measure', UNKNOWN: 'unknown' };
		ns.FilterUpdateType = { ALL: 'all', REPLACE: 'replace', ADD: 'add', REMOVE: 'remove' };
		ns.FilterType = { CATEGORICAL: 'categorical', QUANTITATIVE: 'quantitative', HIERARCHICAL: 'hierarchical', RELATIVEDATE: 'relativedate' };
		ns.NullOption = { NULL_VALUES: 'nullValues', NON_NULL_VALUES: 'nonNullValues', ALL_VALUES: 'allValues' };
		ns.ParameterAllowableValuesType = { ALL: 'all', LIST: 'list', RANGE: 'range' };
		ns.ParameterDataType = { FLOAT: 'float', INTEGER: 'integer', STRING: 'string', BOOLEAN: 'boolean', DATE: 'date', DATETIME: 'datetime' };
		ns.PeriodType = { YEAR: 'year', QUARTER: 'quarter', MONTH: 'month', WEEK: 'week', DAY: 'day', HOUR: 'hour', MINUTE: 'minute', SECOND: 'second' };
		ns.SelectionUpdateType = { REPLACE: 'replace', ADD: 'add', REMOVE: 'remove' };
		ns.SheetSizeBehavior = { AUTOMATIC: 'automatic', EXACTLY: 'exactly', RANGE: 'range', ATLEAST: 'atleast', ATMOST: 'atmost' };
		ns.SheetType = { WORKSHEET: 'worksheet', DASHBOARD: 'dashboard', STORY: 'story' };
		ns.TableauEventName = { CUSTOM_VIEW_LOAD: 'customviewload', CUSTOM_VIEW_REMOVE: 'customviewremove', CUSTOM_VIEW_SAVE: 'customviewsave', CUSTOM_VIEW_SET_DEFAULT: 'customviewsetdefault', FILTER_CHANGE: 'filterchange', FIRST_INTERACTIVE: 'firstinteractive', FIRST_VIZ_SIZE_KNOWN: 'firstvizsizeknown', MARKS_SELECTION: 'marksselection', PARAMETER_VALUE_CHANGE: 'parametervaluechange', STORY_POINT_SWITCH: 'storypointswitch', TAB_SWITCH: 'tabswitch', VIZ_RESIZE: 'vizresize' };
		ns.ToolbarPosition = { TOP: 'top', BOTTOM: 'bottom' };
	})();
	(function() {
		$tab__ApiObjectRegistry.$creationRegistry = null;
		$tab__ApiObjectRegistry.$singletonInstanceRegistry = null;
	})();
	(function() {
		$tab__SheetImpl.noZoneId = 4294967295;
	})();
	(function() {
		$tab__WorksheetImpl.$regexHierarchicalFieldName = new RegExp('\\[[^\\]]+\\]\\.', 'g');
	})();
	(function() {
		$tableauSoftware_Version.$currentVersion = new $tableauSoftware_Version(2, 1, 0, 'null');
	})();
})();

window.tableau = window.tableauSoftware = global.tableauSoftware;

tableauSoftware.Promise = tab._PromiseImpl;
tab._Deferred = tab._DeferredImpl;
tab._Collection = tab._CollectionImpl;

tab._ApiBootstrap.initialize();


})();
