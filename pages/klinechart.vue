<template>
  
  <b-container fluid>
    <b-overlay :show="!dataReady">
      <template #overlay>
        <div class="text-center">
        
          <div class="text-center">
            <b-icon variant="warning" icon="arrow-clockwise" animation="spin" font-scale="2"></b-icon>
            <p>Chờ xíu bạn...</p>
         
        </div>
        </div>
      </template>
      <b-row class="no-gutters">
      <b-col sm="12" lg="9">
        <div id="chart" style="width: 100%; height: 600px; background-color:#171b26; 
          
            " />
      </b-col>
      <b-col sm="12" lg="3">
        <b-row class="no-gutters">
          <b-col cols="2">
            <b-button-group vertical>
              <b-button class="myBtn" @click="createOverLay('rule')" size="sm">
                <span class="icon-KTgbfaP5"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28">
                    <path fill="currentColor"
                      d="M2 9.75a1.5 1.5 0 0 0-1.5 1.5v5.5a1.5 1.5 0 0 0 1.5 1.5h24a1.5 1.5 0 0 0 1.5-1.5v-5.5a1.5 1.5 0 0 0-1.5-1.5zm0 1h3v2.5h1v-2.5h3.25v3.9h1v-3.9h3.25v2.5h1v-2.5h3.25v3.9h1v-3.9H22v2.5h1v-2.5h3a.5.5 0 0 1 .5.5v5.5a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-5.5a.5.5 0 0 1 .5-.5z"
                      transform="rotate(-45 14 14)"></path>
                  </svg></span>
              </b-button>
              <b-button @click="createOverLay('priceLine')" class="myBtn" size="sm">
                <span class="icon-KTgbfaP5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28"
                    height="28">
                    <g fill="currentColor" fill-rule="nonzero">
                      <path d="M8.5 15h16.5v-1h-16.5z"></path>
                      <path
                        d="M6.5 16c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z">
                      </path>
                    </g>
                  </svg></span>
              </b-button>

              <b-button @click="createOverLay('fibonacciLine')" class="myBtn" size="sm">
                <span class="icon-KTgbfaP5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28"
                    height="28">
                    <g fill="currentColor" fill-rule="nonzero">
                      <path d="M3 5h22v-1h-22z"></path>
                      <path d="M3 17h22v-1h-22z"></path>
                      <path d="M3 11h19.5v-1h-19.5z"></path>
                      <path d="M5.5 23h19.5v-1h-19.5z"></path>
                      <path
                        d="M3.5 24c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM24.5 12c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z">
                      </path>
                    </g>
                  </svg></span>
              </b-button>
              <b-button @click="createOverLay('rect')" class="myBtn">
                <span class="icon-KTgbfaP5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28"
                    height="28">
                    <g fill="currentColor" fill-rule="nonzero">
                      <path d="M7.5 6h13v-1h-13z" id="Line"></path>
                      <path d="M7.5 23h13v-1h-13z"></path>
                      <path d="M5 7.5v13h1v-13z"></path>
                      <path d="M22 7.5v13h1v-13z"></path>
                      <path
                        d="M5.5 7c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM22.5 7c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM22.5 24c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM5.5 24c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z">
                      </path>
                    </g>
                  </svg></span>
              </b-button>
              <b-button @click="createOverLay('plan')" class="myBtn">
                <span class="icon-KTgbfaP5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g fill="currentColor"><path fill-rule="nonzero" d="M6.5 23v1h17.5v-17.5h-1v16.5z"></path><path fill-rule="nonzero" d="M21.5 5v-1h-17.5v17.5h1v-16.5z"></path><path fill-rule="nonzero" d="M4.5 25c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM23.5 6c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"></path><path fill-rule="nonzero" d="M13 9v13h1v-13z" id="Line"></path><path d="M13.5 6l2.5 3h-5z"></path><path fill-rule="nonzero" d="M19 14h-13v1h13z"></path><path d="M19 17v-5l3 2.5z"></path></g></svg></span>
            
                </b-button>
              <b-button @click="createOverLay('priceChannelLine')" class="myBtn">
                <span class="icon-KTgbfaP5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g fill="currentColor" fill-rule="nonzero"><path d="M8.354 18.354l10-10-.707-.707-10 10zM12.354 25.354l5-5-.707-.707-5 5z"></path><path d="M20.354 17.354l5-5-.707-.707-5 5z"></path><path d="M19.5 8c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM6.5 21c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM18.5 20c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"></path></g></svg></span>
              </b-button>
              <b-button @click="createOverLay('anyWaves')" class="myBtn">
                <span class="icon-KTgbfaP5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><path fill="currentColor" d="M11 10.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm4 7a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm11-8.8V13h1V7h-6v1h4.3l-7.42 7.41a2.49 2.49 0 0 0-2.76 0l-3.53-3.53a2.5 2.5 0 1 0-4.17 0L1 18.29l.7.71 6.42-6.41a2.49 2.49 0 0 0 2.76 0l3.53 3.53a2.5 2.5 0 1 0 4.17 0z"></path></svg></span>
              </b-button>
              <b-button @click="createOverLay('triangle')" class="myBtn">
                <span class="icon-KTgbfaP5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g fill="currentColor" fill-rule="nonzero"><path d="M8.5 23h11v-1h-11zM6 8.5v12h1v-12zM7.483 8.28l12.293 13.112.73-.684-12.293-13.112z"></path><path d="M6.5 8c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM6.5 24c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM21.5 24c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"></path></g></svg></span>
              </b-button>
              <b-button @click="createOverLay('segment')" class="myBtn">
                <span class="icon-KTgbfaP5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g fill="currentColor" fill-rule="nonzero"><path d="M7.354 21.354l14-14-.707-.707-14 14z"></path><path d="M22.5 7c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM5.5 24c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"></path></g></svg></span>
              </b-button>
              <b-button class="myBtn"  v-b-modal.modal-calc>
                <span class="iconContainer-dmpvVypS"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M16.62 11.48c1.08-.56 1.77-1.54 1.61-3.18-.2-2.24-2.05-2.99-4.49-3.2V2h-1.9v3.02c-.48 0-.99 0-1.5.02V2H8.46v3.1c-.7.02-1.5.01-3.8 0v2.02c1.5-.03 2.28-.12 2.46.84v8.5c-.12.75-.72.64-2.08.62l-.38 2.25 3.8.01V22h1.9v-2.62l1.5.01V22h1.9v-2.66c3.17-.17 5.3-.97 5.58-3.96.22-2.4-.92-3.47-2.71-3.9Zm-6.24-4.22c1.07 0 4.42-.34 4.42 1.9 0 2.12-3.35 1.87-4.42 1.87V7.26Zm0 9.83v-4.16c1.28 0 5.2-.36 5.2 2.08 0 2.35-3.92 2.08-5.2 2.08Z"></path></svg></span>
              </b-button>
            
              <b-button @click="createOverLay('makeLong')" class="myBtn">
                <span class="icon-KTgbfaP5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28" fill="none"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M4.5 5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2 6.5A2.5 2.5 0 0 1 6.95 6H24v1H6.95A2.5 2.5 0 0 1 2 6.5zM4.5 15a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2 16.5a2.5 2.5 0 0 1 4.95-.5h13.1a2.5 2.5 0 1 1 0 1H6.95A2.5 2.5 0 0 1 2 16.5zM22.5 15a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-18 6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2 22.5a2.5 2.5 0 0 1 4.95-.5H24v1H6.95A2.5 2.5 0 0 1 2 22.5z"></path><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M22.4 8.94l-1.39.63-.41-.91 1.39-.63.41.91zm-4 1.8l-1.39.63-.41-.91 1.39-.63.41.91zm-4 1.8l-1.4.63-.4-.91 1.39-.63.41.91zm-4 1.8l-1.4.63-.4-.91 1.39-.63.41.91z"></path></svg></span>
              </b-button>

              <b-button @click="createOverLay('makeShort')" class="myBtn">
                <span class="icon-KTgbfaP5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28" fill="none"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M4.5 24a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM2 22.5a2.5 2.5 0 0 0 4.95.5H24v-1H6.95a2.5 2.5 0 0 0-4.95.5zM4.5 14a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM2 12.5a2.5 2.5 0 0 0 4.95.5h13.1a2.5 2.5 0 1 0 0-1H6.95a2.5 2.5 0 0 0-4.95.5zM22.5 14a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-18-6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM2 6.5a2.5 2.5 0 0 0 4.95.5H24V6H6.95A2.5 2.5 0 0 0 2 6.5z"></path><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M22.4 20.06l-1.39-.63-.41.91 1.39.63.41-.91zm-4-1.8l-1.39-.63-.41.91 1.39.63.41-.91zm-4-1.8l-1.4-.63-.4.91 1.39.63.41-.91zm-4-1.8L9 14.03l-.4.91 1.39.63.41-.91z"></path></svg></span>
              </b-button>
              
              <b-button class="myBtn" v-b-modal.modal-indicator>
                <span class="icon-jFqVJoPk"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28"
                    height="28">
                    <g fill="currentColor" fill-rule="nonzero">
                      <path
                        d="M23.868 7.825c2.791 3.916 2.918 9.33-.065 13.435-3.733 5.138-10.925 6.277-16.063 2.544l.721-.714c4.682 3.294 11.157 2.229 14.534-2.418 2.641-3.635 2.657-8.502.153-12.133l.721-.714z">
                      </path>
                      <path
                        d="M8.477 5.899c3.584-2.509 8.298-2.514 11.865-.127l.718-.721c-3.845-2.669-9.099-2.813-13.157.028-5.203 3.643-6.467 10.814-2.824 16.016l.718-.721c-3.201-4.737-2.022-11.185 2.68-14.476z">
                      </path>
                      <path
                        d="M14.5 22c4.142 0 7.5-3.358 7.5-7.5 0-4.142-3.358-7.5-7.5-7.5-4.142 0-7.5 3.358-7.5 7.5 0 4.142 3.358 7.5 7.5 7.5zm0 1c-4.694 0-8.5-3.806-8.5-8.5s3.806-8.5 8.5-8.5 8.5 3.806 8.5 8.5-3.806 8.5-8.5 8.5z">
                      </path>
                      <path
                        d="M14.5 19c2.485 0 4.5-2.015 4.5-4.5s-2.015-4.5-4.5-4.5-4.5 2.015-4.5 4.5 2.015 4.5 4.5 4.5zm0 1c-3.038 0-5.5-2.462-5.5-5.5s2.462-5.5 5.5-5.5 5.5 2.462 5.5 5.5-2.462 5.5-5.5 5.5z">
                      </path>
                      <path
                        d="M22.5 8c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM6.5 24c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z">
                      </path>
                    </g>
                  </svg></span>
              </b-button>
            </b-button-group>
          </b-col>
          <b-col style="color:white" cols="4">
            <b-table style="color:white;font-size: 10px;text-align: center;" small  :items="tradeList" :fields="traderFileds" head-variant="light">
              <template #cell(time)="data">
        {{ $moment(data.item.time).format("HH:mm:ss") }}
      </template>
      <template #cell(price)="data">
      <span :class="(!data.item.isBuyerMaker)?'text-success':'text-danger'" >{{ data.item.price }}</span>
      </template>
            </b-table>
          </b-col>
        </b-row>
      </b-col>
    
      <b-modal id="modal-calc" title="calc">
        calc
      </b-modal>
      <b-modal scrollable id="modal-indicator" title="Indicator">
        <b-table :fields="fieldsIndicator" striped hover :items="listIndicator" small>
          <template #cell(name)="data">
            <b @click="addIndicator(data.item)" class="choiceIndicator">
              <span :class="data.item.isAdd ? 'text-primary' : 'text-secondary'">
                {{ data.item.value }}</span>
            </b>
          </template>
          <template #cell(calcParams)="data">

            <span v-if="data.item.isEdit">
           
              <b-input-group  size="sm" :prepend="data.item.calcParams.toString()" class="">
                <b-form-input  autocomplete="off" :ref='"ref_input_"+data.item.name' size="sm" :value="data.item.calcParams.toString()" ></b-form-input>
                <b-input-group-append  size="sm">
                  <b-button  size="sm" variant="success" @click="saveParam(data.item,'ref_input_'+data.item.name)">Save</b-button>
                </b-input-group-append>
              </b-input-group>
            </span>
            <span v-else>
              <b @click="data.item.isEdit=true" class="choiceIndicator" >
                {{ data.item.calcParams }}
              </b>
            </span>
          </template>
        </b-table>
      </b-modal>
    </b-row>
    </b-overlay>
    
  </b-container>
