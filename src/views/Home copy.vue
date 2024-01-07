<template>
  <div id="app">
    <h1>LIFF USER INFOMATION</h1>
    <img :src="profile.pictureUrl" width="100" height="100" />
    <!-- {{ profile.displayName }} -->
    <p id="displayName">display Name : {{ profile.displayName }}</p>
    <p id="userId">userID : {{ profile.userId }}</p>
    <p id="os">OS : {{ os }}</p>
    <!-- <p>param : {{ this.getParam }}</p> -->
  </div>
  <div id="btn">
    <button @click="openLineChat">Line@</button>
    <button @click="saveData">Save data</button>
  </div>
</template>

<script>
//import HelloWorld from "./components/HelloWorld.vue";
import liff from '@line/liff'
//import SetDataService from '../../services/SetDataService'
import axios from 'axios'
export default {
  name: 'App',
  components: {
    // HelloWorld,
  },
  data() {
    return {
      os: '',
      loggedIn: false,
      profile: {},
      displayName: '',
      userId: '',
      alert: '',
      getParam: '',
      //queryString
      client_id: '',
      userId: '',
      userAgent: '',
      ipAddress: '',
      uniqueEventId: '',
      sessionId: '',
      //test
      changeUserAgent: '',
      //test: '',
      //line uid
      lineUid: '',
      //data
      data: '',
    }
  },
  mounted() {
    console.log('MOUNT-->')
    console.log('process.env.VUE_APP_API-->', process.env.VUE_APP_API)
    // console.log('process.env.VUE_APP_ENV_VARIABLE-->', process.env.VUE_APP_ENV_VARIABLE)
    //console.log('process.env.VUE_APP_TITLE-->', process.env.VUE_APP_TITLE)

    this.userId = this.$route.query.userId
    //console.log('userId-->', this.userId)
    this.client_id = this.$route.query.client_id
    //console.log('client_id-->', this.client_id)

    this.userAgent = this.$route.query.userAgent
    //console.log('userAgent-->', this.userAgent)

    this.ipAddress = this.$route.query.ipAddress
    //console.log('ipAddress-->', this.ipAddress)
    this.uniqueEventId = this.$route.query.uniqueEventId
    //console.log('uniqueEventId-->', this.uniqueEventId)
    this.sessionId = this.$route.query.sessionId
    //console.log('sessionId-->', this.sessionId)

    //run liff
    this.liffAdd()

    // var data = {
    //   // sample data
    //   userId: '100010001',
    //   client_id: 'ga_100010001',
    //   lineUid: 'line_100010001',
    //   userAgent: 'GoogleChome',
    //   ipAddress: '10.12.12.1',
    //   uniqueEventId: 'uni_100010001',
    //   sessionId: 'sess_100010001',
    // }
    this.getAllData()
    //this.saveData(data)
  },
  methods: {
    async liffAdd() {
      await liff
        .init({ liffId: '1656824759-rnzoblkn' })
        .then(() => {
          if (!liff.isLoggedIn()) {
            //console.log('Not Login')
            liff.login()
          } else {
            //console.log('Not Login')
            this.loggedIn = liff.isLoggedIn()
            this.os = liff.getOS()
            //console.log('isLoggedIn--> ', liff.isLoggedIn())
            // console.log('getIDToken--> ', liff.getIDToken())
            // console.log('getContext--> ', liff.getContext())
            // console.log('getOS--> ', liff.getOS())
            // console.log('isInClient--> ', liff.isInClient())
            //console.log("getAdvertisingId--> ", liff.getAdvertisingId());
            //console.log("getAId--> ", liff.getAId());
            // console.log('getVersion--> ', liff.getVersion())
            //console.log("getEnvironment--> ", liff.getEnvironment());

            // get queryString
            // this.getParam = params.get('param')
            // console.log('param--->', this.getParam)

            this.getProfile()
            // this.getEnvironment();
            this.getFriendship()
          }
        })
        .catch(err => {
          this.occoredError = 'error:' + err
        })
    },

    async getAllData() {
      try {
        // await axios.get('http://localhost:8080/api/userGtms').then(response => {
        await axios.get(process.env.VUE_APP_API + '/api/userGtms').then(response => {
          console.log('response data-->', response.data)
        })
      } catch (err) {
        console.log('err-->', err)
      }

      // await SetDataService.getAll()
      //   .then(response => {
      //     this.data = response.data
      //     console.log('response data-->', response.data)
      //   })
      //   .catch(e => {
      //     console.log(e)
      //   })
    },
    async checkData(uid) {
      try {
        //console.log('find data--->')
        var gtm_data = {
          // sample data
          userId: '100010001',
          client_id: 'ga_100010001',
          lineUid: uid,
          userAgent: 'GoogleChome',
          ipAddress: '10.12.12.1',
          uniqueEventId: 'uni_100010001',
          sessionId: 'sess_100010001',
        }
        console.log('uid ---> find ', uid)
        this.HEADER = {
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
          },
        }
        // await axios.get('http://localhost:8080/api/userGtms/' + uid, this.HEADER).then(response => {
        await axios.get(process.env.VUE_APP_API + '/api/userGtms/' + uid, this.HEADER).then(response => {
          console.log('response data from find id-->', response)

          if (response.data === 'NO DATA') {
            // if ((response.status = 404)) {
            console.log('NOT FOUND DATA & save data-->')
            this.saveData(gtm_data)
          } else {
            console.log('FOUND DATA-->', response.data)
            //this.saveData(gtm_data)
          }
        })
      } catch (err) {
        console.log('err-->', err)
      }
    },

    async saveData(data) {
      console.log('SAVE DATABASE==>')
      try {
        this.HEADER = {
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
          },
        }
        // await axios.post('http://localhost:8080/api/userGtms', data, this.HEADER).then(response => {
        await axios.post(process.env.VUE_APP_API + '/api/userGtms/', data, this.HEADER).then(response => {
          console.log('save data-->', response.data)
        })
      } catch (err) {
        console.log('err--> ', err)
      }

      // console.log('save data ', data)
      // await SetDataService.create(data)
      //   .then(response => {
      //     console.log('Save Data-->', response)
      //   })
      //   .catch(e => {
      //     console.log(e)
      //   })
    },

    async getProfile() {
      await liff.getProfile().then(profile => {
        console.log('profile--> ', profile)
        this.profile = profile
        this.lineUid = this.profile.userId
        console.log('lineUid-->', this.lineUid)
        this.checkData(this.lineUid)

        // console.log("this.profile--> ", this.profile);
      })
    },
    async getFriendship() {
      await liff.getFriendship().then(data => {
        console.log('getFriendship--> ', data)
        if (data.friendFlag) {
          console.log('getFriendship--> = true')
          this.alert = data.friendFlag
          // alert(`data.friendFlag--> ${this.alert}`)
          //alert(`Send Message-->`)
          //this.sendMsg()
        }
      })
    },
    async getAccessToken() {
      console.log('token--> ')
      await liff.getAccessToken().then(token => {
        console.log('token--> ', token)
      })
    },

    openLineChat() {
      console.log('openLineChat--> ')
      window.open('https://line.me/ti/p/@889mtekm', '_blank')
    },
    async sendMsg() {
      const profile = await liff.getProfile()
      console.log('userId---> ' + profile.userId)
      // console.log("liff.getContext().type--> ", liff.getContext().type);
      // if (liff.getContext().type !== "none") {
      //   await liff.sendMessages([
      //     {
      //       type: "sticker",
      //       stickerId: 1,
      //       packageId: 1,
      //     },
      //   ]);
      //   alert("Message sent");
      // }

      if (!liff.isInClient()) {
        window.alert('This button is unavailable as LIFF is currently being opened in an external browser.')
      } else {
        await liff
          .sendMessages([
            {
              type: 'text',
              text: `Register/${profile.displayName}`,
            },
            // {
            //   type: "text",
            //   text: "Register",
            // },
            // {
            //   type: "text",
            //   text: profile.displayName,
            // },
          ])
          .then(() => {
            window.alert(`Message sent Register ` + profile.userId)
          })
          .catch(error => {
            window.alert('Error sending message: ' + error)
          })
      }
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#btn {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
