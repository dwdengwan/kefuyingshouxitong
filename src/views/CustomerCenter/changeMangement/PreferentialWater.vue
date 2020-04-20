<template>
    <!-- 优惠用水变更 -->
    <div   class="PreferentialWater">
        <el-form  class="formBill" size="mini" :inline="true" :model="PreferentialWaterForm" label-width="130px" ref="ruleForm" :rules="rules">
          <!-- <legend class="legendColumn">用水类型</legend> -->
             <el-form-item label="优惠策略：">
                <el-select clearable v-model="PreferentialWaterUseEditForm.prefStrategyId" placeholder="" @change="getPreferentialStrategyoptions">
                <el-option v-for="(item,index) in PrefStrategySelectData" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="优惠证件编号：">
                <el-input v-model="PreferentialWaterUseEditForm.prefCertNo" placeholder=""></el-input>
            </el-form-item>

            <el-form-item label="优惠策略开始日期：">
                <el-date-picker v-model="PreferentialWaterUseEditForm.prefBeginDate" value-format='yyyy-MM-dd' type="date" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="优惠策略结束日期：">
                <el-date-picker v-model="PreferentialWaterUseEditForm.prefEndDate" value-format='yyyy-MM-dd' type="date" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            
            <el-form-item label="备注："  class="Remarks">
                <el-input type="textarea" :rows="2" v-model="PreferentialWaterUseEditForm.Remarks" placeholder=""></el-input>

            </el-form-item>

        </el-form>
    </div>
    
</template>
<script>
export default {
  name: "PreferentialWater",
  props:['PreferentialWaterData'],
  data() {
    return {
      tabsName:"after",
      PreferentialWaterForm:{},
      PreferentialStrategy:'',
      PreferentialWaterUseEditForm: {},
      PrefStrategySelectData:[],
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
  mounted() {
    this.PreferentialWaterUseEditForm = Object.assign({},this.PreferentialWaterData)
    this.init();
  },
  methods: {
    init() {
      this.getPrefStrategySelect()
    },
    getPreferentialStrategyoptions(){},
    //优惠策略
    getPrefStrategySelect() {
      var _this = this
      var params = {
        "busicode": "PrefStrategySelect",
        "data": {}
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.PrefStrategySelectData = res;
      })
    },
    submit(){
      return this.PreferentialWaterUseEditForm
    },
  }
}
</script>
<style lang="scss">
.PreferentialWater {
}
</style>