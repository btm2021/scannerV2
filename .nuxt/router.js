import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _09f7ddbe = () => interopDefault(import('../pages/a.vue' /* webpackChunkName: "pages/a" */))
const _20da4e1e = () => interopDefault(import('../pages/chart.vue' /* webpackChunkName: "pages/chart" */))
const _86bf72e0 = () => interopDefault(import('../pages/index2.vue' /* webpackChunkName: "pages/index2" */))
const _0e9549e0 = () => interopDefault(import('../pages/indicator.js' /* webpackChunkName: "pages/indicator" */))
const _05c539cf = () => interopDefault(import('../pages/klinechart.vue' /* webpackChunkName: "pages/klinechart" */))
const _7d7ce2d6 = () => interopDefault(import('../pages/klinechart copy.vue' /* webpackChunkName: "pages/klinechart copy" */))
const _db0ff5dc = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/a",
    component: _09f7ddbe,
    name: "a"
  }, {
    path: "/chart",
    component: _20da4e1e,
    name: "chart"
  }, {
    path: "/index2",
    component: _86bf72e0,
    name: "index2"
  }, {
    path: "/indicator",
    component: _0e9549e0,
    name: "indicator"
  }, {
    path: "/klinechart",
    component: _05c539cf,
    name: "klinechart"
  }, {
    path: "/klinechart%20copy",
    component: _7d7ce2d6,
    name: "klinechart copy"
  }, {
    path: "/",
    component: _db0ff5dc,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
