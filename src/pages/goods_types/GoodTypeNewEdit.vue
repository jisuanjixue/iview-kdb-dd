<template>
  <div v-if="goodsType">
    <div class="form-title">
      <h3>{{formTitle}}</h3>
    </div>
    <Form :model="goodsType" :label-width="100" ref="goodsType" :rules="ruleInline">
      <FormItem label="货品类型名" prop="name">
        <Input v-model="goodsType.name" placeholder="请填写货品类型名称"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('goodsType')">提交</Button>
        <Button type="ghost" style="margin-left: 8px" @click="back">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      goodsType: {
        name: ''
      },
      ruleInline: {
        name: [
          { required: true, message: '请填写进货货品类型名', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    if (this.$route.name === 'GoodTypeNew') {
      this.formTitle = '新建货品类型'
    } else {
      this.formTitle = '编辑货品类型'
      this.$http.get('/admin/goods_types/' + this.$route.params.id).then((res) => {
        this.goodsType = res.data.goods_type
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
      if (this.$route.name === 'GoodTypeNew') {
        this.$http.post('/admin/goods_types', {goods_type: this.goodsType}).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('新建成功！')
          } else {
            this.$Message.error(res.data.notice)
          }
          this.$router.go(-1)
        })
      } else {
        this.$http.put('/admin/goods_types/' + this.$route.params.id, this.goodsType).then((res) => {
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