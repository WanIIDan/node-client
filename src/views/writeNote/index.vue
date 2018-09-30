<template>
    <div class="write-note">
        <div class="main-content w1170">
            <div class="title">标题</div>
            <div class="input-wrap">
                <el-input v-model="formData.title"></el-input>
            </div>
            <div class="title">内容</div>
            
            <quill-editor 
                v-model="formData.content" 
                ref="myQuillEditor" 
                :options="editorOption"
                @change="handleChange">
            </quill-editor>

            <div class="category">
                <span class="strong clearfix">
                    <span class="fl">分类：</span> 
                    <div class="fl" style="margin-left: 10px;">
                        <wd-radios :options="categories" v-model="formData.category"></wd-radios>
                    </div>
                </span> 
            </div>

            <el-button type="primary" @click="handleSubmit">发布笔记</el-button>
        </div>
    </div>
</template>

<script>
    import 'quill/dist/quill.snow.css'
    import { quillEditor, Quill } from "vue-quill-editor";
    import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
    import wdRadios from '@/components/Radios'

    Quill.register("modules/ImageExtend", ImageExtend);

    export default {
        components: { 
            quillEditor, 
            wdRadios 
        },
        data() {
            return {
                formData: {
                    title: '',
                    content: '',
                    contentText: '',
                    category: ''
                },
                categories: [],
                // 富文本框参数设置
                editorOption: {
                    modules: {
                        ImageExtend: {
                            loading: true,
                            name: "img",
                            action: 'https://qiniu.com',
                            response: res => {
                                return res.info;
                            }
                        },
                        toolbar: {
                            container: container,
                            handlers: {
                                image: function() {
                                    QuillWatch.emit(this.quill.id);
                                }
                            }
                        }
                    }
                }
            }
        },
        methods: {
            handleChange({quill, html, text}) {
                // console.log(text)
                this.formData.contentText = text
                this.formData.contentText = this.formData.contentText.substring(0,200) + '...'
            },
            getCategory() {
                this.$axios.get('/category').then(res=>{
                    this.categories = res.data
                })
            },
            handleSubmit() {
                this.$axios.post('/article', this.formData).then(res=>{
                    if(res.code == 200) {
                        this.$message.success(res.msg)
                        this.$router.push('/index')
                    }else if(res.code == 403) {
                        this.$router.push('/index')
                    }
                })
            }
        },
        created() {
            this.getCategory()
        }
    }
</script>

<style scoped lang="scss">
    .main-content {
        margin-top: 30px;
        background: #fff;
        border-radius: 6px;
        padding: 30px;
        box-sizing: border-box;

        .title {
            line-height: 2;
            font-size: 20px;
            font-weight: 600;
            color: #444;
        }

        .category {
            margin: 20px 0;

            .strong {
                color: #409eff;
                font-weight: 600;
                font-size: 14px;
            }
        }
    }
</style>

<style>
    .ql-container {
        min-height: 300px;
    }
</style>
