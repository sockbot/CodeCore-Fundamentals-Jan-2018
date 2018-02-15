$(document).ready(function() {
  // let thumbnails = [];
  // $('#image-submit').submit(function(event) {
  //
  //   // on submit, preventDefault then push URLobject to thumbnails array
  //   event.preventDefault();
  //   let URLobject = {
  //     imageURL: $('#input-imageURL').val(),
  //     caption: $('#input-caption').val()
  //   }
  //   thumbnails.push(URLobject);
  //   $('#input-caption').val('');
  //   $('#input-imageURL').val('');
  //
  //   // clear thumbnails, then repopulate by iterating through thumbnails array
  //   $('#content').html('');
  //   for (let i = 0; i < thumbnails.length; i++) {
  //     $('#content').append(`
  //       <div class="card">
  //         <img class="card-img-top" src="${thumbnails[i].imageURL}" alt="Card image cap">
  //         <div class="card-body">${thumbnails[i].caption}</div>
  //       </div>
  //     `);
  //   }
  // });


  // jQuery solution above
  // ===========================================================
  // firebase solution below

  const thumbnailsRef = firebase.database().ref('thumbnails');

  // load all thumbnails from db into #content
  thumbnailsRef.on('child_added', function(data) {
    const thumbnailId = data.key;
    const thumbnailObj = data.val();
    $('#content').append(`
    <div class="card vg">
      <img class="card-img-top" src="${thumbnailObj.imageURL}" alt="Card image cap">
      <div class="card-body">${thumbnailObj.caption}</div>
    </div>
    `
    );
    console.log(thumbnailObj.imageURL);
    console.log(thumbnailObj.caption);
  });

  // on submit, save image and caption to db
  $('#image-submit').submit(function(event) {
    // on submit, preventDefault then push URLobject to thumbnails array
    event.preventDefault();
    thumbnailsRef.push({
      imageURL: $('#input-imageURL').val(),
      caption: $('#input-caption').val()
    });
    $('#input-caption').val('');
    $('#input-imageURL').val('');
  });
});
