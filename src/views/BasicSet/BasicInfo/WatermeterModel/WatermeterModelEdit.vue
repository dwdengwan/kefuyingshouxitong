
<template>
    <div>
        <div>
            <el-form class="formBill-One" ref="WatermeterModelEditForm" :rules="rules" :inline="true" size="mini" :model="ruleForm" label-width="100px">
                
                <el-form-item label="水表型号：" prop="modelName">
                      <el-input v-model="ruleForm.modelName" maxlength="50" clearable
                                placeholder="请输入水表型号">
                      </el-input>
                    </el-form-item>
       
                    <el-form-item label="水表型式：" prop="meterType">
                      <el-select v-model="ruleForm.meterType" clearable size="mini">
                        <el-option v-for="item in fNameType" :key="item.value" :label="item.name" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
       
                    <el-form-item label="传输方式：" prop="transWay">
                      <el-select v-model="ruleForm.transWay" clearable size="mini">
                        <el-option v-for="item in fAddressType" :key="item.value" :label="item.name" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
       
                    <el-form-item label="水表传感器：" prop="meterSensor">
                      <el-select v-model="ruleForm.meterSensor" clearable size="mini">
                        <el-option v-for="item in TnameType" :key="item.value" :label="item.name" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                    
                    <el-form-item label="排序号：" prop="sortNo">
                      <el-input v-model.number="ruleForm.sortNo" maxlength="6" clearable
                                placeholder="请输入排序号">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="状态：" prop="status">
                      <el-select v-model="ruleForm.status" placeholder="请选择状态" clearable>
                        <el-option label="启用" :value="1"></el-option>
                        <el-option label="停用" :value="0"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="备注：">
                      <el-input v-model="ruleForm.comments" show-word-limit maxlength="150" clearable
                                placeholder="请输入备注"
                                type="textarea">
                      </el-input>
                    </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name:"WatermeterModelEdit",
    data(){
        return{
          ruleForm:{
            
          },
          formData:{
            modelId:"",
            modelName: "",
            meterType: "",
            transWay: "",
            meterSensor:"",
            comments:"",
            status:"",
            sortNo:""
          },
          fNameType:[//水表型式
          ],
          fAddressType:[//传输方式
          ],
          TnameType:[//水表传感器
          ],
          rules: {
              modelName: [
                  { required: true, message: '请输入水表型号', trigger: 'blur' }
              ],
              meterType: [
                  { required: true, message: '请选择水表型式', trigger: 'blur' }
              ],
              transWay: [
                  { required: true, message: '请选择传输方式', trigger: 'blur' }
              ],
              meterSensor: [
                  { required: true, message: '请选择水表传感器', trigger: 'blur' }
              ],
              status: [
                  { required: true, message: '请选择状态', trigger: 'blur' }
              ],
              sortNo: [
                  { required: true, message: '请输入排序号', trigger: 'blur' },
                  { type: 'number', message: '排序号必须为数字值'}
              ],

          },
        }
    }, 
    mounted(){
      this.getData();
    },
    methods: {
      // 获取数据字典数据
      getData(){
        let _this = this;
        this.$api.fetch({
        params: {
            "busicode": "DictionarySelect",  //水表形式
            "data": "MMP",
        },
        
        }).then(res => {
            _this.fNameType = res;
            
        })

        this.$api.fetch({
        params: {
            "busicode": "DictionarySelect",  //传输方式
            "data": "TPW",
        },
        
        }).then(res => {
            _this.fAddressType = res;
            
        })

        this.$api.fetch({
        params: {
            "busicode": "DictionarySelect",  //水表传感器
            "data": "MSS",
        },
        
        }).then(res => {
            _this.TnameType = res;
            
        })
      },
      //保存按钮
      resetForm() {
        this.$refs.WatermeterModelEditForm.resetFields();
      },
      submitForm(formName,type) {
        let _this = this;
        let params = {};
        
        this.$refs[formName].validate((valid) => {
          if (valid) {
              
             if(type === '添加'){
               
               params = {
                  "busicode": "MeterModelAdd",
                  "data": this.ruleForm
              }
             }else{
                this.ruleForm = this.common.handleData(this.ruleForm,this.formData);
               params = {
                  "busicode": "MeterModelUpdate",
                  "data": this.ruleForm
              };
             }
              this.$api.fetch({
                params: params,//参数
              }).then(res => {
                _this.$message({
                  showClose:true,
                  message:'保存成功',
                  type:'success',
                });
                _this.$parent.init();
                _this.$parent.closeDialog();   
              })
              
          } else {
            return false;
          }
        });
      },
      handleClose() {
        this.common.chargeObjectEqual(this,this.ruleForm,'get','WatermeterModelEdit',this.$parent.closeDialog);
      },
      editData(val){
        this.ruleForm = val;
      }
    },
}
</script>

