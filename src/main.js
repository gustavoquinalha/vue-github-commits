import Vue from 'vue'
// import App from './App.vue'
var user = 'lucassmacedo',
    repo = 'Sylius',
    perPage = 10

var demo = new Vue({

  el: '#demo',

  data: {
    user,
    repo,
    perPage,
    apiURL: null,
    branches: ['master', 'dev'],
    currentBranch: 'master',
    commits: null
  },

  created: function () {
    this.fetchData()
  },

  watch: {
    currentBranch: 'fetchData'
  },

  filters: {
    truncate: function (v) {
      var newline = v.indexOf('\n')
      return newline > 0 ? v.slice(0, newline) : v
    },
    formatDate: function (v) {
      return v.replace(/T|Z/g, ' ')
    }
  },

  watch: {
     user: function (val) {
       this.user = val;
       this.fetchData();
     },
     repo: function (val) {
       this.repo = val;
       this.fetchData();
     }
   },

  methods: {
    fetchData: function () {
      this.apiURL = 'https://api.github.com/repos/' + this.user + '/' + this.repo + '/commits?per_page=' + this.perPage + '&sha='

      var xhr = new XMLHttpRequest()
      var self = this
      xhr.open('GET', this.apiURL + self.currentBranch)
      xhr.onload = function () {
        self.commits = JSON.parse(xhr.responseText)
        console.log(self.commits[0].html_url)
      }
      xhr.send()
    }
  }
})