</template>
      
<script>
import * as klinecharts from "klinecharts";
import { rect, rule,plan,anyWaves,triangle } from './overlay/all.js'
import { myBot34, myBot89, donchianIndicator, zigzag, findHL, findHL1,linear } from './indicator/all.js'
const listOverLay = [rect, rule,plan,anyWaves,triangle]
const listIndicator = [linear,myBot34, myBot89, donchianIndicator, zigzag, findHL, findHL1]

// var smcIndicator1 = {
//   name: "SMC1",
//   shortName: "SMC1",
//   calcParams: [15, 2],
//   figures: [{ key: "HH", title: "HL: ", type: "text" }],
//   calc: (data, { calcParams }) => {
//     let lookback = calcParams[0];
//     let lastPivotHigh = null;
//     let lastPivotLow = null;
//     const pivots = { HH: [], HL: [], LL: [], LH: [] };

//     for (let i = lookback; i < data.length - lookback; i++) {
//       let isHH = true;
//       let isLL = true;
//       for (let j = 1; j <= lookback; j++) {
//         if (
//           data[i - j].high >= data[i].high ||
//           data[i + j].high >= data[i].high
//         ) {
//           isHH = false;
//         }
//         if (data[i - j].low <= data[i].low || data[i + j].low <= data[i].low) {
//           isLL = false;
//         }
//       }

