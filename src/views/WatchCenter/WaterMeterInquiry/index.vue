<template>
  <div class="water-meter-inquiry">
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right" v-if="wmeterInquiryConShow">
        <el-button type="primary" size="mini" icon="el-icon-upload2" @click="exportExcel">导出</el-button>
      </div>
      <div class="bread-contain-right" v-else>
        <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
      </div>
    </div>

    <section class="wmeterInquiryCon" v-if="wmeterInquiryConShow">
      <div class="toolbar">
        <el-form :inline="true" size="mini" :model="tableQuery" class="demo-form-inline">
          <el-form-item class="form-left">
            <el-form-item label='注册日期：'>
              <el-date-picker v-model="tableQuery.Time" type="daterange" value-format="yyyy-MM-dd" range-separator="至" :picker-options="pickerOptions" :clearable="true" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="模糊查询：" class="width-200">
              <el-tooltip class="item" effect="dark" content="水表编号、出厂编号、用户编号" placement="top">
                <el-input v-model="tableQuery.fuzzyQuery" @keyup.enter.native="search"></el-input>
              </el-tooltip>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" size="mini" @click.native="hidden" icon="el-icon-arrow-down upchange" class="soce-query">高级查询</el-button>
              <el-button class='searchBtn' @click="search" icon="el-icon-search"></el-button>
            </el-form-item>

          </el-form-item>

          <el-form-item class="form-right">
          </el-form-item>
          <!-- 高级查询内容 -->
          <el-form-item v-show="isActive" class="advancedQuery">

            <el-form-item label="水表厂家：">
              <el-select clearable v-model="tableQuery.meterFactory" placeholder="水表厂家">
                <el-option v-for="item in meterFactoryData.list" :key="item.factoryId" :label="item.factoryName" :value="item.factoryId"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="水表类型：">
              <el-select clearable v-model="tableQuery.meterType" placeholder="水表类型">
                <el-option v-for="item in dictionaryData.MMT" :key="item.id" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="水表型号：">
              <el-select clearable v-model="tableQuery.meterModel" placeholder="水表型号">
                <el-option v-for="item in meterModelData" :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="水表口径：">
              <el-select clearable v-model="tableQuery.meterBore" placeholder="水表口径">
                <el-option v-for="item in dictionaryData.MMC" :key="item.id" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="水表状态：">
              <el-select clearable v-model="tableQuery.meterStatus" placeholder="水表状态">
                <el-option v-for="item in dictionaryData.MMS" :key="item.id" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="营业所：">
              <el-select clearable v-model="tableQuery.departBelong" placeholder="营业所">
                <el-option v-for="(item,index) in businessOutletsData" :key="index" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="水表使用年限：">
              <el-input v-model="tableQuery.serviceLife" onkeyup="this.value=this.value.replace(/\D|^0/g,'')" onafterpaste="this.value=this.value.replace(/\D|^0/g,'')"></el-input>
            </el-form-item>

            <el-form-item label="是否超期：">
              <el-radio v-model="tableQuery.overdue" label="1">是</el-radio>
              <el-radio v-model="tableQuery.overdue" label="2">否</el-radio>
            </el-form-item>

          </el-form-item>
        </el-form>
      </div>
      <div class="kl-table">
        <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="tableData.list" class="water-meter-inquiry-table">

          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="meterNo" min-width="100" label="水表编号">
          </el-table-column>

          <el-table-column prop="factoryNo" min-width="100" label="出厂编号">
          </el-table-column>

          <el-table-column prop="meterBoreName" min-width="100" label="水表口径">
          </el-table-column>

          <el-table-column prop="meterFactoryName" min-width="100" label="水表厂家">
          </el-table-column>

          <el-table-column prop="meterModelName" min-width="120" label="水表型号">
          </el-table-column>

          <el-table-column prop="meterStatusName" min-width="120" label="水表状态" show-overflow-tooltip>
          </el-table-column>

          <el-table-column label="操作" fixed="right" width="85">
            <template slot-scope="scope">
              <el-button type="text" @click="details(scope.$index, scope.row)">详情</el-button>
            </template>
          </el-table-column>

        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableQuery.page" :page-sizes="[50, 100, 500, 1000]" :page-size="tableQuery.pageCount" layout="total, sizes, prev, pager, next, jumper" :total="tableData.total">
          </el-pagination>
        </div>
      </div>
    </section>
    <WaterMeterInquiryEdit v-else :meterId="meterId"></WaterMeterInquiryEdit>
  </div>
