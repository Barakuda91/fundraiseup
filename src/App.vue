<template>
  <div id="app">
    <section id="cover">
      <div class="container" v-if="params.currencies">
        <div class="generalForm">
          <div class="row form-block">
            <div class="col-4" v-for="preset of params.presets">
              <button
                class="btn donate"
                v-bind:rate="preset"
                v-on:click="chooseRate"
                v-bind:class="{'btn-primary': preset == rate, 'btn-light': preset != rate}"
              >{{params.currencies[currencyId].symbol}}{{$n(preset, 'currency')}}</button>
            </div>
          </div>
          <div class="row form-block">
            <div class="col-12">
              <div class="input-group">
                <input type="text" class="form-control" :value="rate" @input="inputRate">
                <div class="input-group-append">
                  <b-dropdown v-bind:text="params.currencies[0].code">
                    <div v-for="(currency, index) of params.currencies">
                      <b-dropdown-item
                        v-on:click="chooseCurrency"
                        v-bind:currencyId="index">
                          {{currency.code}}
                      </b-dropdown-item>
                    </div>
                  </b-dropdown>
                </div>
              </div>
            </div>
          </div>
          <div class="row form-block">
            <div class="col-12">
              <button class="btn btn-primary donate" v-on:click="sendDonate">
                DONATE
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: 'app',
    computed: mapGetters(['params', 'currencyId', 'rate']),
    methods: {
      ...mapActions(['fetchParams', 'chooseRate', 'chooseCurrency', 'inputRate', 'sendDonate'])
    },
    async mounted () {
      this.fetchParams();
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .container{
    padding: 0px 340px;
  }
  .donate{
    width: 100%;
    min-width: 80px;
    margin: 5px;
    box-shadow: 0 2px 3px rgba(112, 112, 112, 0.56);
  }
  .generalForm{
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  .form-block{
    margin: 20px;
  }
</style>
