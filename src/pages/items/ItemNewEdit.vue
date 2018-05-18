<template>
  <div v-if="item">
    <div class="form-title">
      <h3>{{formTitle}}</h3>
    </div>
    <Form :model="item" :label-width="100" ref="item" :rules="ruleInline">
      <FormItem label="商品名称" prop="name">
        <Input v-model="item.name" placeholder="例如:工具箱"></Input>
      </FormItem>
      <FormItem label="商品描述" prop="desc">
        <Input v-model="item.desc" placeholder="例如:工具箱6件套"></Input>
      </FormItem>
      <FormItem label="商品描述" prop="desc">
        <Input v-model="item.desc" placeholder="例如:工具箱6件套"></Input>
      </FormItem>
      <FormItem label="商品描述" prop="exchange">
        <Input v-model="item.exchange" placeholder="30"></Input>
      </FormItem>
      <FormItem label="可兑换数量" prop="count_all">
        <Input v-model="item.count_all" placeholder="请填写兑换数量"></Input>
      </FormItem>
      <FormItem label="用户可兑换数量" prop="count_per_user">
        <Input v-model="item.count_per_user" placeholder="请填写用户可兑换数量"></Input>
      </FormItem>
      <FormItem label="宣传图" prop="img">
        <Input v-model="item.img" placeholder="请上传图片"></Input>
      </FormItem>
      <FormItem label="内容" prop="content">
        <Input v-model="item.content" placeholder="请填写内容"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('item')">提交</Button>
        <Button type="ghost" style="margin-left: 8px" @click="back">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      item: {
        name: '',
        desc: '',
        exchange: '',
        count_all: '',
        count_per_user: '',
        img: '',
        content: ''
      },
      ruleInline: {
        name: [
          { required: true, message: '请填写关键字', trigger: 'blur' }
        ],
        count_all: [
          { required: true, message: '请填写回复内容', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    if (this.$route.name === 'ItemNew') {
      this.formTitle = '新建关键字回复'
    } else {
      this.formTitle = '编辑关键字回复'
      this.$http.get('/admin/items/' + this.$route.params.id).then((res) => {
        this.item = res.data.item
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
      if (this.$route.name === 'itemNew') {
        this.$http.post('/admin/items', {item: this.item}).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('新建成功！')
          } else {
            this.$Message.error(res.data.notice)
          }
          this.$router.go(-1)
        })
      } else {
        this.$http.put('/admin/items/' + this.$route.params.id, this.item).then((res) => {
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