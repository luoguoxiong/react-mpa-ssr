import { Controller, RequestMapping, JspRender } from '../decorator'

@Controller
class Admin {
  @RequestMapping({ method: 'get', url: '/' })
  @JspRender({ title: '首页' })
  async home (ctx, next) {
    await next()
    ctx.initModel = { goods: [1, 2, 3, 5, 6] }
  }

  @RequestMapping({ method: 'get', url: '/user' })
  @JspRender({ title: '我的页' })
  async user (ctx, next) {
    await next()
    ctx.initModel = { userId: 4 }
  }

  @RequestMapping({ method: 'get', url: '/detail' })
  @JspRender({ title: '详情页' })
  async test (ctx, next) {
    await next()
    ctx.initModel = { user: 10 }
  }

  @RequestMapping({ method: 'get', url: '/goods' })
  @JspRender({ title: 'goods页' })
  async goods (ctx, next) {
    await next()
    ctx.initModel = { info: { a: 2, b: 4 } }
  }
}
export default Admin
