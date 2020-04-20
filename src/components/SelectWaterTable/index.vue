<template>
  <div class="chooseWaterMeter">
    <el-form :inline="true" size="mini" :model="tableQuery" class="demo-form-inline">

      <el-form-item label="装表日期：">
        <el-date-picker v-model="tableQuery.Time" type="daterange" value-format="yyyy-MM-dd" range-separator="至" :picker-options="pickerOptions" :clearable="true" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="用户姓名：">
        <el-input v-model="tableQuery.userName"></el-input>
      </el-form-item>

      <el-form-item label="模糊查询：" class="width-200">
        <el-tooltip class="item" effect="dark" content="用户编号、水表编号、出厂编号" placement="top">
          <el-input v-model="tableQuery.fuzzyQuery"></el-input>
        </el-tooltip>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" size="mini" @click.native="hidden" icon="el-icon-arrow-down upchange" class="soce-query">高级查询</el-button>
        <el-button class='searchBtn' @click="search" icon="el-icon-search"></el-button>
      </el-form-item>

      <!-- 高级查询 -->
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

        <el-form-item label="水表形态：">
          <el-select clearable v-model="tableQuery.meterForm" placeholder="水表形态">
            <el-option v-for="item in dictionaryData.MMF" :key="item.id" :label="item.name" :value="item.value"></el-option>
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

        <el-form-item label="表读数大于：">
          <el-input v-model="tableQuery.upperNum" type="number"></el-input>
        </el-form-item>
        <el-form-item label="已使用周期：">
          <el-input v-model="tableQuery.usageCycle" type="number"></el-input>
        </el-form-item>

        <el-form-item label="册本号：">
          <el-input v-model="tableQuery.bookNo"></el-input>
        </el-form-item>

        <el-form-item label="用户地址：">
          <el-input v-model="tableQuery.userAddr"></el-input>
        </el-form-item>
      </el-form-item>
    </el-form>

    <div class="kl-table">
      <el-table stripe border center :data="tableData.list" @select="getSelectData" class="change-tables-table">

        <el-table-column type="selection" width="50" fixed="left">
        </el-table-column>

        <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
        </el-table-column>

        <el-table-column prop="meterNo" min-width="120" label="水表编号">
        </el-table-column>

        <el-table-column prop="factoryNo" min-width="100" label="出厂编号">
        </el-table-column>

        <el-table-column prop="meterBoreName" min-width="100" label="水表口径">
        </el-table-column>

        <el-table-column prop="departBelongName" min-width="100" label="水表厂家">
        </el-table-column>

        <el-table-column prop="meterTypeName" min-width="120" label="水表类型">
        </el-table-column>

        <el-table-column prop="meterModelName" min-width="120" label="水表型号">
        </el-table-column>

        <el-table-column prop="meterStatusName" min-width="120" label="水表状态" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="billDate" min-width="150" label="注册日期" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[20, 100, 500, 1000]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="histroyData.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "chooseWaterMeter",
  data() {
    return {
      // 表格数据
      tableData: [],
      // 查询条件数据
      tableQuery: {},
      // 水表厂家下拉框数据
      meterFactoryData: [],
      // 数据字典数据
      dictionaryData: [],
      // 水表型号下拉框数据
      meterModelData: {},
      // 列表勾选数据
      selectData: [],




      histroyData: {},
      isActive: false,
      DateChoosevalue: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  mounted() {
    this.init()
    this.getMeterFactory()
    this.getDictionary()
    this.getMeterModel()
  },
  methods: {
    // 初始化
    init() {
      let _this = this
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
    // 数据字典（查询框）
    getDictionary() {
      var _this = this
      var params = {
        "busicode": "DictionarySelect",
        "data": "MMT,MMS,MMC,MMF"//水表类型、水表状态、水表口径
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.dictionaryData = res
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
    // 查询按钮
    search() {
      if (this.tableQuery.Time !== undefined) {
        this.tableQuery.setupDate1 = this.tableQuery.Time[0]
        this.tableQuery.setupDate2 = this.tableQuery.Time[1]
        delete this.tableQuery.Time
      }
      console.log(this.tableQuery);
      this.tableQuery.page = 1
      this.init()
    },
    // 列表选中数据事件（获取列表已勾选数据）
    getSelectData(data){
      this.selectData = []
      for (let i = 0; i < data.length; i++) {
        this.selectData.push(data[i].meterNo)
      }
      console.log(this.selectData);
    },
    submit(){
      eventBus.$emit('selectData', this.selectData)
    },








    hidden() {
      if (this.isActive == true) {
        $(".upchange")
          .addClass("el-icon-arrow-down")
          .removeClass("el-icon-arrow-up");
        this.isActive = false;
        $(".el-table--fit").css("height", "66%");
      } else {
        $(".upchange")
          .addClass("el-icon-arrow-up")
          .removeClass("el-icon-arrow-down");
        this.isActive = true;
        $(".el-table--fit").css("height", "50%");
      }
    },
    closeDialog() {
      //关闭会话
      this.waterChoooseVisible = false;
      this.init();
    },
    indexMethod(index) {
      //获取表格序号
      //    return  (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1) ;
      return (
        (this.tableData.pageSize - 20) * this.tableData.pages + (index + 1)
      );
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
    }
  }
};
</script>

<style lang="scss">
.chooseWaterMeter {
  padding: 10px;
  .kl-table {
    padding: 0px;
    .block {
      text-align: right;
      padding: 10px 0px;
    }
  }
}
</style>