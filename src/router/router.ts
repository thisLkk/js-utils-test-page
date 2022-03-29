const routes = [
	{
		// 重定向和2不同之处
		path: '/:pathMatch(.*)*',
		name: 'notFound',
		redirect: '/',
	},
	{
		path: '/',
		name: 'index',
		component: () => import("@/views/index/index.vue")
	},
	{
		path: '/demo',
		name: 'demo',
		component: () => import("@/views/demo/index.vue")
	},
	{
		path: '/shader-park-core',
		name: '着色器',
		component: () => import("@/views/shader-park-core/index.vue")
	},
	{
		path: '/css-demo',
		name: 'css未来的新属性',
		component: () => import("@/views/css-demo/index.vue")
	},
	{
		path: '/axios-demo',
		name: 'axios功能',
		component: () => import("@/views/axios-demo/index.vue")
	},
]
export default routes
