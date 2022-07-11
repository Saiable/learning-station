(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  var Observer = /*#__PURE__*/function () {
    function Observer(data) {
      _classCallCheck(this, Observer);

      if (Array.isArray(data)) {
        // 这里我们可以重写数组的7个变异方法（可以修改数组本身）
        data.__proto = {
          push: function push() {
            console.log('重写的push');
          }
        }; // this.observeArray(data) // 递归处理数组中的对象
      } else {
        this.walk(data);
      }
    }

    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        // 循环对象，对属性依此劫持
        // 重新定义属性
        Object.keys(data).forEach(function (key) {
          return defineReactive(data, key, data[key]);
        });
      }
    }, {
      key: "observeArray",
      value: function observeArray(data) {
        data.forEach(function (item) {
          return observe(item);
        });
      }
    }]);

    return Observer;
  }(); // 向外导出该方法，供单独使用


  function defineReactive(target, key, value) {
    // 闭包
    observe(value); // observe内部对value进行判断了，是个对象，会再次创建Observer实例，再次调用walk方法，劫持每个属性

    Object.defineProperty(target, key, {
      get: function get() {
        // 取值的时候，会执行get
        console.log('key', key);
        return value;
      },
      set: function set(newValue) {
        // 修改值的时候，会执行set
        if (value == newValue) return;
        value = newValue;
      }
    });
  }
  function observe(data) {
    // console.log(data)
    // 对data类型进行判断
    if (_typeof(data) !== 'object' || data == null) {
      return; // 只对对象进行劫持
    } // 如要考虑到一个对象已经被劫持的情况
    // 如果一个对象已经被劫持过了，那么就不需要再被劫持
    // 可以添加一个实例，用实例来判断是否被劫持过（应该是用实例身上的属性）


    return new Observer(data);
  }

  function initState(vm) {
    var opts = vm.$options;

    if (opts.data) {
      initData(vm);
    }
  }

  function proxy(vm, target, key) {
    Object.defineProperty(vm, key, {
      // vm.name
      get: function get() {
        return vm[target][key]; // vm.name实际上是去vm._data.name上去取值了
      },
      set: function set(newValue) {
        vm[target][key] = newValue; // 这性能的确不太好，每一个`key`都加了一层
      }
    });
  }

  function initData(vm) {
    var data = vm.$options.data;
    data = typeof data === 'function' ? data.call(vm) : data; // 对数据进行劫持,vue2中采用了defineProperty
    // 观测之前，把data放一份到vm._data身上

    vm._data = data; // 定义一个方法obeserve观测数据，这是一个核心模块，我们单独新建observe文件夹进行处理

    observe(data); // 将vm._data用vm来代理，简化用户写法

    for (var key in data) {
      proxy(vm, '_data', key);
    }
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = options;
      initState(vm);
    };
  }

  function Vue(options) {
    // options就是用户的选项
    // 拿到用户的options，做一下初始化
    this._init(options);
  } // 给Vue增加init方法


  initMixin(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
