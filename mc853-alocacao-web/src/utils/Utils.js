function toUrl(name){
    let url = name;
    url = url.trim();
    url = url.toLowerCase();
    url = url.replace(/[ ]/g, '-');
    url = url.replace(/[áâãàä]/g, 'a');
    url = url.replace(/[éêèëẽ]/g, 'e');
    url = url.replace(/[iíîïĩ]/g, 'i');
    url = url.replace(/[óòõôö]/g, 'o');
    url = url.replace(/[úùũûü]/g, 'u');
    url = url.replace(/[ç]/g, 'c');
    url = url.replace(/[!@#$%*()_+=]/g, '');
    return url;
}

String.prototype.insertAt = function(string, index) {
    return this.substring(0, index) + string + this.substring(index);
}

function padNum(num){
    return ('0'+String(num)).slice(-2);
}

Date.prototype.toDateTimeString = function(){
    let dia = this.getDate();
    let mes = this.getMonth() + 1;
    let ano = this.getFullYear();

    let horas = this.getHours();
    let minutos = this.getMinutes();

    console.log('DIA', dia);
    console.log('PAD', padNum(dia));

    return `${padNum(dia)}/${padNum(mes)}/${ano} ${padNum(horas)}:${padNum(minutos)}`;
}

console.log('UTILS');

export default {
    toUrl
};