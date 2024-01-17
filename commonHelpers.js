import{S as y,i as l,a as b}from"./assets/vendor-a4b265b3.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const a={gallery:document.querySelector(".gallery"),form:document.querySelector(".search-form"),loadBtn:document.querySelector(".load-more")},L=new y(".gallery a",{}),m=40;let c=1,d=null;a.loadBtn.addEventListener("click",async()=>{c+=1;const s=await u(c,d);if(h(s),c===Math.ceil(s.data.totalHits/m)){a.loadBtn.classList.add("hidden"),l.show({message:"We're are sorry, but you've reached the end of search results.",position:"topRight"});return}});a.form.addEventListener("submit",async s=>{if(s.preventDefault(),a.loadBtn.classList.add("hidden"),a.gallery.innerHTML="",c=1,d=s.target.elements.searchQuery.value.trim(),!d){l.show({message:"Request is empty. Please enter something.",position:"topRight"});return}try{const r=await u(c,d);if(r.data.totalHits===0){a.loadBtn.classList.add("hidden"),l.show({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}l.show({message:`Hooray! We found ${r.data.totalHits} images.`,position:"topRight"}),h(r)}catch(r){console.log(`Error happend: ${r}`)}});async function u(s,r){const i=new URLSearchParams({key:"41029112-ec6e065fca3f0d308b81a7ee5",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:m});try{return await b.get(`https://pixabay.com/api/?${i}`)}catch{l.show({message:"Error fetching images"})}}async function h(s){s.data.totalHits<=m?a.loadBtn.classList.add("hidden"):a.loadBtn.classList.remove("hidden");const r=s.data.hits.map(({webformatURL:o,largeImageURL:e,tags:t,likes:n,views:p,comments:f,downloads:g})=>`<a href="${e}"><div class="photo-card">
  <span class="loader"></span>
  <img class="image" src="${o}" alt="${t}"  />
  <div class="info">
    <p class="info-item">
      <b>Likes</b><br>${n}
    </p>
    <p class="info-item">
      <b>Views</b><br>${p}
    </p>
    <p class="info-item">
      <b>Comments</b><br>${f}
    </p>
    <p class="info-item">
      <b>Downloads</b><br>${g}
    </p>
  </div>
  </div></a>`).join("");a.gallery.insertAdjacentHTML("beforeend",r),a.images=document.querySelectorAll(".image"),[...a.images].map(o=>o.addEventListener("load",async e=>{const t=e.target.previousElementSibling;t!==null&&(t.classList.add("loader-hidden"),t.addEventListener("transitionend",()=>{t.remove()}))})),L.refresh();const{height:i}=a.gallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:i/2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
