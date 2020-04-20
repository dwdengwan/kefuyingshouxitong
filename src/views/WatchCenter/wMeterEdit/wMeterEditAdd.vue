<template>
  <div class="wMeterEditAdd">
    <!-- 弹出表单选择水表 -->
    <el-dialog :title="WaterEditorName" :visible.sync="waterChooseVisible" :close-on-click-modal="false" class="button-dialog" @close="closeChooseMtere" append-to-body>
      <!-- <chooseWaterMeter ref="childWaterEditor"></chooseWaterMeter> -->
      <SelectWaterTable ref="SelectWaterTable"></SelectWaterTable>
      <div slot="footer" class="dialog-footer" ref="ruleForm">
        <el-button type="primary" size="mini" plain @click="submit;">确 定</el-button>
        <el-button type="info" size="mini" plain @click="waterChooseVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-form size="mini" :inline="true" :model="formData" class="formBill" label-width="130px">
      <commonPart :parentToChild="'3'"></commonPart>
      <legend class="legendColumn">变更信息</legend>

      <el-form-item class="f2" label="变更原因：">
        <el-input type="textarea" :rows="2" v-model="formData.reason" :disabled="!tableEdit" placeholder="请输入变更原因"></el-input>
      </el-form-item>
    </el-form>
    <el-tabs type="border-card" class="tabsBlock">
      <el-tab-pane label="水表修改" :key="'updatewmeter'">
        <span slot="label"><i class="el-icon-user"></i> 水表修改</span>
        <div class="kl-table">
          <el-button size="mini" class="fontRight" type="primary" @click="chooseWaterMeter" v-show="tableEdit">选择水表</el-button>
          <el-table stripe border :data="histroyData.list" class="water-meter-inquiry-table">

            <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
            </el-table-column>

            <el-table-column prop="code" min-width="150" label="水表编号">
            </el-table-column>

            <el-table-column prop="fcode" min-width="100" label="出厂编号">
              <template slot-scope="scope" v-if="tableEdit">
                <el-input v-model="scope.row.fcode" size="mini"></el-input>
              </template>
            </el-table-column>

            <el-table-column prop="wCaliber" min-width="100" label="水表口径">
              <template slot-scope="scope" v-if="tableEdit">
                <el-select clearable v-model="scope.row.wCalibe" placeholder="水表口径">
                  <el-option v-for="(item,index) in formDatas.waterMeterCaliberOptions" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column prop="wfactory" min-width="100" label="水表厂家">
              <template slot-scope="scope" v-if="tableEdit">
                <el-select clearable v-model="scope.row.wfactory" placeholder="水表厂家">
                  <el-option v-for="(item,index) in formDatas.waterMeterManufacturerOptions" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column prop="wmorphology" min-width="120" label="水表形态">
              <template slot-scope="scope" v-if="tableEdit">
                <el-select clearable v-model="scope.row.wmorphology" placeholder="水表形态">
                  <el-option v-for="(item,index) in formDatas.wmorphologyOptions" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column prop="wtype" min-width="120" label="水表类型">
              <template slot-scope="scope" v-if="tableEdit">
                <el-select clearable v-model="scope.row.wtype" placeholder="水表类型">
                  <el-option v-for="(item,index) in formDatas.waterMeterTypeOptions" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column prop="wmodoel" min-width="120" label="水表型号">
              <template slot-scope="scope" v-if="tableEdit">
                <el-select clearable v-model="scope.row.wmodoel" placeholder="水表型号">
                  <el-option v-for="(item,index) in formDatas.waterMeterModelOptions" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column prop="qualification" min-width="100" label="合格证号">
              <template slot-scope="scope" v-if="tableEdit">
                <el-input v-model="scope.row.qualification" size="mini"></el-input>
              </template>
            </el-table-column>

            <el-table-column prop="wState" min-width="120" label="水表状态">
              <template slot-scope="scope" v-if="tableEdit">
                <el-select clearable v-model="scope.row.wState" placeholder="水表状态">
                  <el-option v-for="(item,index) in formDatas.waterMeterStatusOptions" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column prop="storage" min-width="150" label="注册日期">
              <template slot-scope="scope" v-if="tableEdit">
                <el-date-picker v-model="scope.row.storage" type="date" placeholder="选择日期">
                </el-date-picker>
              </template>
            </el-table-column>

            <el-table-column prop="demp" min-width="100" label="所属部门">
              <template slot-scope="scope" v-if="tableEdit">
                <el-select clearable v-model="scope.row.demp" placeholder="所属部门">
                  <el-option v-for="(item,index) in formDatas.subordinateDepartmentsOptions" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column label="操作" fixed="right" width="80" v-if="tableEdit">
              <template slot-scope="scope">
                <el-button type="text" class="noclick" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>

          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="水表删除">
        <span slot="label">
          <i class="el-icon-user"></i> 水表删除</span>
        <div class="kl-table">
          <el-button class="fontRight" size="mini" type="primary" @click="chooseWaterMeter" v-show="tableEdit">选择水表</el-button>
          <el-table stripe border :data="histroyData.list" class="water-meter-inquiry-table">

            <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
            </el-table-column>

            <el-table-column prop="code" min-width="150" label="水表编号">
            </el-table-column>

            <el-table-column prop="fcode" min-width="100" label="出厂编号">
            </el-table-column>

            <el-table-column prop="wtype" min-width="120" label="水表类型">
            </el-table-column>

            <el-table-column prop="wmodoel" min-width="120" label="水表型号">
            </el-table-column>

            <el-table-column prop="wState" min-width="120" label="水表状态" show-overflow-tooltip>
            </el-table-column>

            <el-table-column label="操作" fixed="right" width="80" v-if="tableEdit">
              <template slot-scope="scope">
                <el-button type="text" class="noclick" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

        </div>
      </el-tab-pane>
    </el-tabs>

    <legend class="legendColumn">流程处理</legend>
    <procedure></procedure>
  </div>
