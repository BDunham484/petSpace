const { Uploader } = require("uploader");

const uploader = new Uploader({
    apiKey: "free"
  });
  
//   function uploadFiles() {
//     uploader.open({ multi: true }).then(
//       files => alert(files.length === 0 
//                      ? "No files selected." 
//                      : `Files uploaded:\n\n${files.map(x => x.fileUrl).join("\n")}`),
//       error => alert(error)
//     );  
//   }

  uploader.open({ multi: true,
layout: "inline",
container: '#pet-picture-uploader' })
  .then(files => {
    if (files.length === 0) {
      console.log('No files selected.')
    } else {
      console.log('Files uploaded:');
      console.log(files.map(f => f.fileUrl));
    }
  }).catch(err => {
    console.error(err);
  });