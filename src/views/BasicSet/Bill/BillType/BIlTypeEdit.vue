<template>
  <div class="BIlTypeEdit">
        <div class="formBill-One">
            <el-form class="lineForm"  :model="formData" size="mini" label-width="100px">
                <el-form-item label="票据编号：">
                    <el-input v-model="formData.type" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="票据名称：">
                    <el-input v-model="formData.type" placeholder=""></el-input>
                </el-form-item>

                <el-form-item label="状态：">
                    <el-select v-model="formData.status" placeholder="请选择">
                            <el-option
                            v-for="item in stuteOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                </el-form-item>
            </el-form>
        </div>
  </div>
</template>
<script>

export default {
  name: "BIlTypeEdit",
  data() {
    return {
        
        stuteOption: [{
            value: '1',
            label: '启用'
            }, {
            value: '2',
            label: '停用'}, 
        ],
        formData: {
            type:'电子发票',
            status:'',
        },
      
    }
  },
  mounted() {
  },
  methods: {
    init() {
      let _this = this
      let params = {
          "busicode": "BusinessBranchList",
          "data": {},
      }
      this.$api.fetch({
      params: params,//参数
      
      }).then(res => {
          _this.tableData = res;
          
      })
      
    },
      //保存按钮
      submitForm(formName) {
      },
  },
  watch: {
  }
}
</script>

