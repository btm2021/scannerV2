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
        <div id="chart" style="width: 100%; height: 600px; background-color:#171b26;"></div>
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

              <b-button class="myBtn" @click="getPicture()" size="sm">
                <span class="icon-GwQQdU8S"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.118 6a.5.5 0 0 0-.447.276L9.809 8H5.5A1.5 1.5 0 0 0 4 9.5v10A1.5 1.5 0 0 0 5.5 21h16a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 21.5 8h-4.309l-.862-1.724A.5.5 0 0 0 15.882 6h-4.764zm-1.342-.17A1.5 1.5 0 0 1 11.118 5h4.764a1.5 1.5 0 0 1 1.342.83L17.809 7H21.5A2.5 2.5 0 0 1 24 9.5v10a2.5 2.5 0 0 1-2.5 2.5h-16A2.5 2.5 0 0 1 3 19.5v-10A2.5 2.5 0 0 1 5.5 7h3.691l.585-1.17z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 18a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm0 1a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z"></path></svg></span>
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
              <b-button class="myBtn"  v-b-modal.modal-config>
                <span class="iconContainer-dmpvVypS"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M16.62 11.48c1.08-.56 1.77-1.54 1.61-3.18-.2-2.24-2.05-2.99-4.49-3.2V2h-1.9v3.02c-.48 0-.99 0-1.5.02V2H8.46v3.1c-.7.02-1.5.01-3.8 0v2.02c1.5-.03 2.28-.12 2.46.84v8.5c-.12.75-.72.64-2.08.62l-.38 2.25 3.8.01V22h1.9v-2.62l1.5.01V22h1.9v-2.66c3.17-.17 5.3-.97 5.58-3.96.22-2.4-.92-3.47-2.71-3.9Zm-6.24-4.22c1.07 0 4.42-.34 4.42 1.9 0 2.12-3.35 1.87-4.42 1.87V7.26Zm0 9.83v-4.16c1.28 0 5.2-.36 5.2 2.08 0 2.35-3.92 2.08-5.2 2.08Z"></path></svg></span>
              </b-button>
              <b-button class="myBtn"  v-b-modal.modal-calc>
                <span class="iconContainer-dmpvVypS"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M16.62 11.48c1.08-.56 1.77-1.54 1.61-3.18-.2-2.24-2.05-2.99-4.49-3.2V2h-1.9v3.02c-.48 0-.99 0-1.5.02V2H8.46v3.1c-.7.02-1.5.01-3.8 0v2.02c1.5-.03 2.28-.12 2.46.84v8.5c-.12.75-.72.64-2.08.62l-.38 2.25 3.8.01V22h1.9v-2.62l1.5.01V22h1.9v-2.66c3.17-.17 5.3-.97 5.58-3.96.22-2.4-.92-3.47-2.71-3.9Zm-6.24-4.22c1.07 0 4.42-.34 4.42 1.9 0 2.12-3.35 1.87-4.42 1.87V7.26Zm0 9.83v-4.16c1.28 0 5.2-.36 5.2 2.08 0 2.35-3.92 2.08-5.2 2.08Z"></path></svg></span>
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
          <b-col style="color:white" cols="10">
            
            <b-table style="color:white;font-size: 10px;text-align: center;" small  :items="tradeList" :fields="traderFileds" head-variant="light">
              <template #cell(time)="data">
        {{ $moment(data.item.time).format("HH:mm:ss") }}
      </template>
      <template #cell(price)="data">
      <span :class="(!data.item.isBuyerMaker)?'text-success':'text-danger'" >{{ data.item.price }}</span>
      </template>
            </b-table>
          </b-col>
          <b-col cols="12">
            <b-textarea style="width:100%" v-model="textNote" @keyup.enter="saveNote()"></b-textarea>
          </b-col>
        </b-row>
      </b-col>
    <b-col cols="12">
      <b-row no-gutters>
        <b-col cols="8">
          <b-card>
          <div id="subChart">
            <h6>Chu kì hiện tại</h6>
            <div id="chartCurrent" style="width: 100%; height: 600px; background-color:#171b26;"></div>
            <h6>Chu kì trước đó</h6>
            <div id="chartPre" style="width: 100%; height: 600px; background-color:#171b26;"></div>
   
          </div>
          </b-card>
        </b-col>
        <b-col cols="4">
          <b-table :fields="noteFields" show-empty style="color:white;font-size: 10px;" small  :items="listNote">
            
            <template #cell(action)="data">
            
            <b-badge @click="editNote(data.item)" variant="warning">Edit</b-badge>
            <b-badge @click="deleteNote(data.item)" variant="danger">X</b-badge>
         </template>
          </b-table>
         

        </b-col>
        <b-col cols="3">    
 </b-col>
        
      </b-row>

    </b-col>
      <b-modal id="modal-calc" title="calc">
        <calc></calc>
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

