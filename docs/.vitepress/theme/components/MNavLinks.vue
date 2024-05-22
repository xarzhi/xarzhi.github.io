<script setup>
import { computed } from 'vue'
import { slugify } from '@mdit-vue/shared'

import MNavLink from './MNavLink.vue'
// import type { NavLink } from '../untils/types'

const props = defineProps(['title','items','noIcon'])

const formatTitle = computed(() => {
	return slugify(props.title)
})
</script>

<template>
	<span>
		<h2 v-if="title" :id="formatTitle" tabindex="-1">
			{{ title }}
			<a class="header-anchor" :href="`#${formatTitle}`" aria-hidden="true"></a>
		</h2>
		<div class="m-nav-links">
			<MNavLink v-for="item in items" :noIcon="noIcon" v-bind="item" :key="item.text" />
		</div>
	</span>
</template>

<style lang="scss" scoped>
.m-nav-links {
	--m-nav-gap: 10px;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
	grid-row-gap: var(--m-nav-gap);
	grid-column-gap: var(--m-nav-gap);
	grid-auto-flow: row dense;
	justify-content: center;
	margin-top: var(--m-nav-gap);
}

@each $media, $size in (500px: 140px, 640px: 155px, 768px: 175px, 960px: 200px, 1440px: 240px) {
	@media (min-width: $media) {
		.m-nav-links {
			grid-template-columns: repeat(auto-fill, minmax($size, 1fr));
		}
	}
}

@media (min-width: 960px) {
	.m-nav-links {
		--m-nav-gap: 20px;
	}
}
</style>
