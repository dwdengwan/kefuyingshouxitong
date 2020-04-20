
<template>
  <div class="QualityReadingEdit">
    <el-dialog class="button-dialog" title="选择水表" :visible.sync="dialogVisible" width="80%" close-on-click-modal :before-close="handleClose">
      <SelectWaterTable ref="SelectWaterTable"></SelectWaterTable>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="getMeterData">确 定</el-button>
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-form class="formBill" :inline="true" size="mini" :model="form" label-width="130px">
      <commonPart :parentToChild="'3'"></commonPart>
      <legend class="legendColumn">抄表质量检查单</legend>
      <el-form-item label="账期：">
        <el-date-picker v-model="form.month" type="month" placeholder="选择账期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="抽查人员：">
        <el-input v-model="form.remark" autocomplete="off" placeholder="请输入抽查人员"></el-input>
      </el-form-item>
      <el-form-item class="Remarks" label="备注：">
        <el-input v-model="form.remark" autocomplete="off" type="textarea" placeholder="请输入备注"></el-input>
      </el-form-item>
      <div>
        <el-button @click="closeDia" type="primary" size='mini' style="float: right;margin-bottom: 0.2rem;">选择水表</el-button>
      </div>
      <el-table stripe border :data="tableList" class="wuserInfo-table">
        <el-table-column type="index" label="NO." width="50" fixed="left">
        </el-table-column>
        <el-table-column prop="bookNum" min-width="100" label="册本号">
          <!-- <template slot-scope="scope">
                  <el-input 
                    v-model="scope.row.bookNum"
                    placeholder="请输入册本号">
                  </el-input>
                </template> -->
        </el-table-column>

        <el-table-column prop="userNum" min-width="100" label="用户编号">
          <!-- <template slot-scope="scope">
                  <el-input 
                    v-model="scope.row.userNum"
                    placeholder="请输入用户编号">
                  </el-input>
                </template> -->
        </el-table-column>

        <el-table-column prop="price" min-width="100" label="用户名称">
          <!-- <template slot-scope="scope">
                  <el-input 
                    v-model="scope.row.price"
                    placeholder="请输入用户名称">
                  </el-input>
                </template> -->
        </el-table-column>

        <el-table-column prop="coefficient" min-width="100" label="用户地址">
          <!-- <template slot-scope="scope">
                  <el-input 
                    v-model="scope.row.startUsage"
                    placeholder="请输入用户地址">
                  </el-input>
                </template> -->
        </el-table-column>

        <el-table-column prop="stageMoney" min-width="100" label="水表口径">
          <!-- <template slot-scope="scope">
                  <el-input 
                    v-model="scope.row.stageMoney"
                    placeholder="请输入水表口径">
                  </el-input>
                </template> -->
        </el-table-column>

        <el-table-column prop="stageMoney" min-width="100" label="抄表日期">
          <!-- <template slot-scope="scope">
                  <el-input 
                    v-model="scope.row.stageMoney"
                    placeholder="请输入抄表日期">
                  </el-input>
                </template> -->
        </el-table-column>

        <el-table-column prop="coefficient" min-width="100" label="上期抄码">
          <!-- <template slot-scope="scope">
                  <el-input 
                    v-model="scope.row.startUsage"
                    placeholder="请输入上期抄码">
                  </el-input>
                </template> -->
        </el-table-column>

        <el-table-column prop="stageMoney" min-width="100" label="本期抄码">
          <!-- <template slot-scope="scope">
                  <el-input 
                    v-model="scope.row.stageMoney"
                    placeholder="请输入本期抄码">
                  </el-input>
                </template> -->
        </el-table-column>

        <el-table-column prop="coefficient" min-width="100" label="本期用水">
          <!-- <template slot-scope="scope">
                  <el-input 
                    v-model="scope.row.startUsage"
                    placeholder="请输入本期用水">
                  </el-input>
                </template> -->
        </el-table-column>

        <el-table-column prop="stageMoney" min-width="100" label="日均水量">
          <!-- <template slot-scope="scope">
                  <el-input 
                    v-model="scope.row.stageMoney"
                    placeholder="请输入日均水量">
                  </el-input>
                </template> -->
        </el-table-column>

        <el-table-column label="操作" width="70" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click.native="edit(scope.$index, scope.row)" style="font-size:12px;">删除</el-button>
          </template>
        </el-table-column>

      </el-table>

      <legend class="legendColumn">流程处理</legend>
      <procedure></procedure>
    </el-form>
  </div>
