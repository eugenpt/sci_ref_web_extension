console.log('wow that is my new extension going!');

let elts = document.getElementsByClassName('gs_r gs_or gs_scl');

function textify(s){
    return s.replaceAll(',','_').replaceAll('.','').replaceAll('[HTML]','').trim().replaceAll(' ','_'); 
}
for(var ej of elts){
    // ej.innerHTML += "TEST!"; 
    cid = ej.dataset["cid"];
    var url = "https://scholar.google.ru/scholar?q=info:"+cid+":scholar.google.com/&output=cite&scirp=0&hl=ru";

    var ta = document.createElement('a');
    ta.onclick = function(urli, ei){return function(){
        fetch(urli,{mode:"same-origin"}).then((r)=>r.text()).then((data)=>{
            console.log(data);
            var temp = document.createElement('div');
            temp.innerHTML = data;

            var bibtex_url = temp.getElementsByTagName('a')[0].href;
            var auths = textify(temp.getElementsByClassName('gs_citr')[2].innerText);
            var title = textify(ei.getElementsByClassName('gs_rt')[0].innerText)
            var sth = ei.getElementsByClassName('gs_a')[0].innerText;
            var year = sth.match('19[0-9]{2}|20[0-2][0-9]')
            var fname = '';
            if(year!==null){
                fname = year[0]+'_';
            }

            fname += title.slice(0,15)+'__'+auths.slice(0,15)+'.bib';

            // console.log(bibtex_url);

            fetch(bibtex_url
                  ,{mode:'no-cors'}
                 ).then((r)=>{
                     console.log(r);
                     console.log(r.body);
                     console.log(r.text);
                     return r.text();
                 }).then((dataj)=>{
                     console.log(dataj);

                     download(fname, dataj);
                 })
        })
        // download(fnamei,datai);
    };}(url, ej);
    ta.innerHTML = '.bib';
    var telt = ej.getElementsByClassName('gs_or_cit')[0];
    telt.parentElement.insertBefore(ta,telt);


}

// alert(elts);

function download (filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
