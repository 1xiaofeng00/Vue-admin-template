<template>
  <el-card>
    <div slot="header" class="header">
      <div class="search-header">
        <span>线上热门搜索</span>
        <!-- @command="handleCommand" -->
        <el-dropdown>
          <i class="el-icon-more"> </i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">黄金糕</el-dropdown-item>
            <el-dropdown-item command="b">狮子头</el-dropdown-item>
            <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
            <el-dropdown-item command="d">双皮奶</el-dropdown-item>
            <el-dropdown-item command="e">蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="12">
          <lineCharts></lineCharts>
        </el-col>
        <el-col :span="12">
          <lineCharts></lineCharts>
        </el-col>
      </el-row>
      <!-- table -->
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="date" label="排名" width="80" type="index">
        </el-table-column>
        <el-table-column prop="name" label="搜索关键字" width="180">
        </el-table-column>
        <el-table-column prop="address" label="用户数" sortable>
        </el-table-column
        ><el-table-column prop="address" label="周涨幅" sortable>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :total="1000"
          class="pageNation"
        >
        </el-pagination>
      </div>
    </div>
  </el-card>
</template>

<script>
import lineCharts from "./lineCharts";
export default {
  name: "",
  data() {
    return {
      tableData: [{}],
    };
  },
  components: {
    lineCharts,
  },
};
</script>

<style scoped>
.header {
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}
.search-header {
  display: flex;
  justify-content: space-between;
}
.pageNation {
  float: right;
}
</style>
