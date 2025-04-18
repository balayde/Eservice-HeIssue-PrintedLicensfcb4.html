﻿var showMessages = (function (message, type) {

    if (message.indexOf("&bull;") != 0)
        message = " &bull; " + message;

    $('#messageContainer').remove();

    switch (type) {
        case 'success':
            $("<div>", {
                id: "messageContainer"
            }).append("<div class='alert alert-success'>" + message + "</div>")
                .appendTo($('.card-body:last').parents('.p-lg-4'));
            break;
        case 'info':
            $("<div>", {
                id: "messageContainer"
            }).append("<div class='alert alert-info'>" + message + "</div>")
                .appendTo($('.card-body:last').parents('.p-lg-4'));
            break;
        case 'warning':
            $("<div>", {
                id: "messageContainer"
            }).append("<div class='alert alert-warning'>" + message + "</div>")
                .appendTo($('.card-body:last').parents('.p-lg-4'));
            break;
        default:
            $("<div>", {
                id: "messageContainer"
            }).append("<div class='alert alert-danger'>" + message + "</div>")
                .appendTo($('.card-body:last').parents('.p-lg-4'));
            break;
    }
    $('html, body').animate({
        scrollTop: $('#messageContainer:last').length > 0 ? $('#messageContainer:last').offset().top : $('.card-body:last').offset().top
    }, 600);
});

let script = document.createElement('script');
let baladyBusinessUrl = "https://baladybusiness-stg.momra.gov.sa/container/unifiedInbox/";
let baladyBusinessBasicUrl = "https://baladybusiness-stg.momra.gov.sa/container/providers";
var loc = window.location.origin;
if (loc.toLocaleLowerCase().search('//qc') > -1
    || loc.toLocaleLowerCase().search('//gisappsqc') > -1
    || loc.toLocaleLowerCase().search('//gisappsdev') > -1) {
    loc = "https://qcapps.momra.gov.sa";
    baladyBusinessUrl = "https://baladybusiness-qc.momra.gov.sa/container/unifiedInbox/"
    baladyBusinessBasicUrl = "https://baladybusiness-qc.momra.gov.sa/container/providers";
} else if (loc.toLocaleLowerCase().search('//baladyapps') > -1
    || loc.toLocaleLowerCase().search('//stg') > -1
    || loc.toLocaleLowerCase().search('//localhost') > -1
    || loc.toLocaleLowerCase().search('//gisappstg') > -1
    ) {
    loc = "https://baladyapps.momra.gov.sa";
    baladyBusinessUrl = "https://baladybusiness-stg.momra.gov.sa/container/unifiedInbox/";
    baladyBusinessBasicUrl = "https://baladybusiness-stg.momra.gov.sa/container/providers";
} else if (loc.toLocaleLowerCase().search('//precommercial') > -1
    || loc.toLocaleLowerCase().search('//prebaladyapps') > -1
    || loc.toLocaleLowerCase().search('//prebusiness') > -1
    || loc.toLocaleLowerCase().search('//gisapppre') > -1)
{
    loc = "https://prebaladyapps.momra.gov.sa";
    baladyBusinessUrl = "https://prebusiness.momra.gov.sa/container/unifiedInbox/";
    baladyBusinessBasicUrl = "https://prebusiness.momra.gov.sa/container/providers";
} else if (loc.toLocaleLowerCase().search('//commercial.balady') > -1
    || loc.toLocaleLowerCase().search('//apps.balady') > -1
    || loc.toLocaleLowerCase().search('//prepolicyui') > -1
    || loc.toLocaleLowerCase().search('//policyui.momrah') > -1
    || loc.toLocaleLowerCase().search('//business.balady') > -1
    || loc.toLocaleLowerCase().search('//gisapps') > -1) {
    loc = "https://apps.balady.gov.sa";
    baladyBusinessUrl = "https://business.balady.gov.sa/container/unifiedInbox/";
    baladyBusinessBasicUrl = "https://business.balady.gov.sa/container/providers";
}

let counttt = Math.floor(100000 + Math.random() * 900000);

//append ticket and handling exception file
script.src = loc + "Support.js?v=" + counttt + "";
document.head.appendChild(script);

// Add Google Analytics 
let key = 'G-69XYTDF1T2';
let googleScript = document.createElement('script');
googleScript.async = true;
googleScript.src = `https://www.googletagmanager.com/gtag/js?id=${key}`;
document.head.appendChild(googleScript);

let content = `
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', '${key}');
`

let gtagScript = document.createElement('script');
gtagScript.append(content);
document.head.appendChild(gtagScript);

//append css file for some enhancement and Top Menu
let linkCss = document.createElement("LINK");
linkCss.setAttribute("rel", "stylesheet");
linkCss.setAttribute("type", "text/css");
linkCss.setAttribute("href", loc + "enhancement.css?v=" + counttt + "");
document.head.appendChild(linkCss);

