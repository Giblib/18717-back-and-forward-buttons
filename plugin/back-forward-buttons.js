videojs.registerPlugin('backForwardButtons', function() {
  var myPlayer = this,
      jumpAmount = 10,
      controlBar,
      insertBeforeNode,
      newElementBB = document.createElement('div'),
      newElementFB = document.createElement('div'),
      newImageBB = document.createElement('img'),
      newImageFB = document.createElement('img');

  // +++ Assign IDs for later element manipulation +++
  newElementBB.id = 'backButton';
  newElementFB.id = 'forwardButton';

  // +++ Assign properties to elements and assign to parents +++
  newImageBB.setAttribute('src', 'https://s3-us-west-1.amazonaws.com/v4.0-assets/backwards.svg');
  newElementBB.appendChild(newImageBB);
  newImageFB.setAttribute('src', 'https://s3-us-west-1.amazonaws.com/v4.0-assets/forwards.svg');
  newElementFB.appendChild(newImageFB);

  // +++ Get controlbar and insert elements +++
  controlBar = myPlayer.$('.vjs-control-bar');
  // Get the element to insert buttons in front of in conrolbar
  insertBeforeNode = myPlayer.$('.vjs-volume-panel');

  // Insert the button div in proper location
  controlBar.insertBefore(newElementBB, insertBeforeNode);
  controlBar.insertBefore(newElementFB, insertBeforeNode);

  // +++ Add event handlers to jump back or forward +++
  // Back button logic, don't jump to negative times
  newElementBB.addEventListener('click', function () {
    var newTime,
        rewindAmt = jumpAmount,
        videoTime = myPlayer.currentTime();
    if (videoTime >= rewindAmt) {
      newTime = videoTime - rewindAmt;
    } else {
      newTime = 0;
    }
    myPlayer.currentTime(newTime);
  });

  // Forward button logic, don't jump past the duration
  newElementFB.addEventListener('click', function () {
    var newTime,
        forwardAmt = jumpAmount,
        videoTime = myPlayer.currentTime(),
        videoDuration = myPlayer.duration();
    if (videoTime + forwardAmt <= videoDuration) {
      newTime = videoTime + forwardAmt;
    } else {
      newTime = videoDuration;
    }
    myPlayer.currentTime(newTime);
  });
});
