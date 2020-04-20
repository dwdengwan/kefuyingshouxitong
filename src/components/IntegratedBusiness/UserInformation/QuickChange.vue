<template>
  <div class="QuickChange">
    <!-- 快速变更 -->
    <el-form class="formBill" size="mini" :inline="true" :model="userInfoSearchEditForm" label-width="130px">
      <el-form-item label="用户编号：" prop="userNume">
        <el-input v-model="userInfoEditForm.userNume" disabled class="read-only"></el-input>
      </el-form-item>
        <el-form-item >
            <el-button size="mini"  class='searchBtn'  @click="demand" icon="el-icon-search"></el-button>
        </el-form-item>
        <br>
      <el-form-item label="用户名称：" prop="isfines">
        <el-input v-model="userInfoEditForm.isfines" placeholder="张三" disabled class="read-only"></el-input>
      </el-form-item>
      <el-form-item label="用户地址：" prop="isfines">
        <el-input v-model="userInfoEditForm.isfines" placeholder="有限公司" disabled class="read-only"></el-input>
      </el-form-item>
      <el-form-item label="营业所：" prop="region">
        <el-input v-model="userInfoEditForm.isfines" placeholder="城区" disabled class="read-only"></el-input>
      </el-form-item>
      <el-form-item label="行政区域：" prop="desc">
        <el-input v-model="userInfoEditForm.isfines" placeholder="城区" disabled class="read-only"></el-input>
      </el-form-item>
      <el-form-item label="管理区域：" prop="desc">
        <el-input v-model="userInfoEditForm.isfines" placeholder="城区" disabled class="read-only"></el-input>
      </el-form-item>
      <!-- <el-form-item label="营业站点：" prop="BusinessSite">
        <el-select clearable v-model="userInfoEditForm.BusinessSite" placeholder="营业部">
          <el-option v-for="(item,index) in userInfoEditForm.BusinessSite" :key="index" :label="item.name" :value="item.value"></el-option>

        </el-select>
      </el-form-item> -->

      <!-- <el-form-item>
        <span slot="label">
          <el-checkbox v-model="userInfoEditForm.userNum">短信手机：</el-checkbox>
        </span>
        <el-input v-model="userInfoEditForm.PriceStrategy" placeholder="1354687952"></el-input>
      </el-form-item> -->

      <el-form-item :label="v.label" v-for="(v,i) in userInfoEditForm.ComparisonTableInfoForm" :key="i">
        <el-input v-model="v.value" :placeholder="v.tips"></el-input>
      </el-form-item>
      <el-form-item label="短信签约：">
        <el-radio v-model="userInfoEditForm.radio" label="1">是</el-radio>
        <el-radio v-model="userInfoEditForm.radio" label="2">否</el-radio>
      </el-form-item>
      <el-form-item :label="v.label" v-for="(v,i) in userInfoEditForm.ComparisonTableInfoForm1" :key="i">
        <el-input v-model="v.value" :placeholder="v.tips"></el-input>
      </el-form-item>
      <el-form-item label="备注：" class="remark">
        <el-input type="textarea" v-model="remark" placeholder=""></el-input>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
