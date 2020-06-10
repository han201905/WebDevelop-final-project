function creatphoto(){
    var photosection = document.createElement('section');
    photosection.classlist.add('record');

    var imgcontainerdiv = document.creatlElement('div');
    imgcontainerdiv.classlist.add('img-container');
    photosection.appendChild(imgcontainerdiv);

    var img = document.createElement('img');
    img.classlist.add('breakfast-photo-img');
    img.src = photoURL;
    imgcontainerdiv.appendChild（img);
}