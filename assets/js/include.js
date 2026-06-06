/* ============================================================
   Sauna Health Authority - Include Components & Mobile Menu
   ============================================================ */

(function() {
  'use strict';

  // --- Components base path ---
  var basePath = '';
  var imgPath = 'assets/images/';
  // All pages are at root level, no subfolder adjustment needed

  // --- Load Header ---
  var headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    var xhrHeader = new XMLHttpRequest();
    xhrHeader.open('GET', basePath + 'components/header.html', true);
    xhrHeader.onreadystatechange = function() {
      if (xhrHeader.readyState === 4 && xhrHeader.status === 200) {
        headerPlaceholder.innerHTML = xhrHeader.responseText;
        // Set logo src dynamically based on page location
        var logoImg = document.getElementById('site-logo');
        if (logoImg) {
          logoImg.src = imgPath + 'saunazilla-logo.webp';
        }
        // Initialize mobile menu after header loads
        initMobileMenu();
        // Set active nav link
        setActiveNavLink();
      }
    };
    xhrHeader.send();
  }

  // --- Load Footer ---
  var footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    var xhrFooter = new XMLHttpRequest();
    xhrFooter.open('GET', basePath + 'components/footer.html', true);
    xhrFooter.onreadystatechange = function() {
      if (xhrFooter.readyState === 4 && xhrFooter.status === 200) {
        footerPlaceholder.innerHTML = xhrFooter.responseText;
      }
    };
    xhrFooter.send();
  }

  // --- YouTube Video Embed (randomly picks one per page, main content, 16:9 aspect ratio) ---
  var videoPlaceholder = document.getElementById('video-embed-placeholder');
  if (videoPlaceholder) {
    var videoIds = ['7c-OXc6H7us', 'RWkv9ad7zvc', 'wnaOCNnE8ts', 'NunbmVSmx2A'];
    var randomIndex = Math.floor(Math.random() * videoIds.length);
    var videoId = videoIds[randomIndex];

    // Create a responsive wrapper for 16:9 aspect ratio
    var wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.width = '100%';
    wrapper.style.paddingBottom = '56.25%'; /* 16:9 aspect ratio */
    wrapper.style.height = '0';
    wrapper.style.overflow = 'hidden';
    wrapper.style.borderRadius = '8px';

    var iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.src = 'https://www.youtube.com/embed/' + videoId;
    iframe.title = 'Sauna Health YouTube Video';
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    wrapper.appendChild(iframe);
    videoPlaceholder.appendChild(wrapper);
  }

  // --- YouTube Short Embed (sidebar, portrait format) ---
  var sidebarVideo = document.getElementById('video-embed-sidebar');
  if (sidebarVideo) {
    var shortIframe = document.createElement('iframe');
    shortIframe.width = '100%';
    shortIframe.height = '350';
    shortIframe.src = 'https://www.youtube.com/embed/SlwJkg3CSXc';
    shortIframe.title = 'Sauna Lifestyle YouTube Short';
    shortIframe.frameBorder = '0';
    shortIframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    shortIframe.allowFullscreen = true;
    shortIframe.style.borderRadius = '8px';
    sidebarVideo.appendChild(shortIframe);
  }

  // --- Random Image (picks one of 5 sauna images per page) ---
  var imagePlaceholder = document.getElementById('random-image-placeholder');
  if (imagePlaceholder) {
    var imageFiles = [
      'long-history-of-credible-sauna-research.avif',
      'safe-sauna-session-under-supervision.avif',
      'sauna-health-advice-from-trusted-professionals.avif',
      'sauna-studies-proven-safe-health-effects.avif',
      'trusted-sauna-health-research.avif'
    ];
    var randomImgIndex = Math.floor(Math.random() * imageFiles.length);
    var imgFileName = imageFiles[randomImgIndex];

    var img = document.createElement('img');
    img.src = imgPath + imgFileName;
    img.alt = 'Sauna Health Research Illustration';
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.style.borderRadius = '8px';
    imagePlaceholder.appendChild(img);
  }

  // --- Mobile Menu Toggle ---
  function initMobileMenu() {
    var toggle = document.getElementById('mobileToggle');
    var nav = document.getElementById('mainNav');
    if (toggle && nav) {
      toggle.addEventListener('click', function() {
        nav.classList.toggle('open');
        toggle.classList.toggle('active');
      });

      // Close menu when clicking a link (mobile)
      var links = nav.querySelectorAll('a');
      links.forEach(function(link) {
        link.addEventListener('click', function() {
          nav.classList.remove('open');
          toggle.classList.remove('active');
        });
      });

      // Handle dropdown toggle on mobile
      var dropdownToggles = document.querySelectorAll('.dropdown-toggle');
      dropdownToggles.forEach(function(dropToggle) {
        dropToggle.addEventListener('click', function(e) {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            var dropdown = this.closest('.dropdown');
            if (dropdown) {
              dropdown.classList.toggle('active');
            }
          }
        });
      });
    }
  }

  // --- Set Active Navigation Link ---
  function setActiveNavLink() {
    var currentPage = window.location.pathname.split('/').pop();
    var links = document.querySelectorAll('.main-nav a:not(.contact-btn)');
    links.forEach(function(link) {
      var href = link.getAttribute('href');
      if (href && href.indexOf(currentPage) !== -1 && currentPage !== '') {
        link.classList.add('active');
      }
    });
  }

})();