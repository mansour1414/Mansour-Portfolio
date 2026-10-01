/* Applies saved language/theme before first paint (external file so the CSP can stay strict). */
(function(){try{var d=document.documentElement,l=localStorage.getItem('mansour-lang'),t=localStorage.getItem('mansour-theme');
if(l==='ar'||l==='en'){d.lang=l;d.dir=l==='ar'?'rtl':'ltr';}
if(t==='light'||t==='dark'){d.dataset.theme=t;}}catch(e){}})();
