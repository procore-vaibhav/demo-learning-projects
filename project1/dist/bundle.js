(()=>{"use strict";const e=function(e){const t=document.getElementById("item-list");t.innerHTML="",e.forEach(((e,n)=>{const d=document.createElement("li");d.textContent=`${n+1}.   ${e.name}`,t.appendChild(d)}))};let t=[];function n(){const l=document.getElementById("data-table").getElementsByTagName("tbody")[0];l.innerHTML="",t.forEach(((e,t)=>{const n=l.insertRow();n.insertCell(0).innerHTML=t+1,n.insertCell(1).innerHTML=e.name,n.insertCell(2).innerHTML='<div><button class="update-btn">Update</button><button class="delete-btn">Delete</button></div>'}));const o=document.querySelectorAll(".update-btn"),c=document.querySelectorAll(".delete-btn");o.forEach(((e,n)=>{e.addEventListener("click",(()=>function(e){const n=t[e];document.getElementById("edit-id").value=e+1;const d=document.getElementById("edit-name");d.value=n.name,document.getElementById("modal").style.display="block",d.select()}(n)))})),c.forEach(((l,o)=>{l.addEventListener("click",(()=>function(l){t.splice(l,1),d(),n(),e(t)}(o)))}))}function d(){sessionStorage.setItem("tableData",JSON.stringify(t))}function l(){let e=t.length;document.getElementById("insertModal-edit-id").value=e+1;const n=document.getElementById("insertModal-edit-name");n.value="new item",document.getElementById("insertModal").style.display="block",n.select()}function o(){document.getElementById("insertModal").style.display="none"}function c(){const l={id:document.getElementById("insertModal-edit-id").value,name:document.getElementById("insertModal-edit-name").value};t.push(l),d(),n(),e(t),o()}function a(){document.getElementById("modal").style.display="none"}function i(){const l=document.getElementById("edit-id").value-1,o=document.getElementById("edit-name").value;t[l].name=o,d(),n(),e(t),a()}function s(e){let t,n;t=document.getElementsByClassName("tab-content");for(let e=0;e<t.length;e++)t[e].classList.remove("active");n=document.getElementsByClassName("tab-link");for(let e=0;e<n.length;e++)n[e].classList.remove("active");document.getElementById(e).classList.add("active"),event.currentTarget.classList.add("active")}document.addEventListener("DOMContentLoaded",(()=>{!function(){const d=sessionStorage.getItem("tableData");d&&(t=JSON.parse(d),n(),e(t))}(),document.getElementById("tab1-button").addEventListener("click",(function(){s("tab1")})),document.getElementById("tab2-button").addEventListener("click",(function(){s("tab2")})),document.getElementById("tab3-button").addEventListener("click",(function(){s("tab3")})),document.getElementById("insertModalButton").addEventListener("click",l),document.getElementById("saveInsertButton").addEventListener("click",c),document.getElementById("closeInsertModalButton").addEventListener("click",o),document.getElementById("saveChangesButton").addEventListener("click",i),document.getElementById("closeModalButton").addEventListener("click",a)}))})();