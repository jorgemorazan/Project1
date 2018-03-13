import { Component } from '@angular/core';
import { NavController, 
  AlertController, // To Add Button
  ActionSheetController // To delete
 } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from '@firebase/util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  currentUser:any;
  postsRef:any;
  postsRef2: firebase.database.Reference;
  postsList: Array<any>;
  loadedPostsList: Array<any>;
  posts: AngularFireList<any>;
  
  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public afDatabase: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {
    this.postsRef = afDatabase.list('posts');
    this.posts = this.postsRef.valueChanges();

    this.postsRef2 = firebase.database().ref('/posts');
    this.postsRef2.on('value', postList => {
      let posts = [];
      postList.forEach( post => {
        posts.push(post.val());
        return false;
      });

      this.postsList = posts;
      this.loadedPostsList = posts;
    });

    afAuth.authState.subscribe(user => {
      if (!user) {
        this.currentUser = null;
        return;
      }
      this.currentUser = {uid:user.uid, photoURL: user.photoURL};
      
    });
  }

  addPost(){
    let prompt = this.alertCtrl.create({
      title: 'Compose a new post!',
      inputs: [
        {
          name: 'description',
          placeholder: 'What is happening?'
        }
      ],
      buttons: [
        {
          text: 'Publish it!',
          handler: data => {
            const newPostRef = this.postsRef.push({});
            newPostRef.set({
              id: newPostRef.key,
              description: data.description,
              likes:0,
              dislikes:0,
              order: 999999,
              propic: this.currentUser.photoURL,
              uid: this.currentUser.uid
            });
          }
        }
      ]
    });
    prompt.present();
  }

  
  iLikeIt(postId, postLikes, postOrder){
    this.myLikes(postId,postLikes)
    this.orderThis(postId,postOrder)
  }

  myLikes(postId, postLikes){
    postLikes++;
    this.postsRef.update(postId, {likes:postLikes});
  }

  myDislikes(postId, songDislikes){
    songDislikes++;
    this.postsRef.update(postId, {dislikes:songDislikes});
  }

  orderThis(postId, postOrder){
    postOrder--;
    this.postsRef.update(postId, {order: postOrder});
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((response)=>{
      console.log('resultado login google:', response);
      
      const userRef = this.afDatabase.list('users');

      userRef.update(response.user.uid, 
        {
          userId: response.user.uid, 
          displayName: response.user.displayName,
          photoURL: response.user.photoURL
        });
    });
  }

  initializePosts(): void {
    this.postsList = this.loadedPostsList;
  }

  onInput(searchbar){
    // Reset items back to all of the items
    this.initializePosts();

    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;
    
    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.postsList = this.postsList.filter((v) => {
      if(v.description && q) {
        if (v.description.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.postsList.length);
  }

  loginWithEmail() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.EmailAuthProvider()).then((xx)=>{

    });
  }
  logout() {
    this.afAuth.auth.signOut();
  }

}
