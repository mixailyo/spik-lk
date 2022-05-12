function uploadFiles() {
  let uploadFilesInput = document.querySelector('.upload-files__input');
  let uploadFilesList = document.querySelector('.upload-files__list');
  let uploadFilesLabel = document.querySelector('.upload-files__label');

  if (uploadFilesInput) {
    uploadFilesInput.addEventListener("change", function handleFiles() {
      let fileList = this.files;
  
      let listUpdated = false;
  
      let newList = new DataTransfer();
      for (let i = 0; i < fileList.length; i++) {
        if (fileList[i].size / 1048576 < 5) {
          newList.items.add(fileList[i]);
        } else {
          listUpdated = true;
        }
      }
  
      let htmlfileList = [];
      
      for (let i = 0; i < fileList.length; i++) {
        let newFile = `<li class="upload-files__file">
          <svg class="upload-files__file-icon" width="24" height="24" aria-hidden="true">
            <use xlink:href="#upload-file"></use>
          </svg>
          <p class="upload-files__file-name">${fileList[i].name}</p>
          <button class="upload-files__file-delete" data-file-name="${fileList[i].name}">
            <svg class="upload-files__file-delete-icon" width="24" height="24" aria-hidden="true">
              <use xlink:href="#file-delete"></use>
            </svg>
          </button>
        </li>`
  
        htmlfileList.push(newFile)
      }
  
      uploadFilesList.innerHTML = htmlfileList.join('');
  
      if (listUpdated) {
        this.files = newList.files;
        this.dispatchEvent(new Event('change'))
      }
    });
  
    document.addEventListener('click', (e) => {
      let btn = e.target.closest('.upload-files__file-delete')
      if (btn) {
        e.preventDefault();
        let newList = new DataTransfer();
        for (let i = 0; i < uploadFilesInput.files.length; i++) {
          if (uploadFilesInput.files[i].name != btn.dataset.fileName) {
            newList.items.add(uploadFilesInput.files[i]);
          }
        }
  
        uploadFilesInput.files = newList.files;
        uploadFilesInput.dispatchEvent(new Event('change'))
      }
    })
  
    uploadFilesLabel.addEventListener("dragenter", dragenter, false);
    uploadFilesLabel.addEventListener("dragover", dragover, false);
    uploadFilesLabel.addEventListener("drop", drop, false);
  
    function dragenter(e) {
      e.stopPropagation();
      e.preventDefault();
    }
    
    function dragover(e) {
      e.stopPropagation();
      e.preventDefault();
    }
  
    function drop(e) {
      e.stopPropagation();
      e.preventDefault();
    
      var dt = e.dataTransfer;
      var files = dt.files;
  
      uploadFilesInput.files = files
      uploadFilesInput.dispatchEvent(new Event('change'))
    }
  }
  
} 

export { uploadFiles }