<b-modal id="modal-config" title="Config" size="lg">
  <b-overlay :show="updateConfigLoading">
    <b-row>
    <b-col cols="12">
      <b-table responsive bordered small :items="list_indicator" :fields="fieldsIndicator_config">
        <template #cell(type)="data">
            <b-badge :variant="data.item.type === 'main' ? 'primary' : 'warning'">{{ data.item.type }}</b-badge>
          </template>

          <template #cell(isDefault)="data">
          
    <b-form-checkbox :checked="data.item.isDefault" @change="changeDefault(data.item)" >
    </b-form-checkbox>

          </template>
      </b-table>
      </b-col>
  </b-row>
  </b-overlay>
  
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
import calc from '~/components/calc.vue'
import * as analyze from './analyze'

let dbKey = "c0rbxvksqs9_oMTog1mCfFx79sSEyW1aDNA9Gf1GNeHT";
let vantaKey='P1CHE11WCLZNLHC5'
var binanceSocket;
//sub indicato
const drawSupres = {
  name: "mySupRes1",
  shortName: "mySupRes1",
  calcParams: [],
  figures: [
    {key:'sup',title:'sup',type:'circle'},
    {key:'res',title:'res',type:'circle'},
    {key:'keyLevel',title:'res',type:'circle',
    styles: () => {
      return {
        color:'white'
      }
    }
  }
  ],
  calc: async (kLineDataList, { calcParams, figures }) => {
   
    return kLineDataList. map((kLineData, i) => {
      return {
        //sup:kLineData.support,
       //res:kLineData.resistance,
        keyLevel:kLineData.keyLevel
      }
    })
}
};

const drawT1 = {
  name: "t1",
  shortName: "t1",
  calcParams: [],
  figures: [
    { key: 't', title: 't1: ', type: 'line',styles: () => {
          return {
            color: "green",
          };
        }, },
  ],
  calc: async (kLineDataList, { calcParams, figures }) => {
    let close = kLineDataList.map(item=>item.t1)
    
    return kLineDataList. map((kLineData, i) => {
      return {
        t: close[i],
      }
    })
}
};

const drawT2 = {
  name: "t2",
  shortName: "t2",
  calcParams: [],
  figures: [
    { key: 't', title: 't2: ', type: 'line',styles: () => {
          return {
            color: "red",
          };
        }, },
  ],
  calc: async (kLineDataList, { calcParams, figures }) => {
    let close = kLineDataList.map(item=>item.t2)
    return kLineDataList. map((kLineData, i) => {
      return {
        t: close[i],
      }
    })
}
};

