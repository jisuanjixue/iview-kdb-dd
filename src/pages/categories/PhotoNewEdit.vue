<template>
  <div v-if="photo">
    <div class="form-title">
      <h3>{{formTitle}}</h3>
    </div>
    <Form :model="photo" :label-width="100" ref="photo" :rules="ruleInline">
      <FormItem label="标题" prop="title">
        <Input v-model="photo.title" placeholder="请填写标题"></Input>
      </FormItem>
      <FormItem label="描述" prop="content">
        <Input v-model="photo.content" placeholder="请填写描述"></Input>
      </FormItem>
      <FormItem label="图片" prop="image">
        <img :src="photo.image" v-if="photo.image !== null"></img>
        <Upload :action="Url + '/pictures'" :headers="headers" name="picture[image]" :on-success="upload">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('photo')">提交</Button>
        <Button type="ghost" style="margin-left: 8px" @click="back">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      photo: {
        title: null,
        content: null,
        image: null
      },
      ruleInline: {
        title: [
          { required: true, message: '请填写标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请填写URL', trigger: 'blur' }
        ],
        image: [
          { required: true, message: '请上传图片', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.Url = global.URL
    this.headers = this.$http.defaults.headers.common
    if (this.$route.name === 'PhotoNew') {
      this.formTitle = '新建相册'
    } else {
      this.formTitle = '编辑相册'
      this.$http.get('/admin/categories/' + this.$route.params.id + '/photos/' + this.$route.params.photo_id).then((res) => {
        this.photo = res.data.photo
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
      if (this.$route.name === 'PhotoNew') {
        this.$http.post('/categories/' + this.$route.params.id + '/photos', {photo: this.photo}).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('新建成功！')
          } else {
            this.$Message.error(res.data.notice)
          }
          this.$router.push('/categories/' + this.$route.params.id + '/photos')
        })
      } else {
        this.$http.put('/admin/categories/' + this.$route.params.id + '/photos/' + this.$route.params.photo_id, this.photo).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('修改成功！')
          } else {
            this.$Message.error(res.data.notice)
          }
          this.$router.push('/categories/' + this.$route.params.id + '/photos')
        })
      }
    },
    back () {
      this.$router.go(-1)
    },
    upload (res) {
      this.photo.image = res.picture.image_url
    }
  }
}
</script>

<style scoped>
img {
  height: 200px;
  width: 200px;
}
</style>