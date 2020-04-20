<template>
  <!-- 缴费方式变更 -->
  <div class="PaymentM">
    <el-form class="formBill" size="mini" :inline="true" :model="PaymentMethodAddForm" label-width="130px" ref="ruleForm" :rules="rules">
      <!-- <legend class="legendColumn">用水类型</legend> -->
      <el-form-item label="账户编号：">
        <el-input class="read-only" disabled="disabled" v-model="PaymentMethodAddForm.accountNo" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="账户类型：">
        <el-select clearable v-model="PaymentMethodAddForm.accountType" placeholder="">
          <el-option v-for="(item,index) in PaymentDicData.actData" :key="index" :label="item.name" :value="item.value"></el-option>

        </el-select>
      </el-form-item>
      <el-form-item label="缴费方式：">
        <el-select clearable v-model="PaymentMethodAddForm.payWay" placeholder="">
          <el-option v-for="(item,index) in PaymentDicData.bpwData" :key="index" :label="item.name" :value="item.value"></el-option>

        </el-select>
      </el-form-item>
      <!-- <el-form-item label="余额：">
        <el-input v-model="PaymentMethodAddForm.accountBalance" placeholder=""></el-input>
      </el-form-item> -->
      <el-form-item label="开户银行：">
        <el-cascader
          v-model="PaymentMethodAddForm.openAccountBank"
          :options="bankTreeData"
          :show-all-levels="false"
          :props="props"
          @change="handleChange">
        </el-cascader>
      </el-form-item>
      <el-form-item label="开户名称：">
        <el-input v-model="PaymentMethodAddForm.openAccountName" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="银行账户：" class=''>
        <el-input v-model="PaymentMethodAddForm.bankAccount" placeholder="">
          <el-button slot="append" icon="el-icon-reading" type="primary" class="scanning-btn" size='mini'></el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="托号：">
        <el-input v-model="PaymentMethodAddForm.entrustNo" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="托收合同号：">
        <el-input v-model="PaymentMethodAddForm.entrustContract" placeholder=""></el-input>
      </el-form-item>
      <!-- <el-form-item label="托收类型：">
        <el-select clearable v-model="PaymentMethodAddForm.UpdateCodeCopye" placeholder="">
          <el-option v-for="(item,index) in PaymentMethodAddForm.tuoshouType" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item> -->

    </el-form>
  </div>

</template>
<script>
export default {
  name: "PaymentM",
  props:['PaymentMData','PMdicData'],
  data() {
    return {
      tabsName: "after",
      props: {//树结构格式
        value: 'id',
        label: 'name'
      },
      //开户行
      bankTreeData:[],
      PaymentMethodAddForm: {},
      PaymentDicData:{},
      actData:[],
      bpwData:[],
      rules: {
        userNume: [
          { required: true, message: '请输入用户编号', trigger: 'blur' },
        ],
        desc: [
          { required: true, message: '请输入发票类型', trigger: 'blur' },
        ]
      },
      histroyData: {},
    }
  },
  created() {
    
  },
  mounted() {
    this.PaymentMethodAddForm = Object.assign({},this.PaymentMData);
    // this.PaymentDicData = Object.assign({},this.PMdicData);
    this.PaymentDicData = this.PMdicData;
    console.log(this.PMdicData,this.PaymentDicData);
    // this.actData = this.PaymentDicData.actData;
    // this.bpwData = this.PaymentDicData.bpwData;
    // console.log(this.actData,this.bpwData);
    this.init();
  },
  methods: {
    init() {
      // this.getDictionary()
      this.getBankTreeData()
    },
    submit(){
      return this.PaymentMethodAddForm
    },
    //  数据字典（查询框）
    getDictionary() {
      var _this = this
      var params = {
        "busicode": "DictionarySelect",
        "data": 'ACT,BPW'
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.$set(_this, 'actData', res['ACT'])
        _this.$set(_this, 'bpwData', res['BPW'])
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
    handleChange(){},
  }
}
</script>
<style lang="scss">
.PaymentM {
}
</style>