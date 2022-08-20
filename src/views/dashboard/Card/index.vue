<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额" count="￥126560">
            <template slot="charts">
              <span
                >周同比&nbsp;56.67%
                <svg
                  t="1656580898022"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3170"
                  width="16"
                  height="16"
                >
                  <path
                    d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"
                    p-id="3171"
                    fill="#d81e06"
                  ></path></svg
              ></span>
              <span
                >日同比&nbsp;19.16%
                <svg
                  t="1656581182228"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4377"
                  width="16"
                  height="16"
                >
                  <path
                    d="M64 320l448 448 448-448z"
                    fill="#1afa29"
                    p-id="4378"
                  ></path>
                </svg>
              </span>
            </template>
            <template slot="footer">
              <span>日销售额 ￥12423</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6"
        ><el-card>
          <Detail title="访问量" count="88460">
            <template slot="charts">
              <lineCharts></lineCharts>
            </template>
            <template slot="footer">
              <span>日访问量 1234</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6"
        ><el-card>
          <Detail title="支付笔数" count="88460">
            <template slot="charts">
              <barCharts></barCharts>
            </template>
            <template slot="footer">
              <span>转化率 65%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6"
        ><el-card>
          <Detail title="运营活动效果" count="78%"
            ><template slot="charts"
              ><progressCharts></progressCharts>
            </template>
            <template slot="footer">
              <span
                >周同比&nbsp;12%
                <svg
                  t="1656580898022"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3170"
                  width="16"
                  height="16"
                >
                  <path
                    d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"
                    p-id="3171"
                    fill="#d81e06"
                  ></path></svg
              ></span>
              <span
                >日同比&nbsp;11%
                <svg
                  t="1656581182228"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4377"
                  width="16"
                  height="16"
                >
                  <path
                    d="M64 320l448 448 448-448z"
                    fill="#1afa29"
                    p-id="4378"
                  ></path>
                </svg>
              </span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import lineCharts from "./lineChart/index.vue";
import Detail from "./Detail";
import barCharts from "./barChart";
import progressCharts from "./progressChart";
export default {
  name: "",
  components: {
    Detail,
    lineCharts,
    barCharts,
    progressCharts,
  },
};
</script>

<style></style>
