window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.querySelector('.navbar').style.backgroundColor = "#111";
  } else {
    document.querySelector('.navbar').style.backgroundColor = "#333";
  }
}





