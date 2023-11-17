<template>
  <div>
    <div>
      <!-- As a heading -->
      <b-navbar variant="faded" type="light">
        <b-navbar-brand tag="h1" class="mb-0">Nacy</b-navbar-brand>
      </b-navbar>
    </div>
    <div style="padding:5px">
      <b-row>
        <b-col cols="6">
          <iframe src="/a" style="width: 100%" height="600" exchange="binance">
          </iframe>
        </b-col>
        <b-col cols="6">
          <iframe src="/a" style="width: 100%" height="600" exchange="binance">
          </iframe>
        </b-col>
        <b-col cols="6">
          <iframe src="/a" style="width: 100%" height="600" exchange="binance">
          </iframe>
        </b-col>
        <b-col cols="6">
          <iframe src="/a" style="width: 100%" height="600" exchange="binance">
          </iframe>
        </b-col>
        <b-col cols="12">
          <iframe src="/chart" style="width: 100%" height="600" exchange="binance">
          </iframe>
        </b-col>
      </b-row>
     
    </div>
  </div>
</template>

<script>
import liteChart from '~/components/liteChart.vue';
export default {
  components: { liteChart },};
</script>

<style>
</style>