<template>
  <div class="UnionPay">
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right" v-show="!leftTableShow">
        <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
      </div>
    </div>
    <div class="toolbar" v-show="leftTableShow">
      <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">

        <el-form-item class="form-left">
          <el-form-item label="收费日期：">
            <el-date-picker v-model="formData.con" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="代收单位：">
            <el-select clearable v-model="formData.waterMeterManufacturer" placeholder="全部">
              <el-option v-for="(item,index) in formData.waterMeterManufacturerOptions" :key="index" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="对账状态：">
            <el-select clearable v-model="formData.watermeterWarehouse" placeholder="全部">
              <el-option v-for="(item,index) in formData.watermeterWarehouseOptions" :key="index" :label="item.name" :value="item.value"></el-option>

            </el-select>
          </el-form-item>
          <el-form-item label="处理状态：">
            <el-select clearable v-model="formData.subordinateDepartments" placeholder="全部">
              <el-option v-for="(item,index) in formData.subordinateDepartmentsOptions" :key="index" :label="item.name" :value="item.value"></el-option>

            </el-select>
          </el-form-item>
          <el-form-item label="模糊查询：" class="width-200">
            <el-input v-model="formData.waterMeterStatus" placeholder="用户编号/流水号"></el-input>
          </el-form-item>

          <el-form-item>

            <el-button class='searchBtn' @click="demand" icon="el-icon-search"></el-button>
          </el-form-item>

        </el-form-item>

        <el-form-item class="form-right">
        </el-form-item>
      </el-form>
    </div>
    <section class="kl-table">
      <div class="left-table" v-show="leftTableShow">
        <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="histroyData.list" class="change-tables-table">

          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="code" min-width="100" label="收费日期">
          </el-table-column>

          <el-table-column prop="lvalue" min-width="100" label="代收单位">
          </el-table-column>

          <el-table-column prop="areaName" min-width="100" label="代收笔数">

          </el-table-column>

          <el-table-column prop="lvalue" min-width="100" label="代收金额">
          </el-table-column>

          <el-table-column prop="lvalue" min-width="100" label="对账日期">
          </el-table-column>

          <el-table-column prop="areaName" min-width="100" label="文件名">

          </el-table-column>

          <el-table-column prop="modifyTime" min-width="80" label="对账结果">
          </el-table-column>

          <el-table-column prop="fixValue" min-width="80" label="处理标记">
          </el-table-column>

          <el-table-column class="cell" label="操作" fixed="right" width="100">
            <template slot-scope="scope">
              <el-button type="text" @click.native="details(scope.$index, scope.row)">详情</el-button>
              <span   v-show="scope.row.modifyBy==='2'">|</span>
              <el-button type="text" @click="handle" v-show="scope.row.modifyBy==='2'">处理</el-button>
            </template>
          </el-table-column>

        </el-table>
        <!-- 分页 -->
        <!-- <div class="block">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="1"
                        :page-sizes="[20, 100, 500, 1000]"
                        :page-size="20"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="histroyData.total">
                    </el-pagination>
                </div> -->
      </div>
      <div class="right-table" v-show="detalisShow">

        <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="histroyData.list" class="change-tables-table">

          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="code" min-width="100" label="用户编号">
          </el-table-column>

          <el-table-column prop="lvalue" min-width="100" label="用户名称">
          </el-table-column>

          <el-table-column prop="areaName" min-width="100" label="流水号">

          </el-table-column>

          <el-table-column prop="lvalue" min-width="100" label="销账金额">
          </el-table-column>

          <el-table-column prop="lvalue" min-width="100" label="支付金额">
          </el-table-column>

          <el-table-column prop="areaName" min-width="100" label="手续费">

          </el-table-column>

          <el-table-column prop="lvalue" min-width="80" label="实收金额">
          </el-table-column>

          <el-table-column prop="lvalue" min-width="80" label="缴费时间">
          </el-table-column>

        </el-table>
        <!-- 分页 -->
        <!-- <div class="block">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="1"
                        :page-sizes="[20, 100, 500, 1000]"
                        :page-size="20"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="histroyData.total">
                    </el-pagination>
                </div> -->
      </div>
      <div class="right-table" v-show="HandleShow">

        <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="histroyData.list" class="change-tables-table">

          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="code" min-width="100" label="用户编号">
          </el-table-column>

          <el-table-column prop="lvalue" min-width="100" label="用户名称">
          </el-table-column>

          <el-table-column prop="areaName" min-width="100" label="流水号">

          </el-table-column>

          <el-table-column prop="lvalue" min-width="100" label="支付金额">
          </el-table-column>

          <el-table-column prop="lvalue" min-width="80" label="发生时间">
          </el-table-column>

          <el-table-column prop="flux" min-width="80" label="异常原因">
          </el-table-column>

          <el-table-column prop="meter" min-width="80" label="销账金额">
          </el-table-column>

          <el-table-column class="cell" label="操作" fixed="right" width="180">
            <template slot-scope="scope">
              <el-button type="text" v-show="scope.row.status==='1'">转预存</el-button>
              <span   v-show="scope.row.status==='1'">|</span>
              <el-button type="text" v-show="scope.row.status==='1'">退费</el-button>
              <!-- <span  >|</span> -->

              <el-button type="text" v-show="scope.row.status==='2'">取消收费</el-button>

            </template>
          </el-table-column>

        </el-table>
        <!-- 分页 -->
        <!-- <div class="block">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="1"
                        :page-sizes="[20, 100, 500, 1000]"
                        :page-size="20"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="histroyData.total">
                    </el-pagination>
                </div> -->
      </div>
    </section>

  </div>
