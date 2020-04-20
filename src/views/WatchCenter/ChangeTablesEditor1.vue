<template>
  <div class="ChangeTablesEdit">
    <el-form :inline="true" size="mini" :model="formData" class="formBill-Three" label-width="130px">
      <!-- <commonPart :parentToChild="'3'"></commonPart> -->
      <legend class="legendColumn">拆表信息</legend>

      <el-form-item label="拆表类型：">
        <el-select clearable v-model="formData.replaceType" placeholder="拆表类型" :disabled="!tableEdit">
          <el-option v-for="item in dictionaryData.MRM" :key="item.id" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="计划完工日期：">
        <el-date-picker v-model="formData.planFinishDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" :disabled="!tableEdit">
        </el-date-picker>
      </el-form-item>

      <el-form-item label='拆表员：'>
        <el-select clearable v-model="formData.replaceStaff" placeholder="请选择" :disabled="!tableEdit">
          <el-option v-for="item in replaceStaffData" :key="item.userAccount" :label="item.userName" :value="item.userAccount">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="拆表原因：" class="f2">
        <el-input type="textarea" :rows="2" v-model="formData.replaceReason" placeholder="拆表原因" :disabled="!tableEdit"></el-input>
      </el-form-item>

      <div class="kl-table">
        <el-table stripe border :data="tableData.list" class="change-tables-table">

          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="bookNo" min-width="100" label="册本">
          </el-table-column>

          <el-table-column prop="bookNo" min-width="80" label="用户编号">
          </el-table-column>

          <el-table-column prop="setupMeterAddr" min-width="80" label="装表地址">
          </el-table-column>

          <el-table-column prop="oldMeterNo" min-width="80" label="水表编号">
          </el-table-column>

          <el-table-column prop="meterForm" min-width="80" label="水表形态">
          </el-table-column>

          <el-table-column prop="oldMeterBore" min-width="80" label="水表口径">
          </el-table-column>

          <el-table-column prop="setupMeterDate" min-width="80" label="装表日期">
          </el-table-column>

          <el-table-column prop="upperNum" min-width="80" label="表读数" show-overflow-tooltip>
          </el-table-column>

          <!-- <el-table-column prop="meter" min-width="80" label="累计流量" show-overflow-tooltip>
          </el-table-column> -->

          <el-table-column prop="term" min-width="80" label="使用期限">
          </el-table-column>

          <el-table-column prop="usedTerm" min-width="80" label="已用周期" show-overflow-tooltip>
          </el-table-column>

          <el-table-column label="操作" fixed="right" width="80">
            <template slot-scope="scope">
              <el-button type="text" @click="backfill(scope.$index, scope.row)">查看附件</el-button>
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
      <legend class="legendColumn">流程处理</legend>
      <procedure></procedure>
    </el-form>
  </div>
</template>
<script>
import chooseWaterMeter from "./chooseWaterMeter";
import commonPart from "@/views/CustomerCenter/changeMangement/commonPart"; //公告模块
import procedure from "@/components/procedure"; //流程审核
export default {
  name: "ChangeTablesEdit",
  components: {
    chooseWaterMeter,
    commonPart,
    procedure
  },
  props: ['ChangeTablesEditor1NeedData'],
  data() {
    return {
      // 详情数据
      formData: {},
      // 数据字典数据
      dictionaryData: {},
      // 列表数据
      tableData: {
        pageSize: 20,
        pages: 1,
        list: [],
      },
      // 是否可编辑
      tableEdit: true,
      // 拆表员下拉数据
      replaceStaffData: [],



      formData: {},
      histroyData: {},
      waterChooseVisible: false,
      WaterEditorName: "水表选择",
      ruleFormData: {}
    };
  },
  mounted() {
    this.tableEdit = this.ChangeTablesEditor1NeedData.tableEdit
    console.log(this.ChangeTablesEditor1NeedData);
    this.init()
  },
  methods: {
    // 初始化
    init() {
      this.getFormData()
      this.getTableData()
      this.getDictionary()
      this.getReplaceStaffData()
    },
    // 详情数据
    getFormData() {
      let _this = this;
      let params = {
        busicode: "MsChgList",
        data: {
          id: _this.ChangeTablesEditor1NeedData.id,
          receiptType: 2
        }
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        // 上半部数据
        _this.formData = res.list[0]
        // 下半部列表数据
        // _this.getTableData('receiptId', res.list[0].id);
      })
    },
    // 数据字典（查询框）
    getDictionary() {
      var _this = this
      var params = {
        "busicode": "DictionarySelect",
        "data": "MRM"// 换表类型
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.dictionaryData = res
      })
    },
    // 获取拆表员数据
    getReplaceStaffData() {
      let _this = this;
      let params = {
        busicode: "PostUserQuery",
        data: '2'
      };
      this.$api.fetch({
        params: params,//参数

      }).then(res => {
        _this.replaceStaffData = res
      })
    },
    // 选择水表按钮
    // chooseWaterMeter() {
    //   this.waterChooseVisible = true
    // },
    // 选择水表弹出框取消按钮
    // closeDialogSelectWater() {
    //   this.waterChooseVisible = false
    // },
    // 选择水表弹出框确定按钮
    fixDialogSelectWater() {
      this.$refs.SelectWaterTable.submit()
      this.waterChooseVisible = false
    },
    // 获取列表数据
    getTableData(request, data) {
      let _this = this
      var params = {
        "busicode": "MsChgQuery",
        "data": {
          receiptId: this.ChangeTablesEditor1NeedData.id,
        }
      }
      // 详情数据传id，查询数据传数组
      // if (request == 'meterNos') {
      //   params.data.meterNos = data
      // } else if (request == 'receiptId') {
      //   params.data.receiptId = data
      // }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.tableData.list = res.list
        console.log(res.list);
        // if (request == 'meterNos') {
        //   for (let i = 0; i < res.list.length; i++) {
        //     _this.tableData.list.push(res.list[i])
        //   }
        // } else if (request == 'receiptId') {
        //   _this.tableData = res
        // }
      })
    },
    // 暂存按钮（添加/修改）
    save() {
      console.log(this.formData);
      var _this = this
      var saveData = {
        
        // 上半部下拉框数据
        "msChgPlan": {
          receiptType: 2,
          id: _this.formData.id,
          // 换表类型
          replaceType: _this.formData.replaceType,
          // 计划完工日期
          planFinishDate: _this.formData.planFinishDate,
          // 拆表员
          replaceStaff: _this.formData.replaceStaff,
          // 拆表原因
          replaceReason: _this.formData.replaceReason,
        },
      }

      var params = {
        "busicode": "MsChgUpdate",
        "data": saveData
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.$notify({
          title: '成功',
          message: '修改成功！',
          type: 'success'
        });
        _this.$parent.closeDialog()
      })
    },






    chooseWaterMeter() {
      this.waterChooseVisible = true;
    },
    closeDialog() {
      //关闭会话
      this.waterChoooseVisible = false;
      this.waterChooseVisible = false;
      this.init();
    },
    //弹出框
    submit(formName) {
      //提交
      this.$refs.childWaterEditor.submit();
      // this.waterChoooseVisible = false;
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
@import "../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.ChangeTablesEdit {
  height: calc(100% - 41px);
  overflow-y: auto;
  .select-btn {
    float: right;
    margin-bottom: 0.2rem;
  }
  .formBill-One,
  .formBill-Two,
  .formBill-Three,
  .formBill .f4 .el-form-item__content {
    width: 100%;
  }
}
</style>