export default {

  components:{
calc
  },
  data() {
    return {
      updateConfigLoading:false,
      isEditNote:false,
      keyNote:null,
      noteFields:[
      {key:'note',
    
      thStyle: { width: "90%" },},
      ,{
        key:'action',
        label:'Action',

      thStyle: { width: "10%" },
      }
     
      ],
      textNote:'',
      listNote:[],
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
      fieldsIndicator_config: [
        { key: 'value' },
        { key: 'type' },
        { key: 'calcParams' },
        { key: 'isDefault' },

        
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


    changeDefault(item){
      this.updateConfigLoading=true
      let url = "https://database.deta.sh/v1/c0rbxvksqs9/list_indicator/items/"+item.key;
      let body = {
set:{
  isDefault:!item.isDefault
}
      }
      this.$axios.patch(url,body,{
        headers:{
          "Content-Type": "application/json",
          "X-API-Key": dbKey
        }
      }).then(data=>{
        this.updateConfigLoading=false
        this.getNote();
      })
    },
    async analyzeOHLCV(data) {
        let result =await analyze.analyzeSymbol(data)
        let _result = JSON.parse(JSON.stringify(result))
       
        result=result.bot
      
let currentBot =result.currentPeriod.currentOhlcvArray
let preBot = result.periodBot[result.periodBot.length - 1].ohlcvArray;
       
      this.initSubChart('chartCurrent',currentBot)
      this.initSubChart('chartPre',preBot)
      
      return _result.supres.ohlcvData
      },
   initSubChart(id,ohlcv){
    let chart = klinecharts.init(id, this.optionChart);
    chart.createIndicator( 't1', true, { id: 'candle_pane' })
    chart.createIndicator( 't2', true, { id: 'candle_pane' })
    chart.applyNewData(ohlcv);
    },
    editNote(note){
      this.textNote=note.note
      this.isEditNote=true
      this.keyNote=note.key
    },
    deleteNote(node){
      let url = "https://database.deta.sh/v1/c0rbxvksqs9/ghichu/items/"+node.key;
      
      this.$axios
        .delete(url, {
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": dbKey,
          },
        })
        .then((data) => {
          console.log('delete success')
          this.getNote()
        });
    },
    getNote(){
      let url = "https://database.deta.sh/v1/c0rbxvksqs9/ghichu/query";
      let body = {
        query: [
          {
           timeframe:this.timeframe,
           symbol:this.symbol
          },
        ],
        sort:'time'
      };
      this.$axios
        .post(url, body, {
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": dbKey,
          },
        })
        .then((data) => {
          this.listNote=data.data.items
        
        });
    },
   saveNote(){

    if(this.isEditNote){
    
      let url = "https://database.deta.sh/v1/c0rbxvksqs9/ghichu/items";
      let body = {
        
   // array of items to put
  items: [
        {
          
          symbol:this.symbol,
          timeframe:this.timeframe,
          time:(new Date()).getTime(),
          note:this.textNote,
          key:this.keyNote
        },
        // rest of items
    ]

      };
      this.$axios
        .put(url, body, {
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": dbKey,
          },
        })
        .then((data) => {
          console.log('write success')
          this.getNote()
          this.textNote=''
          this.isEditNote=false
        });
    }else{
      let url = "https://database.deta.sh/v1/c0rbxvksqs9/ghichu/items";
      let body = {
        
   // array of items to put
  items: [
        {
          
          symbol:this.symbol,
          timeframe:this.timeframe,
          time:(new Date()).getTime(),
          note:this.textNote
        },
        // rest of items
    ]

      };
      this.$axios
        .put(url, body, {
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": dbKey,
          },
        })
        .then((data) => {
          console.log('write success')
          this.getNote()
          this.textNote=''
        });
    }
    
   },
   async getPicture(){
      let a= this.chart.getConvertPictureUrl(true,'png',"#161A1E")
      const fetchRes = await fetch(a);
       const blob = await fetchRes.blob();

    // Tạo ClipboardItem từ Blob
    const clipboardItem = new ClipboardItem({ "image/png": blob });

    // Copy vào clipboard
    try {
        await navigator.clipboard.write([clipboardItem]);
     
        this.$bvToast.toast(`Copy ảnh vào clipboard`, {
          title: 'Thông báo',
          autoHideDelay: 500,
          variant:'info'
        })
    } catch (error) {
        console.error("Lỗi khi copy ảnh vào clipboard", error);
    }
    },
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
        let url = `https://fapi.binance.com/fapi/v1/klines?symbol=${this.symbol}&interval=${this.timeframe}&limit=1500`;
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
          klinecharts.registerIndicator(drawT1)

          klinecharts.registerIndicator(drawT2)
          klinecharts.registerIndicator(drawSupres)
     
          chart.setPriceVolumePrecision(optionFromExchange.pricePrecision,optionFromExchange.pricePrecision );
          chart = chart;
          window.addEventListener("resize", () => {
            this.chart.resize();
          });
          this.analyzeOHLCV(data).then(data=>{
            chart.createIndicator('mySupRes1', true, { id: 'candle_pane' })
            chart.applyNewData(data);
          })
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
     
      }
      
    },
    getTrader(){
      let url = 'https://fapi.binance.com/fapi/v1/trades?symbol=IMXUSDT&limit=20'
      this.$axios.get(url).then(data=>{
        this.tradeList=(data.data).reverse() 
        //<symbol>@aggTrade
        let url_websocket_trade = `wss://fstream.binance.com/ws/${this.symbol.toLowerCase()}@aggTrade`;
        let websocket_trade = new WebSocket(url_websocket_trade);
     
          
        websocket_trade.onmessage = (event) => {
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
    this.getNote()
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
  background-color:rgb(22,26,30) !important;
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
      