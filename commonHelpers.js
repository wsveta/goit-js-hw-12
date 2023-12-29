import{a as u,i as m,S as h}from"./assets/vendor-a4b265b3.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const i={gallery:document.querySelector(".gallery"),form:document.querySelector(".search-form"),input:document.querySelector("input")},y="41029112-ec6e065fca3f0d308b81a7ee5";u.defaults.baseURL="https://pixabay.com/api/";let c=1,l=null;i.form.addEventListener("submit",s=>{s.preventDefault(),i.gallery.innerHTML="",c=1,l=i.input.value.trim(),l&&b(c,l)});function b(s,r){const a=new URLSearchParams({key:y,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:40});u.get(`?${a}`).then(o=>{if(c===1){if(o.data.totalHits===0){m.show({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}m.show({message:`Hooray! We found ${o.data.totalHits} images.`,position:"topRight"}),L(o)}}).catch(o=>console.log(o))}function L(s){const r=s.data.hits.map(({webformatURL:e,largeImageURL:t,tags:n,likes:d,views:f,comments:p,downloads:g})=>`<a href="${t}"><div class="photo-card">
  <img class="image" src="${e}" alt="${n}" loading="lazy" />
  <span class="loader"></span>
  <div class="info">
    <p class="info-item">
      <b>Likes</b><br>${d}
    </p>
    <p class="info-item">
      <b>Views</b><br>${f}
    </p>
    <p class="info-item">
      <b>Comments</b><br>${p}
    </p>
    <p class="info-item">
      <b>Downloads</b><br>${g}
    </p>
  </div>
  </div></a>`).join("");i.gallery.innerHTML+=r,i.images=document.querySelectorAll(".image"),[...i.images].map(e=>e.addEventListener("load",t=>t.target.nextElementSibling.style.display="none"));const{height:a}=i.gallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:a/3,behavior:"smooth"}),new h(".gallery a",{}).refresh()}
//# sourceMappingURL=commonHelpers.js.map
