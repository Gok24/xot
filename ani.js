const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view'); // or add 'slide-in' for animation
      } else {
        // entry.target.classList.remove('in-view');
         // Optional: for re-animation
        // entry.target.classList.remove('slide-in'); // Optional: for re-animation
      }
    });
  });
  
  const elementsToAnimate = document.querySelectorAll('.xan');
  elementsToAnimate.forEach(element => {
    observer.observe(element);
  });