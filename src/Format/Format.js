const formatNum = ((n)=>{
    return new Intl.NumberFormat('vnd', { maximumSignificantDigits: 3 }).format(n) + ' VND'
   })
export default formatNum;