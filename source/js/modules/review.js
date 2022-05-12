function review() {
  let review = document.querySelector('.review');
  let reviewDateValue = document.querySelector('.review__date-value');

  if (review) {
    review.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let now = new Date();
      reviewDateValue.textContent = now.toLocaleDateString()
      review.classList.add('review--success')
    })
  }
}

export { review }