<template>
  <div class="base-info">
   
    <section class="base-info-right">

      <router-view></router-view>
    </section>
  </div>
</template>
<script>

export default {
  name: "base-info",

}
</script>
<style lang="scss">
@import "../../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.base-info {
  .bread-contain{
    padding-right: 5px;
  }
  .el-table .el-table__body tr .cell:nth-child(1) {
    // text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &:after {
    @include _clearBoth();
  }

  & > .base-info-right {
    width: 100%;
    height: 100%;
    .btn-area{
      height: 4.4rem;
      // padding:10px;
      .el-button{
        height: 1.8rem;
        width: 4.4rem;
        // background: #47b5e8;
        color:#fff;
        // padding:8px 10px !important;
        padding:0px 0px !important;
        // float: right;
        margin-top:1.3rem;
        margin-right:1.2rem;
      }
    }
    .btn-area{
      display: flex;
      flex-direction: row;
      justify-content:space-between;
      .btn-area-right{
        display: flex;
        flex-direction: row;
        .el-input {
          padding:1.3rem 0 0 1.6rem;
          width: 90%;
          .el-input__inner{
            width: 13rem;
            height: 1.8rem;
            .el-input__suffix{
              top: 10px;
            }
          }
        }
        .search{
          width: 2.75rem;
          height: 1.8rem;
          background: #faa646;
        }
      }
      .btn-area-left{
        .el-button{
          margin-right: 0rem !important;
        }
        
        .btn-ex{
          margin-right:1rem !important; 
        }
        .btn-stop{
          width: 5rem;
        }
      }
    }
    .el-table {
      .el-table__body .el-input__inner,.el-textarea__inner{
        height: 28px;
        line-height: 28px;
      }
      .el-textarea__inner{
        min-height: 28px !important;
      }
      .el-input__icon {
        line-height: 2rem !important;
        height: 2rem !important;
      }
      .cell{ 
        div{
          text-align: center;
        }
        .el-button{
          // padding-left: .8rem;
          width: 100%;
          height: 30px;
          padding:0;
          line-height: 30px;
        }
      }
    }
    .el-dialog__body .el-input__suffix {
      right: 20px;
    }
  }
  .my-input {
    width: 25%;
    display: inline-block;
    padding-left: 4%;
    .el-input__inner {
      width: 100%;
    }
    .el-form-item {
      margin-bottom: 15px;
    }
  }
  .my-input .el-input {
    width: 100% !important;
  }
  .my-input .el-select .el-input {
    width: 100%;
  }
  .gocenter {
    width: 41%;
  }
  .gocenter .el-form-item__label {
    text-align: center !important;
  }
  .gocenter .el-textarea__inner {
    min-height: 72px !important;
  }
}
</style>
