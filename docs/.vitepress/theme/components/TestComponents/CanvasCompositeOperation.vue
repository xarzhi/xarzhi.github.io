<template>
	<div class="demo">
		<div class="head">
			<el-select @change="handleCompositeOperationChange" v-model="compositeOperation">
				<el-option
					v-for="item in compositeOperationAndDescription"
					:key="item.value"
					:label="item.value"
					:value="item.value"
				/>
			</el-select>

			<div class="cate">
				<div class="target_body">
					<div class="box"></div>
					<div class="desc">目标图像</div>
				</div>
				<div class="source_body">
					<div class="box"></div>
					<div class="desc">源图像</div>
				</div>
			</div>
		</div>
		<canvas ref="canvasRef"></canvas>
		<div class="description">{{ compositeOperation }}：{{ description }}</div>
	</div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue'
const compositeOperation = ref('source-over')
const canvasRef = ref(null)
const ctx = ref(null)
const description = ref('新的图像将覆盖在旧图像上。')

const compositeOperationAndDescription = reactive([
	{ value: 'source-over', description: '新的图像将覆盖在旧图像上。' },
	{ value: 'source-in', description: '源图像仅在目标图像的交集部分绘制。如果源图像与目标图像没有重叠，则不会绘制' },
	{
		value: 'source-out',
		description: '源图像在目标图像之外的部分绘制。也就是说，只有在目标图像中没有的区域才会显示源图像',
	},
	{
		value: 'source-atop',
		description:
			'源图像绘制在目标图像上，但只有在目标图像的覆盖区域内进行绘制。目标图像的部分会显示在源图像的下方，其他部分则只显示源图像。',
	},
	{
		value: 'destination-over',
		description: '目标图像绘制在源图像的下方。这种模式下，只有目标图像的那些部分不透明的地方会显示源图像',
	},
	{
		value: 'destination-in',
		description: '目标图像仅在源图像的交集部分显示。若目标图像没有与源图像重叠，则不会显示任何图像。',
	},
	{
		value: 'destination-out',
		description: '从目标图像中去除与源图像重叠的部分。源图像起到“擦除”目标图像中重叠部分的作用。',
	},
	{
		value: 'destination-atop',
		description: '目标图像在源图像的上方绘制，但仅在源图像的覆盖区域内进行绘制。其他部分则不受影响。',
	},
	{ value: 'lighter', description: '源图像与目标图像相加，产生更亮的颜色效果。叠加的颜色会更亮，但不会超过白色。' },
	{ value: 'copy', description: '直接使用源图像的颜色，目标图像的内容会被完全覆盖。这是一种简单的复制操作。' },
	{ value: 'xor', description: '仅绘制源图像和目标图像的不重叠部分。因此，重叠部分会被忽略。' },
	{
		value: 'multiply',
		description: '源图像的颜色与目标图像的颜色相乘会得到较暗的效果。通常适用于创建阴影效果，特别是在重叠区域。',
	},
	{
		value: 'screen',
		description: '源图像的颜色与目标图像的颜色相乘，然后反转，以产生较亮的效果。适合增强灯光效果。',
	},
	{
		value: 'overlay',
		description: '当目标图像亮度小于0.5时使用乘法模式；当大于0.5时使用屏幕模式。综合了两种方式，适合创建对比效果。',
	},
	{
		value: 'darken',
		description: '在源图像和目标图像中选择较暗的颜色，从而针对细节部分进行调整，创造更深的视觉效果。',
	},
	{ value: 'lighten', description: '在源图像和目标图像中选择较亮的颜色，适合用于突出明亮的区域。' },
	{
		value: 'color-dodge',
		description: '使目标图像的颜色变得更亮，依据源图像的颜色进行增强。这种模式会使颜色变得更亮。',
	},
	{
		value: 'color-burn',
		description: '使目标图像的颜色变得更暗，根据源图像的颜色进行处理。这种模式会增加目标图像的深度。',
	},
	{ value: 'hard-light', description: '源图像根据其亮度影响目标图像。亮度小于0.5则使用乘法模式，反之则使用屏幕模式' },
	{
		value: 'soft-light',
		description: '类似于 hard-light，但是效果更柔和。它可以调和阴影与高光的效果，产生柔和的光照效果。',
	},
	{ value: 'difference', description: '源图像和目标图像的颜色相减，结果产生高对比的效果。适合用于创造艺术效果。' },
	{ value: 'exclusion', description: '源图像和目标图像的颜色相减，结果产生高对比的效果。适合用于创造艺术效果。' },
	{ value: 'hue', description: '根据源图像的色调来调整目标图像的色调，保持原图像的亮度和饱和度' },
	{ value: 'saturation', description: '根据源图像的饱和度来调整目标图像的饱和度，而不改变目标图像的色调。' },
	{ value: 'color', description: '把源图像的色调和饱和度应用到目标图像上，效果是同时在目标图像中改变色调和饱和度。' },
	{ value: 'luminosity', description: '根据源图像的亮度调整目标图像的亮度，保持目标图像的色调和饱和度不变。' },
])

const handleCompositeOperationChange = e => {
	draw(ctx.value)
	description.value = compositeOperationAndDescription.find(item => item.value === e).description
}

const draw = ctx => {
	ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
	ctx.save()
	ctx.translate(400 / 2, 200 / 2)
	ctx.fillStyle = 'red'
	ctx.beginPath()
	ctx.arc(-40, 20, 80, 0, Math.PI * 2, true)
	ctx.closePath()
	ctx.fill()
	ctx.globalCompositeOperation = compositeOperation.value

	ctx.fillStyle = 'orange'
	ctx.beginPath()
	ctx.arc(40, 20, 80, 0, Math.PI * 2, true)
	ctx.closePath()
	ctx.fill()
	ctx.restore()
}

onMounted(() => {
	const canvas = canvasRef?.value
	ctx.value = canvas.getContext('2d')
	canvas.width = 400
	canvas.height = 280
	draw(ctx.value)
})
</script>

<style lang="scss" scoped>
.demo {
	padding: 20px;
	box-sizing: border-box;
	width: 600px;
	border-radius: 5px;
	.head {
		display: flex;
		justify-content: space-between;
		.cate {
			.target_body {
				display: flex;
				align-items: center;
				.box {
					width: 20px;
					height: 20px;
					background-color: red;
					border-radius: 50%;
					margin-right: 10px;
				}
			}
			.source_body {
				align-items: center;
				display: flex;
				.box {
					width: 20px;
					height: 20px;
					background-color: orange;
					border-radius: 50%;
					margin-right: 10px;
				}
			}
		}
	}
}
.el-select {
	width: 200px;
}
canvas {
	margin-top: 10px;
}
</style>
