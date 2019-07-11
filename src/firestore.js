const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});
const userRef = db.collection('Users').add({
  message: this.state.message,
  id: this.state.id,
  timestamp: this.state.time,
  image: this.state.imageURL,
  sender: this.state.nickname,
  recipient: this.state.username
});

let userCollection = db.collection('Users');
console.log(sign.currentUser.displayName)
let query= userCollection.where('recipient', '==', "John").get().then(snapshot=> 
  snapshot.forEach(doc => {
    const ts = doc.data().timestamp
    const jst = ts.toDate()
    const rt = jst.getHours() + ":" + jst.getMinutes() + ":" + jst.getSeconds()
    const a = {message: doc.data().message, id: doc.data().id, time: rt, sender: doc.data().sender }
    data.push(a)
    this.props.getReplies( doc.data().sender, doc.data().message, rt)
    this.setState({replyid: a})
    console.log(data)
    console.log(this.state.replyid)

    let senderName = doc.data().sender
    console.log(senderName)
    var count = this.props.users.length
    for (var i=0; i<=count; i++) {
       if (this.props.users !== senderName){
          this.props.addUser(senderName)
       } }
    console.log(count)
    console.log(this.state)
  }
  
    ))
    let observer = userCollection.onSnapshot(docSnapshot => {
      console.log(`Received doc snapshot: ${docSnapshot}`)
    })

