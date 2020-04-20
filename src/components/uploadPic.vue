<template>
  <!-- 工程中心-上传附件 -->
  <div class="upload-pic">
    <!-- 进度条 -->
    <div class="progress" v-show="progressShow">
      <el-progress :percentage="percentage"></el-progress>
    </div>
    <!-- 上传附件 -->
    <div class="kr-photo">
      <div class="children" v-for="(v,i) in picList" :key='i'>
        <div class='title1' v-if='i !== 3'><span>{{v.title}}</span></div>
        <div class='title2' v-else><span>{{v.title}}</span></div>
        <div class="btn-group">
          <el-button type="primary" size="mini" @click='takePhoto(i)'>拍照<i class="el-icon-camera-solid el-icon--right"></i></el-button>
          <el-upload
            class="upload-file"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-progress="handleProgress"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            >
            <el-button type="primary" plain size="mini">点击上传<i class="el-icon-upload el-icon--right"></i></el-button>
          </el-upload>
          <!-- <el-button type="success" @click="takeUpload(i)">上传<i class="el-icon-upload el-icon--right"></i></el-button> -->
        </div>
        <el-dialog
          :title="v.title"
          :visible.sync="isTakePhoto"
          width="50%"
          :before-close="handleClose">
          <div class="kr-img">
            <img src="../assets/images/jmcxl.png" alt="这是一张帅帅的照片">
            <span></span>
          </div>
          <el-progress :percentage="50"></el-progress>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="doPhoto(ruleTitle)" size="mini">{{ruleTitle}}</el-button>
            <el-button @click="callBack(ruleTitle1)" size="mini">{{ruleTitle1}}</el-button>
          </span>
        </el-dialog>

      </div>
    </div>
   
  </div>
</template>
<script>
export default {
  // props:['uploadPic'],
  data(){
    return {
      progressShow:false,
      percentage:0,
      isTakePhoto:false,
      ruleTitle:"确认",
      ruleTitle1:"取消",
      isPhoto:false,
      uploadTitle:'',
      title:'title1',
      picList:[
        {
          title:'经办人照片',
        },
        {
          title:'业主身份证-正面',
        },
        {
          title:'业主身份证-反面'
        },
        {
          title:'房产证/用地、房产的相关证明文件/镇街以上政府部门证明（该项提供任一证明文件即可）',
        },
        {
          title:'银行卡',
        },
        {
          title:'经办人身份证-正面',
        },
        {
          title:'经办人身份证-反面'
        },
        
        
        {
          title:'银行卡账户持卡人-正面',
        },
        {
          title:'银行卡账户持卡人-反面'
        },
        {
          title:'其他',
        }
      ],
    };
  },
  mounted(){},
  methods:{
    handleClose(){},
    takeUpload(i){

    },
    takePhoto(i){

      window.addEventListener("DOMContentLoaded", function() {
        var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        video = document.getElementById("video"),
        videoObj = { "video": true },
        errBack = function(error) {
        };
        if(navigator.getUserMedia) { // Standarda
          navigator.getUserMedia(videoObj, function(stream) {
            video.src = stream;
            video.play();
          }, errBack);
        } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
          navigator.webkitGetUserMedia(videoObj, function(stream){
          video.src = window.webkitURL.createObjectURL(stream);
          video.play();
        }, errBack);
			  }else if(navigator.mozGetUserMedia) { // Firefox-prefixed
          navigator.mozGetUserMedia(videoObj, function(stream){
            video.src = window.URL.createObjectURL(stream);
            video.play();
          }, errBack);
        }
        document.getElementById("snap").addEventListener("click", function() {
          context.drawImage(video, 0, 0, 640, 480);
        });
      }, false);
      this.isTakePhoto = true;
    },
    callBack(name){//取消

      if(name == '取消'){
        this.isTakePhoto = false;
      }else{
        this.ruleTitle = "确定";
        this.ruleTitle1 = "取消";
      }
    },
    doPhoto(name){

      this.ruleTitle = "提交";
      this.ruleTitle1 = "重拍";
      if(name == '提交'){
        this.isTakePhoto = false;
        this.ruleTitle = '确定';
        this.ruleTitle1 = '取消';
      }
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    handleProgress(event, file, fileList){
      this.progressShow = true;
      this.$nextTick(()=>{
        let percent = event.percent;
        this.percentage = percent.toFixed(2);
      });
      if(event.percent===100){
        setTimeout(()=>{
          this.progressShow = false;
        },3000)
      }
      
      
      

    }
  },

}
</script>
<style lang="scss">
  .upload-pic{
    width: 100%;
    // height: 100%;
    position: relative;
    .progress{
      position: absolute;
      background: rgba(255,255,255,.5);
      width: 50%;
      height: 100%;
      top: 0;
      left: 25%;
      z-index: 111;
      .el-progress{
        position: absolute;
        top: 50%;
        width: 100%;
        height: 20px;
        text-align: center;
        .el-progress-bar__outer{
          height: 10px !important;
        }
        .el-progress__text{
          font-size: 20px !important;
          margin-top: 15px;
        }
      }
    }
    .kr-upload{
      display: flex;
      .kr-pic{
        margin-left:1rem;
        .el-button{
          padding: 0;
        }
        .kr-title{
          // padding-left:3rem;
          width: 10rem;
          text-align: center;
          // display: inline;
          font-size:1rem;
          height: 20px;
          line-height: 20px;
        }
      }
    }
    .kr-photo{
      width: 100%;
      height: 100%;
      zoom: 1;
      &::after{
        display: block;
        content: "";
        clear: both;
      }
      .children{
        float: left;
        margin: 10px;
        border: 1px solid #aaa;
        width: calc(20% - 22px);
        // height: calc(20% - 22px);
        height: 10rem;
        .title2{
          color:#000;
          font-size:0.9rem;
          text-align: center;
          height: 5rem;
          margin-top:2rem; 
        }
        .title1{
          color:#000;
          font-size:0.9rem;
          text-align: center;
          height: 7rem;
          line-height: 7rem;
        }

        .btn-group{
          text-align: center;
          position: relative;
          margin-bottom: 10px;
          .el-upload-list{
            display: none;
          }
        }
      }
      .kr-img{
        width: 100%;
        height: 95%;
        text-align: center;
        margin:0 auto;
        img{
          vertical-align:middle;
        }
        span{
          height:100%;
          width:0px;
          overflow:hidden;
          display:inline-block;
          vertical-align:middle;
        }
      }
      .upload-file{
        display: inline-block;
        .el-upload{
          margin-top:15%;
        }
      }
    }
    .kr-takePhoto{
      .photo{
        width: 100px;
        height: 100px;
        border: 1px solid red;
      }
    }
  }
  
</style>