//       if (isHH) {
//         pivots.HH.push({ index: i, value: data[i].high });
//       }
//       if (isLL) {
//         pivots.LL.push({ index: i, value: data[i].low });
//       }

//       // HL and LH are determined by comparing to previous HH and LL
//       if (i > 0) {
//         if (
//           data[i].low > data[i - 1].low &&
//           data[i - 1].low < pivots.LL[pivots.LL.length - 1]?.value
//         ) {
//           pivots.HL.push({ index: i, value: data[i].low });
//         }
//         if (
//           data[i].high < data[i - 1].high &&
//           data[i - 1].high > pivots.HH[pivots.HH.length - 1]?.value
//         ) {
//           pivots.LH.push({ index: i, value: data[i].high });
//         }
//       }
//     }

//     const figures = [];
//     console.log(pivots);

//     pivots.HH.forEach((pivot) => {
//       console.log(pivot);
//       figures.push({
//         HH: {
//           value: [
//             calculateXCoordinate(pivot.index, chartDimensions),
//             calculateYCoordinate(pivot.value, chartDimensions),
//           ],
//         },
//       });
//     });
//     return figures;
//   },
// };

// var smcIndicator = {
//   name: "SMC",
//   shortName: "SMC",
//   calcParams: [5], // default deviation for zigzag
//   figures: [
//     { key: "zigzag", title: "ZigZag", type: "line" },
//     { key: "bos", title: "BOS", type: "line" },
//     { key: "choch", title: "CHoCH", type: "line" },
//   ],
//   regenerateFigures: (params) => {
//     return [
//       { key: "zigzag", title: "ZigZag", type: "line" },
//       { key: "bos", title: "BOS", type: "line" },
//       { key: "choch", title: "CHoCH", type: "line" },
//     ];
//   },
//   calc: (kLineDataList, { calcParams }) => {
//     const deviation = calcParams[0];
//     const zigzagValues = zigzag(kLineDataList, deviation);
//     const bosLine = [];
//     const chochLine = [];
//     let previousType = null;

