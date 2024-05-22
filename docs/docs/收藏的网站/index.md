---
layout: doc
layoutClass: m-nav-layout
sidebar: false
prev: false
next: false
---
<style src="/.vitepress/theme/style/nav.scss"></style>

<script setup>
import  {NAV_DATA}  from '/.vitepress/theme/utils/data'
import {ref} from 'vue'
const data=ref(NAV_DATA)
</script>

# 我的导航
<MNavLinks v-for="{title, items} in data" :title="title" :items="items" :key="title" />
