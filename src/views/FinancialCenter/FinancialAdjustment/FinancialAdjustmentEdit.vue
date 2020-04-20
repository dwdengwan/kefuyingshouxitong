

<template>
  <!-- RedFlushingEdit -->
  <div class="FinancialAdjustmentEdit">

    <el-form class="formBill" size="mini" :inline="true" :model="FinancialAdjustmentEditForm" label-width="130px" ref="ruleForm" :rules="rules">

      <commonPart :parentToChild="'2'"></commonPart>
      <legend class="legendColumn">调整信息</legend>

      <el-form-item label="用水类型：">
        <el-input v-model="FinancialAdjustmentEditForm.useWaterType" :disabled="true" class="read-only" placeholder="居民用水"></el-input>
      </el-form-item>

      <el-form-item label="上期抄表日期：">
        <el-input v-model="FinancialAdjustmentEditForm.priorPeriodMrDate" :disabled="true" class="read-only" placeholder="2019/09/09"></el-input>
      </el-form-item>
      <br>

      <el-form-item label="调整类型：">
        <el-select clearable v-model="FinancialAdjustmentEditForm.AdjustType" placeholder="">
          <el-option v-for="(item,index) in AdjustOption " :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否更新抄码：">
        <el-select clearable v-model="FinancialAdjustmentEditForm.updateReadingNumFlag" placeholder="">
          <el-option v-for="(item,index) in FinancialAdjustmentEditForm.UpdateCodeCopying" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="追加账期：" prop="cDate">
        <el-date-picker v-model="FinancialAdjustmentEditForm.cDate" type="month" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="抄表日期：">
        <el-date-picker v-model="FinancialAdjustmentEditForm.cTime" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="上期抄码：">
        <el-input v-model="FinancialAdjustmentEditForm.priorPeriodNum" :disabled="true" placeholder=""></el-input>
      </el-form-item>

      <el-form-item label="本期抄码：">
        <el-input v-model="FinancialAdjustmentEditForm.currendPeriodNum" :disabled="false" placeholder=""></el-input>
      </el-form-item>

      <el-form-item label="本期水量：">
        <el-input v-model="FinancialAdjustmentEditForm.currendPeriodWater" :disabled="false" placeholder=""></el-input>
      </el-form-item>

      <el-form-item label="费用类型：" class="f2">
        <el-checkbox-group v-model="payServiceModel">
          <el-checkbox :disabled="payServiceModelLive" :label="v.label" v-for="(v,i) in payServiceType" :key="i">{{v.value}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="总金额：">
        <el-input v-model="FinancialAdjustmentEditForm.amountMoney" :disabled="true" placeholder=""></el-input>
      </el-form-item>

      <el-form-item class="f2" label="备注：">
        <el-input type="textarea" v-model="FinancialAdjustmentEditForm.Remarks" placeholder=""></el-input>
      </el-form-item>
      <!-- <el-table      
                stripe
                border
                :data="histroyData.list"
                class="change-tables-table">

                
                <el-table-column
                 
                    label="换表止码">
                    <el-table-column 
                        type="index"  label="NO."
                        width="80" 
                        :index="indexMethod">
                        
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    min-width="180"
                    :label="label"
                    class-name="theme-color">
       
                    <el-table-column 
                        label="费用项目"
                        min-width="100" 
                        prop="areaName"
                        >
          
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    min-width="180"
                    label="新表底码">
                    <el-table-column 
                        label="阶梯1水量"
                        min-width="80" 
                        prop="daytime"
                    >
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.concentrator" size="mini"></el-input>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    min-width="180"
                    :label="label"
                    class-name="theme-color">
                    <el-table-column 
                        label="阶梯2水量"
                        min-width="80" 
                        prop="areaName"
                       >
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.connect" size="mini"></el-input>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    min-width="180"
                    label="上期码">
                    <el-table-column 
                        label="阶梯3水量"
                        min-width="80" 
                        prop="lvalue"
                        >
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.endTime" size="mini"></el-input>
                        </template>
                    </el-table-column>
                </el-table-column>

                <el-table-column
                    min-width="180"
                    :label="label"
                    class-name="theme-color">
                    <el-table-column 
                        label="水量"
                        min-width="80" 
                        prop="areaName"
                       >
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.factoryName" size="mini"></el-input>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    min-width="180"
                    label="本期码">
                    <el-table-column 
                        label="阶梯1水价"
                        min-width="80" 
                        prop="lvalue"
                        >
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.fcode" size="mini"></el-input>
                        </template>
                    </el-table-column>
                </el-table-column>

                <el-table-column
                    min-width="180"
                    :label="label"
                    class-name="theme-color">
                    <el-table-column 
                        label="阶梯2水价"
                        min-width="80" 
                        prop="areaName"
                       >
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.fixValue" size="mini"></el-input>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    min-width="180"
                    label="水量">
                    <el-table-column 
                        label="阶梯3水价"
                        min-width="80" 
                        prop="lvalue"
                        >
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.flux" size="mini"></el-input>
                        </template>
                    </el-table-column>
                </el-table-column>

                <el-table-column
                    min-width="180"
                    :label="label"
                    class-name="theme-color">
                    <el-table-column 
                        label="金额"
                        min-width="80" 
                        prop="isxz"
                       >
                        
                    </el-table-column>
                </el-table-column>
                </el-table> -->

      <legend class="legendColumn">上传附件</legend>
      <uploadFile></uploadFile>

      <legend class="legendColumn">流程处理</legend>
      <procedure></procedure>

    </el-form>

  </div>
</template>
<script>
import commonPart from "../../CustomerCenter/changeMangement/commonPart"; //公告模块
import uploadFile from "@/components/uploadPic"; //上传附件
import procedure from "@/components/procedure"; //流程审核
export default {
  name: "FinancialAdjustmentEdit",
  components: {
    commonPart,
    uploadFile,
    procedure
  },
  data() {
    return {
      payServiceType: [
        {
          label: 1,
          value: "水费"
        },
        {
          label: 2,
          value: "污水处理费"
        },
        {
          label: 3,
          value: "垃圾处理费"
        }
      ],
      payServiceModelLive: false,
      payServiceModel: [1, 2, 3],
      AdjustOption: [
        {
          value: '1',
          label: "按金额"
        },
        {
          value: '2',
          label: "按水量"
        },
      ],
      FinancialAdjustmentEditForm: {

        // 查询内容
        AdjustType:'1',
        cDate: "",
        cTime: "",
        desc: "",
        userNo: "",
        userName: "",
        userAddr: "",
        linkMan: "",
        linkTel: "",
        meterReadingMonth: "",
        useWaterType: "",
        priorPeriodMrDate: "",
        updateReadingNumFlag: "",
        priorPeriodNum: "",
        currendPeriodNum: "",
        costType: "",
        currendPeriodWater: "",
        amountMoney: "",
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
        IsFine: [],
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
        PriceStrategy: "",
        isfines: "2",
        UpdateCodeCopye: "2",
        Remarks: ""
      },
      rules: {
        userNo: [
          { required: true, trigger: "blur", message: "请输入用户编号" }
        ],
        cDate: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ]
      },
      histroyData: {},
      label: 0,
      userNumEdit: false
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
            areaName: "水费",
            code: "C7551990000003",
            concentrator: "10",
            connect: 0,
            daytime: "2019-07-02",
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
            areaName: "污水处理费",
            code: "C7551990000003",
            concentrator: "10",
            connect: 0,
            daytime: "2019-07-02",
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
            areaName: "水资源费",
            code: "C7551990000003",
            concentrator: "10",
            connect: 0,
            daytime: "2019-07-02",
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
    },
    isPay(val) {
      if (val === "1") {
        this.userNumEdit = true;
      } else {
        this.userNumEdit = false;
      }
    }
  }
};
</script>
<style lang="scss">
$theme-font-color: #3680cd;
.FinancialAdjustmentEdit {
  overflow-y: auto;
  height: 100%;
}
</style>

