function skillsMember() {
    var user = firebase.auth().currentUser;
    var uid = user.uid;
    var userRef = firebase.database().ref().child('users').child(uid);
    userRef.once('value').then(function(snapshot) {
        var skills = snapshot.val().skills;
        if (skills != null) {
            for (var i = 0; i < skills.length; i++) {
                var skill = document.createElement('span');
                skill.innerHTML = skills[i] + '<br>';
                document.getElementById('skills').appendChild(skill);
            }
        }
    });
}