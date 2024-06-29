import{a as m,i as y,S as g}from"./assets/vendor-b0d10f48.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function o(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(t){if(t.ep)return;t.ep=!0;const n=o(t);fetch(t.href,n)}})();const h="44599145-181f37b758d0f90a33e2c7ba6",p="https://pixabay.com/api/";async function b(e,r=1){const o={key:h,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:r};try{return(await m.get(p,{params:o})).data}catch{throw new Error("Failed to fetch images")}}function v(e){const r=document.getElementById("gallery");r.innerHTML=e.map(o=>`
        <li class="gallery-item">
        <a href="${o.largeImageURL}" class="gallery-link">
            <img class="gallery-image" src="${o.webformatURL}" alt="${o.tags}" />
            </a>
            <div class="info">
                <div class="image-info">
                <b>Likes</b>
                <p>${o.likes}</p>
                </div>
                <div class="image-info">
                <b>Views</b>
                <p>${o.views}</p>
                </div>
                <div class="image-info">
                <b>Comments</b>
                <p>${o.comments}</p>
                </div>
                <div class="image-info">
                <b>Downloads</b>
                <p>${o.downloads}</p>
                </div>
            </div>
        </a>
        </li>
    `).join("")}function w(){document.getElementById("gallery").innerHTML=""}function l(e,r="info"){y[r]({message:e,position:"topRight"})}function L(){document.getElementById("loader").style.display="block"}function E(){document.getElementById("loader").style.display="none"}function u(e){const r=document.getElementById("load-more");r.style.display=e?"block":"none"}let a,i=1,d="";document.getElementById("search-form").addEventListener("submit",async e=>{if(e.preventDefault(),d=document.getElementById("query").value.trim(),d===""){l("Please enter a search term","warning");return}i=1,w(),u(!1),await f()});document.getElementById("load-more").addEventListener("click",async()=>{i+=1,await f()});async function f(){L();try{const e=await b(d,i);e.hits.length===0&&i===1?l("Sorry, there are no images matching your search query. Please try again!","error"):(v(e.hits),a&&a.destroy(),a=new g(".gallery a"),a.refresh(),u(i*15<e.totalHits),i*15>=e.totalHits&&l("We're sorry, but you've reached the end of search results.","info"),B())}catch{l("An error occurred while fetching images","error")}finally{E()}}function B(){const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