</template>
<script>
import WaterMeterInquiryEdit from "./WaterMeterInquiryEdit";
export default {
  name: "water-meter-inquiry",
  components: {
    WaterMeterInquiryEdit
  },
  data() {
    return {
      // 数据字典数据
      dictionaryData: {},
      // 水表厂家下拉框数据
      meterFactoryData: {},
      // 水表型号下拉框数据
      meterModelData: {},
      // 营业所下拉框数据
      businessOutletsData: {},
      // 子页面表单数据接口所需入参（主键id）
      meterId: '',


      tableShow: false,
      maxHeight: 0,
      wmeterInquiryConShow: true,
      crumbsData: {
        //面包屑
        titleList: [{ title: "表计管理" }, { title: "查询" }]
      },
      isActive: false, //控制高级查询内容的显示
      // 日期选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      tableShow: false,
      maxHeight: 0,
      tableData: {},
      tableQuery: {
        page: 1,
        pageCount: 20,
        meterFactory: "", //水表厂家
        meterType: "", //水表类型
        meterModel: "", //水表型号
        meterBore: "", //水表口径
        meterStatus: "", //水表状态
        departBelong: "", //所属部门
        fuzzyQuery: "", //模糊查询
        // overdue: "1", //是否超期
        // serviceLife: "", //水表使用年限
      }
    };
  },
  mounted() {
    eventBus.$emit("asideMenuShow", "businessMenuShow5");
    this.init();
    this.getDictionary()
    this.getMeterFactory()
    this.getMeterModel()
    this.getBusinessOutlets()
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.common.changeTable(this, ".water-meter-inquiry", [
        ".water-meter-inquiry .toolbar",
        ".water-meter-inquiry .block",
        ".water-meter-inquiry #crumbs"
      ]);
    });
  },
  methods: {
    // 列表初始化
    init() {
      let _this = this;
      let params = {
        busicode: "MsInfoList",
        data: this.tableQuery
      };
      this.$api.fetch({
        params: params,//参数

      }).then(res => {
        _this.tableData = res
      })
    },
    // 数据字典（查询框）
    getDictionary() {
      var _this = this
      var params = {
        "busicode": "DictionarySelect",
        "data": "MMT,MMS,MMC"//水表类型、水表状态、水表口径
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.dictionaryData = res
      })
    },
    // 水表厂家下拉数据
    getMeterFactory() {
      var _this = this
      var params = {
        "busicode": "MeterFactoryList",
        "data": {
          "page": 1,
          "pageCount": 20
        }
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.meterFactoryData = res
      })
    },
    // 水表型号下拉数据
    getMeterModel() {
      var _this = this
      var params = {
        "busicode": "WaterMeModelOpList",
        "data": {}
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.meterModelData = res
      })
    },
    // 营业所下拉数据
    getBusinessOutlets() {
      var _this = this
      var params = {
        "busicode": "ServAreaOpList",
        "data": {}
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.businessOutletsData = res
      })
    },
    // 导出按钮
    exportExcel() {
      var _this = this
      var params = {
        "busicode": "MsInfoExport",
        "data": {},
        "token": localStorage.getItem('token'),
        "sysType": '002'
      }
      console.log(window.location.host + '/css2/exportExcel.api?json=' + encodeURI(JSON.stringify(params)))
      window.open(window.location.host + '/css2/exportExcel.api?json=' + encodeURI(JSON.stringify(params)))
    },
    hidden() {
      if (this.isActive == true) {
        $(".upchange")
          .addClass("el-icon-arrow-down")
          .removeClass("el-icon-arrow-up");
        this.isActive = false;
      } else {
        $(".upchange")
          .addClass("el-icon-arrow-up")
          .removeClass("el-icon-arrow-down");

        this.isActive = true;
      }
      this.$nextTick(() => {
        //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
        this.common.changeTable(this, ".water-meter-inquiry", [
          ".water-meter-inquiry .toolbar",
          ".water-meter-inquiry .block",
          ".water-meter-inquiry #crumbs"
        ]);
      });
    },
    // 搜索
    search() {
      if (this.tableQuery.Time !== undefined) {
        this.tableQuery.beginTime = this.tableQuery.Time[0]
        this.tableQuery.endTime = this.tableQuery.Time[1]
        delete this.tableQuery.Time
      }
      console.log(this.tableQuery);
      this.tableQuery.page = 1;
      this.init();
    },
    //分页
    handleSizeChange(val) {
      //显示多少数据一页
      this.tableQuery.pageCount = val;
      this.tableQuery.page = 1;
      this.init();
    },
    handleCurrentChange(val) {
      //页码点击
      this.tableQuery.page = val;
      this.init();
    },
    //   详情按钮
    details(index, row) {
      let _this = this;
      _this.wmeterInquiryConShow = false
      _this.meterId = row.meterId
    },
    // 列表的NO列
    indexMethod(index) {
      return (
        (this.tableQuery.page - 1) * this.tableQuery.pageCount + (index + 1)
      );
    },
    closeDialog() {
      this.wmeterInquiryConShow = true;
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
@import "../../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.water-meter-inquiry {
  width: 100%;
  height: 100%;
  .wmeterInquiryCon {
    width: 100%;
    height: calc(100% - 40px);
  }
}
</style>
