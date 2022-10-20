<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="!isShowTable"
      ></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <!-- 展示平台属性 -->
        <el-table border style="width: 100%" :data="attrList">
          <el-table-column type="index" label="序列" width="80" align="center">
          </el-table-column>

          <el-table-column prop="attrName" label="属性名称" width="180">
          </el-table-column>

          <el-table-column
            prop="attrValueList"
            label="属性值列表"
            width="width"
          >
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="(attrValue, index) in row.attrValueList"
                :key="attrValue.id"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="handle" label="操作" width="120">
            <template slot-scope="{ row, $index }">
              <el-button
                size="mini"
                type="warning"
                icon="el-icon-edit"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="deleteAttr(row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性|修改属性的结构 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table
          style="width: 100%; margin: 20px 0"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                :ref="$index"
              ></el-input>
              <span v-else @click="toEdit(row)" style="display: block">{{
                row.valueName
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 气泡确认框 -->
              <el-popconfirm
                :title="`你确定要删除${row.valueName}吗？`"
                @onConfirm="deleteAttrValue($index)"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                ></el-button
              ></el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          :disabled="attrInfo.attrValueList.length < 1"
          @click="addOrUpdateAttr"
          >保存</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
//按需引入lodash当中的深拷贝
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      //接收平台服务器字段
      attrList: [],
      // 这个属性控制table的显示与隐藏
      isShowTable: true,
      //用于收集新增属性（或修改属性）
      attrInfo: {
        attrName: "", //属性名
        //属性值，因为属性值可以有多个，因此用数组
        attrValueList: [],
        //每一个属性值都是一个对象需要attrId,valueName
        // {
        //   attrId: 0, //相应属性名的Id
        //   valueName: "",
        // },

        categoryId: 0, //三级分类的Id
        categoryLevel: 3,
      },
    };
  },
  methods: {
    //自定义事件的回调
    getCategoryId({ categoryId, level }) {
      //区分三级分类响应的id，以及父组件进行存储
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        //代表三级id有了
        this.category3Id = categoryId;
        //发请求获取平台属性数据
        this.getAttrList();
      }
    },
    // 获取平台属性的数据
    //当用户确定三级分类的数据时候，可以向服务器发请求获取平台属性进行展示
    async getAttrList() {
      // 获取分类的id
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    //添加属性值的按钮
    addAttrValue() {
      //向属性值的数组里面添加元素
      //attrId:是你相应的属性的id，目前而言我们是添加属性的操作，还没有相应的属性的id，目前而言带给服务器的id为undefined
      //valueName:相应的属性值的名称
      this.attrInfo.attrValueList.push({
        //响应式的添加，Vue底层可以检测到
        //对于修改某一个属性的时候，可以在已有的属性值的基础之上新增新的属性值（新增属性值的时候，需要把已有的属性的id带上）
        attrId: this.attrInfo.id,
        valueName: "",
        //flag属性：给每一个属性值添加一个标记flag，用户切换查看模式与编辑模式，好处：每一个属性值可以控制自己的模式切换
        //当前flag属性为响应式属性（数据变化视图跟着变）
        flag: true,
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    //添加属性按钮的回调
    addAttr() {
      //切换table的显示与隐藏
      this.isShowTable = false;
      //清除数据
      this.attrInfo = {
        attrName: "", //属性名
        //属性值，因为属性值可以有多个，因此用数组
        attrValueList: [
          //每一个属性值都是一个对象需要attrId,valueName
          // {
          //   attrId: 0, //相应属性名的Id
          //   valueName: "",
          // },
        ],
        categoryId: this.category3Id, //三级分类的Id
        categoryLevel: 3,
      };
    },
    //修改某一个属性
    updateAttr(row) {
      //isShowTable变为false
      this.isShowTable = false;
      //将选中的table赋值给attrInfo
      //由于数据结构当中存在对象里面套数组，数组里面有套对象，因此需要使用深拷贝解决这类问题
      this.attrInfo = cloneDeep(row);
      //在修改某一属性的时候，将相应的属性值元素添加上flag这个标记
      this.attrInfo.attrValueList.forEach((item) => {
        //这样书写也可以给属性值添加flag字段，但是会发现视图不会跟着变化（因为flag不是响应式数据）
        //因为Vue无法普通的新增property（属性）,这样书写的属性并非响应式属性（数据变化视图跟着变）
        // item.flag = false;

        //响应式添加
        //第一个参数：对象   第二个参数：添加新的响应式属性   第三个参数：新的属性的属性值
        this.$set(item, "flag", false);
      });
    },

    //失去焦点的事件----切换为查看模式，展示span
    toLook(row) {
      //如果属性值为空不能作为新的属性值，需要给用户提示，让他输入一个其他的属性值
      if (row.valueName.trim() == "") {
        this.$message("请输入一个正常的属性值");
        return;
      }
      let isRepeat = this.attrInfo.attrValueList.some((item) => {
        //需要将row从数组里面判断的时候去除
        //row最新新增的属性值【数组的最后一项元素】
        //判断的时候，需要把已有的数组当中新增的这个属性值去除
        if (row != item) {
          return row.valueName == item.valueName;
        }
      });
      if (isRepeat) {
        return this.$message("属性值重复了");
      }
      //row:形参是当前用户添加的最新的属性值
      //当前编辑模式变为查看模式【让input消失，显示span】
      row.flag = false;
    },
    //点击span的回调，变为编辑模式
    toEdit(row) {
      row.flag = true;
      // 获取input节点，实现自动聚焦
      //需要注意:点击span的时候，切换为input变为编辑模式，但是需要注意，对于浏览器而言，页面重绘与重拍耗时间的
      //点击span的时候，重绘重拍一个input它是需要耗费事件，因此我们不可能一点击span立马获取到input
      //$nextTick,当节点渲染完毕了，会执行一次
      this.$nextTick(() => {
        //获取相应的input表单元素实现聚焦
        this.$refs[index].focus();
      });
    },
    //气泡确认框 确定按钮的回调
    //最新版本elementUi----2.15.7，  目前模板中的版本号2.13
    deleteAttrValue($index) {
      //当前删除属性值的操作是不需要发请求的
      this.attrInfo.attrValueList.splice($index, 1);
    },
    //保存按钮，进行添加属性或者修改属性的操作
    async addOrUpdateAttr() {
      //整理参数
      // 1,如果用户添加很多属性值，且属性值为空的不应该提交给服务器
      // 提交给服务器数据当中不应该出现flag字段
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          //过滤掉属性值不是空的
          if (item.valueName != "") {
            //删除掉flag属性
            delete item.flag;
            return true;
          }
        }
      );
      try {
        // 发请求
        await this.$API.attr.reqAddAttr(this.attrInfo);
        //展示平台属性的信号量进行切换
        this.isShowTable = true;
        //提示消息
        this.$message({ type: "success", message: "保存成功" });
        //保存成功以后需要再次获取平台属性进行展示
        this.getAttrList();
      } catch (error) {
        this.$message.error(error.message);
      }
    },
  },
};
</script>

<style></style>
