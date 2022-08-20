//这个模块主要获取的是品牌管理的数据的模块
import request from "@/utils/request";

//获取品牌列表接口
///admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page, limit) =>
  request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: "get",
  });

//处理添加品牌
// /admin/product/baseTrademark/save       post 携带两个参数  品牌名称和品牌logo
//切记：对于新增的品牌，给服务器传递数据，--不需要传递ID--，ID是由服务器生成
//修改品牌
//  /admin/product/baseTrademark/update     put  携带三个参数:id、品牌名称、品牌logo
//切记:对于修改某一个品牌的操作，前端携带的参数--需要带上id--，你需要告诉服务器修改的是哪一个品牌

export const reqAddOrUpdateTradeMark = (tradeMark) => {
  // 判断是否携带id
  if (tradeMark.id) {
    // 如果带给服务器的数据携带id ----修改
    return request({
      url: "/admin/product/baseTrademark/update",
      method: "put",
      data: tradeMark,
    });
  } else {
    //新增品牌
    return request({
      url: "/admin/product/baseTrademark/save",
      method: "post",
      data: tradeMark,
    });
  }
};
// /admin/product/baseTrademark/remove/{id}
export const reqDeleteTradeMark = (id) =>
  request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: "delete",
  });
