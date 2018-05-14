<template>
  <div v-if="category">
    <div class="form-title">
      <h3>{{formTitle}}</h3>
    </div>
    <Form :model="category" :label-width="100" ref="category" :rules="ruleInline">
      <FormItem label="名称" prop="name">
        <Input v-model="category.name" placeholder="请填写名称"></Input>
      </FormItem>
      <FormItem label="类型" prop="type">
        <RadioGroup v-model="category.type">
          <Radio :label="0">链接</Radio>
          <Radio :label="1">文章列表</Radio>
          <Radio :label="2">相册列表</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="图标" prop="icon">
        <img :src="category.icon" v-if="category.icon !== null" alt="图标"></img>
        <Upload :action="Url + '/pictures'" :headers="headers" name="picture[image]" :on-success="upload">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
      </FormItem>
      <FormItem label="跳转URL" prop="url" v-if="category.type === 0">
        <Input v-model="category.url" placeholder="请填写跳转URL"></Input>
      </FormItem>
      <FormItem label="是否激活" prop="active">
        <i-switch v-model="category.active" :true-value="true" :false-value="false" size="large">
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
        </i-switch>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('category')">提交</Button>
        <Button type="ghost" style="margin-left: 8px" @click="back">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      category: {
        name: null,
        // url: null,
        icon: null,
        // active: null,
        type: null
      },
      ruleInline: {
        name: [
          { required: true, message: '请填写名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择类型' }
        ],
        icon: [
          { required: true, message: '请上传图标', trigger: 'change' }
        ]
        // url: [
        //   { required: true, message: '请填写跳转URL', trigger: 'change' }
        // ]
      }
    }
  },
  created () {
    this.Url = global.URL
    this.headers = this.$http.defaults.headers.common
    if (this.$route.name === 'CategoryNew') {
      this.formTitle = '新建内容分类'
    } else {
      this.formTitle = '编辑内容分类'
      this.$http.get('/admin/categories/' + this.$route.params.id).then((res) => {
        this.category = res.data.category
      })
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.commitSave()
        }
      })
    },
    commitSave () {
      if (this.$route.name === 'CategoryNew') {
        this.$http.post('/admin/categories', {category: this.category}).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('新建成功！')
          } else {
            this.$Message.error(res.data.notice)
          }
          this.$router.push('/categories')
        })
      } else {
        this.$http.put('/admin/categories/' + this.$route.params.id, this.category).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('修改成功！')
          } else {
            this.$Message.error(res.data.notice)
          }
          this.$router.push('/categories')
        })
      }
    },
    back () {
      this.$router.go(-1)
    },
    upload (res) {
      this.category.icon = res.picture.image_url
    }
  }
}
</script>

<style scoped>
img {
  height: 100px;
  width: 100px;
}
</style>