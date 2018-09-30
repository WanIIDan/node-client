<template>
    <div class="index w1170">
        <div class="banner-wrap clearfix">
            <Banner></Banner>
            <UserBox></UserBox>
        </div>
        
        <div class="w1170">
            <div class="article-wrap">
                <router-link :to="{name: 'article', params: {id: item._id}}" class='article-item' v-for='(item,index) in content' :key="index">
                    <div class="article-msg clearfix">
                        <div class="avatar fl">
                            <img :src="item.author.avatar">
                        </div>
                        <div class="author-msg fl">
                            <div class="row1">
                                <span class="author-name" v-text="item.author.username"></span>&nbsp;
                                <span class="divide">|</span>&nbsp;
                                <span class="article-title" v-text="item.title"></span>
                            </div>
                            <div class="row2">
                                <span class="strong">
                                    浏览：<span v-text="item.readnumber"></span>  
                                </span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span class="strong">
                                    回复：<span v-text="item.commonnum"></span>
                                </span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span class="strong">
                                    分类：<span v-text="item.category.name"></span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="article-content" v-text="item.contentText">
                        
                    </div>
                </router-link>
            </div>
        </div>

    </div>
</template>

<script>
    import Banner from '@/components/Banner'
    import UserBox from '@/components/UserBox'

    export default {
        components: {
            Banner,
            UserBox
        },
        data() {
            return {
                content: []
            }
        },
        methods: {
            getData() {
                this.$axios.get('/article').then(res=>{
                    this.content = res.data
                })
            }
        },
        created() {
            this.getData()
        }
    }
</script>

<style scoped lang="scss">
    .index {
        margin-top: 50px;
    }

    .article-wrap {
        margin-top: 30px;
        width: 750px;
        background: #fff;
        border-radius: 6px;
        overflow: hidden;
        margin-bottom: 20px;
    }

    .article-wrap .article-item {
        display: block;
        text-decoration: none;
        color: #333;
        padding: 24px;
        background: #fff;

        .avatar {
            width: 70px;
            height: 70px;

            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }

        .author-msg {
            margin-left: 15px;

        }

        .row1 {
            line-height: 24px;

            .author-name {
                font-size: 18px;
                font-weight: 700;
                color: #409eff;
            }
        }

        .row2 {
            margin-top: 8px;
            width: 600px;
            background: #ccc;
            color: #555;
            border-radius: 4px;
            padding: 6px;
        }  
    }

    .article-wrap .article-content {
        margin-top: 8px;
    }
</style>