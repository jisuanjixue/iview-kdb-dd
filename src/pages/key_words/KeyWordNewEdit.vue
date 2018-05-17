<template>
  <div v-if="keyword">
    <div class="form-title">
      <h3>{{formTitle}}</h3>
    </div>
    <Form :model="keyword" :label-width="100" ref="keyword" :rules="ruleInline">
      <FormItem label="关键字" prop="keyword">
        <Input v-model="keyword.word" placeholder="例如:客服电话"></Input>
      </FormItem>
      <FormItem label="回复内容" prop="reply">
        <Input v-model="keyword.reply" placeholder="例如:感谢关注!我们的客服电话是0991-1234567"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('keyword')">提交</Button>
        <Button type="ghost" style="margin-left: 8px" @click="back">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keyword: {
        word: '',
        reply: ''
      },
      ruleInline: {
        word: [
          { required: true, message: '请填写关键字', trigger: 'blur' }
        ],
        reply: [
          { required: true, message: '请填写回复内容', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    if (this.$route.name === 'KeyWordNew') {
      this.formTitle = '新建关键字回复'
    } else {
      this.formTitle = '编辑关键字回复'
      this.$http.get('/admin/keywords/' + this.$route.params.id).then((res) => {
        this.keyword = res.data.keyword
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
      if (this.$route.name === 'KeyWordNew') {
        this.$http.post('/admin/keywords', {keyword: this.keyword}).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('新建成功！')
          } else {
            this.$Message.error(res.data.notice)
          }
          this.$router.go(-1)
        })
      } else {
        this.$http.put('/admin/keywords/' + this.$route.params.id, this.keyword).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('修改成功！')
          } else {
            this.$Message.error(res.data.notice)
          }
          this.$router.go(-1)
        })
      }
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>