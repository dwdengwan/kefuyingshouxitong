
<template>

    <div class="AttachmentViewInfo">
        <ul class="Enclosure">
            <li v-for="(item, index) in filePic" :key="index">
                <div class="Enclosure-left">
                    <img :src="item.pic" :alt="item.name">
                </div>
                <div class="Enclosure-right">
                    <p>{{item.name}}</p>
                    <p>{{item.type}}</p>
                    <p>{{item.time}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:"AttachmentViewInfo",
     data(){
        return{
            filePic:[
                {
                    name:"文件名称",
                    type:"单据类型",
                    pic:require('@/assets/images/timg.jpg'),
                    time:"上传时间",
                },
                {
                    name:"文件名称",
                    type:"单据类型",
                    pic:require('@/assets/images/timg.jpg'),
                    time:"上传时间",
                },
                {
                    name:"文件名称",
                    type:"单据类型",
                    pic:require('@/assets/images/timg.jpg'),
                    time:"上传时间",
                },
                {
                    name:"文件名称",
                    type:"单据类型",
                    pic:require('@/assets/images/timg.jpg'),
                    time:"上传时间",
                },
                {
                    name:"文件名称",
                    type:"单据类型",
                    pic:require('@/assets/images/timg.jpg'),
                    time:"上传时间",
                },
                {
                    name:"文件名称",
                    type:"单据类型",
                    pic:require('@/assets/images/timg.jpg'),
                    time:"上传时间",
                },
  
            ]
            
 
        }
    },
    mounted(){
        // console.log($("li").eq(0).width())
    },
    methods:{
       

    },

}
</script>
<style lang="scss">
.AttachmentViewInfo{
    width: 100%;
    height: 100%;
    .Enclosure{
        zoom: 1;
        width: 100%;
        height: 100%;
        &:after{
            display: block;
            content: "";
            clear: both;
        }
        & > li{
            float: left;
            width: calc(20% - 42px);
            // height: calc(16% - 42px);
            border:1px dashed #ccc;
            margin: 10px;
            padding: 10px;
            .Enclosure-left{
                float: left;
                width: 40%;
                img{
                    width: 80%;
                    vertical-align: middle;
                }
            }
            .Enclosure-right{
                float: right;
                width: calc(60% - 5px);
                font-size: 12px;
                // color: #ccc;
                padding-left: 5px;
                p{
                    margin-bottom: 5px;
                }
            }
        }
    }
}
</style>
