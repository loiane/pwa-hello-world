// @ts-check
export function getDetailsTemplate(user) {
  return `<div id="user-page" style="width:100%;height:100%;background-color:rgba(225,225,225,0.8);position:fixed;top:0;left:0;display:inline-block;bottom:0;-webkit-overflow-scrolling: touch;overflow-y:scroll;z-index:100000"
onclick="document.querySelector('#user-page').parentNode.removeChild(document.querySelector('#user-page'));">
<div style="width:70%;min-width:270px;background-color:#ffffff;margin:15px auto;padding:15px;position:relative;" class="mdl-shadow--6dp">
<button style="position:absolute; right: 16px; top:16px;" class="mdl-button mdl-js-button mdl-js-ripple-effect" type="button">X</button>
<div class="mdl-grid" style="margin:0">
<div class="mdl-cell mdl-cell--6-col" style="margin-top:0">
    <h4 class="mdl-color-text--red" style="margin:0;padding-right:50px;">${user.name.first} ${user.name.last}</h4>
</div>
<div class="mdl-cell mdl-cell--6-col"  style="text-align:right;">

</div>
</div>
<div class="mdl-grid" style="margin:0">

<div class="mdl-cell mdl-cell--4-col user-image" style="background-repeat: no-repeat;min-height:250px;background-size: cover;background-image:url('${user.picture.large}')">
</div>
<div class="mdl-cell mdl-cell--5-col">
    <h5 style="padding-left:10px" class="mdl-color-text--red">User Information</h5>
    <div class="mdl-grid user-details-info">
        <div class="mdl-cell mdl-cell--5-col"><b>Email:</b></div>
        <div class="mdl-cell mdl-cell--6-col">${user.email}</div>
        <div class="mdl-cell mdl-cell--5-col" ><b>Phone:</b></div>
        <div class="mdl-cell mdl-cell--6-col">${user.phone}</div>
        <div class="mdl-cell mdl-cell--5-col"><b>Cell:</b></div>
        <div class="mdl-cell mdl-cell--6-col">${user.cell}</div>
        <div class="mdl-cell mdl-cell--5-col"><b>Country:</b></div>
        <div class="mdl-cell mdl-cell--6-col">${user.nat}</div>
    </div>
</div>
</div>

<div class="mdl-grid" style="margin:0">
<div class="mdl-cell mdl-cell--12-col" style="padding: 0 16px;">
    <h5 style="margin-top:0" class="mdl-color-text--red">Address</h5>
    <p style="color:#000000">${user.location.street} ${user.location.city} ${user.location.state} ${user.location.postcode}</p>
</div>
</div>

</div>
<style>
@media (max-width: 839px) and (min-width: 0){
#user-page .user-image{
    width: 100% !important;
    min-height: 250px !important;
    background-size: contain;
}
#user-page .mdl-cell--6-col{
    width:100%;
}
#user-page .user-details-info .mdl-cell--6-col{
    width: calc(50% - 16px) !important;
    float:left;
}
body{
    overflow:hidden;
    position:fixed;
    width:100%;
}
}
</style>
</div>`;
}
