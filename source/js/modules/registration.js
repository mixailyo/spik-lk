function registration() {
  let registrationButtonBack = document.querySelector('.registration__button-back');
  let registrationFormCodeSendBtn = document.querySelector('.registration__form-code-send-btn');
  let registrationFormPasswordShow = document.querySelectorAll('.registration__form-password-show');

  registrationButtonBack?.addEventListener('click', (e) => {
    e.preventDefault();
    window.history.back()
  })

  registrationFormCodeSendBtn?.addEventListener('click', (e) => {
    e.preventDefault();
  })

  registrationFormPasswordShow?.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      let passwordInput = btn.closest('.registration__form-password').querySelector('.registration__form-input')
      passwordInput.type === 'password' ? passwordInput.type = 'text' : passwordInput.type = 'password'
    })
  })
};

export { registration }