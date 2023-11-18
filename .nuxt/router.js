import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _10bad6b2 = () => interopDefault(import('..\\pages\\a.vue' /* webpackChunkName: "pages/a" */))
const _4840c2b8 = () => interopDefault(import('..\\pages\\chart.vue' /* webpackChunkName: "pages/chart" */))
const _624506ca = () => interopDefault(import('..\\pages\\index2.vue' /* webpackChunkName: "pages/index2" */))
const _43ea38cc = () => interopDefault(import('..\\pages\\indicator.js' /* webpackChunkName: "pages/indicator" */))
const _6860a073 = () => interopDefault(import('..\\pages\\indicator\\all.js' /* webpackChunkName: "pages/indicator/all" */))
const _638965ee = () => interopDefault(import('..\\pages\\klinechart.vue' /* webpackChunkName: "pages/klinechart" */))
const _5dd3c3dc = () => interopDefault(import('..\\pages\\klinechart copy.vue' /* webpackChunkName: "pages/klinechart copy" */))
const _2bfa6d98 = () => interopDefault(import('..\\pages\\overlay\\all.js' /* webpackChunkName: "pages/overlay/all" */))
const _4d7d5598 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _10bad6b2,
    name: "a"
  }, {
    path: "/chart",
    component: _4840c2b8,
    name: "chart"
  }, {
    path: "/index2",
    component: _624506ca,
    name: "index2"
  }, {
    path: "/indicator",
    component: _43ea38cc,
    name: "indicator",
    children: [{
      path: "all",
      component: _6860a073,
      name: "indicator-all"
    }]
  }, {
    path: "/klinechart",
    component: _638965ee,
    name: "klinechart"
  }, {
    path: "/klinechart%20copy",
    component: _5dd3c3dc,
    name: "klinechart copy"
  }, {
    path: "/overlay/all",
    component: _2bfa6d98,
    name: "overlay-all"
  }, {
    path: "/",
    component: _4d7d5598,
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
