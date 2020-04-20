<template>
    <!-- 用水类型变更 -->
    <div   class="typesOfWater">
        <el-form class="formBill" size="mini"  :inline="true" :model="typesOfWaterForm" label-width="130px" ref="ruleForm" :rules="rules">
          <!-- <legend class="legendColumn">用水类型</legend> -->
             <el-form-item label="用水类型：">
                <el-select  clearable v-model="typesOfWaterForm.useWaterTypeName" placeholder="">
                    <el-option  v-for="(item,index) in bwtData" :key="index" :label="item.name" :value="item.value"></el-option>

                </el-select>
            </el-form-item>
            <!-- <el-form-item label="备注：" class="Remarks">
                <el-input type="textarea" :rows="2" v-model="typesOfWaterForm.Remarks" placeholder=""></el-input>
            </el-form-item> -->

        </el-form>
    </div>
    
</template>
<script>
export default {
  name: "typesOfWater",
  data() {
    return {
      tabsName:"after",
      typesOfWaterForm: {
        useWaterTypeName:'',
      },
      bwtData:[],
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
    this.init();
  },
  methods: {
    init() {

    },

  }
}
</script>
<style lang="scss">
.typesOfWater {

}
</style>