<template>
      <!-- 开票资料变更 -->
    <div   class="InvoiceInformation">
        <el-form  class="formBill" size="mini" :inline="true" :model="InvoiceInformationForm" label-width="130px" ref="ruleForm" :rules="rules">
          <el-form-item label="发票类型：" prop="invoiceType">
            <!-- <el-input v-model="InvoiceInformationForm.invoiceType" placeholder=""></el-input> -->
            <el-select clearable v-model="InvoiceInformationForm.invoiceType" placeholder="">
              <el-option v-for="(item,index) in iimDicData.bbtData" :key="index" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单位名称：">
            <el-input v-model="InvoiceInformationForm.invoiceTitle" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="纳税人识别号：">
            <el-input v-model="InvoiceInformationForm.invoiceTax" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="联系地址：">
            <el-input v-model="InvoiceInformationForm.invoiceAddr" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="座机号码：">
            <el-input v-model="InvoiceInformationForm.invoiceLink" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="开户行：">
            <!-- <el-select clearable v-model="InvoiceInformationForm.invoiceBank" placeholder="">
              <el-option v-for="(item,index) in InvoiceInformationForm.bankName" :key="index" :label="item.name" :value="item.value"></el-option>
            </el-select> -->
            <el-cascader
              v-model="InvoiceInformationForm.invoiceBank"
              :options="bankTreeData"
              :show-all-levels="false"
              :props="props"
              @change="handleChange">
            </el-cascader>
          </el-form-item>
          <el-form-item label="银行账号：" class="">
              <el-input v-model="InvoiceInformationForm.invoiceAccount" placeholder="">
              <el-button slot="append" icon="el-icon-reading"  type="primary" class="scanning-btn" size='mini'></el-button>
              </el-input>
          </el-form-item>
          <el-form-item label="投递方式：">
            <el-select clearable v-model="InvoiceInformationForm.deliverWay" placeholder="自取">
              <el-option v-for="(item,index) in iimDicData.sdwData" :key="index" :label="item.name" :value="item.value"></el-option>

            </el-select>
          </el-form-item>
        </el-form>
    </div>
    
</template>
<script>
export default {
  name: "InvoiceInformation",
  props:['InvoiceInformationData','IIMdicData'],
  data() {
    return {
      tabsName:"after",
      InvoiceInformationForm: {},
      iimDicData:{},
      bbtData:[],
      sdwData:[],
      //开户行
      bankTreeData:[],
      props: {//树结构格式
        value: 'id',
        label: 'name'
      },
      rules: {
        userNume: [
          { required: true, message: '请输入用户编号', trigger: 'blur' },
        ],
        invoiceType: [
          { required: true, message: '请输入发票类型', trigger: 'blur' },
        ]
      },
      histroyData: {},

    }
  },
  mounted() {
    this.InvoiceInformationForm = Object.assign({},this.InvoiceInformationData)
    setTimeout(() => {
      this.iimDicData = this.IIMdicData;
    },0);
    this.init();
  },
  methods: {
    init() {
      // this.getDictionary()
      this.getBankTreeData()
    },
    submit(){
      return this.InvoiceInformationForm
    },
    //  数据字典（查询框）
    getDictionary() {
      var _this = this
      var params = {
        "busicode": "DictionarySelect",
        "data": 'BBT,SDW'
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.$set(_this, 'bbtData', res['BBT'])
        _this.$set(_this, 'sdwData', res['SDW'])
      })
    },
    //树结构数据处理
    getArr(data){
      for (let i = 0; i< data.length; i++) {
        if(data[i].isParent === false) {
          delete data[i].children
        } else {
          this.getArr(data[i].children)
        }
      }
      return data
    },
    // 开户行下拉框
    getBankTreeData() {
      let _this = this
      let params = {
        "busicode": "BankTree",
        "data": {},
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        let data = _this.getArr(res.children)
        _this.bankTreeData = data;
      })
    },
    //开户银行下拉框值发生改变
    handleChange(value) {
      let length = value.length;
      this.formData.accountInfo.openAccountBank = value[length - 1]
    },
  }
}
</script>
<style lang="scss">
.InvoiceInformation {
}
</style>