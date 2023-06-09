/* eslint-disable */
export default {
  data(){
    return{
      debounceTimer:null,
    }
  },
  methods:{
    debounceMethods(func,...args){
      let context = this;
      if (this.debounceTimer) clearTimeout(this.debounceTimer);
      let callNow = !this.debounceTimer;
      this.debounceTimer = setTimeout(() => {
        this.debounceTimer = null;
      },1000)
      if(callNow) func.apply(context,args)
    }
  },
}
