<template>
  <div v-if="keyWord">
    <div class="form-title">
      <h3>{{formTitle}}</h3>
    </div>
    <Form :model="keyWord" :label-width="100" ref="keyWord" :rules="ruleInline">
      <FormItem label="关键字" prop="word">
        <Input v-model="keyWord.word" placeholder="例如:客服电话"></Input>
      </FormItem>
      <FormItem label="关键字" prop="content">
        <Input v-model="keyWord.content" placeholder="例如:感谢关注!我们的客服电话是0991-1234567"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('keyWord')">提交</Button>
        <Button type="ghost" style="margin-left: 8px" @click="back">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keyWord: {
        name: '',
        content: ''
      },
      ruleInline: {
        word: [
          { required: true, message: '请填写关键字', trigger: 'blur' }
        ],
        content: [
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
      this.$http.get('/admin/key_words/' + this.$route.params.id).then((res) => {
        this.keyWord = res.data.keyWord
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
        this.$http.post('/admin/key_words', {keyWord: this.keyWord}).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('新建成功！')
          } else {
            this.$Message.error(res.data.notice)
          }
          this.$router.push('/admin/key_words')
        })
      } else {
        this.$http.put('/admin/key_words/' + this.$route.params.id, this.keyWord).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('修改成功！')
          } else {
            this.$Message.error(res.data.notice)
          }
          this.$router.push('/admin/key_words')
        })
      }
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>