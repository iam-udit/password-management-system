
// Preview uploaded image
function previewImage(event){
    $("#preview").attr("src", URL.createObjectURL(event.target.files[0]));
};