</template>
<script>
import commonPart from "@/views/CustomerCenter/changeMangement/commonPart"; //公告模块
import chooseWaterMeter from "../chooseWaterMeter";
import SelectWaterTable from "@/components/SelectWaterTable";
import procedure from "@/components/procedure"; //流程审核
export default {
  name: "wMeterEditAdd",
  props: ["tableEdit"],
  components: {
    chooseWaterMeter,
    commonPart,
    procedure,
    SelectWaterTable
  },
  data() {
    return {
      formData: { billDate: "2019-01-01", billNo: "20000012" },
      histroyData: {},
      waterChooseVisible: false,
      WaterEditorName: "水表选择",
      ruleFormData: {},
      formDatas: {
        con: "",
        watermeterWarehouse: "",
        waterMeterModel: "",
        waterMeterModelOptions: [
          {
            name: "LXSWN",
            value: "0"
          },
          {
            name: "LXSGY-15G",
            value: "1"
          },
          {
            name: "LXSGY",
            value: "2"
          },
          {
            name: "LXSFW",
            value: "3"
          },
          {
            name: "DG-FW001",
            value: "4"
          }
        ],
        watermeterWarehouseOptions: [
          // {
          //     name:"全部",
          //     value:"1"
          // },
          {
            name: "停用",
            value: "2"
          },
          {
            name: "启用",
            value: "3"
          }
        ],
        waterMeterManufacturer: "",
        waterMeterManufacturerOptions: [
          {
            name: "宁波",
            value: "1"
          },
          {
            name: "上海",
            value: "2"
          },
          {
            name: "梅花",
            value: "3"
          },
          {
            name: "常德",
            value: "4"
          },
          {
            name: "开封",
            value: "5"
          }
        ],
        waterMeterType: "",
        waterMeterTypeOptions: [
          {
            name: "人工表",
            value: "1"
          },
          {
            name: "远程表",
            value: "2"
          }
        ],
        waterMeterCaliber: "",
        waterMeterCaliberOptions: [
          {
            name: "15",
            value: "2"
          },
          {
            name: "20",
            value: "1"
          },
          {
            name: "25",
            value: "3"
          },
          {
            name: "40",
            value: "4"
          },
          {
            name: "200",
            value: "5"
          }
        ],
        waterMeterStatus: "",
        waterMeterStatusOptions: [
          {
            name: "在库",
            value: "1"
          },
          {
            name: "在用",
            value: "2"
          },
          {
            name: "在途",
            value: "3"
          },
          {
            name: "报废",
            value: "4"
          }
        ],
        subordinateDepartments: "",
        subordinateDepartmentsOptions: [
          //  {
          //     name:"全部",
          //     value:"1"
          // },
          {
            name: "营业部",
            value: "2"
          },
          {
            name: "法务部",
            value: "3"
          }
        ],
        wmorphologyOptions: [
          {
            name: "新表",
            value: "1"
          },
          {
            name: "轮检表",
            value: "2"
          }
        ]
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.formData = {
        watermeterWarehouse: "",
        watermeterWarehouseOptions: [
          {
            name: "临时换表",
            value: "1"
          },
          {
            name: "正常换表",
            value: "2"
          },
          {
            name: "异常换表",
            value: "3"
          }
        ],
        changeMeterPeople: [
          {
            name: "詹 杰",
            value: "1"
          },
          {
            name: "刘帅军",
            value: "2"
          },
          {
            name: "吴希",
            value: "3"
          },
          {
            name: "杜忠杰",
            value: "4"
          },
          {
            name: "于鹏飞",
            value: "5"
          }
        ],
        con: "",
        reason: "",
        billDate: "2019-01-01",
        billNo: "20000012"
      };
      this.histroyData = {
        areaId: "",
        endRow: 5,
        hasNextPage: false,
        hasPreviousPage: false,
        isFirstPage: true,
        isLastPage: true,
        list: [
          {
            areaId: null,
            areaName: "01091012",
            code: "C7551990000003",
            concentrator: "",
            connect: null,
            daytime: "301-1003",
            endTime: null,
            factoryName: "东井",
            fcode: null,
            fix: false,
            fixValue: "02892019",
            flux: "新表",
            getMeter: 1,
            id: null,
            isxz: "未抄",
            lvalue: "龙天县9号",
            meter: null,
            model: null,
            modifyBy: null,
            modifyTime: null,
            offset: 0,
            page: 1,
            pageCount: 20,
            position: "1栋3单元",
            protocolName: null,
            rowNumber: 0,
            sensorModel: null,
            sn: null,
            status: "未上传",
            totalPage: 0,
            type: 5,
            unusual: null,
            usn: "00",
            waterGroup: null
          }
        ],
        navigateFirstPage: 1,
        navigateLastPage: 1,
        navigatePages: 8,
        navigatepageNums: Array(1),
        nextPage: 0,
        pageNum: 1,
        pageSize: 20,
        pages: 1,
        prePage: 0,
        size: 5,
        startRow: 1,
        total: 5
      };
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
        (this.histroyData.pageSize - 20) * this.histroyData.pages + (index + 1)
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
$imgWidth: 200px;
$theme-color: #297acc;
.wMeterEditAdd {
  height: calc(100% - 40px);
  overflow-y: auto;
  .tabsBlock {
    height: calc(100% - 250px);
    margin: 5px;
    .el-tabs__header {
      margin: 0 0 5px;
    }
    .el-tabs--border-card {
      border: 1px solid #eaf4ff;
    }
    .el-tabs__content {
      padding: 5px;
      height: calc(100% - 60px);
      .idCard {
        border: 0px;
      }
      .el-tab-pane {
        height: 100%;
        overflow-y: auto;
      }
    }
  }
}
</style>
