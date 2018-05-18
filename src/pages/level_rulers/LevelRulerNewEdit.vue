<template>
  <div v-if="level_ruler">
    <div class="form-title">
      <h3>{{formTitle}}</h3>
    </div>
    <Form :model="level_ruler" :label-width="100" ref="level_ruler" :rules="ruleInline">
      <FormItem label="等级名称" prop="name">
        <Input v-model="level_ruler.name" placeholder="例如:黄钻"></Input>
      </FormItem>
      <FormItem label="等级排位" prop="rank">
        <Input v-model="level_ruler.desc" placeholder="请填写排位"></Input>
      </FormItem>
      <FormItem label="等级所需分数" prop="value">
        <Input v-model="level_ruler.value" placeholder="请填写所需分数"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('level_ruler')">提交</Button>
        <Button type="ghost" style="margin-left: 8px" @click="back">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      level_ruler: {
        name: '',
        rank: '',
        value: ''
      },
      ruleInline: {
        name: [
          { required: true, message: '请填写关键字', trigger: 'blur' }
        ],
        rank: [
          { required: true, message: '请填写回复内容', trigger: 'blur' }
        ],
        value: [
          { required: true, message: '请填写回复内容', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    if (this.$route.name === 'LevelRulerNew') {
      this.formTitle = '新建关键字回复'
    } else {
      this.formTitle = '编辑关键字回复'
      this.$http.get('/admin/level_rulers/' + this.$route.params.id).then((res) => {
        this.level_ruler= res.data.level_ruler
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
      if (this.$route.name === 'LevelRulerNew') {
        this.$http.post('/admin/level_rulers', {level_ruler: this.level_ruler}).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('新建成功！')
          } else {
            this.$Message.error(res.data.notice)
          }
          this.$router.go(-1)
        })
      } else {
        this.$http.put('/admin/level_rulers/' + this.$route.params.id, this.level_ruler).then((res) => {
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