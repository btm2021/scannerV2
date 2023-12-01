import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _10bad6b2 = () => interopDefault(import('..\\pages\\a.vue' /* webpackChunkName: "pages/a" */))
const _0064fbbd = () => interopDefault(import('..\\pages\\analyze.js' /* webpackChunkName: "pages/analyze" */))
const _4840c2b8 = () => interopDefault(import('..\\pages\\chart.vue' /* webpackChunkName: "pages/chart" */))
const _9dc16674 = () => interopDefault(import('..\\pages\\chess.vue' /* webpackChunkName: "pages/chess" */))
const _43ea38cc = () => interopDefault(import('..\\pages\\indicator.js' /* webpackChunkName: "pages/indicator" */))
const _6860a073 = () => interopDefault(import('..\\pages\\indicator\\all.js' /* webpackChunkName: "pages/indicator/all" */))
const _638965ee = () => interopDefault(import('..\\pages\\klinechart.vue' /* webpackChunkName: "pages/klinechart" */))
const _1ed557a0 = () => interopDefault(import('..\\pages\\smc.js' /* webpackChunkName: "pages/smc" */))
const _2bfa6d98 = () => interopDefault(import('..\\pages\\overlay\\all.js' /* webpackChunkName: "pages/overlay/all" */))
const _54d549ee = () => interopDefault(import('..\\pages\\util\\autoTrendLine.js' /* webpackChunkName: "pages/util/autoTrendLine" */))
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
    path: "/analyze",
    component: _0064fbbd,
    name: "analyze"
  }, {
    path: "/chart",
    component: _4840c2b8,
    name: "chart"
  }, {
    path: "/chess",
    component: _9dc16674,
    name: "chess"
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
    path: "/smc",
    component: _1ed557a0,
    name: "smc"
  }, {
    path: "/overlay/all",
    component: _2bfa6d98,
    name: "overlay-all"
  }, {
    path: "/util/autoTrendLine",
    component: _54d549ee,
    name: "util-autoTrendLine"
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
