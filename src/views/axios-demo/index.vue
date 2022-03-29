<script setup lang="ts">
import { Button } from 'vant'
import axios from '@/lib/axios'

const api = 'https://zapi.zhuanspirit.com/mock/761/zzopen/hunterpub/uidIdentityInfo'

const getHandle = (keys: string) => {
  axios.get(api, {
    params:{
      keys,
      cancelType: 1
    },
  })
  .then((response) => {
    console.log('#####response', response);
  })
  .catch((err) => {
    console.log('#####err', err);
  });
}
const postHandle = (keys: string) => {
  axios.post(api, {
    keys,
    cancelType: 1
  },
  )
  .then((response) => {
    console.log('#####response-post', response);
  })
  .catch((err) => {
    console.log('#####err-post', err);
  });
}


const btnClick = () => {
  getHandle('hunter-m-config1')
  // postHandle('hunter-m-config')
  getHandle('hunter-m-config')
  // getHandle('hunter-m-config2')
  // getHandle('hunter-m-config3')
}



</script>

<template>
  <div class="axios">
    <Button type="primary" size="small" @click="btnClick">发送请求</Button>
  </div>
</template>

<style lang="scss" scoped>
.axios {
  padding: 32px;
  box-sizing: border-box;
}
</style>
