import{a as u,i as d,S as b}from"./assets/vendor-a4b265b3.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}})();const o={gallery:document.querySelector(".gallery"),form:document.querySelector(".search-form"),input:document.querySelector("input"),loadBtn:document.querySelector(".load-more")},L="41029112-ec6e065fca3f0d308b81a7ee5";u.defaults.baseURL="https://pixabay.com/api/";let n=1,c=null;o.form.addEventListener("submit",async r=>{r.preventDefault(),o.gallery.innerHTML="",n=1,c=o.input.value.trim(),c&&m(n,c).then(a=>f(a)).catch(a=>console.log(a))});async function m(r,a){const l=new URLSearchParams({key:L,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:40}),i=await u.get(`?${l}`);if(n===1){if(i.data.totalHits===0){o.loadBtn.classList.add("hidden"),d.show({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}d.show({message:`Hooray! We found ${i.data.totalHits} images.`,position:"topRight"})}return i}async function f(r){r.data.totalHits<=40?o.loadBtn.classList.add("hidden"):o.loadBtn.classList.remove("hidden");const a=r.data.hits.map(({webformatURL:e,largeImageURL:t,tags:s,likes:p,views:h,comments:g,downloads:y})=>`<a href="${t}"><div class="photo-card">
  <img class="image" src="${e}" alt="${s}" loading="lazy" />
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
  </div></a>`).join("");o.gallery.innerHTML+=a,o.images=document.querySelectorAll(".image"),[...o.images].map(e=>e.addEventListener("load",t=>{const s=t.target.nextElementSibling;s.classList.add("loader-hidden"),s.addEventListener("transitionend",()=>{s.remove()})})),new b(".gallery a",{}).refresh();const{height:i}=o.gallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:i/3,behavior:"smooth"})}o.loadBtn.addEventListener("click",v);async function v(){n+=1,m(n,c).then(r=>{if(f(r),n===Math.ceil(r.data.totalHits/40)){o.loadBtn.classList.add("hidden"),d.show({message:"We're are sorry, but you've reached the end of search results.",position:"topRight"});return}})}
//# sourceMappingURL=commonHelpers.js.map
