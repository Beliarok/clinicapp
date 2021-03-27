import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'; 
import { LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  posts: any;
  constructor(
    private loadingCtrl: LoadingController, 
    private toastCtrl: ToastController, 
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {}

  ionViewWillEnter() { this.getPosts(); }

  async getPosts()
  { 
    let loader = await this.loadingCtrl.create
    ({ 
      message: "Please wait..." 
    }); 
    loader.present();

    try { 
      this.firestore 
      .collection("contact") 
      .snapshotChanges() 
      .subscribe(data => { this.posts = data.map(e => { 
        return { 
          id: e.payload.doc.id, 
          name: e.payload.doc.data()["name"], 
          email: e.payload.doc.data()["email"], 
          enquiry: e.payload.doc.data()["enquiry"], 
          message: e.payload.doc.data()["message"] 
        }; 
        });

        loader.dismiss(); 
      });

    } 
    catch(e){ this.showToast(e);
    }
  }

  async deletePost(id: string)
  {  
    let loader = this.loadingCtrl.create
    ({ message: "Please wait..." }); 
    (await loader).present();

    await this.firestore.doc("contact/" + id).delete();

    (await loader).dismiss(); 
  }

  showToast (message:string)
  { 
    this.toastCtrl.create
    ({ message: message, duration: 3000 })
    .then(toastData => toastData.present()); 
  }

}

