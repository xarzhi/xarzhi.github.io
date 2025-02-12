---
layout: doc
layoutClass: m-nav-layout
sidebar: false
prev: false
next: false
outline: 2
---

<link rel="stylesheet" href="/.vitepress/theme/style/nav.scss"></link>

<script setup>
import  {NAV_DATA}  from '/.vitepress/theme/utils/data'
import {ref} from 'vue'
const data=ref(NAV_DATA)
</script>

# 常用网址导航
本导航借鉴：[@茂茂导航](https://github.com/maomao1996/vitepress-nav-template)
<MNavLinks v-for="{title, items} in data" :title="title" :items="items" :key="title" />