</template>
<script>
import commonPart from "@/views/CustomerCenter/changeMangement/commonPart"; //公告模块
import procedure from "@/components/procedure"; //审批
import SelectWaterTable from "@/components/SelectWaterTable"; 
export default {
  name: "QualityReadingEdit",
  components: {
    procedure,
    commonPart,
    SelectWaterTable
  },
  data() {
    return {
      histroyData: {
        list: [
          {
            bookNum: "021013",
            userNum: "0236578"
          },
          {
            bookNum: "056013",
            userNum: "0233426578"
          },
          {
            bookNum: "0265613",
            userNum: "0122578"
          },
          {
            bookNum: "027813",
            userNum: "0906578"
          }
        ]
      },
      option5: [
        {
          value: 1,
          label: "3%"
        },
        {
          value: 2,
          label: "5%"
        },
        {
          value: 3,
          label: "8%"
        },
        {
          value: 4,
          label: "10%"
        },
        {
          value: 5,
          label: "15%"
        },
        {
          value: 6,
          label: "20%"
        },
        {
          value: 7,
          label: "25%"
        },
        {
          value: 8,
          label: "30%"
        }
      ],
      meterReaderList: [
        {
          value: 1,
          label: "全部"
        },
        {
          value: 2,
          label: "单飞"
        },
        {
          value: 3,
          label: "胡国飞"
        },
        {
          value: 4,
          label: "胡晓玲"
        },
        {
          value: 5,
          label: "胡志金"
        },
        {
          value: 6,
          label: "蒋保平"
        },
        {
          value: 7,
          label: "李明"
        }
      ],
      formData: {
        meterReader: 1,
        dataList: [],
        zeroTyye: [],
        con: "",
        watermeterWarehouse: "",
        watermeterWarehouseOptions: [],
        waterMeterManufacturer: "",
        waterMeterManufacturerOptions: [],
        waterMeterType: "",
        waterMeterTypeOptions: [],
        waterMeterCaliber: "",
        waterMeterCaliberOptions: [],
        waterMeterStatus: "",
        waterMeterStatusOptions: [],
        subordinateDepartments: "",
        subordinateDepartmentsOptions: []
      },
      tableList: [
        {
          endType: "1",
          startUsage: "水费",
          endUsage: "14",
          price: "1",
          coefficient: "1.0",
          stageMoney: "0",
          bookNum: "021019",
          userNum: "0236588"
        },
        {
          endType: "1",
          startUsage: "污水费",
          endUsage: "28",
          price: "0",
          coefficient: "1.0",
          stageMoney: "37.52",
          bookNum: "021019",
          userNum: "0236579"
        },
        {
          endType: "2",
          startUsage: "",
          endUsage: "",
          price: "",
          coefficient: "",
          stageMoney: "",
          bookNum: "021019",
          userNum: "02365756"
        }
      ],

      form: {
        ladderType: "month",
        waterSelect: "",
        priceModel: "",
        mixtrueSelect: "",
        waterLevel: "",
        waterValue: false,
        startTime: "",
        endTime: "",
        bulidReson: "",
        priceDetail: "04",
        state: "1",
        bulidTime: "",
        updateReson: "",
        updataTime: "",
        remark: ""
      },
      dialogVisible: false,
      multipleSelection: []
    };
  },
  mounted() {
    eventBus.$on("ccccc", params => {
      this.dialogVisible = true;
    });
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    getMeterData() {
      this.dialogVisible = false;
      if (this.multipleSelection.length > 0) {
        this.multipleSelection.forEach(item => {
          this.tableList.push(item);
          this.histroyData.list.forEach((val, index) => {
            if (item === val) {
              this.histroyData.list.splice(index, 1);
            }
          });
        });
      }
    },
    closeDia() {
      this.$parent.closeDia()
    },
  }
};
</script>
<style lang="scss">
@import "../../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.QualityReadingEdit {
  height: calc(100% - 41px);
  width: 100%;
  margin: 0 auto;
  overflow-y: auto;
  .el-table {
    margin-top: 10px;
  }
}
</style>
