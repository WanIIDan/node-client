<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body {
    background: #f1f1f1;
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .w1170 {
    width: 1170px;
    margin: 0 auto;
  }

  .mb30 {
    margin-bottom: 30px;
  }

  .clearfix::after {
    content: '';
    display: block;
    clear: both;
    width: 0;
    height: 0;
  }

  .img {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