//***************/append css file for new Balady-Business-Identity\***************//
if (
    document.referrer &&
    (
        (document.referrer.endsWith('?baladybusiness') || document.referrer.endsWith('&baladybusiness') || document.referrer.indexOf('&baladybusiness&') != -1 || document.referrer.indexOf('?baladybusiness&') != -1)
        || (document.referrer.toLowerCase().indexOf('/extraservices/') != -1)
    ) &&
    document.location.href.toLowerCase().indexOf('/extraservices/') == -1 && !document.location.href.endsWith('?baladybusiness') && !document.location.href.endsWith('&baladybusiness') && document.location.href.indexOf('&baladybusiness&') == -1 && document.location.href.indexOf('?baladybusiness&') == -1
) {
    if (document.location.href.indexOf('?') != -1) {
        if ((document.location.href.toLowerCase().indexOf('engoffice/portal') != -1) && getUrlQueryStringParametersFromReferrer('providerid')) {
            document.location.href = baladyBusinessUrl + getUrlQueryStringParametersFromReferrer('providerid') + '/0';
        }
        else if ((document.referrer.toLowerCase().indexOf('ratingservices/rating') != -1)) {
            document.location.href = baladyBusinessBasicUrl;
        }
        else window.history.pushState('', '', document.location + '&baladybusiness');
    }
    else window.history.pushState('', '', document.location + '?baladybusiness');
}
if (document.location.href.toLowerCase().indexOf('engoffice/portal') != -1) {
    document.location.href = baladyBusinessBasicUrl;
}


if (getUrlQueryStringParameters("baladybusiness")) {
    linkCss = document.createElement("LINK");
    linkCss.setAttribute("rel", "stylesheet");
    linkCss.setAttribute("type", "text/css");
    linkCss.setAttribute("href", loc + "BaladyBusiness/BaladyBusinessUI.css?v=" + counttt + "");

    document.head.appendChild(linkCss);

    $(function () {
        appendEvent();
        //hide back-btn in case of firefox browser
        $(".page-top-fixed .page-options-btns .btn.btn-form-prev:not(.btn-back):has(svg)").css("display", "none");
    });

    $(document).ajaxStop(function () {
        setTimeout(function () {
            appendEvent();
        }, 1000);
    });
}

if (window.location.pathname.toLocaleLowerCase().search('/extraservices') > -1) {
    $(function () {
        appendEvent();
    });
    $(document).ajaxStop(function () {
        setTimeout(function () {
            appendEvent();
        }, 1000);
    });
}

function appendEvent() {
    $('.page-container a').on('click', applyBaladyBusinessOnHref);
    $('.balady__bus__sec a').on('click', applyBaladyBusinessOnHref);

    $('.page-options-btns a').on('click', applyBaladyBusinessForBtnOnHref);
}

//***************/append css file for new Balady-Business-Identity\***************//

$(document).on("keypress", function (event) {

    var keyPressed = event.keyCode || event.which;
    if (keyPressed === 13 && $(event.target).hasClass('btn-step')) {
        console.log("enter clicked");
        event.preventDefault();
        return false;
    }
});

$(function () {
    $('.breadcrumb > li > a').not('#generalDaemTicketBtn').removeAttr('href');
    $('a.nav-link.pr-0.m-0.leading-none.d-flex').removeAttr("href");
    $('a.nav-link.pr-0.m-0.leading-none.d-flex').css('cursor', 'pointer');

});

function getUrlQueryStringParameters(sParam) {
    var sPageURL = window.location.search.substring(1), sURLVariables = sPageURL.split('&'), sParameterName, i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0].toLowerCase() === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}

function getUrlQueryStringParametersFromReferrer(sParam) {
    var sPageURL = document.referrer.split('?')[1], sURLVariables = sPageURL.split('&'), sParameterName, i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0].toLowerCase() === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}

function hasQueryParams(url) {
    return url.includes('?');
}

function applyBaladyBusinessOnHref() {
    var getHref = $(this).attr('href');
    if (!getHref || getHref == undefined || getHref.length == 0 || getHref.search('#') === 0 || getHref.indexOf('&baladybusiness') > -1 || getHref.indexOf('?baladybusiness') > -1) return;
    if (hasQueryParams(getHref))
        $(this).attr("href", getHref + "&baladybusiness");
    else $(this).attr("href", getHref + "?baladybusiness");
}

function applyBaladyBusinessForBtnOnHref() {
    var getHref = $(this).attr('href');
    if (!getHref || getHref == undefined || getHref.length == 0 || getHref.search('#') === 0 || getHref.indexOf('&baladybusiness') > -1) return;
    if (getHref.toLowerCase().indexOf('engoffice') > -1 || getHref.toLowerCase().indexOf('eservices') > -1)
        if (hasQueryParams(getHref))
            $(this).attr("href", getHref + "&baladybusiness");
        else $(this).attr("href", getHref + "?baladybusiness");
}