<template>
  <div class="WarehousingEdit">
    <el-form :inline="true" :model="formData" :rules="rules" ref="ruleForm" class="formBill" size="mini" label-width="130px">

      <commonPart :commonPartForm="commonPartForm" v-if="commonPartShow"></commonPart>

      <legend class="legendColumn">注册信息</legend>

      <el-form-item label="水表口径：" prop="meterBore">
        <el-select clearable v-model="formData.meterBore" placeholder="水表口径" :disabled="!tableEdit">
          <el-option v-for="item in dictionaryData.MMC" :key="item.id" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="水表厂家：" prop="meterFactory">
        <el-select clearable v-model="formData.meterFactory" placeholder="水表厂家" :disabled="!tableEdit">
          <el-option v-for="item in meterFactoryData.list" :key="item.factoryId" :label="item.factoryName" :value="item.factoryId"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="水表形态：" prop="meterForm">
        <el-select clearable v-model="formData.meterForm" placeholder="水表形态" :disabled="!tableEdit">
          <el-option v-for="item in dictionaryData.MMF" :key="item.id" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="水表类型：" prop="meterType">
        <el-select clearable v-model="formData.meterType" placeholder="水表类型" :disabled="!tableEdit">
          <el-option v-for="item in dictionaryData.MMT" :key="item.id" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="水表型号：" prop="meterModel">
        <el-select clearable v-model="formData.meterModel" placeholder="水表型号" :disabled="!tableEdit">
          <el-option v-for="item in meterModelData" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="营业所：" prop="departBelong">
        <el-select clearable v-model="formData.departBelong" :disabled="!tableEdit" placeholder="营业所">
          <el-option v-for="item in businessOutletsData" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="远程通讯费：">
        <el-input clearable v-model="formData.transCommFee" :disabled="!tableEdit" placeholder="远程通讯费"></el-input>
      </el-form-item>

      <el-form-item label="通讯运营商：">
        <el-select clearable v-model="formData.commOperator" :disabled="!tableEdit" placeholder="通讯运营商">
          <el-option v-for="item in dictionaryData.TXS" :key="item.id" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="通讯费开始日期：">
        <el-date-picker v-model="formData.commFeeStart" type="date" value-format="yyyy-MM-dd" placeholder="开始日期" :disabled="!tableEdit">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="通讯费结束日期：">
        <el-date-picker v-model="formData.commFeeEnd" type="date" value-format="yyyy-MM-dd" placeholder="结束日期" :disabled="!tableEdit">
        </el-date-picker>
      </el-form-item>

    </el-form>

    <el-button @click="addRow" class="add-line" size="mini" type="primary" v-show="tableEdit">添加行</el-button>

    <div class="kl-table">
      <el-table stripe border :data="storageQueryData.list" class="Warehousing-table">

        <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
        </el-table-column>

        <el-table-column prop="meterNo" min-width="80" label="水表编号">
        </el-table-column>

        <el-table-column prop="factoryNo" min-width="80" label="出厂编号">
          <template slot-scope="scope" v-if="tableEdit">
            <el-input v-model="scope.row.factoryNo" size="mini"></el-input>
          </template>
        </el-table-column>

        <el-table-column prop="meterCert" min-width="120" label="合格证号" show-overflow-tooltip>
          <template slot-scope="scope" v-if="tableEdit">
            <el-input v-model="scope.row.meterCert" size="mini"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" width="80" v-if="tableEdit">
          <template slot-scope="scope">
            <el-button type="text" class="noclick" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>

    </div>

    <legend class="legendColumn">流程处理</legend>
    <!-- <procedure></procedure> -->
    <div id="workflowDiv"></div>
  </div>