export default {
  name: "QuickChange",
  data() {
    return {
      remark:"",
      userInfoEditForm: {
        workType: [
              {
                name: "居民",
                value: "1"
              },
              {
                name: "学校",
                value: "1"
              },
              {
                name: "公共事业",
                value: "1"
              },
              {
                name: "福利、敬老院",
                value: "1"
              },
              {
                name: "行政事业单位",
                value: "1"
              },
              {
                name: "部队",
                value: "1"
              },
              {
                name: "医疗卫生单位",
                value: "1"
              },
              {
                name: "能源",
                value: "1"
              },
            ],
        radio: '1',
        bankName: [
          {
            name: "中国银行",
            value: '1'
          }
        ],
        InvoiceInformation: [
          {
            label: "单位名称：",
            value: "",
            tips: ""
          },
          {
            label: "纳税人识别号：",
            value: "",
            tips: "12441400714861777E "
          },
          {
            label: "联系地址：",
            value: "",
            tips: ""
          },
          {
            label: "座机号码：",
            value: "",
            tips: ""
          },


        ],
        countMsgOrder: [
          {
            label: "开户名：",
            value: "",
            tips: "梅州粤海水务有限公司"
          },
          {
            label: "银行账户：",
            value: "",
            tips: "101801012001"
          },
          {
            label: "托号：",
            value: "",
            tips: "101801012001"
          },
          {
            label: "托收合同号：",
            value: "",
            tips: "101801012001"
          },

          // {
          //     label:"银行签约日期：",
          //     value:"",
          //     tips:"20180-02-13"
          // },
        ],
        countMsg: [
          {
            label: "余额：",
            value: "",
            tips: ""
          },

          


        ],

        // 用户-基础信息
        ComparisonTableInfoForm: [
          // {
          //     label:"街区：",
          //     value:"",
          //     tips:""
          // },
          {
            label: "联系人：",
            value: "",
            tips: ""
          },
          {
            label: "座机号码：",
            value: "",
            tips: ""
          },
          {
            label: "邮箱：",
            value: "",
            tips: ""
          },
          {
            label: "手机号码：",
            value: "",
            tips: ""
          },


        ],
        ComparisonTableInfoForm1: [
          // {
          //     label:"街区：",
          //     value:"",
          //     tips:""
          // },
          {
            label: "传真号码：",
            value: "",
            tips: ""
          },
          // {
          //   label: "停水联系人：",
          //   value: "",
          //   tips: ""
          // },
          // {
          //   label: "停水座机号码：",
          //   value: "",
          //   tips: ""
          // },


        ],
        Waterworks: "",
        pumpingStation: "",
        Pipeline: "",
        // 用户合同信息
        ContractInformation: [
          {
            label: "身份证号：",
            value: "",
            tips: ""
          },
          {
            label: "合同年限（月）：",
            value: "",
            tips: ""
          },
          {
            label: "签订日期：",
            value: "",
            tips: ""
          },
          {
            label: "供水合同号：",
            value: "",
            tips: ""
          },

        ],
        // 用户分类信息
        classifyPropOptions: [
          {
            label: "行业分类：",
            tips: "居民",
            value: "",
            options: [
              {
                name: "居民",
                value: "1"
              },
              {
                name: "学校",
                value: "1"
              },
              {
                name: "公共事业",
                value: "1"
              },
              {
                name: "福利、敬老院",
                value: "1"
              },
              {
                name: "行政事业单位",
                value: "1"
              },
              {
                name: "部队",
                value: "1"
              },
              {
                name: "医疗卫生单位",
                value: "1"
              },
              {
                name: "能源",
                value: "1"
              },
            ]
          },
          {
            label: "计量收费标志：",
            tips: "计量收费",
            value: "",
            options: [
              {
                name: "计量收费",
                value: "1"
              },
              {
                name: "计量不收费",
                value: "1"
              },
              {
                name: "不计量收费",
                value: "1"
              },
              {
                name: "不计量不收费",
                value: "1"
              },
            ]
          },
          {
            label: "户型：",
            tips: "单户",
            value: "",
            options: [
              {
                name: "单户",
                value: "1"
              },
              {
                name: "多户",
                value: "1"
              },

            ]
          },
        ],
        TypesWaterUse: "",
        WaterPropertie: "",
        CategorieWaterUse: "",
        ClassificationUse: "",
        // 用户抄表信息
        MeterReading: [

          {
            label: "抄表顺序号：",
            value: "",
            tips: "2753"
          },
          {
            label: "新表起码：",
            value: "",
            tips: ""
          },
          {
            label: "旧抄表码：",
            value: "",
            tips: ""
          },
          {
            label: "邮箱：",
            value: "",
            tips: ""
          },
          {
            label: "投递人：",
            value: "",
            tips: ""
          },
          {
            label: "投递备注信息：",
            value: "",
            tips: ""
          },

        ],
        MeterReadingOnly: [
          {
            label: "抄表日：",
            value: "",
            tips: "20"
          },
          {
            label: "抄表周期：",
            value: "",
            tips: "每月"
          },
          {
            label: "本期行度：",
            value: "",
            tips: ""
          },
        ],
        yes: "",
        no: "",
        // 用户水表信息
        WaterMeter: [
          {
            label: "水表编号：",
            value: "",
            tips: "20"
          },
          {
            label: "出厂编号：",
            value: "",
            tips: "每月"
          },
          {
            label: "有效日期：",
            value: "",
            tips: ""
          },
          {
            label: "装表日期：",
            value: "",
            tips: "2753"
          },
          {
            label: "换表日期：",
            value: "",
            tips: ""
          },
          {
            label: "拆表日期：",
            value: "",
            tips: ""
          },
        ],
        WaterMeterpOptions: [
          {
            label: "表类型：",
            tips: "机械表",
            value: "",
            options: [
              {
                name: "机械表",
                value: "1"
              },
              {
                name: "智能表",
                value: "1"
              },
            ]
          },
          {
            label: "厂家名称：",
            tips: "宁波",
            value: "",
            options: [
              {
                name: "宁波",
                value: "1"
              },
              {
                name: "上海",
                value: "1"
              },
              {
                name: "梅花",
                value: "1"
              },
              {
                name: "常德",
                value: "1"
              },
              {
                name: "开封",
                value: "1"
              },
            ]
          },
          {
            label: "信用等级：",
            tips: "A",
            value: "",
            options: [
              {
                name: "A",
                value: "1"
              },
              {
                name: "B",
                value: "1"
              },
              {
                name: "C",
                value: "1"
              },
              {
                name: "D",
                value: "1"
              },

            ]
          },
          {
            label: "总分表：",
            tips: "",
            value: "",
            options: [
              {
                name: "否",
                value: "1"
              },
              {
                name: "总表",
                value: "1"
              },
              {
                name: "分表",
                value: "1"
              },
            ]
          },
          {
            label: "字母表：",
            tips: "",
            value: "",
            options: [
              {
                name: "否",
                value: "1"
              },
              {
                name: "子表",
                value: "1"
              },
              {
                name: "母表",
                value: "1"
              },
            ]
          },
        ],
        UnplannedMeterReading: "",
        caliber: "",
        caliberoptions1: [],
        caliberoptions2: [],
        caliberoptions3: [
          {
            name: '户内',
            value: "1"
          },
          {
            name: '户外',
            value: "2"
          },
        ],
        caliberoptions: [
          {
            name: 15,
            value: "1"
          },
          {
            name: 20,
            value: "2"
          },
          {
            name: 25,
            value: "3"
          },
          {
            name: 40,
            value: "4"
          },
          {
            name: 50,
            value: "5"
          },
          {
            name: 80,
            value: "6"
          },
          {
            name: 100,
            value: "7"
          },
        ],
        // 用户价格信息
        PriceInfo: [
          {
            label: "水费比率（%）：",
            value: "",
            tips: "20"
          },
          {
            label: "污水费比率（%）：",
            value: "",
            tips: "100.00"
          },
          {
            label: "最低用水量：",
            value: "",
            tips: "0"
          },
          {
            label: "人数：",
            value: "",
            tips: ""
          },
          {
            label: "垃圾费比率（%）：",
            value: "",
            tips: "2753"
          },
          {
            label: "垃圾费数量：",
            value: "",
            tips: ""
          },
          {
            label: "每月应收垃圾费：",
            value: "",
            tips: ""
          },
        ],
        desc: "",
        userNume: "",
        descoptions: [
        ],
        asd: [
          {
            name: "计量、计费",
            value: "1"
          },
          {
            name: "计量、不计费",
            value: "2"
          },
          {
            name: "不计量、计费",
            value: "3"
          },
          {
            name: "不计量、不计费",
            value: "4"
          },
        ],
        areas: [
          {
            name: "城区",
            value: "1"
          },
          {
            name: "农村",
            value: "2"
          },
        ],
        BusinessSite: [
          {
            name: "营业部",
            value: "1"
          },
        ],
        idcardTypeList: [
          {
            name: "居民身份证",
            value: "1"
          },
          {
            name: "户口本",
            value: "2"
          },
          {
            name: "护照",
            value: "3"
          },
          {
            name: "回乡证",
            value: "4"
          },
          {
            name: "台胞证",
            value: "5"
          },
        ],
        TypesWwaterUse: [
          {
            name: "实体表",
            value: "1"
          },
          {
            name: "虚拟表",
            value: "2"
          },
        ],
        WaterProperties: [
          {
            name: "一般用途",
            value: "1"
          },
          {
            name: "消防表",
            value: "2"
          },
          {
            name: "监控表",
            value: "3"
          },
        ],
        CategoriesWaterUse: [
          {
            name: "用户表",
            value: "1"
          },
          {
            name: "自用表",
            value: "2"
          },
        ],
        ClassificationUses: [
          {
            name: "正常表",
            value: "1"
          },
          {
            name: "总分总表",
            value: "3"
          },
          {
            name: "总分分表",
            value: "4"
          },
          {
            name: "公司表内部",
            value: "5"
          },
        ],
        PriceType: [
          {
            name: "0038__工业用水3.54",
            value: "1"
          },
          {
            name: "0015__特种用水3.54",
            value: "2"
          },
          {
            name: "0029__区域用水3.54",
            value: "3"
          },
          {
            name: "0030__基本水价3.54",
            value: "4"
          },
          {
            name: "0039__特种用水3.54",
            value: "5"
          },
          {
            name: "0040__生活用水3.54",
            value: "6"
          },
          {
            name: "0041__免费用水3.54",
            value: "7"
          },
        ],
        userNum: "",
        PriceStrategy: "",
        isfines: "",
        UpdateCodeCopye: "",
        Remarks: "",
        year: "",
        countNum: "",
        PaymentMethod: "",
        bankName: "",
        status: "",
        region: "",
        BusinessSite: "",
        bankNameOptions: [
          {
            name: "中国银行",
            value: "1"
          }
        ],
        PaymentMethodOption: [
          {
            name: "托收",
            value: "1"
          }
        ],
        statusoptions: [
          {
            name: "启用",
            value: "1",

          },
          {
            name: "停用",
            value: "2"
          }
        ],
        VirtualTable: "",
        TypesGarbageCharges: "",
        PriceTypes: "",

      },
    }
  }
}
</script>
<style lang="scss">
.QuickChange {
}
</style>
