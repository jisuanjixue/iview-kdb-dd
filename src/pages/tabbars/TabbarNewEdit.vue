<template>
  <div v-if="tabbar">
    <div class="form-title">
      <h3>{{formTitle}}</h3>
    </div>
    <Form :model="tabbar" :label-width="100" ref="tabbar" :rules="ruleInline">
      <FormItem label="名称" prop="name">
        <Input v-model="tabbar.name" placeholder="请填写名称"></Input>
      </FormItem>
      <FormItem label="默认图标" prop="icon">
        <img :src="tabbar.icon" v-if="tabbar.icon !== null"></img>
        <Upload :action="Url + '/pictures'" :headers="headers" name="picture[image]" :on-success="iconUpload">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
      </FormItem>
      <FormItem label="激活图标" prop="icon_on">
        <img :src="tabbar.icon_on" v-if="tabbar.icon_on !== null"></img>
        <Upload :action="Url + '/pictures'" :headers="headers" name="picture[image]" :on-success="iconOnUpload">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
      </FormItem>
      <FormItem label="链接" prop="link">
        <Input v-model="tabbar.link" placeholder="请填写链接"></Input>
      </FormItem>
      <FormItem label="链接名" prop="link_name">
        <Input v-model="tabbar.link_name" placeholder="请填写链接名"></Input>
      </FormItem>
      <FormItem label="是否激活" prop="active">
        <i-switch v-model="tabbar.active" :true-value="true" :false-value="false" size="large">
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
        </i-switch>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('tabbar')">提交</Button>
        <Button type="ghost" style="margin-left: 8px" @click="back">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabbar: {
        name: null,
        icon: null,
        icon_on: null,
        link: null,
        link_name: null,
        active: null
      },
      ruleInline: {
        name: [
          { required: true, message: '请填写名称', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '请上传默认图标', trigger: 'change' }
        ],
        icon_on: [
          { required: true, message: '请上传激活图标', trigger: 'change' }
        ],
        link: [
          { required: true, message: '请填写链接', trigger: 'blur' }
        ],
        link_name: [
          { required: true, message: '请填写链接名', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.Url = global.URL
    this.headers = this.$http.defaults.headers.common
    if (this.$route.name === 'TabbarNew') {
      this.formTitle = '新建页头'
    } else {
      this.formTitle = '编辑页头'
      this.$http.get('/admin/tabbars/' + this.$route.params.id).then((res) => {
        this.tabbar = res.data.tabbar
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
      if (this.$route.name === 'TabbarNew') {
        this.$http.post('/admin/tabbars', {tabbar: this.tabbar}).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('新建成功！')
          } else {
            this.$Message.error(res.data.notice)
          }
          this.$router.push('/admin/tabbars')
        })
      } else {
        this.$http.put('/admin/tabbars/' + this.$route.params.id, this.tabbar).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('修改成功！')
          } else {
            this.$Message.error(res.data.notice)
          }
          this.$router.push('/admin/tabbars')
        })
      }
    },
    back () {
      this.$router.go(-1)
    },
    iconUpload (res) {
      this.tabbar.icon = res.picture.image_url
    },
    iconOnUpload (res) {
      this.tabbar.icon_on = res.picture.image_url
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