//     for (let i = 1; i < zigzagValues.length; i++) {
//       const currentZigzag = zigzagValues[i];
//       const previousZigzag = zigzagValues[i - 1];

//       // Check for BOS and CHoCH
//       if (currentZigzag.deviation > 0 && previousZigzag.deviation < 0) {
//         bosLine[i] = currentZigzag.value;
//         previousType = "BOS";
//       } else if (currentZigzag.deviation < 0 && previousZigzag.deviation > 0) {
//         chochLine[i] = currentZigzag.value;
//         previousType = "CHoCH";
//       } else {
//         if (previousType === "BOS") {
//           bosLine[i] = (bosLine[i - 1] + currentZigzag.value) / 2;
//         } else if (previousType === "CHoCH") {
//           chochLine[i] = (chochLine[i - 1] + currentZigzag.value) / 2;
//         }
//       }
//     }

//     return kLineDataList.map((_, i) => {
//       return {
//         zigzag: zigzagValues[i]?.value || null,
//         bos: bosLine[i],
//         choch: chochLine[i],
//       };
//     });
//   },
// };

var binanceSocket;
export default {
  data() {
    return {
      traderFileds:[
        {key:'price',label:'Price(USDT)'},
        {key:'qty',label:'Amount'},
        {key:'time',label:'time'}
      ],
      tradeList:[],
      displayItems:[],
      pending:false,
      dataReady:false,
      isEdit:false,
      dataOHLCV: [],
      chart: null,
      symbol: "BTCUSDT",
      timeframe: "15m",
      listIndicator: [],
      fieldsIndicator: [
        { key: 'name' },
        { key: 'type' },
        { key: 'calcParams' },
      ],
      optionChart: {
        styles: {
          indicator: {
            tooltip: {
              showRule: 'none',
              showType: 'none'
            },
          },
          grid: {
            show: false,
            horizontal: {
              show: true,
              size: 1,
              color: "#EDEDED",
              style: "dashed",
              dashedValue: [2, 2],
            },
            vertical: {
              show: false,
              size: 1,
              color: "#EDEDED",
              style: "dashed",
              dashedValue: [2, 2],
            },
          },
        },
      }
    };
  },
  methods: {
    
    saveParam(indicator,ref) {
      let type = indicator.type
      let val = this.$refs[ref].localValue
      let v =val.split(',').map(Number);
      indicator.calcParams = v
      this.chart.removeIndicator((type === "main" ? "candle_pane" : indicator.name), indicator.nameRegistor)
      indicator.isEdit = false
      indicator.isAdd=false
      this.addIndicator(indicator)
      this.$bvModal.hide('modal-indicator')
    },
    addIndicator(indicator) {
      let type = indicator.type
      if (indicator.isAdd) {
        //remove
        this.chart.removeIndicator((type === "main" ? "candle_pane" : indicator.name), indicator.nameRegistor)
        let indi = this.listIndicator.find(i => i.name === indicator.name)
        indi.isAdd = false
      } else {
        if (type === 'main') {
          this.chart.createIndicator({ name: indicator.nameRegistor, calcParams: indicator.calcParams }, true, { id: 'candle_pane' })
          //change isAdd

        } else {
          this.chart.createIndicator({ name: indicator.nameRegistor }, true, { id: indicator.name })

        }
        let indi = this.listIndicator.find(i => i.name === indicator.name)
        indi.isAdd = true
      }

      //  
    },
    createOverLay(type) {
      this.chart.createOverlay(type);
    },
    async fetchData() {
      return new Promise((resolve, reject) => {
        let url = `https://fapi.binance.com/fapi/v1/klines?symbol=${this.symbol}&interval=${this.timeframe}&limit=1000`;
        this.$axios.get(url).then((data) => {
          resolve(this.formatData(data.data));
        });
      });
    },
    formatData(data) {
      let newData = [];
      data.forEach((i) => {
        let [
          time,
          open,
          high,
          low,
          close,
          volume,
          closeTime,
          assetVolume,
          trades,
          buyBaseVolume,
          buyAssetVolume,
          ignored,
        ] = i;
        newData.push({
          timestamp: time, //this.$moment(time).format("YYYY-MM-DD hh:mm"),
          open: parseFloat(open),
          high: parseFloat(high),
          low: parseFloat(low),
          close: parseFloat(close),
          volume: parseFloat(volume),
        });
      });
      return newData;
    },
    initChart() {
      if (this.$store.state.db.list_symbol_config[this.symbol] === undefined) {
        console.log("Chưa nhận được config. thử lại trong 1s");
        setTimeout(() => {
          this.initChart();
        }, 500);
      } else {
        console.log("Đã có config");
        let optionFromExchange =
          this.$store.state.db.list_symbol_config[this.symbol];

        this.fetchData().then((data) => {
          let chart = klinecharts.init("chart", this.optionChart);

          this.chart = chart;
          listOverLay.forEach((i) => {
            klinecharts.registerOverlay(i);
          })
          listIndicator.forEach((i) => {
            klinecharts.registerIndicator(i);
          })

          chart.setPriceVolumePrecision(optionFromExchange.pricePrecision,optionFromExchange.pricePrecision );
          chart = chart;
          window.addEventListener("resize", () => {
            this.chart.resize();
          });
          chart.applyNewData(data);
          //gọi stream
          let binanceStreamURL = `wss://fstream.binance.com/ws/${this.symbol.toLowerCase()}@kline_${this.timeframe
            }`;
         
          binanceSocket = new WebSocket(binanceStreamURL);
          binanceSocket.onopen = (event) => {
            console.log(`Subcired to ${this.symbol} - ${this.timeframe}`);
          };
          binanceSocket.onclose = (event) => {
            console.log(`Unscribed to ${this.symbol} - ${this.timeframe}`);
          };

          //orderbook

          binanceSocket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            let newData = {
              // Timestamp, millisecond, required fields
              timestamp: message.k.t,
              // Open price, required fields
              open: parseFloat(message.k.o),
              // Close price, required field
              close: parseFloat(message.k.c),
              // Highest price, required field
              high: parseFloat(message.k.h),
              // Lowest price, required field
              low: parseFloat(message.k.l),
              // volume, optional field
              volume: parseFloat(message.k.v),
            };
            this.chart.updateData(newData);
          };
        });
        //
        // var binance = new WebSocket(`wss://stream.binance.com:9443/ws/${this.symbol.toLowerCase()}@depth`);
        // binance.onmessage = function (event) {

        //     var stream = JSON.parse(event.data)
        //    console.log(stream)

        // }
      }
      
    },
    getTrader(){
      let url = 'https://fapi.binance.com/fapi/v1/trades?symbol=IMXUSDT&limit=20'
      this.$axios.get(url).then(data=>{
        this.tradeList=(data.data).reverse() 
        //<symbol>@aggTrade
        let url_websocket_trade = `wss://fstream.binance.com/ws/${this.symbol.toLowerCase()}@aggTrade`;
        let websocket_trade = new WebSocket(url_websocket_trade);
        websocket_trade.onopen = (event) => {
            console.log(`có tradetrade`);
          };
          websocket_trade.openclose = (event) => {
            console.log(`hết tradetrade`);
          };
        websocket_trade.onmessage = (event) => {
            console.log('a')
            const message = JSON.parse(event.data);
            this.tradeList.unshift({
              price:parseFloat(message.p),
              qty:parseFloat(message.q),
              time:message.T,
              isBuyerMaker:message.m
            })
            this.tradeList.pop()
            
          };
      })
    }
  },
  unmounted() {
    console.log("Unmounted");
    binanceSocket.close();
    dispose("chart");
  },
  mounted() {
    let symbol = this.$route.query.symbol;
    let timeframe = this.$route.query.timeframe;
    let exchange = this.$route.query.exchange;
    this.symbol = symbol;
    this.timeframe = timeframe;
    this.exchange = exchange;
    document.getElementById("chart").setAttribute('data-value', `${symbol}-${timeframe}`);
    this.initChart();
    this.getTrader()
  },
  computed: {
    list_indicator() {
      return this.$store.state.db.list_indicator
    }
  },
  watch: {
    list_indicator(newV, oldV) {
      this.dataReady=true
      this.listIndicator = JSON.parse(JSON.stringify(newV))
      // override symbol calcParams
      

//       let symbolConfig = this.$store.state.db.list_symbol_db.find(i=>i.symbol===this.symbol)
// console.log(symbolConfig)

//       let configAtTimeframe = symbolConfig.indicator[this.timeframe]
      
      
      if (this.chart) {
        this.listIndicator.forEach(item => {

          if (item.isDefault) {
            this.addIndicator(item)
          
          }

        })
      } else {
        console.log('attemp load indicator after 500ms')
        setTimeout(() => {
          this.listIndicator.forEach(item => {

            if (item.isDefault) {
              this.addIndicator(item)
            }

          })
        }, 500)
      }

    }


  }
};
</script>
<style>
body,html{
  background-color: rgb(22,26,30) !important;
  font-family: BinancePlex,Arial,sans-serif!important
}
.myBtn {
  width: 100%;
  color: red;
  background: none;
  border: 0px;
}

.choiceIndicator:hover {
  color: blue;
  cursor: pointer;
}

#chart::after {
  position: absolute;
  top: 40%;
  left: 30%;
  content: attr(data-value);
  font-size: 3rem;
  color: gray;
  opacity: 0.5;
}
</style>
      