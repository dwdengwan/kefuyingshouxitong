<template>
  <div class="ExpenseBillRelationship">
        
    <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right">
            <el-button size="mini" icon="el-icon-plus" @click="add('add')" type="primary">保存</el-button>
        </div>
    </div>
      
      
    <div class="contain">
        <el-form class="lineForm" :inline="true" :model="formData" size="mini" label-width="100px">
            <legend class="legendColumn">水费</legend>
            
                <div class="expenseContent">    
                    <span> 普通发票</span>
                    <el-form-item label="商品名称：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="商品编号：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="商品单位：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="税率：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                </div>    
                <div class="expenseContent">    
                    <span> 电子发票</span>
                    <el-form-item label="商品名称：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="商品编号：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="商品单位：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="税率：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                
                </div>    
                    
                <div class="expenseContent">    
                    <span> 增值税专用发票</span>
                    <el-form-item label="商品名称：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="商品编号：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="商品单位：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="税率：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                </div>   
            <legend class="legendColumn">污水费</legend>

                <div class="expenseContent">    
                    <span> 普通发票</span>
                    <el-form-item label="商品名称：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="商品编号：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="商品单位：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="税率：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                </div>    
                <div class="expenseContent">    
                    <span> 电子发票</span>
                    <el-form-item label="商品名称：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="商品编号：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="商品单位：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="税率：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                
                </div>    
                    
                <div class="expenseContent">    
                    <span> 增值税专用发票</span>
                    <el-form-item label="商品名称：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="商品编号：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="商品单位：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="税率：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                </div>
            <legend class="legendColumn">垃圾费</legend>
                <div class="expenseContent">    
                    <span> 普通发票</span>
                    <el-form-item label="商品名称：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="商品编号：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="商品单位：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="税率：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                </div>    
                <div class="expenseContent">    
                    <span> 电子发票</span>
                    <el-form-item label="商品名称：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="商品编号：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="商品单位：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="税率：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                
                </div>    
                    
                <div class="expenseContent">    
                    <span> 增值税专用发票</span>
                    <el-form-item label="商品名称：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="商品编号：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="商品单位：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="税率：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                </div>   
            <legend class="legendColumn">水资源费</legend>
                <div class="expenseContent">    
                    <span> 普通发票</span>
                    <el-form-item label="商品名称：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="商品编号：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="商品单位：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="税率：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                </div>    
                <div class="expenseContent">    
                    <span> 电子发票</span>
                    <el-form-item label="商品名称：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="商品编号：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="商品单位：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="税率：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                
                </div>    
                    
                <div class="expenseContent">    
                    <span> 增值税专用发票</span>
                    <el-form-item label="商品名称：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="商品编号：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="商品单位：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="税率：" prop="isfines">
                        <el-input v-model="formData.isfines"  placeholder=""></el-input>
                    </el-form-item>
                </div>          
        

        </el-form>

    </div>
  </div>
</template>
<script>

export default {
  name: "ExpenseBillRelationship",
  data() {
    return {
      formData: {
        user:'',
        type:'',
        time:'',
        branchAddr:'',
        businessTime:"",
        status:'',
        comments:'',
        sortNo:"",
      },
      crumbsData: {  //面包屑
        titleList: [
        //   { title: '基础信息', path: '/BusinessArea' },
          { title: '其他配置' },
          { title: '费用票据关系' }
        ],
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
<style lang="scss">
@import "../../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.ExpenseBillRelationship {
  width: 100%;
  height: 100%;
  .contain{
    overflow-y: auto;
    height: calc(100% - 41px);
  }
  .lineForm{    
    width: 100%;
    margin: 20px auto;
    height: calc(100% - 81px);

    .el-form-item{
        .el-form-item__content{
            width: calc(100% - 100px);
        }
    }
    .el-input{
        width: 19%;
    }
  }
  .expenseContent{
    height: 50px;
    margin-left: 129px;
    span{
        height: 50px;
        line-height: 32px;
        font-weight: 700;
        width: 100px;
        display: inline-block;
    }
  }

}
</style>
