
<template>
  <div>

    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right" v-if="EditVisible">
        <el-button size="mini" type="primary" @click="submitForm('MaterialPriceEditForm')">保存</el-button>
        <el-button icon="el-icon-caret-left" size="mini" @click="handleClose">返回</el-button>
      </div>
      <div class="bread-contain-right" v-else>
        <el-button size="mini" icon="el-icon-plus" @click="add('add')" type="primary">添加</el-button>
      </div>
    </div>

    <div v-show="EditVisible">
      <MaterialPriceEdit ref="MaterialPriceEdit"></MaterialPriceEdit>
    </div>

    <div v-show="!EditVisible">

      <div class="kl-table">
        <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="tableData" class="wuserInfo-table">

          <el-table-column type="index" label="NO." width="50" :index="indexMethod" fixed>
          </el-table-column>

          <el-table-column prop="matrNo" min-width="80" label="材料编号">

          </el-table-column>

          <el-table-column prop="matrPrice" min-width="80" label="材料单价">

          </el-table-column>

          <el-table-column label="操作" width="70" fixed='right'>
            <template slot-scope="scope">
              <el-button type="text" @click.native="add(scope.row)" style='font-size:12px;'>编辑</el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import MaterialPriceEdit from "./MaterialPriceEdit"

export default {
  components: {
    MaterialPriceEdit,
  },

  name: "MaterialPrice-index",
  data() {
    return {
      EditVisible: false,//弹出表单
      tableData: [

      ],
      formData: {
        matrNo: "",
        matrPrice:  "",
      },
      crumbsData: {  //面包屑
        titleList: [
          // { title: '系统设置', path: '/BusinessArea' },
          { title: '其他配置' },
          { title: '材料定价' }
        ],
      },
      maxHeight: 0,
      tableShow: false,
    }
  },
  mounted() {
    this.init();
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.common.changeTable(this, '.MaterialPrice .MaterialPrice-right-content', [])
    })
  },
  methods: {
    init() {
      let _this = this;
      let params = {
        "busicode": "MatrList",
        "data": {},
      }
      this.$api.fetch({
        params: params,//参数

      }).then(res => {
        _this.tableData = res;

      })

    },
    // 添加按钮点击事件
    add(val) {
      this.EditVisible = true;
      if (val === 'add') {
        this.$refs.MaterialPriceEdit.editData({
          matrNo: "",
          matrPrice:  "",
        });
        // this.crumbsData.titleList.push({title:'添加',method:()=>{window.histroy.back()}});
        this.common.chargeObjectEqual(this, this.formData, 'set', 'MaterialPriceEdit');
      } else {
        // this.crumbsData.titleList.push({title:'编辑',method:()=>{window.histroy.back()}});
        let _this = this;
        let params = {
          "busicode": "MatrQuery",
          "data": {
            matrId: val.matrId,
          },
        }
        this.$api.fetch({
          params: params,//参数
        }).then(res => {
          this.$refs.MaterialPriceEdit.editData(res);
          this.common.chargeObjectEqual(this, res, 'set', 'MaterialPriceEdit');
        })
      }

    },
    // 列表的NO列
    indexMethod(index) {
      return index + 1;
    },
    closeDialog() {
      // this.crumbsData.titleList.pop();
      this.EditVisible = false;
    },
    // 返回
    handleClose() {

      this.$refs.MaterialPriceEdit.handleClose();
    },
    //保存按钮
    submitForm(formName) {
      let type = this.crumbsData.titleList[3].title;
      this.$refs.MaterialPriceEdit.submitForm(formName, type);
    },
  },
  watch: {
    maxHeight() {
      this.tableShow = false
      this.$nextTick(() => {
        this.tableShow = true
      })
    },
  }
}
</script>


