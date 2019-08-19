<template>
  <div class="home">
    <Layout class="layout">
        <Header ref="header"></Header>
        <Layout>
            <Sider class="slider">
                <ScrollView class="wrapper" ref='leftScroll'>
                    <div>
                        <div class="wrapperItem" 
                        v-for="(category,index) in categories" 
                        @click="goToTarget(index)" 
                        :key='category.name' 
                        :class="{heightlight:currntFoodItem == index}">
                            {{category.name}}
                        </div>
                    </div>
                </ScrollView>
            </Sider>
            <Content >
                <ScrollView class="foodWrapper" ref="foodWrapper" @scroll="scroll">
                    <div class="foodContent">
                        <div class="foodContentItem" v-for="(category,index) in categories" :key="index">
                            <div v-if="category.childrens">
                                <p style="text-align:left; color:white;"><span class="categoryTitle">{{category.name}} </span> <Icon type="ios-heart" /> {{category.title || '美味不可挡' }}</p>                
                                <div class="main">
                                    <div class="main-item" style="width:33%" v-for="(children,index) in category.childrens" :key="index">
                                        <Card  :padding="5">
                                            <div style="text-align:center" class="imgContainer" >
                                                <p>{{children.name}}</p>
                                                <img alt="" src="https://new-portal-web.oss-cn-beijing.aliyuncs.com/uploads/招牌虾滑1.jpg">
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollView>
            </Content>
        </Layout>
        <Footer>Designed by CatWatermelon</Footer>
    </Layout>
  </div>
</template>

<script>
import ScrollView from '../components/Scroll'
import categories from '../assets/categories.json'
export default {
    name: 'home',
    data () {
        return {
            categories: categories,
            heightList: [0],
            currntFoodItem: 0,
            wrapperItem: [],
            isClickPhone: false
        }
    },
    methods: {
        init(){
            let list = document.querySelectorAll('.foodContentItem');
            let height = 0;
            this.heightList = [0]
            list.forEach((item,index)=>{
                this.heightList.push((height += item.clientHeight));
            })
            this.wrapperItem = document.querySelectorAll('.wrapperItem');
        },
        scroll(pos){
            let heightList = this.heightList;      
            for(let i=0; i<heightList.length; ++i){
                let itemCurrent = heightList[i];
                let itemNext = heightList[i+1];
                if(-pos.y >= itemCurrent && -pos.y < itemNext){
                    if(this.currntFoodItem != i){
                        this.currntFoodItem = i;
                        break;
                    }
                }
            }
        },
        goToTarget(index){
            let titleElList = document.querySelectorAll('.categoryTitle');  
            // this.$refs.foodWrapper.scrollToElement(titleElList[index],200);
            this.$refs.foodWrapper.scrollTo(0,-this.heightList[index],100);
            // this.currntFoodItem = index;
        },
    },
    mounted(){
        setTimeout(()=>{
            this.init();
        },20);
        let that = this;
        window.addEventListener('resize',()=>{
            that.init();
            console.log(that.heightList);
        });
    },
    components: {
        ScrollView
    }
}
</script>
<style>

html {
    font-size: 90px;
}
@media screen and (min-width: 400px){
    html {
        font-size: 30px;
    }
}
@media screen and (min-width: 700px) {
    html {
        font-size: 60px;
    }
}
@media screen and (min-width: 1000px){
    html {
        font-size: 70px;
    }
}
.home .ivu-layout-header, .home .ivu-layout-footer{
    /* height: 0.7222rem; */
    height: 65px;
    box-sizing: border-box;
    background-color: rgb(231, 248, 248);
}
.home .navbar {
    margin-left: auto;
}
.home .wrapper {
    /* height: 5.8555rem; */
    height: 527px;
    overflow: hidden;
}
.home .wrapperItem {
    padding: 0.222rem 0px;
    font-weight: bold;
}
.home .slider { 
    font-family: sans-serif;
    font-size: 0.205rem;
    color: lightcyan;
    width: 2.222rem;
}
.home .main {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;   
    overflow: hidden;
}
.home .main .main-item {
    padding: 0.0222rem;
    box-sizing: border-box;
}
.home .foodWrapper {
    box-sizing: border-box;
    /* height: 5.666rem; */
    height: 510px;
    position: relative;
    overflow: hidden;
}
.home .foodContentItem {
    padding: 0.1666rem 0px 0px;
}
.home .ivu-layout-content {
    background-color:lightslategray;
    padding: 0px 0.111rem;
}
.home .categoryTitle {
    font-size: 0.2111rem;
    font-weight: bold;
    color: pink;
}
.home .imgContainer {
    position: relative;
    font-size: 0;
}
.home .imgContainer>p {
    position: absolute;
    font-size: 0.2444rem;
    font-weight: bold;
    top: 0.111rem;
    left: 0.111rem;
    color: white;
}
.home .imgContainer img {
    max-width: 100%;
}
.heightlight {
    background-color: lightslategray;
    /* border-right:2px solid darkseagreen; */
}
</style>
