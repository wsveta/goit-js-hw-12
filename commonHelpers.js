import{i as n,a as y,S as b}from"./assets/vendor-a4b265b3.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function d(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=d(e);fetch(e.href,t)}})();const s={gallery:document.querySelector(".gallery"),form:document.querySelector(".search-form"),loadBtn:document.querySelector(".load-more")};let l=1,c=null;s.loadBtn.addEventListener("click",async()=>{l+=1;const a=await m(l,c);if(u(a),l===Math.ceil(a.data.totalHits/40)){s.loadBtn.classList.add("hidden"),n.show({message:"We're are sorry, but you've reached the end of search results.",position:"topRight"});return}});s.form.addEventListener("submit",async a=>{if(a.preventDefault(),s.loadBtn.classList.add("hidden"),s.gallery.innerHTML="",l=1,c=a.target.elements.searchQuery.value.trim(),!c){n.show({message:"Request is empty. Please enter something.",position:"topRight"});return}const r=await m(l,c);if(r.data.totalHits===0){s.loadBtn.classList.add("hidden"),n.show({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}n.show({message:`Hooray! We found ${r.data.totalHits} images.`,position:"topRight"}),u(r)});async function m(a,r){const d=new URLSearchParams({key:"41029112-ec6e065fca3f0d308b81a7ee5",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:a,per_page:40});try{return await y.get(`https://pixabay.com/api/?${d}`)}catch{n.show({message:"Error fetching images"})}}async function u(a){a.data.totalHits<=40?s.loadBtn.classList.add("hidden"):s.loadBtn.classList.remove("hidden");const r=a.data.hits.map(({webformatURL:e,largeImageURL:t,tags:o,likes:h,views:p,comments:f,downloads:g})=>`<a href="${t}"><div class="photo-card">
  <span class="loader"></span>
  <img class="image" src="${e}" alt="${o}"  />
  <div class="info">
    <p class="info-item">
      <b>Likes</b><br>${h}
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
  </div></a>`).join("");s.gallery.innerHTML+=r,s.images=document.querySelectorAll(".image"),[...s.images].map(e=>e.addEventListener("load",async t=>{const o=t.target.previousElementSibling;o!==null&&(o.classList.add("loader-hidden"),o.addEventListener("transitionend",()=>{o.remove()}))})),new b(".gallery a",{}).refresh();const{height:i}=s.gallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:i/2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
