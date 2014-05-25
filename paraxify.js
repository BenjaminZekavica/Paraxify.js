// Generated by CoffeeScript 1.7.1

/*
 Paraxify.js - v0.1
 @author Jaime Caballero
 MIT license
 */

(function() {
  "use strict";
  var animateParallax, fotos, porcentaje, posY, position, screenY, speed;

  posY = 0;

  screenY = 0;

  porcentaje = 0;

  position = "center";

  fotos = 0;

  speed = 1;

  window.calcParallax = function(el) {
    porcentaje = (posY - el.offsetTop + screenY) * 100 / (el.offsetHeight + screenY);
    if (porcentaje < 0) {
      porcentaje = 0;
    }
    if (porcentaje > 100) {
      porcentaje = 100;
    }
    return Math.round(((el.diferencia * speed) * (porcentaje - 50) / 100) * 100) / 100;
  };

  window.checkDimensions = function(i) {
    if (fotos[i].image.height < fotos[i].offsetHeight) {
      console.log("The image " + fotos[i].url(+" (" + fotos[i].image.height + "px) is too short for that container (" + fotos[i].offsetHeight(+"px).")));
    } else {
      console.log("It's ok");
      fotos[i].diferencia = -(fotos[i].image.height - fotos[i].offsetHeight);
    }
  };

  animateParallax = function() {
    var i;
    posY = window.pageYOffset !== void 0 ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    i = 0;
    while (i < fotos.length) {
      if (fotos[i].image.height > fotos[i].offsetHeight && ((posY + screenY) > fotos[i].offsetTop) && window.getComputedStyle(fotos[i], false).backgroundAttachment === "fixed") {
        position = calcParallax(fotos[i]);
      } else {
        position = "center";
      }
      fotos[i].style.backgroundPosition = "center " + position + "px";
      i++;
    }
  };

  window.onresize = function() {
    var i;
    screenY = window.innerHeight;
    i = 0;
    while (i < fotos.length) {
      checkDimensions(i);
      i++;
    }
  };

  window.onload = function() {
    var i;
    screenY = window.innerHeight;
    fotos = document.getElementsByClassName('paraxify');
    i = 0;
    while (i < fotos.length) {
      fotos[i].url = window.getComputedStyle(fotos[i], false).backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
      fotos[i].image = new Image();
      fotos[i].image.onload = setTimeout("checkDimensions(" + i + ")", 0);
      fotos[i].image.src = fotos[i].url;
      i++;
    }
    window.onscroll = animateParallax;
  };

}).call(this);
