//将四个模块请求的接口函数统一暴露
import * as trademark from "./product/tradeMark";
import * as attr from "./product/attr";
import * as sku from "./product/sku";
import * as spu from "./product/spu";

//对外暴露
export default {
  trademark,
  attr,
  sku,
  spu,
};
// 可以将这四个暴露在vue的原型上，可以在任意各组件中使用这些函数(=>main.js)
