const Crypto = require('crypto-js')
const Cookies = require('js-cookie')


function verify(){
    
    let encrypted = 0
    if(Cookies.get("session")){
        encrypted = Cookies.get("session")
    }
    if(localStorage.getItem('persistentUser')){
        encrypted = localStorage.getItem('persistentUser')
    }            
    let decrypted = Crypto.AES.decrypt(encrypted,'MiPrecioso')            
    const original = decrypted.toString( Crypto.enc.Utf8 )    
    return original
}

export default verify