</template>
<script>
export default {
  name: "UnionPay",
  data() {
    return {
      crumbsData: {
        //面包屑
        titleList: [
          { title: "收费管理" },
          { title: "收款对账" },
          { title: "互联网对账" }
        ]
      },
      formData: {
        con: "",
        watermeterWarehouse: "",
        watermeterWarehouseOptions: [
          {
            name: "全部",
            value: "1"
          },
          {
            name: "正常",
            value: "2"
          },
          {
            name: "异常",
            value: "3"
          }
        ],
        waterMeterManufacturer: "",
        waterMeterManufacturerOptions: [
          {
            name: "微信",
            value: "1"
          },
          {
            name: "支付宝",
            value: "2"
          }
        ],
        waterMeterType: "",
        waterMeterTypeOptions: [],
        waterMeterCaliber: "",
        waterMeterCaliberOptions: [],
        waterMeterStatus: "",
        waterMeterStatusOptions: [],
        subordinateDepartments: "",
        subordinateDepartmentsOptions: [
          {
            name: "已处理",
            value: "1"
          },
          {
            name: "未处理",
            value: "2"
          }
        ]
      },
      // 日期选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      DateChoosevalue: [],
      tableShow: false,
      maxHeight: 0,
      histroyData: {},
      UnionPayVisible: false, //综合查询的显示和隐藏
      UnionPayName: "发票领用-领用",
      ruleFormData: {},
      PrintPayer: "",
      CombinedStrike: "",
      leftTableShow: true,
      detalisShow: false,
      HandleShow: false
    };
  },
  mounted() {
    // 侧边栏
    eventBus.$emit("asideMenuShow", "businessMenuShow4");
    this.init();
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量

    this.common.changeTable(this, ".UnionPay", [
      ".UnionPay .toolbar",
      ".UnionPay .block",
      ".UnionPay #crumbs"
    ]);
  },
  methods: {
    init() {
      this.histroyData = {
        areaId: "",
        endRow: 5,
        hasNextPage: false,
        hasPreviousPage: false,
        isFirstPage: true,
        isLastPage: true,
        list: [
          {
            areaId: null,
            areaName: "",
            code: "",
            concentrator: "",
            connect: null,
            daytime: "",
            endTime: null,
            factoryName: "",
            fcode: null,
            fix: false,
            fixValue: "未处理",
            flux: "未支付",
            getMeter: 1,
            id: null,
            isxz: "",
            lvalue: "",
            meter: null,
            model: null,
            modifyBy: "2",
            modifyTime: "异常",
            offset: 0,
            page: 1,
            pageCount: 20,
            position: "",
            protocolName: null,
            rowNumber: 0,
            sensorModel: null,
            sn: null,
            status: "2",
            totalPage: 0,
            type: 5,
            unusual: null,
            usn: "00",
            waterGroup: null
          },
          {
            areaId: null,
            areaName: "",
            code: "",
            concentrator: "",
            connect: null,
            daytime: "",
            endTime: null,
            factoryName: "",
            fcode: null,
            fix: false,
            fixValue: "未处理",
            flux: "未销账",
            getMeter: 1,
            id: null,
            isxz: "",
            lvalue: "",
            meter: null,
            model: null,
            modifyBy: "2",
            modifyTime: "异常",
            offset: 0,
            page: 1,
            pageCount: 20,
            position: "",
            protocolName: null,
            rowNumber: 0,
            sensorModel: null,
            sn: null,
            status: "1",
            totalPage: 0,
            type: 5,
            unusual: null,
            usn: "00",
            waterGroup: null
          },
          {
            areaId: null,
            areaName: "",
            code: "",
            concentrator: "",
            connect: null,
            daytime: "",
            endTime: null,
            factoryName: "",
            fcode: null,
            fix: false,
            fixValue: "未处理",
            flux: "未支付",
            getMeter: 1,
            id: null,
            isxz: "",
            lvalue: "",
            meter: null,
            model: null,
            modifyBy: "2",
            modifyTime: "异常",
            offset: 0,
            page: 1,
            pageCount: 20,
            position: "",
            protocolName: null,
            rowNumber: 0,
            sensorModel: null,
            sn: null,
            status: "2",
            totalPage: 0,
            type: 5,
            unusual: null,
            usn: "00",
            waterGroup: null
          },
          {
            areaId: null,
            areaName: "",
            code: "",
            concentrator: "",
            connect: null,
            daytime: "",
            endTime: null,
            factoryName: "",
            fcode: null,
            fix: false,
            fixValue: "未处理",
            flux: "未销账",
            getMeter: 1,
            id: null,
            isxz: "",
            lvalue: "",
            meter: null,
            model: null,
            modifyBy: "2",
            modifyTime: "异常",
            offset: 0,
            page: 1,
            pageCount: 20,
            position: "",
            protocolName: null,
            rowNumber: 0,
            sensorModel: null,
            sn: null,
            status: "1",
            totalPage: 0,
            type: 5,
            unusual: null,
            usn: "00",
            waterGroup: null
          },
          {
            areaId: null,
            areaName: "",
            code: "",
            concentrator: "",
            connect: null,
            daytime: "",
            endTime: null,
            factoryName: "",
            fcode: null,
            fix: false,
            fixValue: "未处理",
            flux: "未销账",
            getMeter: 1,
            id: null,
            isxz: "",
            lvalue: "",
            meter: null,
            model: null,
            modifyBy: "1",
            modifyTime: "正常",
            offset: 0,
            page: 1,
            pageCount: 20,
            position: "",
            protocolName: null,
            rowNumber: 0,
            sensorModel: null,
            sn: null,
            status: "1",
            totalPage: 0,
            type: 5,
            unusual: null,
            usn: "00",
            waterGroup: null
          },
          {
            areaId: null,
            areaName: "",
            code: "",
            concentrator: "",
            connect: null,
            daytime: "",
            endTime: null,
            factoryName: "",
            fcode: null,
            fix: false,
            fixValue: "未处理",
            flux: "未支付",
            getMeter: 1,
            id: null,
            isxz: "",
            lvalue: "",
            meter: null,
            model: null,
            modifyBy: "1",
            modifyTime: "正常",
            offset: 0,
            page: 1,
            pageCount: 20,
            position: "",
            protocolName: null,
            rowNumber: 0,
            sensorModel: null,
            sn: null,
            status: "2",
            totalPage: 0,
            type: 5,
            unusual: null,
            usn: "00",
            waterGroup: null
          },
          {
            areaId: null,
            areaName: "",
            code: "",
            concentrator: "",
            connect: null,
            daytime: "",
            endTime: null,
            factoryName: "",
            fcode: null,
            fix: false,
            fixValue: "未处理",
            flux: "未销账",
            getMeter: 1,
            id: null,
            isxz: "",
            lvalue: "",
            meter: null,
            model: null,
            modifyBy: "1",
            modifyTime: "正常",
            offset: 0,
            page: 1,
            pageCount: 20,
            position: "",
            protocolName: null,
            rowNumber: 0,
            sensorModel: null,
            sn: null,
            status: "1",
            totalPage: 0,
            type: 5,
            unusual: null,
            usn: "00",
            waterGroup: null
          }
        ],
        navigateFirstPage: 1,
        navigateLastPage: 1,
        navigatePages: 8,
        navigatepageNums: Array(1),
        nextPage: 0,
        pageNum: 1,
        pageSize: 20,
        pages: 1,
        prePage: 0,
        size: 5,
        startRow: 1,
        total: 5
      };
    },

    demand() {
      //查询
      // this.tableQuery.page = 1
      // this.tableQuery.pageCount = 20
      this.init();
    },
    //   导出
    exportExcel() {
      //   	let listData = {}
      //   	this.tableQuery.pageCount = this.historyData.total ===0? 20:this.historyData.total
      //     let params ={
      //       "busicode":"MeterReadingList",
      //       "data": this.tableQuery
      //     }
      //     this.$api.fetch({
      //       apiUrl: 'interface.api',//路径
      //       method: 'post',//请求方法
      //       params:params,//参数
      //       needErrorCallback:true
      //     }).then(res =>{
      //     	if(res.code===0){
      //         listData = res.data
      //         if (!listData.list[0]) {
      //         		this.$notify({
      //               title: '警告',
      //               message:'表格没有相关数据',
      //               type: 'error'
      //             })
      //         	} else {
      //         		import('@/vendor/Export2Excel').then(excel => {
      // 			        const tHeader = ['水表编号', '抄表日期', '所属小区','厂家编号','厂家','型号', '当日读数', '修正读数', '当日水量', '数据状态',  '用户编号','集中器编号','用户地址']
      // 			        const filterVal = ['code', 'daytime', 'areaName','fcode','factoryName','model','lvalue', 'fixValue','flux', 'status', 'usn', 'concentrator', 'position']
      // 			        const list = listData.list
      // 			        const data = this.formatJson(filterVal, list)
      // 			        excel.export_json_to_excel({
      // 			          header: tHeader,
      // 			          data,
      // 			          filename: this.tableQuery.daytime + '抄表数据',
      // 			          autoWidth: '100'
      // 			        })
      // 			      })
      //         		this.tableQuery.pageCount = 20
      //         	}
      //       }
      //     })
    },
    //分页
    handleSizeChange(val) {
      //显示多少数据一页
      // this.tableQuery.pageCount = val
      // this.tableQuery.page = 1
      this.init();
    },
    handleCurrentChange(val) {
      //显示多少页码
      // this.tableQuery.page = val
      this.init();
    },

    cellClick(row, column, cell, event) {
      //点击文件名
      let that = this;
    },
    indexMethod(index) {
      //获取表格序号
      //    return  (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1) ;
      return (
        (this.histroyData.pageSize - 20) * this.histroyData.pages + (index + 1)
      );
    },
    closeDialog() {
      //关闭会话
      this.HandleShow = false;
      this.detalisShow = false;
      this.leftTableShow = true;
      // this.crumbsData.titleList.splice(2, 1);

      this.init();
    },
    //弹出框
    submit(formName) {
      //提交
      this.$refs.childUnionPay.submit();
      // this.UnionPayVisible = false;
    },
    handle() {
      this.HandleShow = true;
      this.leftTableShow = false;
      // this.$set(this.crumbsData.titleList, "2", { title: '处理', method: () => { window.histroy.back() } })
    },
    details() {
      this.leftTableShow = false;
      this.detalisShow = true;
      // this.$set(this.crumbsData.titleList, "2", { title: '详情', method: () => { window.histroy.back() } })
    }
  },
  watch: {
    maxHeight() {
      this.tableShow = false;
      this.$nextTick(() => {
        this.tableShow = true;
      });
    }
  }
};
</script>
<style lang="scss">
.UnionPay {
  width: 100%;
  height: 100%;
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 0px;
  }
}
</style>