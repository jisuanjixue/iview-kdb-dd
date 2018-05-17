<template>
  <div v-if="bannar">
    <div class="form-title">
      <h3>{{formTitle}}</h3>
    </div>
    <Form :model="bannar" :label-width="100" ref="bannar" :rules="ruleInline">
      <FormItem label="标题" prop="title">
        <Input v-model="bannar.title" placeholder="请填写标题"></Input>
      </FormItem>
      <FormItem label="URL" prop="url">
        <Input v-model="bannar.url" placeholder="请填写URL"></Input>
      </FormItem>
      <FormItem label="图片" prop="image">
        <img :src="bannar.img" v-if="bannar.img !== null"></img>
        <Upload :action="Url + '/pictures'" :headers="headers" name="picture[image]" :on-success="upload">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
      </FormItem>
      <FormItem label="是否激活" prop="active">
        <i-switch v-model="bannar.active" :true-value="true" :false-value="false" size="large">
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
        </i-switch>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('bannar')">提交</Button>
        <Button type="ghost" style="margin-left: 8px" @click="back">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bannar: {
        title: null,
        url: null,
        img: null,
        active: null
      },
      ruleInline: {
        title: [
          { required: true, message: '请填写标题', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请填写URL', trigger: 'change' }
        ],
        img: [
          { required: true, message: '请上传图片', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.Url = global.URL
    this.headers = this.$http.defaults.headers.common
    if (this.$route.name === 'BannarNew') {
      this.formTitle = '新建页头'
    } else {
      this.formTitle = '编辑页头'
      this.$http.get('/admin/bannars/' + this.$route.params.id).then((res) => {
        this.bannar = res.data.bannar
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
      if (this.$route.name === 'BannarNew') {
        this.$http.post('/admin/bannars/new', {bannar: this.bannar}).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('新建成功！')
          } else {
            this.$Message.error(res.data.notice)
          }
          this.$router.push('/bannars')
        })
      } else {
        this.$http.put('/admin//bannars/' + this.$route.params.id, this.bannar).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('修改成功！')
          } else {
            this.$Message.error(res.data.notice)
          }
          this.$router.push('/bannars')
        })
      }
    },
    back () {
      this.$router.go(-1)
    },
    upload (res) {
      this.bannar.image = res.picture.image_url
    }
  }
}
</script>