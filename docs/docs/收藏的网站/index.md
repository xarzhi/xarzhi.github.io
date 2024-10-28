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

# 我的导航

本导航参照[@茂茂导航](https://notes.fe-mm.com/nav)
<MNavLinks v-for="{title, items} in data" :title="title" :items="items" :key="title" />
