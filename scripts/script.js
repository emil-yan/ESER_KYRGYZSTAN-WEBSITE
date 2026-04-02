// Wait for the DOM to be fully loaded
window.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lenis
  const lenis = new Lenis({
      duration: 2.2,
      lerp: 0.05,
      smoothWheel: true,
      wheelMultiplier: 1.2,
  });

  function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // // 2. Magnetic Snap Logic
  // let isScrolling;
  // window.addEventListener('scroll', () => {
  //     window.clearTimeout(isScrolling);
  //     isScrolling = setTimeout(() => {
  //         const sections = document.querySelectorAll('section');
  //         let closestSection = sections[0];
  //         let minDistance = Infinity;

  //         sections.forEach(section => {
  //             const distance = Math.abs(window.scrollY - section.offsetTop);
  //             if (distance < minDistance) {
  //                 minDistance = distance;
  //                 closestSection = section;
  //             }
  //         });
  //         lenis.scrollTo(closestSection);
  //     }, 150); 
  // });

    // 3. Idle Auto-Return Logic
    let idleTimer;
    window.addEventListener('scroll', () => {
        window.clearTimeout(idleTimer);
        if (window.scrollY > 100) {
            idleTimer = setTimeout(() => {
                lenis.scrollTo('#Home-section', { duration: 2 });
            }, 60000); 
        }
    });

    // 4. Back to Home Button Logic (Moved inside)
    const backBtn = document.getElementById('back-to-home');
    if (backBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backBtn.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
            } else {
                backBtn.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
            }
        });

        backBtn.addEventListener('click', () => {
            lenis.scrollTo('#Home-section');
        });
    }

    // 5. Navbar & Text Fade Logic (Moved inside)
    const nav = document.getElementById('main-nav');
    const homeText = document.getElementById('home-text');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > 100) {
            nav?.classList.add('opacity-0', '-translate-y-10', 'pointer-events-none');
            homeText?.classList.add('opacity-0', 'translate-y-10');
        } else {
            nav?.classList.remove('opacity-0', '-translate-y-10', 'pointer-events-none');
            homeText?.classList.remove('opacity-0', 'translate-y-10');
        }
    });

    // 6. Nav Link Click Handlers
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = anchor.getAttribute('href');
            lenis.scrollTo(target, { duration: 1.5 });
        });
    });

    lenis.on('scroll', () => {
        const targets = document.querySelectorAll('.parallax-target');
        
        targets.forEach(img => {
            const rect = img.parentElement.getBoundingClientRect();
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = parseFloat(img.getAttribute('data-speed')) || 0.1;
                
                // Calculate progress (0 when it enters bottom, 1 when it leaves top)
                const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                
                // Map that progress to a shift range (e.g., -50px to 50px)
                const moveY = (progress - 0.5) * (rect.height * speed * 2);
                
                img.style.transform = `translate3d(0, ${moveY}px, 0)`; // translate3d is smoother than translateY
            }
        });
    });

    // 8. Text Reveal Animation
    const observerOptions = {
        threshold: 0.2 // Trigger when 20% of the image is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find ALL reveal-text elements in this container
                const elements = entry.target.querySelectorAll('.reveal-text');
                elements.forEach(el => {
                    el.classList.remove('opacity-0', 'translate-y-10', 'translate-y-full', 'scale-x-0');
                    el.classList.add('opacity-100', 'translate-y-0', 'scale-x-100');
                });
            }
        });
    }, { threshold: 0.2 });

    // Start watching all reveal-containers
    document.querySelectorAll('.reveal-container').forEach(container => {
        observer.observe(container);
    });

});





  window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    const homeText = document.getElementById('home-text');
    const scrollY = window.scrollY;

    // Adjust '100' to decide exactly when they should start disappearing
    if (scrollY > 500) {
        // Fade out and move up slightly
        nav.classList.add('opacity-0', '-translate-y-10', 'pointer-events-none');
        homeText.classList.add('opacity-0', 'translate-y-10');
    } else {
        // Fade back in and reset position
        nav.classList.remove('opacity-0', '-translate-y-10', 'pointer-events-none');
        homeText.classList.remove('opacity-0', 'translate-y-10');
    }
  });