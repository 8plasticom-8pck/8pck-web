
(function(){
  var b=document.querySelector('.burger'),n=document.querySelector('.nav');
  if(b){b.addEventListener('click',function(){n.classList.toggle('open');});}
  try{
    // 来源追踪：?utm_source=chatgpt.com 之类，存下来并塞进表单
    var sp = new URLSearchParams(location.search);
    var src = sp.get('utm_source'), med = sp.get('utm_medium'), camp = sp.get('utm_campaign');
    if (src) {
      localStorage.setItem('utm_source', src);
      localStorage.setItem('utm_medium', med || '');
      localStorage.setItem('utm_campaign', camp || '');
    }
    if (!localStorage.getItem('landing_page')) {
      localStorage.setItem('landing_page', location.pathname);
    }
    if (!localStorage.getItem('ref_host') && document.referrer) {
      try { localStorage.setItem('ref_host', new URL(document.referrer).host); } catch (e) {}
    }
    document.querySelectorAll('form').forEach(function (f) {
      [['utm_source','utm_source'],['utm_medium','utm_medium'],['utm_campaign','utm_campaign'],
       ['referrer_host','ref_host'],['landing_page','landing_page']].forEach(function (pair) {
        var v = localStorage.getItem(pair[1]);
        if (!v) return;
        var i = document.createElement('input');
        i.type = 'hidden'; i.name = pair[0]; i.value = v;
        f.appendChild(i);
      });
    });
  } catch (e) {}

  try{
    var q=new URLSearchParams(location.search).get('product');
    if(q){
      var f=document.querySelector('input[name=product]');
      if(f){f.value=q;}
      var t=document.querySelector('textarea[name=message]');
      if(t && !t.value){t.value='Product: '+q.replace(/-/g,' ')+'\nQuantity: ';}
    }
  }catch(e){}
  var groups={};
  document.querySelectorAll('.filters').forEach(function(g){
    g.addEventListener('click',function(e){
      var c=e.target.closest('.chip'); if(!c) return;
      g.querySelectorAll('.chip[data-group="'+c.dataset.group+'"]').forEach(function(x){x.classList.toggle('on',x===c);});
      var active={};
      document.querySelectorAll('.filters .chip.on').forEach(function(x){active[x.dataset.group]=x.dataset.val;});
      document.querySelectorAll('[data-card]').forEach(function(card){
        var ok=true;
        for(var k in active){ if(active[k]!=='all' && card.dataset[k]!==active[k]) ok=false; }
        card.style.display=ok?'':'none';
      });
    });
  });
})();

/* --- GA consent banner --- */
(function () {
  var el = document.getElementById('ga-consent');
  if (!el) return;
  var choice = null;
  try { choice = localStorage.getItem('ga_consent'); } catch (e) {}
  if (choice) { el.hidden = true; } else { el.hidden = false; }
  var yes = document.getElementById('ga-yes');
  var no = document.getElementById('ga-no');
  if (yes) yes.addEventListener('click', function () {
    try { localStorage.setItem('ga_consent', 'yes'); } catch (e) {}
    if (window.gtag) { gtag('consent', 'update', { 'analytics_storage': 'granted' }); }
    el.hidden = true;
    window.dataLayer && window.dataLayer.push({ event: 'consent_accept' });
  });
  if (no) no.addEventListener('click', function () {
    try { localStorage.setItem('ga_consent', 'no'); } catch (e) {}
    el.hidden = true;
  });
})();
