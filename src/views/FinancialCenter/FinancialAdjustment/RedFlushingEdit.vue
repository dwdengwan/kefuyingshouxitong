

<template>
  <!-- RedFlushingEdit -->
  <div class="RedFlushingEdit">

    <commonPart :parentToChild="'2'"></commonPart>
    <el-form class="formBill" size="mini" :inline="true" :model="FinancialAdjustmentEditForm" label-width="100px" ref="ruleForm" :rules="rules">
      <legend class="legendColumn">冲红信息</legend>
      <el-form-item label="冲红账期：" prop="desc">
        <el-date-picker v-model="beginYearM" readonly size="mini" type="month" unlink-panels format="yyyyMM" value-format="yyyyMM" placeholder="201911" style="width:100%;">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="是否更新抄码：">
        <el-select clearable v-model="FinancialAdjustmentEditForm.UpdateCodeCopye" placeholder="">
          <el-option v-for="(item,index) in FinancialAdjustmentEditForm.UpdateCodeCopying" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="f2" label="备注：">
        <el-input type="textarea" v-model="FinancialAdjustmentEditForm.Remarks" placeholder=""></el-input>
      </el-form-item>

      <legend class="legendColumn">抄表信息</legend>
      <el-form-item label="抄表日期：">
        <el-date-picker disabled v-model="FinancialAdjustmentEditForm.cTime" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="上期抄码：">
        <el-input disabled v-model="FinancialAdjustmentEditForm.cTime" placeholder=""></el-input>
      </el-form-item>

      <el-form-item label="本期抄码：">
        <el-input disabled v-model="FinancialAdjustmentEditForm.cTime" placeholder=""></el-input>
      </el-form-item>

      <el-form-item label="增减水量：">
        <el-input disabled v-model="FinancialAdjustmentEditForm.cTime" placeholder=""></el-input>
      </el-form-item>

      <el-form-item label="分摊水量：">
        <el-input disabled v-model="FinancialAdjustmentEditForm.cTime" placeholder=""></el-input>
      </el-form-item>

      <el-form-item label="实际用水量：">
        <el-input disabled v-model="FinancialAdjustmentEditForm.cTime" placeholder=""></el-input>
      </el-form-item>

      <el-form-item label="是否换表：">
        <el-input disabled v-model="FinancialAdjustmentEditForm.cTime" placeholder=""></el-input>
      </el-form-item>

      <el-form-item label="余量：">
        <el-input disabled v-model="FinancialAdjustmentEditForm.cTime" placeholder=""></el-input>
      </el-form-item>

      <legend class="legendColumn">账单明细</legend>

      <el-form-item label="被冲红账期：">
        <el-date-picker v-model="redTime" type="month" placeholder="选择被冲红账期">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button class='searchBtn' size="mini" icon="el-icon-search"></el-button>
      </el-form-item>

      <el-table stripe border :data="histroyData.list" class="change-tables-table">

        <el-table-column type="selection" width="80" fixed="left" :index="indexMethod">
        </el-table-column>

        <el-table-column type="index" label="NO." width="80" fixed="left" :index="indexMethod">
        </el-table-column>

        <el-table-column label="账期" min-width="100" prop="areaName">
        </el-table-column>

        <el-table-column label="抄表日期" min-width="80" prop="daytime">
        </el-table-column>

        <el-table-column label="费用名称" min-width="80" prop="areaName">
        </el-table-column>

        <el-table-column label="计费水量" min-width="80" prop="lvalue">
        </el-table-column>

        <el-table-column label="综合单价" min-width="80" prop="areaName">
        </el-table-column>

        <el-table-column label="冲红水量" min-width="80" prop="lvalue">
          <template slot-scope="scope">
            <el-input v-model="scope.row.fcode" size="mini"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="冲红金额" min-width="80" prop="fixValue">
        </el-table-column>

        <el-table-column label="操作" min-width="60" prop="fixValue">
          <template slot-scope="scope">
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>

      </el-table>

      <legend class="legendColumn">上传附件</legend>
      <uploadFile></uploadFile>

      <legend class="legendColumn">流程处理</legend>
      <procedure></procedure>

    </el-form>

  </div>
</template>
<script>
import uploadFile from "@/components/uploadPic"; //上传附件
import procedure from "@/components/procedure"; //流程审核
import commonPart from "../../CustomerCenter/changeMangement/commonPart"; //公告模块
export default {
  name: "RedFlushingEdit",
  components: {
    uploadFile,
    commonPart,
    procedure
  },
  data() {
    return {
      redTime: "",
      beginYearM: "",
      FinancialAdjustmentEditForm: {
        // 查询内容
        cDate: "",
        cTime: "",
        backfillInput: [
          {
            label: "用户名称：",
            value: "",
            tips: ""
          },

          {
            label: "用户地址：",
            value: "",
            tips: ""
          },
          {
            label: "用水类型：",
            value: "",
            tips: ""
          },
          {
            label: "联系人：",
            value: "",
            tips: ""
          },
          {
            label: "座机号码：",
            value: "",
            tips: ""
          }
        ],

        desc: "",
        userNume: "",
        descoptions: [
          {
            name: "0040__生活用水2.85",
            value: "1"
          },
          {
            name: "0041__免费用水",
            value: "2"
          }
        ],
        IsFine: [
          {
            name: "是",
            value: "1"
          },
          {
            name: "否",
            value: "2"
          }
        ],
        UpdateCodeCopying: [
          {
            name: "是",
            value: "1"
          },
          {
            name: "否",
            value: "2"
          }
        ],
        userNum: "",
        PriceStrategy: "",
        isfines: "2",
        UpdateCodeCopye: "2",
        Remarks: "",
        priorPeriodNum: "",
        currendPeriodNum: "",
        currendPeriodWater: ""
      },
      rules: {
        userNum: [
          { required: true, trigger: "blur", message: "请输入用户编号" }
        ],
        desc: [{ required: true, trigger: "blur" }]
      },
      histroyData: {},
      label: 0
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.histroyData = {
        areaId: "",
        endRow: 5,
        hasNextPage: false,
        hasPreviousPage: false,
        isFirstPage: true,
        isLastPage: true,
        list: [
          {
            label: 0,
            areaId: null,
            areaName: "",
            code: "C7551990000003",
            concentrator: "10",
            connect: 0,
            daytime: "20190702",
            endTime: 0,
            factoryName: "10",
            fcode: 1.6,
            fix: false,
            fixValue: "2.40",
            flux: "4.80",
            getMeter: 1,
            id: null,
            isxz: "16.00",
            lvalue: "-",
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
          },
          {
            label: 0,
            areaId: null,
            areaName: "",
            code: "C7551990000003",
            concentrator: "10",
            connect: 0,
            daytime: "20190702",
            endTime: 0,
            factoryName: "10",
            fcode: 1.6,
            fix: false,
            fixValue: "2.40",
            flux: "4.80",
            getMeter: 1,
            id: null,
            isxz: "16.00",
            lvalue: "-",
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
          },
          {
            label: 0,
            areaId: null,
            areaName: "",
            code: "C7551990000003",
            concentrator: "10",
            connect: 0,
            daytime: "20190702",
            endTime: 0,
            factoryName: "10",
            fcode: 1.6,
            fix: false,
            fixValue: "2.40",
            flux: "4.80",
            getMeter: 1,
            id: null,
            isxz: "16.00",
            lvalue: "-",
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
    }
  }
};
</script>
<style lang="scss">
$theme-font-color: #3680cd;
.RedFlushingEdit {
  height: 100%;
  overflow-y: auto;
}
</style>

