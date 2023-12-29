import{a as u,i as d,S as b}from"./assets/vendor-a4b265b3.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}})();const a={gallery:document.querySelector(".gallery"),form:document.querySelector(".search-form"),input:document.querySelector("input"),loadBtn:document.querySelector(".load-more")},L="41029112-ec6e065fca3f0d308b81a7ee5";u.defaults.baseURL="https://pixabay.com/api/";let s=1,c=null;a.form.addEventListener("submit",async r=>{r.preventDefault(),a.gallery.innerHTML="",s=1,c=a.input.value.trim(),c&&m(s,c).then(o=>f(o)).catch(o=>console.log(o))});async function m(r,o){const l=new URLSearchParams({key:L,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:40}),i=await u.get(`?${l}`);if(s===1){if(i.data.totalHits===0){a.loadBtn.classList.add("hidden"),d.show({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}d.show({message:`Hooray! We found ${i.data.totalHits} images.`,position:"topRight"})}return i}async function f(r){r.data.totalHits>=41&&a.loadBtn.classList.remove("hidden");const o=r.data.hits.map(({webformatURL:e,largeImageURL:t,tags:n,likes:p,views:h,comments:g,downloads:y})=>`<a href="${t}"><div class="photo-card">
  <img class="image" src="${e}" alt="${n}" loading="lazy" />
  <span class="loader"></span>
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
  </div></a>`).join("");a.gallery.innerHTML+=o,a.images=document.querySelectorAll(".image"),[...a.images].map(e=>e.addEventListener("load",t=>t.target.nextElementSibling.style.display="none")),new b(".gallery a",{}).refresh();const{height:i}=a.gallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:i/3,behavior:"smooth"})}a.loadBtn.addEventListener("click",v);async function v(){s+=1,m(s,c).then(r=>{if(f(r),s===Math.ceil(r.data.totalHits/40)){a.loadBtn.classList.add("hidden"),d.show({message:"We're are sorry, but you've reached the end of search results.",position:"topRight"});return}})}
//# sourceMappingURL=commonHelpers.js.map