</template>
<script>
import commonPart from "@/views/CustomerCenter/changeMangement/commonPart"; //公告模块
import uploadFile from "@/components/uploadPic"; //上传附件
import procedure from "@/components/procedure"; //流程审核
export default {
  name: "WarehousingEdit",
  components: {
    uploadFile,
    procedure,
    commonPart
  },
  props: ['WarehousingEditNeedData'],
  data() {
    return {
      tableEdit: true,
      formData: {},
      // 水表明细数据
      storageQueryData: {
        list: [],
        pageSize: 20,
        pages: 1
      },
      // 公共模块所需数据
      commonPartForm: {
        parentToChild: '3'
      },

      commonPartShow: false,
      // 数据字典
      dictionaryData: {},
      // 水表厂家下拉数据
      meterFactoryData: {},
      // 水表型号下拉数据
      meterModelData: {},
      // 营业所下拉数据
      businessOutletsData: [],
      // 表单校验
      rules: {
        meterBore: [
          { required: true, message: '请选择水表口径', trigger: 'change' }
        ],
        meterFactory: [
          { required: true, message: '请选择水表厂家', trigger: 'change' }
        ],
        meterForm: [
          { required: true, message: '请选择水表形态', trigger: 'change' }
        ],
        meterType: [
          { required: true, message: '请选择水表类型', trigger: 'change' }
        ],
        meterModel: [
          { required: true, message: '请选择水表型号', trigger: 'change' }
        ],
        departBelong: [
          { required: true, message: '请选择营业所', trigger: 'change' }
        ],
        // 表单是否已暂存
        saved: false


      },




      // 日期选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
    };
  },
  mounted() {
    var _this = this
    this.tableEdit = this.WarehousingEditNeedData.tableEdit
    this.init()
    //审批界面接口
    this.getHtmlData();

    // 接收xls文件里的数据
    eventBus.$on('storageQueryData', (res) => {
      for (let i = 0; i < res.length; i++) {
        _this.storageQueryData.list.push(res[i])
      }
    })
  },
  methods: {
    // 初始化
    init() {
      if (this.WarehousingEditNeedData.content == 'details') {
        this.getFormData()
      }
      this.getDictionary()
      this.getMeterFactory()
      this.getMeterModel()
      this.getBusinessOutlets()
    },
    // 上半部数据
    getFormData() {
      let _this = this;
      let params = {
        busicode: "MsStorageList",
        data: {
          id: _this.WarehousingEditNeedData.id
        }
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.formData = res.list[0]

        _this.commonPartForm.billNo = res.list[0].billNo
        _this.commonPartForm.billDate = res.list[0].billDate
        _this.commonPartShow = true
        _this.getMsStorageQuery()
      })
    },
    // 获取水表明细（表格）
    getMsStorageQuery() {
      console.log(this.formData);
      let _this = this;
      let params = {
        busicode: "MsStorageQuery",
        data: {
          receiptId: _this.formData.id
        }
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.storageQueryData = res
      })
    },
    // 数据字典（查询框）
    getDictionary() {
      var _this = this
      var params = {
        "busicode": "DictionarySelect",
        "data": "MMC,MMF,MMT,TXS"//水表口径、水表形态、水表类型、远程通讯商
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
    // 添加行
    addRow() {
      this.storageQueryData.list.push({})
    },
    // 删除行
    deleteRow(index, row) {
      this.$confirm("是否确认删除该行?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.storageQueryData.list.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 暂存按钮（添加/修改）
    save(type, isSubmit) {
      var _this = this
      // 若表单已暂存过，则不再暂存
      if (this.saved) {
        // 保存后启动审批
        _this.common.startProcess(
          //receiptType单据类型，一般是启用工作流的表的数据库名称
          "MS_IN_PLAN",
          //title流程标题,一般是单据类型加单据编号等，容易区分的内容\用于主题
          "审批流配置:" + _this.formData.ctmName + "(" + _this.formData.billNo + ")",
          //billId单据Id
          _this.formData.id,
          //that:"页面的this对象"
          _this,
          //_then 提交后的回调函数，一般用来执行界面跳转
          () => {
            _this.$parent.closeDialog();
          }
        );
      } else {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            // 水表列表必填校验
            if (_this.storageQueryData.list.length <= 0) {
              _this.$message.error('请添加水表！')
              return
            }
            var saveData = {
              // 上半部分输入框数据
              // 水表口径
              meterBore: _this.formData.meterBore,
              // 水表厂家
              meterFactory: _this.formData.meterFactory,
              // 水表形态
              meterForm: _this.formData.meterForm,
              // 水表类型
              meterType: _this.formData.meterType,
              // 水表型号
              meterModel: _this.formData.meterModel,
              // 营业所
              departBelong: _this.formData.departBelong,
              // 远程通讯费
              transCommFee: _this.formData.transCommFee,
              // 通讯运营商
              commOperator: _this.formData.commOperator,
              // 通讯费开始日期
              commFeeStart: _this.formData.commFeeStart,
              // 通讯费开始日期
              commFeeEnd: _this.formData.commFeeEnd,
              //列表数据
              msInfoPlanDetail: [],
            }
            if (type == 'add') {
              for (let i = 0; i < _this.storageQueryData.list.length; i++) {

                if (_this.storageQueryData.list[i].factoryNo == '' || _this.storageQueryData.list[i].factoryNo === undefined) {
                  _this.$message.error('水表的出厂编号不能为空！')
                  return
                }

                saveData.msInfoPlanDetail.push({
                  // 出厂编号
                  factoryNo: _this.storageQueryData.list[i].factoryNo,
                  // 合格证号
                  meterCert: _this.storageQueryData.list[i].meterCert,
                })
              }
            } else if (type == 'update') {
              // 加id
              saveData.id = _this.formData.id

              for (let i = 0; i < _this.storageQueryData.list.length; i++) {

                if (_this.storageQueryData.list[i].factoryNo == '' || _this.storageQueryData.list[i].factoryNo === undefined) {
                  _this.$message.error('水表的出厂编号不能为空！')
                  return
                }

                saveData.msInfoPlanDetail.push({
                  id: _this.storageQueryData.list[i].id,
                  // 水表编号
                  meterNo: _this.storageQueryData.list[i].meterNo,
                  // 出厂编号
                  factoryNo: _this.storageQueryData.list[i].factoryNo,
                  // 合格证号
                  meterCert: _this.storageQueryData.list[i].meterCert,
                })
              }
            }

            var params = {
              "busicode": "",
              "data": saveData
            }
            if (type == 'add') {// 添加-暂存
              params.busicode = 'MsStorageAdd'
            } else if (type == 'update') {// 修改-暂存
              params.busicode = 'MsStorageUpdate'
            }
            this.$api.fetch({
              params: params,//参数
            }).then(res => {
              // 该表单已暂存过
              _this.saved = true
              // 添加成功后获得该条任务id
              if (type == 'add') {
                this.formData.id = res
              }

              _this.$notify({
                title: '成功',
                message: params.busicode == 'MsStorageAdd' ? '添加成功！' : '修改成功！',
                type: 'success'
              });

              if (isSubmit) { // 点击流程的提交按钮进入
                // 保存后启动审批
                _this.common.startProcess(
                  //receiptType单据类型，一般是启用工作流的表的数据库名称
                  "MS_IN_PLAN",
                  //title流程标题,一般是单据类型加单据编号等，容易区分的内容\用于主题
                  "审批流配置:" + _this.formData.ctmName + "(" + _this.formData.billNo + ")",
                  //billId单据Id
                  _this.formData.id,
                  //that:"页面的this对象"
                  _this,
                  //_then 提交后的回调函数，一般用来执行界面跳转
                  () => {
                    _this.$parent.closeDialog();
                  }
                );
              }
            })
          } else {
            return false;
          }
        });
      }
    },

    // 下载模板按钮
    exportExcel() {
      var _this = this
      var params = {
        "busicode": "MsStorageExport",
        "data": {},
        "token": localStorage.getItem('token'),
        "sysType": '002'
      }
      console.log('http://' + window.location.host + '/css2/exportExcel.api?json=' + encodeURI(JSON.stringify(params)))
      window.open('http://' + window.location.host + '/css2/exportExcel.api?json=' + encodeURI(JSON.stringify(params)))
    },

    // 获取审批流前端代码
    getHtmlData() {
      let _this = this;
      //************启用流程代码************** */
      console.log(_this.formData);
      _this.common.getProcessShowView(
        "MS_IN_PLAN",
        "审批流配置:" + _this.formData.processName + "(" + _this.formData.billNo + ")", // 流程标题,一般是单据类型加单据编号
        _this.formData.id, // 任务id
        _this.formData.processInstanceId, // 流程实例Id，添加时可为空
        "workflowDiv",
        _this,
        () => {
          _this.$parent.closeDialog() // 提交后回调方法
        },
        0, // 不等于1时，先保存后提交
        () => {
          if (_this.WarehousingEditNeedData.content == 'add') {// 添加
            _this.save('add', true)
          } else {// 修改
            _this.save('update', true)
          }

        });
    },





    indexMethod(index) {
      //获取表格序号
      return (
        (this.storageQueryData.pageSize - 20) * this.storageQueryData.pages + (index + 1)
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
    },
    demand() {
      //查询
      // this.tableQuery.page = 1
      // this.tableQuery.pageCount = 20
      this.init();
    },
    downFile() { },
    uploading() { }
  }
};
</script>
<style lang="scss">
@import "../../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.WarehousingEdit {
  height: calc(100% - 41px);
  overflow-y: auto;
  .add-line {
    float: right;
    margin-right: 20px;
    margin-bottom: 5px;
  }
  .el-table__body-wrapper td {
    height: 28px;
    line-height: 28px;
  }
}
</style>

