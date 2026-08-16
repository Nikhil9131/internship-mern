/*==========================================
INSIGHT HEADER JAVASCRIPT
GREEN SCROLL VERSION
==========================================*/

document.addEventListener("DOMContentLoaded", function () {

    const header = document.getElementById("ihHeader");
    const mobileBtn = document.getElementById("ihMobileToggle");
    const nav = document.getElementById("ihNav");

    /*==========================================
      GREEN HEADER ON SCROLL
    ==========================================*/

    function headerScroll() {

        if (window.scrollY > 50) {

            header.classList.add("ih-scroll");

        } else {

            header.classList.remove("ih-scroll");

        }

    }

    window.addEventListener("scroll", headerScroll);
    window.addEventListener("load", headerScroll);

    /*==========================================
      MOBILE MENU
    ==========================================*/

    if (mobileBtn) {

        mobileBtn.addEventListener("click", function () {

            nav.classList.toggle("active");
            this.classList.toggle("active");

        });

    }

    /*==========================================
      MOBILE DROPDOWN
    ==========================================*/

    document.querySelectorAll(".ih-dropdown > .ih-link")
    .forEach(function(link){

        link.addEventListener("click",function(e){

            if(window.innerWidth <= 991){

                e.preventDefault();

                this.parentElement.classList.toggle("active");

            }

        });

    });

    /*==========================================
      ACTIVE MENU
    ==========================================*/

    const current = window.location.href;

    document.querySelectorAll(".ih-link").forEach(function(link){

        if(link.href === current){

            document.querySelectorAll(".ih-link").forEach(function(item){

                item.classList.remove("ih-active");

            });

            link.classList.add("ih-active");

        }

    });

    /*==========================================
      CLOSE MOBILE MENU
    ==========================================*/

    document.addEventListener("click",function(e){

        if(
            nav &&
            !nav.contains(e.target) &&
            mobileBtn &&
            !mobileBtn.contains(e.target)
        ){

            nav.classList.remove("active");

            mobileBtn.classList.remove("active");

        }

    });

    /*==========================================
      ESC CLOSE
    ==========================================*/

    document.addEventListener("keyup",function(e){

        if(e.key === "Escape"){

            nav.classList.remove("active");

            mobileBtn.classList.remove("active");

        }

    });

    /*==========================================
      SHRINK HEADER
    ==========================================*/

    window.addEventListener("scroll",function(){

        if(window.scrollY > 60){

            header.style.padding = "0";

        }else{

            header.style.padding = "";

        }

    });

});

/*==========================================
SMOOTH SCROLL EFFECT
==========================================*/

window.addEventListener("scroll", function(){

    const header = document.getElementById("ihHeader");

    if(window.scrollY > 50){

        header.classList.add("ih-scroll");

    }else{

        header.classList.remove("ih-scroll");

    }

});

/*==========================================
OPTIONAL STICKY SHADOW
==========================================*/

window.addEventListener("scroll",function(){

    const header = document.querySelector(".ih-header");

    if(window.scrollY > 120){

        header.style.boxShadow =
        "0 15px 40px rgba(0,0,0,.18)";

    }else{

        header.style.boxShadow = "";

    }

});

/*==========================================
PREVENT MENU FLICKER
==========================================*/

window.addEventListener("resize",function(){

    if(window.innerWidth > 991){

        document
        .getElementById("ihNav")
        .classList.remove("active");

        document
        .getElementById("ihMobileToggle")
        .classList.remove("active");

    }

});

/*==========================================
HEADER TRANSITION
==========================================*/

const style = document.createElement("style");

style.innerHTML = `
.ih-header{
transition:
background .35s ease,
box-shadow .35s ease,
height .35s ease,
padding .35s ease;
}

.ih-header.ih-scroll{
background:#184735 !important;
}
`;

document.head.appendChild(style);