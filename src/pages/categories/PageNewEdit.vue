<template>
  <div v-if="page">
    <div class="form-title">
      <h3>{{formTitle}}</h3>
    </div>
    <Form :model="page" :label-width="100" ref="page" :rules="ruleInline">
      <FormItem label="标题" prop="title">
        <Input v-model="page.title" placeholder="请填写标题"></Input>
      </FormItem>
      <FormItem label="作者" prop="author">
        <Input v-model="page.author" placeholder="请填写作者"></Input>
      </FormItem>
      <FormItem label="摘要" prop="description">
        <Input v-model="page.description" placeholder="请填写摘要"></Input>
      </FormItem>
      <FormItem label="内容" prop="content">
        <Input v-model="page.content"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('page')">提交</Button>
        <Button type="ghost" style="margin-left: 8px" @click="back">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
// import ueditor from '@/components/UEditor'
export default {
  // components: {
  //   ueditor
  // },
  data () {
    return {
      page: {
        title: null,
        author: null,
        content: null,
        description: null
      },
      ruleInline: {
        title: [
          { required: true, message: '请填写标题', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请填写作者', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请填写URL', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请填写摘要', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    // this.Url = global.URL
    // this.headers = this.$http.defaults.headers.common
    if (this.$route.name === 'PageNew') {
      this.formTitle = '新建文章'
    } else {
      this.formTitle = '编辑文章'
      //  getPage () {
      if (this.$route.name === 'PageEdit') {
        this.$http.get('/admin/categories/' + this.$route.params.id + '/pages/' + this.$route.params.page_id).then((res) => {
          this.page = res.data.page
          // editorInstance.setContent(this.page.content)
        })
      }
      // editorInstance.addListener('contentChange', () => {
      //   this.page.content = editorInstance.getContent()
      // })
    // }
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
      if (this.$route.name === 'PageNew') {
        this.$http.post('/admin/categories/' + this.$route.params.id + '/pages', {page: this.page}).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('新建成功！')
          } else {
            this.$Message.error(res.data.notice)
          }
          this.$router.push('/categories/' + this.$route.params.id + '/pages')
        })
      } else {
        this.$http.put('/admin/categories/' + this.$route.params.id + '/pages/' + this.$route.params.page_id, this.page).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('修改成功！')
          } else {
            this.$Message.error(res.data.notice)
          }
          this.$router.push('/categories/' + this.$route.params.id + '/pages')
        })
      }
    },
    back () {
      this.$router.go(-1)
    },
    // editorReady (editorInstance) {
    //   this.getPage(editorInstance)
    // },
  }
}
</script>

<style scoped>

</style>
