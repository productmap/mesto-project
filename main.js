(()=>{"use strict";class e{constructor(e,t,s,i,r,n){this.id=e._id,this.name=e.name,this.link=e.link,this._likes=e.likes,this._cardOwner=e.owner._id,this._userId=t,this._cardElement=n.querySelector(".card").cloneNode(!0),this._image=this._cardElement.querySelector(".card__image"),this._deleteButton=this._cardElement.querySelector(".card__delete-button"),this._likeButton=this._cardElement.querySelector(".card__like"),this._likeCounter=this._cardElement.querySelector(".card__like-counter"),this._handlerZoom=s,this._handlerRemove=i,this._handlerLikes=r,this.liked=this._likeButton.classList.contains("card__like_active")}_setEventListeners(){this._image.addEventListener("click",(()=>this._handlerZoom(this))),this._likeButton.addEventListener("click",(()=>this._handlerLikes(this))),this._deleteButton.addEventListener("click",(()=>this._handlerRemove(this)))}like(e){this._likeButton.classList.add("card__like_active"),this._likeCounter.textContent=e.length,this.liked=!0}dislike(e){this._likeButton.classList.remove("card__like_active"),this._likeCounter.textContent=e.length,this.liked=!1}remove(e){this._cardElement.remove()}render(){return this._image.src=this.link,this._image.alt=this.name,this._cardElement.querySelector(".card__title").textContent=this.name,this._cardOwner!==this._userId&&this._deleteButton.remove(),this._likes.some((e=>e._id===this._userId))&&this.like(this._likes),this._likeCounter.textContent=this._likes.length,this._setEventListeners(),this._cardElement}}class t{constructor(e,t){this._form=t.querySelector(e.formSelector),this._inputList=Array.from(this._form.querySelectorAll(e.inputSelector)),this._submitButton=this._form.querySelector(e.submitButtonSelector),this._inactiveButtonClass=e.inactiveButtonClass,this._errorMessage=e.inputErrorClass,this._errorClass=e.errorClass}_showInputError(e){const t=this._form.querySelector(`#${e.id}-error`);e.classList.add(this._errorMessage),t.classList.add(this._errorClass),t.textContent=e.validationMessage}_hideInputError(e){const t=this._form.querySelector(`#${e.id}-error`);e.classList.remove(this._errorMessage),t.classList.remove(this._errorClass),t.textContent=""}_checkInputValidity(e){e.validity.patternMismatch?e.setCustomValidity(e.validationMessage):e.setCustomValidity(""),e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}_hasInvalidInput(){return this._inputList.some((e=>!e.validity.valid))}_toggleButtonState(){this._hasInvalidInput(this._inputList)?this.disableSubmit():(this._submitButton.disabled=!1,this._submitButton.classList.remove(this._inactiveButtonClass))}_setEventListeners(){this._toggleButtonState(this._inactiveButtonClass),this._inputList.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButtonState(this._inactiveButtonClass)}))}))}disableSubmit(){this._submitButton.disabled=!0,this._submitButton.classList.add(this._inactiveButtonClass)}resetError(){this._inputList.forEach((e=>{this._hideInputError(e),this._toggleButtonState(this._inactiveButtonClass)}))}enableValidation(){this._setEventListeners(),this._toggleButtonState()}}class s{constructor(e){this.popup=e,this._closeEscPopup=this._closeEscPopup.bind(this)}open(){this.popup.classList.add("popup_opened"),document.addEventListener("keydown",this._closeEscPopup)}close(){this.popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._closeEscPopup)}_closeEscPopup(e){"Escape"===e.key&&this.close()}_setEventListeners(){this.popup.addEventListener("click",(e=>{(e.target.classList.contains("popup__overlay")||e.target.classList.contains("popup__close-button"))&&this.close()}))}}class i extends s{constructor(e,t){super(e),this._form=e.querySelector(".form"),this._setEventListeners(),this.callback=t}_getInputValues(){return this._inputList=this._form.querySelectorAll(".form__input"),this._formValues={},this._inputList.forEach((e=>{this._formValues[e.name]=e.value})),this._formValues}_setEventListeners(){super._setEventListeners(),this._form.addEventListener("submit",(e=>{e.preventDefault(),this.callback(e,this._getInputValues())}))}close(){this._form.reset(),super.close()}}const r={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".form__submit",inactiveButtonClass:"form__submit_disabled",inputErrorClass:"form__input_error",errorClass:"form__input-error_active"},n=document.querySelector(".cards"),o=document.querySelector("#profileEdit"),a=document.querySelector("#newCard"),l=document.querySelector("#newAvatar"),c=document.querySelector("#deleteCard"),h=document.querySelector("#cardZoom"),u=document.querySelector("#card-template").content,d=document.querySelector(".profile__avatar"),_=document.querySelector(".profile__name"),m=document.querySelector(".profile__description"),p=o.querySelector(".form"),f=a.querySelector(".form"),v=l.querySelector(".form"),y=p.querySelector("input[name='name']"),k=p.querySelector("input[name='about']"),b=f.querySelector("input[name='title']"),g=f.querySelector("input[name='link']"),E=v.querySelector("input[name='avatar-link']"),S=document.querySelector(".profile__add-button"),L=document.querySelector(".profile__edit-button"),C=document.querySelector(".profile__avatar-overlay"),q=new class{constructor(e){this.baseUrl=e.baseUrl,this.headers=e.headers}_getData(e){return e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`)}getInitialCards(){return fetch(`${this.baseUrl}cards`,{headers:this.headers}).then((e=>this._getData(e)))}getProfileInfo(){return fetch(`${this.baseUrl}users/me`,{headers:this.headers}).then((e=>this._getData(e)))}updateProfileInfo(e){return fetch(`${this.baseUrl}users/me`,{method:"PATCH",headers:this.headers,body:JSON.stringify({name:e.name,about:e.about})}).then((e=>this._getData(e)))}updateProfileAvatar(e){return fetch(`${this.baseUrl}users/me/avatar`,{method:"PATCH",headers:this.headers,body:JSON.stringify({avatar:e})}).then((e=>this._getData(e)))}addCard(e){return fetch(`${this.baseUrl}cards`,{method:"POST",headers:this.headers,body:JSON.stringify({name:e.name,link:e.link})}).then((e=>this._getData(e)))}deleteCard(e){return fetch(`${this.baseUrl}cards/${e}`,{method:"DELETE",headers:this.headers}).then((e=>this._getData(e)))}addLike(e){return fetch(`${this.baseUrl}cards/likes/${e}`,{method:"PUT",headers:this.headers}).then((e=>this._getData(e)))}deleteLike(e){return fetch(`${this.baseUrl}cards/likes/${e}`,{method:"DELETE",headers:this.headers}).then((e=>this._getData(e)))}}({baseUrl:"https://nomoreparties.co/v1/plus-cohort-23/",headers:{authorization:"a9c8f3fa-c4c8-428a-b274-c9fed27107d1","Content-Type":"application/json; charset=UTF-8"}}),I=new class{constructor({profileAvatar:e,profileName:t,profileDescription:s},i){this.profileAvatar=e,this.profileName=t,this.profileDescription=s,this.api=i}_renderUserInfo(e){this.profileAvatar.src=e.avatar,this.profileName.textContent=e.name,this.profileDescription.textContent=e.about}setUserInfo(e){this.id=e._id,this.name=e.name,this.about=e.about,this.avatar=e.avatar,this._renderUserInfo(e)}getUserInfo(){return this.api.getProfileInfo().then((e=>(this.setUserInfo(e),e)))}}({profileAvatar:d,profileName:_,profileDescription:m},q),B=new i(o,(function(e,t){e.submitter.textContent="Сохранение...",q.updateProfileInfo(t).then((e=>{I.setUserInfo(e),B.close()})).catch((e=>console.log(e))).finally((()=>e.submitter.textContent="Сохранить"))})),U=new t(r,o);U.enableValidation(),L.addEventListener("click",(()=>{y.value=I.name,k.value=I.about,U.resetError(),B.open()}));const w=new i(l,(function(e){e.submitter.textContent="Сохранение...",q.updateProfileAvatar(E.value).then((e=>{I.setUserInfo(e),w.close()})).catch((e=>console.log(e))).finally((()=>e.submitter.textContent="Сохранить"))})),x=new t(r,l);x.enableValidation(),C.addEventListener("click",(()=>{x.disableSubmit(),w.open()}));const P=new i(a,(function(e){e.submitter.textContent="Сохранение...";const t={name:b.value,link:g.value};q.addCard(t).then((e=>{O.addItem(N(e))})).catch((e=>console.log(e))).finally((()=>{P.close(),e.submitter.textContent="Сохранить"}))})),D=new t(r,a);D.enableValidation(),S.addEventListener("click",(()=>{D.resetError(),P.open()}));const $=new i(c,(function(e){e.submitter.textContent="Удаление...",q.deleteCard($.card.id).then((()=>{$.card.remove(),$.close()})).catch((e=>console.log(e))).finally((()=>{e.submitter.textContent="Да"}))}));function V(e){$.open(),$.card=e}const A=new class extends s{constructor(e){super(e),this._image=e.querySelector(".popup__image"),this._caption=e.querySelector(".popup__caption"),this._overlay=e.querySelector(".popup__overlay"),this._setEventListeners()}open(e,t){super.open(),this._image.src=e,this._image.alt=t,this._caption.textContent=t,this._overlay.style.backgroundColor="rgba(0, 0, 0, 0.9)"}_setEventListeners(){super._setEventListeners(),this.popup.addEventListener("click",(e=>{e.target.classList.contains("popup__image")&&this.close()}))}}(h);function T(e){A.open(e.link,e.name)}function M(e){e.liked?q.deleteLike(e.id).then((t=>{e.dislike(t.likes)})).catch((e=>console.log(e))):q.addLike(e.id).then((t=>{e.like(t.likes)})).catch((e=>console.log(e)))}function N(t){return new e(t,I.id,T,V,M,u).render()}const O=new class{constructor({renderer:e},t){this._renderer=e,this._selector=t}addItem(e){this._selector.prepend(e)}clear(){this._selector.innerHTML=""}renderItems(e){this.clear(),e.forEach((e=>{this.addItem(this._renderer(e))}))}}({renderer:e=>N(e)},n);Promise.all([I.getUserInfo(),q.getInitialCards()]).then((([e,t])=>{I.setUserInfo(e),O.renderItems(t.reverse())})).catch((e=>console.log(`Ошибка: ${e}`)))})();