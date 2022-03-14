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
	}
]
export default routes
