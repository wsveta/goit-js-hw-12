import{a as u,i as d,S as b}from"./assets/vendor-a4b265b3.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}})();const r={gallery:document.querySelector(".gallery"),form:document.querySelector(".search-form"),input:document.querySelector("input"),loadBtn:document.querySelector(".load-more")},L="41029112-ec6e065fca3f0d308b81a7ee5";u.defaults.baseURL="https://pixabay.com/api/";let n=1,c=null;r.loadBtn.addEventListener("click",async()=>{n+=1;const a=await m(n,c);if(f(a),n===Math.ceil(a.data.totalHits/40)){r.loadBtn.classList.add("hidden"),d.show({message:"We're are sorry, but you've reached the end of search results.",position:"topRight"});return}});r.form.addEventListener("submit",async a=>{if(a.preventDefault(),r.gallery.innerHTML="",n=1,c=r.input.value.trim(),!c)return;const o=await m(n,c);if(n===1){if(f(o),o.data.totalHits===0){console.log("!"),r.loadBtn.classList.add("hidden"),d.show({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}d.show({message:`Hooray! We found ${o.data.totalHits} images.`,position:"topRight"})}});async function m(a,o){const l=new URLSearchParams({key:L,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:a,per_page:40});try{return await u.get(`?${l}`)}catch(i){console.error("Error fetching images:",i)}}async function f(a){a.data.totalHits<=40?r.loadBtn.classList.add("hidden"):r.loadBtn.classList.remove("hidden");const o=a.data.hits.map(({webformatURL:e,largeImageURL:t,tags:s,likes:p,views:h,comments:g,downloads:y})=>`<a href="${t}"><div class="photo-card">
  <span class="loader"></span>
  <img class="image" src="${e}" alt="${s}"  />
  <div class="info">
    <p class="info-item">
      <b>Likes</b><br>${p}
    </p>
    <p class="info-item">
      <b>Views</b><br>${h}
    </p>
    <p class="info-item">
      <b>Comments</b><br>${g}
    </p>
    <p class="info-item">
      <b>Downloads</b><br>${y}
    </p>
  </div>
  </div></a>`).join("");r.gallery.innerHTML+=o,r.images=document.querySelectorAll(".image"),[...r.images].map(e=>e.addEventListener("load",async t=>{const s=t.target.previousElementSibling;s!==null&&(s.classList.add("loader-hidden"),s.addEventListener("transitionend",()=>{s.remove()}))})),new b(".gallery a",{}).refresh();const{height:i}=r.gallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:i/3,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
